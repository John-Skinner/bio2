// server/index.js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse json
app.use(express.json());

// Sample API Route
app.get('/api/message', (req, res) => {
    console.log(`get for message received`)
    res.json({ text: 'Hello from Node.js and Express!' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
