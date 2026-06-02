import { z } from 'zod';

export function greetDomain(): string {
    return 'Hello from Domain';
}

const hexRegex = /^[0-9A-Fa-f]+$/;

export const ConfigurationProfileSchema = z.object({
    appEui: z.string().regex(hexRegex).length(16).or(z.literal("")).transform(v => v === "" ? "INSERT_APP_EUI_HERE" : v).or(z.literal("INSERT_APP_EUI_HERE")),
    devEui: z.string().regex(hexRegex).length(16),
    appKey: z.string().regex(hexRegex).length(32),
    pins: z.object({
        a0: z.enum(["NONE", "TEMP", "LIGHT", "SOUND", "ROTARY"]),
        a2: z.enum(["NONE", "TEMP", "LIGHT", "SOUND", "ROTARY"]),
        d2: z.enum(["NONE", "BUTTON", "ULTRASONIC", "DHT"]),
    }),
    i2c: z.object({
        bmi088: z.boolean(),
        mma7660: z.boolean(),
    }),
    mode: z.enum(["BASIC", "ADVANCED"]).default("BASIC"),
});

export type ConfigurationProfile = z.infer<typeof ConfigurationProfileSchema>;
