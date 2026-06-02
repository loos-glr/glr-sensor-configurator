import { ConfigurationProfile } from './index';

export function generateFirmware(config: ConfigurationProfile): string {
    let includes = [];
    let globals = [];
    let setupBlocks = [];
    let loopBlocks = [];
    
    let formatArgs: string[] = [];
    let formatSpecifiers: string[] = [];
    let varDeclarations: string[] = [];

    // Core LoRaWAN Includes & Setup
    includes.push('#include <LoRaWan.h>');
    
    setupBlocks.push(`    lora.init();`);
    setupBlocks.push(`    lora.setId(NULL, "${config.devEui}", "${config.appEui}");`);
    setupBlocks.push(`    lora.setKey(NULL, NULL, "${config.appKey}");`);
    setupBlocks.push(`    lora.setDeciveMode(LWOTAA);`);
    setupBlocks.push(`    lora.setDataRate(DR0, EU868);`);
    setupBlocks.push(`    lora.setChannel(0, 868.1);`);
    setupBlocks.push(`    lora.setChannel(1, 868.3);`);
    setupBlocks.push(`    lora.setChannel(2, 868.5);`);
    setupBlocks.push(`    lora.setReceiceWindowFirst(0);`);
    setupBlocks.push(`    lora.setReceiceWindowSecond(869.5, DR3);`);

    // I2C Sensors
    if (config.i2c.bmi088) {
        includes.push('#include <BMI088.h>');
        globals.push('BMI088 bmi088;');
        setupBlocks.push('    bmi088.begin();');
    }
    if (config.i2c.mma7660) {
        includes.push('#include <MMA7660.h>');
        globals.push('MMA7660 mma7660;');
        setupBlocks.push('    mma7660.init();');
    }

    // Process Pins
    const pinsToProcess = [
        { id: 'a0', pinVal: 0, conf: config.pins.a0, type: 'analog' },
        { id: 'a2', pinVal: 2, conf: config.pins.a2, type: 'analog' },
        { id: 'd2', pinVal: 2, conf: config.pins.d2, type: 'digital' }
    ];

    for (const p of pinsToProcess) {
        if (p.conf === 'NONE') continue;

        if (p.conf === 'DHT') {
            includes.push('#include <DHT.h>');
            globals.push(`#define DHTPIN ${p.pinVal}`);
            globals.push('#define DHTTYPE DHT11');
            globals.push('DHT dht(DHTPIN, DHTTYPE);');
            setupBlocks.push('    dht.begin();');
            
            varDeclarations.push(`    int val_${p.id}_t = dht.readTemperature();`);
            varDeclarations.push(`    int val_${p.id}_h = dht.readHumidity();`);
            
            formatSpecifiers.push('%d,%d');
            formatArgs.push(`val_${p.id}_t`);
            formatArgs.push(`val_${p.id}_h`);
        } else if (p.conf === 'ULTRASONIC') {
            setupBlocks.push(`    pinMode(${p.pinVal}, OUTPUT);`);
            varDeclarations.push(`    pinMode(${p.pinVal}, OUTPUT);`);
            varDeclarations.push(`    digitalWrite(${p.pinVal}, LOW);`);
            varDeclarations.push(`    delayMicroseconds(2);`);
            varDeclarations.push(`    digitalWrite(${p.pinVal}, HIGH);`);
            varDeclarations.push(`    delayMicroseconds(5);`);
            varDeclarations.push(`    digitalWrite(${p.pinVal}, LOW);`);
            varDeclarations.push(`    pinMode(${p.pinVal}, INPUT);`);
            varDeclarations.push(`    long val_${p.id} = pulseIn(${p.pinVal}, HIGH) / 58;`);
            
            formatSpecifiers.push('%ld');
            formatArgs.push(`val_${p.id}`);
        } else if (p.conf === 'TEMP') {
            includes.push('#include <math.h>');
            varDeclarations.push(`    int raw_${p.id} = analogRead(${p.pinVal});`);
            varDeclarations.push(`    float r = 10000.0 * (1023.0 / raw_${p.id} - 1.0);`);
            varDeclarations.push(`    int val_${p.id} = 1.0 / (log(r / 10000.0) / 3975.0 + 1.0 / 298.15) - 273.15;`);
            
            formatSpecifiers.push('%d');
            formatArgs.push(`val_${p.id}`);
        } else {
            // Default analog/digital read (LIGHT, SOUND, BUTTON, ROTARY)
            const readFunc = p.type === 'analog' ? 'analogRead' : 'digitalRead';
            if (p.type === 'digital') {
                setupBlocks.push(`    pinMode(${p.pinVal}, INPUT);`);
            }
            varDeclarations.push(`    int val_${p.id} = ${readFunc}(${p.pinVal});`);
            
            formatSpecifiers.push('%d');
            formatArgs.push(`val_${p.id}`);
        }
    }
    
    if (formatSpecifiers.length > 0) {
        loopBlocks.push(...varDeclarations);
        loopBlocks.push(`    char buffer[64];`);
        loopBlocks.push(`    snprintf(buffer, sizeof(buffer), "${formatSpecifiers.join(',')}", ${formatArgs.join(', ')});`);
        loopBlocks.push(`    lora.transferPacket(buffer, 10);`);
    } else {
        loopBlocks.push(`    lora.transferPacket("ping", 10);`);
    }

    loopBlocks.push(`    delay(5000);`);

    return `
${includes.join('\n')}

${globals.join('\n')}

void setup() {
    SerialUSB.begin(115200);
${setupBlocks.join('\n')}
}

void loop() {
${loopBlocks.join('\n')}
}
`.trim();
}
