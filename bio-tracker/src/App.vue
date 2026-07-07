<script setup lang="ts">
import BioLogger from './components/BioLogger.vue'

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
  <van-config-provider
  >
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
      <BioLogger  />

    </div>

  </van-config-provider>
</template>
