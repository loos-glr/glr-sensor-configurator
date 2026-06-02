# .ruler/01-constitution.md
## Ubiquitous Language
Any PR or commit that deviates from these exact terms will be rejected:
- Board: The physical IoT microcontroller unit (Seeeduino LoRaWAN).
- Sensor: A physical peripheral component (e.g., BMI088, DHT).
- Pin Mapping: The strict association between a Sensor's data channels and a Board's pins.
- Configuration Profile: The validated, abstract representation of the user's selected Board, Sensors, and Pin Mappings.
- Payload: The final compiled C++ code string.
- Schema: The Zod validation ruleset.

## Technology Stack & Agent Skills
- Language: Strict TypeScript (ESNext). No `any` types allowed.
- Validation: `zod`. All domain inputs must be parsed through a Zod schema before processing.
- Testing: `vitest`. Tests must execute in < 200ms.
- UI Framework: Vite + Tailwind v4 + Vanilla TS (DOM manipulation must remain isolated).
- Hardware Payloads: Do not guess C++ payloads; reference the strict hardware formatting rules.

## Architectural Mandate: Clean Architecture
This repository is strictly divided into two layers:
1. Domain Layer (`/src/domain`): Pure TypeScript/Zod. Contains the Configuration Profile schemas and the Payload Generation engine. ZERO DOM references allowed.
2. Infrastructure Layer (`/src/ui`): Vite/DOM integration. It collects user input, passes it to the Domain layer, and displays the result.