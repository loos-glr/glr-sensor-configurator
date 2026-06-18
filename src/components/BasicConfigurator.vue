<template>
  <div class="basic-configurator p-8 max-w-4xl mx-auto">
    <!-- Header -->
    <header class="mb-16 border-b-4 border-white pb-8">
      <h1 class="font-['Anton'] text-6xl uppercase tracking-wider text-white">
        Sensor Configurator
      </h1>
      <p class="font-['JetBrains_Mono'] text-gray-400 mt-4 text-sm uppercase tracking-widest">
        Select pin mapping and enter keys
      </p>
    </header>

    <form @submit.prevent="generateCode" class="space-y-16">
      
      <!-- PINS SECTION -->
      <section class="border-2 border-gray-800 p-8 relative">
        <h2 class="absolute -top-4 left-4 bg-[#0F0F0F] px-4 font-['Anton'] text-2xl uppercase tracking-wide text-white">
          Pin Configurations
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <!-- A0 -->
          <div class="flex flex-col space-y-2">
            <label class="font-['JetBrains_Mono'] text-xs font-bold text-gray-400 uppercase tracking-widest">A0 Switch</label>
            <select v-model="form.pins.a0" data-test="sel-a0" 
              class="w-full bg-transparent border-2 border-gray-600 rounded-none p-3 text-white font-['JetBrains_Mono'] focus:outline-none focus:border-white focus:ring-0 appearance-none transition-colors">
              <option value="NONE" class="bg-[#0F0F0F]">NONE</option>
              <option value="TEMP" class="bg-[#0F0F0F]">TEMP</option>
              <option value="LIGHT" class="bg-[#0F0F0F]">LIGHT</option>
              <option value="SOUND" class="bg-[#0F0F0F]">SOUND</option>
              <option value="ROTARY" class="bg-[#0F0F0F]">ROTARY</option>
            </select>
          </div>
          
          <!-- A2 -->
          <div class="flex flex-col space-y-2">
            <label class="font-['JetBrains_Mono'] text-xs font-bold text-gray-400 uppercase tracking-widest">A2 Switch</label>
            <select v-model="form.pins.a2" data-test="sel-a2"
              class="w-full bg-transparent border-2 border-gray-600 rounded-none p-3 text-white font-['JetBrains_Mono'] focus:outline-none focus:border-white focus:ring-0 appearance-none transition-colors">
              <option value="NONE" class="bg-[#0F0F0F]">NONE</option>
              <option value="TEMP" class="bg-[#0F0F0F]">TEMP</option>
              <option value="LIGHT" class="bg-[#0F0F0F]">LIGHT</option>
              <option value="SOUND" class="bg-[#0F0F0F]">SOUND</option>
              <option value="ROTARY" class="bg-[#0F0F0F]">ROTARY</option>
            </select>
          </div>
          
          <!-- D2 -->
          <div class="flex flex-col space-y-2">
            <label class="font-['JetBrains_Mono'] text-xs font-bold text-gray-400 uppercase tracking-widest">D2 Switch</label>
            <select v-model="form.pins.d2" data-test="sel-d2"
              class="w-full bg-transparent border-2 border-gray-600 rounded-none p-3 text-white font-['JetBrains_Mono'] focus:outline-none focus:border-white focus:ring-0 appearance-none transition-colors">
              <option value="NONE" class="bg-[#0F0F0F]">NONE</option>
              <option value="BUTTON" class="bg-[#0F0F0F]">BUTTON</option>
              <option value="ULTRASONIC" class="bg-[#0F0F0F]">ULTRASONIC</option>
              <option value="DHT" class="bg-[#0F0F0F]">DHT</option>
            </select>
          </div>
        </div>
      </section>
      
      <!-- I2C SECTION -->
      <section class="border-2 border-gray-800 p-8 relative">
        <h2 class="absolute -top-4 left-4 bg-[#0F0F0F] px-4 font-['Anton'] text-2xl uppercase tracking-wide text-white">
          I2C Sensors
        </h2>
        
        <div class="flex flex-col md:flex-row gap-8 mt-4">
          <label class="flex items-center space-x-4 cursor-pointer group">
            <div class="relative flex items-center justify-center">
              <input type="checkbox" v-model="form.i2c.bmi088" data-test="chk-bmi088" 
                class="peer appearance-none w-6 h-6 border-2 border-gray-600 rounded-none bg-transparent hover:border-gray-400 checked:border-white focus:outline-none focus:border-white focus:ring-0 transition-colors cursor-pointer" />
              <div class="absolute w-3 h-3 bg-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
            </div>
            <span class="font-['JetBrains_Mono'] text-sm tracking-wide text-gray-300 group-hover:text-white transition-colors uppercase">BMI088 Toggle</span>
          </label>
          
          <label class="flex items-center space-x-4 cursor-pointer group">
            <div class="relative flex items-center justify-center">
              <input type="checkbox" v-model="form.i2c.mma7660" data-test="chk-mma7660" 
                class="peer appearance-none w-6 h-6 border-2 border-gray-600 rounded-none bg-transparent hover:border-gray-400 checked:border-white focus:outline-none focus:border-white focus:ring-0 transition-colors cursor-pointer" />
              <div class="absolute w-3 h-3 bg-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
            </div>
            <span class="font-['JetBrains_Mono'] text-sm tracking-wide text-gray-300 group-hover:text-white transition-colors uppercase">MMA7660 Toggle</span>
          </label>
        </div>
      </section>

      <!-- KEYS SECTION -->
      <section class="border-2 border-gray-800 p-8 relative">
        <h2 class="absolute -top-4 left-4 bg-[#0F0F0F] px-4 font-['Anton'] text-2xl uppercase tracking-wide text-white">
          LoRaWAN Keys
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <div class="flex flex-col space-y-2">
             <label class="font-['JetBrains_Mono'] text-xs font-bold text-gray-400 uppercase tracking-widest">App EUI</label>
             <input type="text" v-model="form.appEui" data-test="input-app-eui" 
               class="w-full bg-transparent border-2 border-gray-600 rounded-none p-3 text-white font-['JetBrains_Mono'] focus:outline-none focus:border-white focus:ring-0 transition-colors"
               placeholder="16 Hex Chars" />
          </div>
          <div class="flex flex-col space-y-2">
             <label class="font-['JetBrains_Mono'] text-xs font-bold text-gray-400 uppercase tracking-widest">Dev EUI</label>
             <input type="text" v-model="form.devEui" data-test="input-dev-eui" 
               class="w-full bg-transparent border-2 border-gray-600 rounded-none p-3 text-white font-['JetBrains_Mono'] focus:outline-none focus:border-white focus:ring-0 transition-colors"
               placeholder="16 Hex Chars" />
          </div>
          <div class="flex flex-col space-y-2">
             <label class="font-['JetBrains_Mono'] text-xs font-bold text-gray-400 uppercase tracking-widest">App Key</label>
             <input type="text" v-model="form.appKey" data-test="input-app-key" 
               class="w-full bg-transparent border-2 border-gray-600 rounded-none p-3 text-white font-['JetBrains_Mono'] focus:outline-none focus:border-white focus:ring-0 transition-colors"
               placeholder="32 Hex Chars" />
          </div>
        </div>
      </section>

      <!-- ACTION BUTTON -->
      <div class="pt-8">
        <button type="submit" data-test="btn-generate"
          class="w-full border-2 border-white bg-white text-black font-['Anton'] text-3xl uppercase tracking-wider py-4 hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-[#0F0F0F]">
          Generate
        </button>
      </div>
    </form>
    
    <!-- OUTPUT SECTION -->
    <div class="mt-16 space-y-8" v-if="error || cppOutput">
      <div v-if="error" data-test="error-message" 
        class="border-2 border-red-500 p-6 bg-red-950/20 text-red-400 font-['JetBrains_Mono'] text-sm tracking-wide">
        <p class="font-['Anton'] text-xl uppercase mb-2 text-red-500 border-b border-red-500/30 pb-2">Error</p>
        <p class="mt-2">{{ error }}</p>
      </div>
      
      <div v-if="cppOutput" class="border-2 border-white p-8 relative">
        <h2 class="absolute -top-4 left-4 bg-[#0F0F0F] px-4 font-['Anton'] text-2xl uppercase tracking-wide text-white">
          Payload Output
        </h2>
        <pre data-test="cpp-output" class="font-['JetBrains_Mono'] text-sm text-gray-300 mt-4 overflow-x-auto p-4 bg-gray-900 border border-gray-800">{{ cppOutput }}</pre>
      </div>
    </div>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

/* Fix for select arrow to match brutalist theme and remove default appearance completely */
select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='square' stroke-linejoin='miter'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.2em;
}
</style>