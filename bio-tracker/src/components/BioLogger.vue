<script setup lang="ts">
import {ref} from 'vue'
import { showSuccessToast} from "vant";
import { showFailToast } from "vant";
import { showLoadingToast } from "vant";
import { closeToast } from "vant";

const formatDate = (date: any) => {
  let fullYear: string = `${date.getFullYear()}`
  return `${fullYear}-${date.getMonth() + 1}-${date.getDate()}`
}
const a_pain = ref(0);
const g_pain = ref(0);
const drive_time = ref(0)
const sex_type = ref('None')
const stress_level = ref('Low')
const bm = ref(0)
const swim_minutes = ref(0)
const elliptical_minutes = ref(0)
const walk_miles = ref(0)
const currentDate = new Date();
const currentYYY_MM_DD = formatDate(currentDate);
const localDate = currentDate.toDateString();

console.log(`local date: ${localDate}  currentDate: ${currentYYY_MM_DD}`);
const date = ref(currentYYY_MM_DD);
const sleep_hours = ref(0)
const naps_minutes = ref(0);
const hep_type = ref('STRETCH');

const show_past_date = ref(false);
const sitting_minutes = ref(0);
const pain_options = [
  {text: "0", value: 0},
  {text: "1", value: 1},
  {text: "2", value: 2},
  {text: "3", value: 3},
]
const drive_time_options = [
  {text: "0", value: 0},
  {text: "15", value: 15},
  {text: "30", value: 30},
  {text: "45", value: 45},
  {text: "60", value: 60},
  {text: "90", value: 90}
]
const sex_type_options = [
  {text: 'N', value: 'None'},
  {text: 'M', value: 'Mast'},
  {text: 'I', value: 'Inter'}
]
const stress_level_options = [
  {text: 'Low', value: 'Low'},
  {text: 'Medium', value: 'Medium'},
  {text: 'High', value: 'High'},
]
const bm_times_options = [
  {text: '0', value: 0},
  {text: '1', value: 1},
  {text: '2', value: 2},
]
const workout_time_options = [
  {text: '0', value: 0},
  {text: '10',value: 10},
  {text: '15', value: 15},
  {text: '20', value: 20},
  {text: '25', value: 25},
  {text: '30', value: 30},
  {text: '35', value: 35},
  {text: '40', value: 40},
]
const walk_distance_options = [
  {text: '0', value: 0},
  {text: '1', value: 1},
  {text: '2', value: 2},
  {text: '3', value: 3},
  {text: '4', value: 4},
]
const sit_time_options = [
  {text: '0', value: 0},
  {text: '1', value: 1},
  {text: '2', value: 2},
  {text: '3', value: 3},
  {text: '4', value: 4},
  {text: '5', value: 5},
]
const sleep_time_options = [
  {text: '0', value: 0},
  {text: '2', value: 2},
  {text: '4', value: 4},
  {text: '6', value: 6},
  {text: '8', value: 8},
]
const nap_time_options = [
  {text: '0', value: 0},
  {text: '20', value: 20},
  {text: '40', value: 40},
  {text: '60', value: 60},
]
const hep_type_options = [
  {text: 'NONE', value: 'NONE'},
  {text: 'CORE', value: 'CORE'},
  {text: 'STRETCH', value: 'STRETCH'}
]

const scatterStat = (stats: any) => {
  console.log(`scatter stat`)
  a_pain.value = stats.a_pain;
  g_pain.value = stats.g_pain;
  drive_time.value = stats.drive_time;
  sex_type.value = stats.sex_type;
  stress_level.value = stats.stress_level;
  bm.value = stats.bm;
  swim_minutes.value = stats.swim_minutes;
  walk_miles.value = stats.walk_miles;
  elliptical_minutes.value = stats.elliptical_minutes;
  sitting_minutes.value = stats.sitting_minutes;
  sleep_hours.value = stats.sleep_hours;
  naps_minutes.value = stats.naps_minutes;
  hep_type.value = stats.hep_type;

}
const setStatsToDefault = () => {
  a_pain.value = 0;
  g_pain.value = 0;
  drive_time.value = 0;
  sex_type.value = 'None'
}
const collectStats = () => {

  let stats = {
    a_pain: a_pain.value,
    g_pain: g_pain.value,
    drive_time: drive_time.value,
    sex_type: sex_type.value,
    stress_level: stress_level.value,
    bm: bm.value,
    swim_minutes: swim_minutes.value,
    elliptical_minutes: elliptical_minutes.value,
    walk_miles: walk_miles.value,
    date: date.value,
    sleep_hours: sleep_hours.value,
    naps_minutes: naps_minutes.value,
    hep_type: hep_type.value,
    sitting_minutes: sitting_minutes.value,
  }
  return JSON.stringify(stats)
}
const submitStats = async () => {
  try {
    await fetch("api/stats", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: collectStats()
    });
    showSuccessToast("Logged entry.");
  }
  catch (error) {
    console.error(`Error saving log entry: ${error}`);
    showFailToast('Failed to log entry.');
  }
}

const onConfirm = async (value: any) => {
  show_past_date.value = false;
  date.value = formatDate(value);
  let past_stats;
  let url = "api/getdate/" + date.value;
  console.log(`calculated url: ${url}`);
  showLoadingToast({
    forbidClick:true,
    loadingType: 'spinner',
    message:'Loading Log Entry...'
  })
  try {
    past_stats = await fetch(url, {
      method: 'GET'
    })
    let fetchedStats = await past_stats.json();
    if (fetchedStats.has_prev_set) {
      scatterStat(fetchedStats.stats);
    } else {
      setStatsToDefault();
    }
    closeToast();
  } catch (error) {
    console.log(`Error on get date: ${error}`);
    showFailToast('Failed to load log entry');
  }
}


</script>

<template>


  <van-calendar class="bio-calendar" v-model:show="show_past_date" :min-date="new Date(2025,0,1)" @confirm="onConfirm"></van-calendar>


  <van-row>
    <van-col span="8">
      <van-button plain type="primary" @click="show_past_date=true">Load Past Date</van-button>
    </van-col>
    <van-col span="8">
      {{ date }}
    </van-col>

  </van-row>
  <van-row>
    <van-col span="8">
      A Pain
    </van-col>
    <van-col span="16">
      <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item v-model="a_pain" :options="pain_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8">G Pain</van-col>
    <van-col span="16">
      <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item v-model="g_pain" :options="pain_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8">
      Drive Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="drive_time" :options="drive_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8">
      S-Type
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="sex_type" :options="sex_type_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="8">
      Stress Level
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="stress_level" :options="stress_level_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="8">
      BM
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="bm" :options="bm_times_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="8">
      Swim Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="swim_minutes" :options="workout_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="8">
      Walk Distance
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="walk_miles" :options="walk_distance_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="8">
      Elliptical Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="elliptical_minutes" :options="workout_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="8">
      Sitting Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="sitting_minutes" :options="sit_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8">
      Sleep Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="sleep_hours" :options="sleep_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8">
      Nap Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="naps_minutes" :options="nap_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8">
      HEP Type
    </van-col>
    <van-col span="16">
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="hep_type" :options="hep_type_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="24">
      <van-button @click="submitStats">
        Submit
      </van-button>
    </van-col>

  </van-row>

</template>

<style scoped>
.bio-calendar {
  --van-primary-color:#ff0000;
  --van-secondary-color:#ff0000;
  --van-calendar-confirm-button-height:50px;
  --van-calendar-background:#ff0000;

}

</style>
