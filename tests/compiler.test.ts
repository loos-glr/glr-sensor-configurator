import { describe, it, expect } from 'vitest';
import { generateFirmware } from '@domain/compiler';
import { ConfigurationProfile } from '@domain/index';

describe('Firmware Compiler', () => {

    const baseConfig: ConfigurationProfile = {
        appEui: "0123456789ABCDEF",
        devEui: "0123456789ABCDEF",
        appKey: "0123456789ABCDEF0123456789ABCDEF",
        pins: { a0: "NONE", a2: "NONE", d2: "NONE" },
        i2c: { bmi088: false, mma7660: false },
        mode: "BASIC"
    };

    it('should generate basic LoRaWAN configuration', () => {
        const code = generateFirmware(baseConfig);
        expect(code).toContain('lora.setId(NULL, "0123456789ABCDEF", "0123456789ABCDEF");');
        expect(code).toContain('lora.setKey(NULL, NULL, "0123456789ABCDEF0123456789ABCDEF");');
    });

    it('should conditionally inject DHT headers and variables', () => {
        const config = { ...baseConfig, pins: { ...baseConfig.pins, d2: "DHT" as const } };
        const code = generateFirmware(config);
        expect(code).toContain('#include <DHT.h>');
        expect(code).toContain('#define DHTPIN 2');
    });

    it('should conditionally inject BMI088 headers', () => {
        const config = { ...baseConfig, i2c: { ...baseConfig.i2c, bmi088: true } };
        const code = generateFirmware(config);
        expect(code).toContain('#include <BMI088.h>');
    });

    it('should conditionally inject MMA7660 headers', () => {
        const config = { ...baseConfig, i2c: { ...baseConfig.i2c, mma7660: true } };
        const code = generateFirmware(config);
        expect(code).toContain('#include <MMA7660.h>');
    });

    it('should inject Steinhart-Hart equation for TEMP on A0', () => {
        const config = { ...baseConfig, pins: { ...baseConfig.pins, a0: "TEMP" as const } };
        const code = generateFirmware(config);
        expect(code).toContain('log(r / 10000.0)'); // basic check for equation usage
        expect(code).toContain('analogRead(0)');
    });

    it('should inject ultrasonic pulse math for ULTRASONIC on D2', () => {
        const config = { ...baseConfig, pins: { ...baseConfig.pins, d2: "ULTRASONIC" as const } };
        const code = generateFirmware(config);
        expect(code).toContain('pulseIn(2, HIGH)');
        expect(code).toContain('/ 58'); // cm calc
    });

    it('should formulate dynamic snprintf data packing line in order', () => {
        const config = {
            ...baseConfig,
            pins: { a0: "TEMP" as const, a2: "LIGHT" as const, d2: "DHT" as const }
        };
        const code = generateFirmware(config);
        
        // Expected order: A0, A2, D2
        expect(code).toContain('snprintf(buffer, sizeof(buffer), "%d,%d,%d,%d", val_a0, val_a2, val_d2_t, val_d2_h);');
    });

});
