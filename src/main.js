import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
    const vueContainer = document.getElementById('vue-app-root'); // It should mount to DOM element, I will check index.html first.
    createApp(App).mount('#app'); 
});
