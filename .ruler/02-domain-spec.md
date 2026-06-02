# .ruler/02-domain-spec.md
## Bounded Context: Configuration Generation Spec

### 1. Context Boundary
This specification defines the exact behavior of the `Configuration Generation Context`. Its sole responsibility is to accept an unvalidated user input object, validate it against strict physical constraints, and output a production-ready C++ firmware string for the GLR Seeeduino LoRaWAN board.

### 2. Input Schema (The Configuration Profile)
The domain must expose a Zod schema `ConfigurationProfileSchema` that enforces the following structure:
- `appEui`: string (regex validated for LoRaWAN format, default to "INSERT_APP_EUI_HERE" if empty)
- `devEui`: string (regex validated)
- `appKey`: string (regex validated)
- `pins`: Object containing:
  - `a0`: Enum ["NONE", "TEMP", "LIGHT", "SOUND", "ROTARY"]
  - `a2`: Enum ["NONE", "TEMP", "LIGHT", "SOUND", "ROTARY"]
  - `d2`: Enum ["NONE", "BUTTON", "ULTRASONIC", "DHT"]
- `i2c`: Object containing:
  - `bmi088`: boolean
  - `mma7660`: boolean
- `mode`: Enum ["BASIC", "ADVANCED"] (Default: "BASIC")

### 3. Business Rules & C++ Payload Requirements
When the `ConfigurationProfile` is validated, the `Generator` engine must produce a C++ string satisfying these rules:

#### Rule 3.1: Include & Global Generation
- If `bmi088` is true, inject `#include "BMI088.h"` and initialization logic.
- If `d2` is "DHT", inject `#include "DHT.h"` and pin definitions.

#### Rule 3.2: Sensor Record Struct (Black Box Memory)
- The C++ struct `SensorRecord` must dynamically generate properties based ONLY on the selected pins.
- Example: If `a0` is "TEMP", inject `float a0_val;`. If `d2` is "DHT", inject `float d2_temp; float d2_hum;`.
- Array size constraint: `const int MAX_RECORDS = 300;`.

#### Rule 3.3: Mathematical Transformations
- If `a0` or `a2` is "TEMP", the engine must inject the Steinhart-Hart equation into the `loop()`.
- If `d2` is "ULTRASONIC", the engine must inject the microsecond pulse formula to calculate centimeters.

#### Rule 3.4: LoRa Payload Formatting
- The `snprintf` data payload string must dynamically match the sensor selection.
- Base format: `snprintf(dataPayload, sizeof(dataPayload), "%.5f,%.5f", lat, lng);`
- Appends: Must append the exact formatting specifiers (e.g., `%.1f` for floats, `%d` for integers) in the exact order of A0, A2, D2, I2C.

### 4. Testing Requirements (Vitest)
The AI agent must write the following tests BEFORE implementing the generator:
- `should_throw_zod_error_on_invalid_pin_mapping()`
- `should_generate_base_lora_payload_with_no_sensors()`
- `should_inject_steinhart_hart_equation_when_temp_selected()`
- `should_format_snprintf_correctly_for_complex_sensor_mix()`