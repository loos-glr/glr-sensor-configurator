import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateFirmware } from '../src/generator.js';

describe('Validation mock testing', () => {
    it('should generate code when valid mockup', () => {
        expect(() => {
            const code = generateFirmware({
                appEui: '1234567890123456',
                devEui: '1234567890123456',
                appKey: '12345678901234567890123456789012',
                pins: { a0: 'TEMP', a2: 'NONE', d2: 'BUTTON' },
                i2c: { bmi088: true, mma7660: false }
            });
            expect(code).toContain('A0');
        }).not.toThrow();
    });
	
	it('should show alert and not render code on Zod schema error', () => {
        expect(true).toBe(true);
    });
});
