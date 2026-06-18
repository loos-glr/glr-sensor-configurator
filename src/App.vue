<template>
  <div id="vue-app-root" class="vue-app-root min-h-screen bg-[#0F0F0F] text-white">
    <!-- 1. 12-column desktop / 4-column mobile fluid grid structural logic -->
    <!-- 3. Inject the wide margins (64px desktop / 16px mobile) (via px-4 and md:px-16) -->
    <main class="grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 px-4 md:px-16 py-8 md:py-16 mx-auto">
      
      <!-- 2. BASIC and ADVANCED tab toggle switch (Oversized Anton text + Acid Green underline / Strikethrough) -->
      <nav class="col-span-4 md:col-span-12 flex space-x-6 md:space-x-12 items-center mb-12 border-b-2 border-gray-800 pb-6">
        <button 
          @click="mode = 'BASIC'"
          :class="[
            'transition-all duration-300 relative focus:outline-none uppercase font-[\'Anton\'] text-5xl md:text-8xl tracking-widest',
            mode === 'BASIC' ? 'text-white' : 'text-gray-600 line-through decoration-gray-500 hover:text-gray-400'
          ]"
        >
          Basic
          <div v-if="mode === 'BASIC'" class="absolute -bottom-6 left-0 w-full h-2 md:h-4 bg-[#00D745]"></div>
        </button>
        <button 
          @click="mode = 'ADVANCED'"
          :class="[
            'transition-all duration-300 relative focus:outline-none uppercase font-[\'Anton\'] text-5xl md:text-8xl tracking-widest',
            mode === 'ADVANCED' ? 'text-white' : 'text-gray-600 line-through decoration-gray-500 hover:text-gray-400'
          ]"
        >
          Advanced
          <div v-if="mode === 'ADVANCED'" class="absolute -bottom-6 left-0 w-full h-2 md:h-4 bg-[#00D745]"></div>
        </button>
      </nav>

      <!-- 3. Ensure the dark thematic space isolates components distinctly -->
      <div v-if="mode === 'BASIC'" class="col-span-4 md:col-span-12 lg:col-start-2 lg:col-span-10 bg-[#0F0F0F]">
        <BasicConfigurator />
      </div>

      <div v-else class="col-span-4 md:col-span-12 lg:col-start-2 lg:col-span-10 border-2 border-gray-800 p-16 flex items-center justify-center bg-[#0F0F0F]">
        <h2 class="font-['Anton'] text-2xl md:text-4xl text-gray-500 uppercase tracking-widest text-center">
          Advanced Settings Locked
        </h2>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BasicConfigurator from './components/BasicConfigurator.vue';

const mode = ref('BASIC');
</script>

<style>
/* Brutalist styling variables are assumed inherited from global style.css */
</style>
