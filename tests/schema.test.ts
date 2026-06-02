import { describe, it, expect } from 'vitest';
import { ConfigurationProfileSchema } from '@domain/index';

describe('Configuration Generate Constraints', () => {

    it('should_throw_zod_error_on_invalid_pin_mapping', () => {
        const payload = {
            appEui: "0000000000000000",
            devEui: "0000000000000000",
            appKey: "00000000000000000000000000000000",
            pins: {
                a0: "INVALID_SENSOR",
                a2: "NONE",
                d2: "DHT"
            },
            i2c: {
                bmi088: false,
                mma7660: false
            },
            mode: "BASIC"
        };
        const result = ConfigurationProfileSchema.safeParse(payload);
        expect(result.success).toBe(false);
        if(!result.success) {
            expect(result.error.issues[0].path).toEqual(["pins", "a0"]);
        }
    });

    it('should_succeed_on_valid_payload', () => {
        const payload = {
            appEui: "0123456789ABCDEF",
            devEui: "0123456789ABCDEF",
            appKey: "0123456789ABCDEF0123456789ABCDEF",
            pins: {
                a0: "TEMP",
                a2: "NONE",
                d2: "DHT"
            },
            i2c: {
                bmi088: true,
                mma7660: false
            },
            mode: "ADVANCED"
        };
        const result = ConfigurationProfileSchema.safeParse(payload);
        expect(result.success).toBe(true);
    });

    it('should_default_appEui_when_empty', () => {
        const payload = {
            appEui: "",
            devEui: "0123456789ABCDEF",
            appKey: "0123456789ABCDEF0123456789ABCDEF",
            pins: { a0: "NONE", a2: "NONE", d2: "NONE" },
            i2c: { bmi088: false, mma7660: false },
            mode: "BASIC"
        };
        const result = ConfigurationProfileSchema.safeParse(payload);
        expect(result.success).toBe(true);
        if(result.success) {
            expect(result.data.appEui).toBe("INSERT_APP_EUI_HERE");
        }
    });

    it('should_throw_on_invalid_devEui', () => {
        const payload = {
            appEui: "0123456789ABCDEF",
            devEui: "invalid_eui",
            appKey: "0123456789ABCDEF0123456789ABCDEF",
            pins: { a0: "NONE", a2: "NONE", d2: "NONE" },
            i2c: { bmi088: false, mma7660: false },
        };
        const result = ConfigurationProfileSchema.safeParse(payload);
        expect(result.success).toBe(false);
    });

});
