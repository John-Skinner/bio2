<script setup lang="ts">

import {watch, ref} from "vue";
const pwValue = ref('');
const showNumKeyboard=ref(true);
const pwPassed=ref(false);
watch(pwValue,(newVal, oldVal) =>{
  console.log(`newVal: ${newVal} oldVal: ${oldVal}`);
  pwPassed.value = newVal === '1968';

})

</script>

<template>

    <van-password-input v-if="!pwPassed"
      :value="pwValue"
      :mask="false"
      :focused="showNumKeyboard"
      @focus="showNumKeyboard = false"
      />
    <van-number-keyboard v-if="!pwPassed"
      v-model="pwValue"
      :show="true"
      />

    <div v-if="pwPassed">
      <nav>
        <RouterLink to="/" > Log Today </RouterLink>
        <RouterLink to="/graph"> View Last Week</RouterLink>
      </nav>
      <main>
        <RouterView />
      </main>


    </div>

</template>
<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  max-height: 100dvh;
}


</style>
