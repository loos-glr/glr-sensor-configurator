import { updateUI } from './ui.js';

export function loadSettings() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('appeui')) document.getElementById('appEui').value = urlParams.get('appeui');
    if (urlParams.has('deveui')) document.getElementById('devEui').value = urlParams.get('deveui');
    if (urlParams.has('appkey')) document.getElementById('appKey').value = urlParams.get('appkey');

    if (urlParams.has('appeui') || urlParams.has('deveui') || urlParams.has('appkey')) {
        saveSettings();
        return;
    }
    
    const saved = localStorage.getItem('glrSensorConfig');
    if (saved) {
        try {
            const settings = JSON.parse(saved);
            if(settings.a0) document.getElementById('selA0').value = settings.a0;
            if(settings.a2) document.getElementById('selA2').value = settings.a2;
            if(settings.d2) document.getElementById('selD2').value = settings.d2;
            if(settings.bmi !== undefined) document.getElementById('chkBMI088').checked = settings.bmi;
            if(settings.mma !== undefined) document.getElementById('chkMMA7660').checked = settings.mma;
            if(settings.appEui) document.getElementById('appEui').value = settings.appEui;
            if(settings.devEui) document.getElementById('devEui').value = settings.devEui;
            if(settings.appKey) document.getElementById('appKey').value = settings.appKey;
        } catch (e) {
            console.error("Could not load settings.");
        }
    }
}

export function saveSettings() {
    const settings = {
        a0: document.getElementById('selA0').value,
        a2: document.getElementById('selA2').value,
        d2: document.getElementById('selD2').value,
        bmi: document.getElementById('chkBMI088').checked,
        mma: document.getElementById('chkMMA7660').checked,
        appEui: document.getElementById('appEui').value.trim(),
        devEui: document.getElementById('devEui').value.trim(),
        appKey: document.getElementById('appKey').value.trim()
    };
    localStorage.setItem('glrSensorConfig', JSON.stringify(settings));
}

export function saveAndUpdate() {
    saveSettings();
    updateUI();
}
