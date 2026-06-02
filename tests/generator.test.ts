import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateCode } from '../src/generator.js';

describe('Validation mock testing', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <select id="selA0"><option value="TEMP">Temp</option></select>
            <select id="selA2"><option value="NONE">None</option></select>
            <select id="selD2"><option value="BUTTON">Button</option></select>
            <input id="chkBMI088" type="checkbox" checked />
            <input id="chkMMA7660" type="checkbox" />
            <input id="appEui" value="1234567890123456" />
            <input id="devEui" value="1234567890123456" />
            <input id="appKey" value="12345678901234567890123456789012" />
            <div id="codeOutput"></div>
            <button id="copyBtn" style="display: none;"></button>
            <div id="alertsContainer"></div>
            
            <button id="tabBtnCode"></button>
            <button id="tabBtnData"></button>
            <div id="tabContentCode"></div>
            <div id="tabContentData"></div>
        `;
    });

    it('should generate code when valid', () => {
        expect(() => generateCode()).not.toThrow();
        expect(document.getElementById('codeOutput').textContent).toContain('A0');
    });
	
	it('should show alert and not render code on Zod schema error', () => {
        document.getElementById('appEui').value = 'invalid';
        
        generateCode();
        
        expect(document.getElementById('alertsContainer').innerHTML).toContain('Invalid');
        expect(document.getElementById('codeOutput').textContent).toBe('');
    });
});
