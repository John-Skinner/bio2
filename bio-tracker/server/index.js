// server/index.js
import express from 'express';
import pg from 'pg';

const {Client} = pg;

const jsonRepresentation = (row) => {
    console.log(`row 1 jsonRep: ${JSON.stringify(row, null, 2)}`);

    let dateOnly = row.date.getFullYear() + '-' + (row.date.getMonth() + 1) + '-' + row.date.getDate();

    return {
        has_prev_set: true,
        stats: {
            a_pain: row.a_pain,
            g_pain: row.g_pain,
            drive_time: row.drive_time,
            date: dateOnly,
            walk_miles: row.walk_miles,
            sex_type: row.sex_type.trimEnd(),
            stress_level: row.stress_level.trimEnd(),
            bm: row.bm,
            swim_minutes: row.swim_minutes,
            elliptical_minutes: row.elliptical_minutes,
            sitting_minutes: row.sitting_minutes,
            sleep_hours: row.sleep_hours,
            naps_minutes: row.naps_minutes,
            hep_type: row.hep_type.trimEnd(),

        }
    }
}
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse json
app.use(express.json());
app.use(express.static('dist'))
console.log(`body parser use start`)


app.post('/api/stats', async (req, res) => {
    console.log(`update sql with stats`)
    console.dir(req.body);
    const client = await new Client().connect();
    try {
        const sqlRes = await client.query('SELECT * from log where date = $1', [req.body.date]);
        if (sqlRes.rows.length > 0) {
            console.log(`update existing entry ${JSON.stringify(req.body)}`)
            let updateStatus = await client.query('UPDATE log set a_pain=$1, g_pain=$2, date=$3, walk_miles=$4,' +
                'swim_minutes=$5, elliptical_minutes=$6, sitting_minutes=$7, sleep_hours=$8, drive_time=$9,' +
                'naps_minutes=$10, sex_type=$11, stress_level=$12, bm = $13, HEP_type=$14 where date=$3',
                [req.body.a_pain,
                    req.body.g_pain,
                    req.body.date,
                    req.body.walk_miles,
                    req.body.swim_minutes,
                    req.body.elliptical_minutes,
                    req.body.sitting_minutes,
                    req.body.sleep_hours,
                    req.body.drive_time,
                    req.body.naps_minutes,
                    req.body.sex_type,
                    req.body.stress_level,
                    req.body.bm,
                    req.body.hep_type
                ]);
            console.log(`Update status: ${updateStatus}`);

        } else {
            console.log(`do insert ${JSON.stringify(req.body)}`);
            let params = [
                req.body.a_pain,
                req.body.g_pain,
                req.body.date,
                req.body.walk_miles,
                req.body.swim_minutes,
                req.body.elliptical_minutes,
                req.body.sitting_minutes,
                req.body.sleep_hours,
                req.body.drive_time,
                req.body.naps_minutes,
                req.body.sex_type,
                req.body.stress_level,
                req.body.bm,
                req.body.hep_type
            ]
            let insertQuery = 'INSERT INTO log ' +
                '(a_pain, ' +
                'g_pain, ' +
                'date, walk_miles, swim_minutes, elliptical_minutes, sitting_minutes, sleep_hours,' +
                'drive_time, naps_minutes, sex_type, stress_level, bm, hep_type ) VALUES ' +
                '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)'
            console.log(`query string: ${insertQuery}`)
            let insertStatus = await client.query(insertQuery, params);
            console.log(`insert status: ${insertStatus}`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        client.end();
    }


    res.json({status: 'ok'});
});
app.get('/api/getdate/:date', async (req, res) => {

    console.log(`getdate received `)
    let requestedDate = req.params.date;
    console.log(`req.params.date: ${req.params.date}`);
    const client = await new Client().connect();
    try {
        const sqlRes = await client.query('SELECT * from log where date = $1', [requestedDate]);
        client.end();
        console.log(`rows length: ${sqlRes.rows.length}`);
        if (sqlRes.rows.length > 0) {
            let jsonRep = jsonRepresentation(sqlRes.rows[0]);
            console.log(`row: ${JSON.stringify(sqlRes.rows[0])}`)
            res.json(jsonRep);
        } else {
            res.json({has_prev_set: false});
        }
    } catch (error) {
        console.error(`Error in get date: ${JSON.stringify(error)}`);
    } finally {
        client.end();
    }

})
console.log(`listening to port: ${PORT}`);
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
console.log(`ran off the end`)
