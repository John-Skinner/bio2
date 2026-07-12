<script setup lang="ts">
import {Chart} from 'chart.js/auto';

const formatDate = (date: any) => {
  let fullYear: string = `${date.getFullYear()}`
  return `${fullYear}-${date.getMonth() + 1}-${date.getDate()}`
}
let startDate = new Date();
let numDays = 0;
let activeChart:any=null;

const setStartDate = (date: any) => {
  startDate = date;
}
const getDateAgoStr = (dateOffset:number) => {
  let newDate = new Date();
  newDate.setDate(startDate.getDate()-(numDays-dateOffset-1));
  let fmt = formatDate(newDate);
  return fmt
}
const onGetWeek = async () => {
  try {
    numDays = 7;

    let today = new Date();
    setStartDate(today);
    let lastWeek = new Date();
    lastWeek.setDate(today.getDate()-(numDays-1)); // javascript rolls over correctly
    let todayDate=getDateAgoStr(0);
    let lastWeekDate=getDateAgoStr(6);
    let url = "api/getdaterange/" + lastWeekDate + '/' + todayDate;
    let fetchedStats = await fetch(url, {
      method: 'GET'
    });
    let statsList = await fetchedStats.json();
    let dateLabels = [];
    let a_pain = [];
    let g_pain = [];
    let drive_time = [];
    let walk_miles = [];
    let s_type = [];
    let stress_level = [];
    let bm = [];
    let swim_minutes = [];
    let elliptical_minutes = [];
    let sitting_minutes = [];
    let sleep_hours = [];
    let naps_minutes = [];
    let hep_type = [];
    const sTypesMap:Map<string, number> = new Map();
    sTypesMap.set('None',0);
    sTypesMap.set('Mast',1);
    sTypesMap.set('Inter',2);
    const hepTypesMap:Map<string,number> = new Map();
    hepTypesMap.set('NONE',0);
    hepTypesMap.set('STRETCH',1);
    hepTypesMap.set('CORE',2);



    let matchingDateIndex:number = 0; // iterates through all dates
    statsList.forEach((item:any, index:number) => {
      console.log(`current item index: ${index} item date: ${item.date}`);
      console.log(`item date: ${item.date} iterate date: ${getDateAgoStr(matchingDateIndex)}`);
      while ((item.date != getDateAgoStr(matchingDateIndex)) && (matchingDateIndex < numDays)) {
        console.log(`pushing null`)
        a_pain.push(null);
        g_pain.push(null);
        drive_time.push(null);
        walk_miles.push(null);
        s_type.push(null);
        stress_level.push(null);
        bm.push(null);
        swim_minutes.push(null);
        elliptical_minutes.push(null);
        sitting_minutes.push(null);
        sleep_hours.push(null);
        naps_minutes.push(null);
        hep_type.push(null);
        dateLabels.push(getDateAgoStr(matchingDateIndex));
        matchingDateIndex++;
        console.log(`iterate date: ${getDateAgoStr(matchingDateIndex)}`);
        console.log(`item date: ${item.date} iterate date: ${getDateAgoStr(matchingDateIndex)}`);


      }
      if (item.date === getDateAgoStr(matchingDateIndex)) {
        console.log(`pushing data`)
        a_pain.push(item.a_pain);
        g_pain.push(item.g_pain);
        drive_time.push(item.drive_time);
        walk_miles.push(item.walk_miles);
        const sTypeStr: string = item.s_type as string;
        const sTypeNum = sTypesMap.get(sTypeStr);
        s_type.push(sTypeNum);
        stress_level.push(item.stress_level);
        bm.push(item.bm);
        swim_minutes.push(item.swim_minutes);
        elliptical_minutes.push(item.elliptical_minutes);
        sitting_minutes.push(item.sitting_minutes);
        sleep_hours.push(item.sleep_hours);
        naps_minutes.push(item.naps_minutes);
        const hepTypesStr: string = item.hep_type as string;
        const hepTypeNum = sTypesMap.get(hepTypesStr);
        hep_type.push(hepTypeNum);
        dateLabels.push(getDateAgoStr(matchingDateIndex));
        matchingDateIndex++;

      }
    });

    while (matchingDateIndex < numDays) {
      console.log(`pushing null 2`)
      a_pain.push(null);
      g_pain.push(null);
      drive_time.push(null);
      walk_miles.push(null);
      s_type.push(null);
      stress_level.push(null);
      bm.push(null);
      swim_minutes.push(null);
      elliptical_minutes.push(null);
      sitting_minutes.push(null);
      sleep_hours.push(null);
      naps_minutes.push(null);
      hep_type.push(null)
      dateLabels.push(getDateAgoStr(matchingDateIndex));
      matchingDateIndex++;
    }
    console.log(`a_pain:${JSON.stringify(a_pain)}`)
    console.log(`dateLabels:${JSON.stringify(dateLabels)}`)




    console.log(`fetched stats: ${JSON.stringify(statsList,null,2)}`);

    const ctx = document.getElementById('weekChart') as HTMLCanvasElement;
    const data = {
      labels: dateLabels,
      datasets: [
        {
          label: 'a-pain',
          data: a_pain,
          borderColor: '#ff0000'
        },
        {
          label: 'drive time',
          data: drive_time,
          borderColor: '#00ffff'
        },
        {
          label: 'sit-time',
          data: sitting_minutes,
          borderColor: '#00ffaa'
        },
        {
          label: 'swim_minutes',
          data: swim_minutes,
          borderColor: '#00ccaa'
        },
        {
          label: 'walk_miles',
          data: walk_miles,
          borderColor: '#11bbff'
        }
      ]
    }
    if (ctx !== null) {
      if (activeChart !== null) {
        activeChart.destroy();
      }
      activeChart = new Chart(ctx, {
        type: 'line',
        data,
        options: {
          indexAxis: 'y',
          maintainAspectRatio:false
        }
      })
    }


  }
  catch (error) {
    console.error("error fetching week: ", error);
  }
}

</script>

<template>

  <van-button @click="onGetWeek"> Get Week </van-button>
  <canvas id="weekChart"></canvas>


</template>

<style scoped>

#weekChart {
  max-height: 100dvh;
}

</style>
