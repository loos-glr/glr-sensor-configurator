import { createApp } from 'vue';
import App from './App.vue';


import './style.css';
import { loadSettings, saveAndUpdate } from './storage.js';
import { updateUI, switchTab, setupMenu, setupImageModal, getFormValues, displayValidationErrors, clearAlerts, displayCode, copyCode } from './ui.js';
import { generateFirmware } from './generator.js';
import { ConfigurationProfileSchema } from './domain/index.ts';
import { downloadViaWebSerial } from './serial.js';

window.saveAndUpdate = saveAndUpdate;
window.switchTab = switchTab;
window.copyCode = copyCode;
window.downloadViaWebSerial = downloadViaWebSerial;

window.handleGenerateSubmit = () => {
    clearAlerts();
    const data = getFormValues();
    const parsed = ConfigurationProfileSchema.safeParse(data);
    
    if (!parsed.success) {
        displayValidationErrors(parsed.error.issues);
        return;
    }
    
    const code = generateFirmware(parsed.data);
    displayCode(code);
    switchTab('code');
};

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    setupImageModal();
    if (document.getElementById('selA0')) {
        loadSettings();
        updateUI();
    }
});
    
    const vueContainer = document.getElementById('vue-app');
    if (vueContainer) {
        createApp(App).mount('#vue-app');
    }
