import { displayNames } from './config.js';

export function switchTab(tabId) {
    const btnCode = document.getElementById('tabBtnCode');
    const btnData = document.getElementById('tabBtnData');
    const contentCode = document.getElementById('tabContentCode');
    const contentData = document.getElementById('tabContentData');

    const activeClass = "pb-3 px-6 text-glr-neon border-b-2 border-glr-neon font-bold uppercase tracking-wider text-sm transition-colors focus:outline-none";
    const inactiveClass = "pb-3 px-6 text-glr-gray border-b-2 border-transparent hover:text-white font-bold uppercase tracking-wider text-sm transition-colors focus:outline-none";

    if (tabId === 'code') {
        btnCode.className = activeClass;
        btnData.className = inactiveClass;
        contentCode.classList.remove('hidden');
        contentCode.classList.add('flex');
        contentData.classList.add('hidden');
        contentData.classList.remove('flex');
    } else {
        btnData.className = activeClass;
        btnCode.className = inactiveClass;
        contentData.classList.remove('hidden');
        contentData.classList.add('flex');
        contentCode.classList.add('hidden');
        contentCode.classList.remove('flex');
    }
}

export function updateUI() {
    const a0 = document.getElementById('selA0').value;
    const a2 = document.getElementById('selA2').value;
    const d2 = document.getElementById('selD2').value;
    const bmi = document.getElementById('chkBMI088').checked;
    const mma = document.getElementById('chkMMA7660').checked;

    // 1. Update Physical Instructions
    const list = document.getElementById('tapeList');
    list.innerHTML = "";

    if(a0 !== "NONE") list.innerHTML += `<li>Place tape on the <b class="text-white">${displayNames[a0]}</b> and write: <span class="text-glr-neon font-bold">A0</span></li>`;
    if(a2 !== "NONE") list.innerHTML += `<li>Place tape on the <b class="text-white">${displayNames[a2]}</b> and write: <span class="text-glr-neon font-bold">A2</span></li>`;
    if(d2 !== "NONE") list.innerHTML += `<li>Place tape on the <b class="text-white">${displayNames[d2]}</b> and write: <span class="text-glr-neon font-bold">D2</span></li>`;
    if(bmi) list.innerHTML += `<li>Plug the <b class="text-white">BMI088</b> into an <span class="text-glr-neon font-bold">I2C</span> port.</li>`;
    if(mma) list.innerHTML += `<li>Plug the <b class="text-white">MMA7660</b> into an <span class="text-glr-neon font-bold">I2C</span> port.</li>`;
    
    if(list.innerHTML === "") {
        list.innerHTML = "<li class='text-gray-500 italic'>Awaiting hardware selection...</li>";
    } else {
        list.innerHTML += "<li class='mt-2'>Ensure the <b class=\"text-white\">Seeeduino GPS antenna</b> is firmly connected.</li>";
    }

    // 2. Update Library Dependencies
    const libList = document.getElementById('libraryList');
    libList.innerHTML = `<li><b class="text-white">TinyGPSPlus</b> (by Mikal Hart) - <span class="text-gray-500 italic">Always required for GPS</span></li>`;
    
    if(d2 === "DHT") {
        libList.innerHTML += `<li><b class="text-white">DHT sensor library</b> (by Adafruit)</li>`;
        libList.innerHTML += `<li><b class="text-white">Adafruit Unified Sensor</b> (by Adafruit) - <span class="text-gray-500 italic">Dependency for DHT</span></li>`;
    }
    if(bmi) {
        libList.innerHTML += `<li><b class="text-white">Bolder Flight Systems BMI088</b> (by Brian Taylor)</li>`;
    }
    if(mma) {
        libList.innerHTML += `<li><b class="text-white">Grove 3-Axis Digital Accelerometer MMA7660</b> (or similar MMA7660 library)</li>`;
    }
}

export function setupMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (menuBtn && dropdownMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                dropdownMenu.classList.add('hidden');
            }
        });
    }
}

