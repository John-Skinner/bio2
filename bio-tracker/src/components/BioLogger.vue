<script setup lang="ts">
import {ref} from 'vue'

const msg = ref('nothing');
const a_pain = ref(0);
const g_pain = ref(0);
const drive_time = ref(0)
const sex_type = ref('None')
const stress_level = ref('Low')
const bm_times = ref(0)
const swim_time = ref(0)
const elliptical_time = ref(0)
const walk_distance = ref(0)
const date = ref('');

const show_past_date = ref(false);
const sit_time = ref(0);
const pain_options = [
  {text: "0", value: 0},
  {text: "1", value: 1},
  {text: "2", value: 2},
  {text: "3", value: 3},
]
const drive_time_options = [
  {text: "0", value: 0},
  {text: "15", value: 15},
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

const goGetMessage = async () => {
  try {
    let rmsg = await fetch('http://localhost:5175/api/message');
    let rsMsg = new Response(rmsg.body);
    let jsonMsg = await rsMsg.json();


    console.log(`response: ${JSON.stringify(jsonMsg)}`);
    msg.value = jsonMsg.text;
  } catch (error) {
    console.log(`service response failed: ${error}`);
    return 'bad'
  }


}
const formatDate = (date) => {
  let fullYear: string = `${date.getFullYear()}`
  return `${date.getMonth() + 1}/${date.getDate()}/${fullYear.substring(2)}`
}
const onConfirm = (value: any) => {
  show_past_date.value = false;
  date.value = formatDate(value);
}


</script>

<template>
  <h2> Bio Tracker</h2>
  <p>
    <van-calendar v-model:show="show_past_date" :min-date="new Date(2025,0,1)" @confirm="onConfirm"></van-calendar>

  </p>
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
        <van-dropdown-item v-model="bm_times" :options="bm_times_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="8">
      Swim Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="swim_time" :options="workout_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>

  <van-row>
    <van-col span="8">
      Elliptical Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="elliptical_time" :options="workout_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8">
      Sitting Time
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="sit_time" :options="sit_time_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>
  <van-row>
    <van-col span="8">
      Walk Distance
    </van-col>
    <van-col span="16">
      <van-dropdown-menu>
        <van-dropdown-item v-model="walk_distance" :options="walk_distance_options"/>
      </van-dropdown-menu>
    </van-col>
  </van-row>


</template>

<style scoped>

</style>
