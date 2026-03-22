import './style.css';
import { loadSettings, saveAndUpdate } from './storage.js';
import { updateUI, switchTab, setupMenu } from './ui.js';
import { generateCode, copyCode } from './generator.js';
import { downloadViaWebSerial } from './serial.js';

// Bind functions to the window object so they can be called from inline HTML attributes
// This is done to maintain compatibility with the current HTML without a full refactor to addEventListener
window.saveAndUpdate = saveAndUpdate;
window.generateCode = generateCode;
window.switchTab = switchTab;
window.copyCode = copyCode;
window.downloadViaWebSerial = downloadViaWebSerial;

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    if (document.getElementById('selA0')) {
        loadSettings();
        updateUI();
    }
});
