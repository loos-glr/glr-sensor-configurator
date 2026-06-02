<template>
  <div class="basic-configurator">
    <form @submit.prevent="generateCode">
      <!-- A0 -->
      <select v-model="form.pins.a0" data-test="sel-a0">
        <option value="NONE">NONE</option>
        <option value="TEMP">TEMP</option>
        <option value="LIGHT">LIGHT</option>
        <option value="SOUND">SOUND</option>
        <option value="ROTARY">ROTARY</option>
      </select>
      
      <!-- A2 -->
      <select v-model="form.pins.a2" data-test="sel-a2">
        <option value="NONE">NONE</option>
        <option value="TEMP">TEMP</option>
        <option value="LIGHT">LIGHT</option>
        <option value="SOUND">SOUND</option>
        <option value="ROTARY">ROTARY</option>
      </select>
      
      <!-- D2 -->
      <select v-model="form.pins.d2" data-test="sel-d2">
        <option value="NONE">NONE</option>
        <option value="BUTTON">BUTTON</option>
        <option value="ULTRASONIC">ULTRASONIC</option>
        <option value="DHT">DHT</option>
      </select>
      
      <!-- I2C -->
      <input type="checkbox" v-model="form.i2c.bmi088" data-test="chk-bmi088" />
      <input type="checkbox" v-model="form.i2c.mma7660" data-test="chk-mma7660" />
      
      <!-- Keys -->
      <input type="text" v-model="form.appEui" data-test="input-app-eui" />
      <input type="text" v-model="form.devEui" data-test="input-dev-eui" />
      <input type="text" v-model="form.appKey" data-test="input-app-key" />

      <button type="submit" data-test="btn-generate">Generate</button>
    </form>
    
    <div v-if="error" data-test="error-message">{{ error }}</div>
    <pre v-if="cppOutput" data-test="cpp-output">{{ cppOutput }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ConfigurationProfileSchema } from '@domain/index';
import { generateFirmware } from '@domain/compiler';

const form = reactive({
  appEui: '',
  devEui: '',
  appKey: '',
  pins: {
    a0: 'NONE',
    a2: 'NONE',
    d2: 'NONE'
  },
  i2c: {
    bmi088: false,
    mma7660: false
  }
});

const cppOutput = ref('');
const error = ref('');

const generateCode = () => {
  error.value = '';
  cppOutput.value = '';
  
  try {
    const validData = ConfigurationProfileSchema.parse(form);
    cppOutput.value = generateFirmware(validData);
  } catch (e: any) {
    if (e.errors) {
      error.value = e.errors.map((err: any) => err.message).join(', ');
    } else {
      error.value = e.message || 'Validation failed';
    }
  }
};
</script>
