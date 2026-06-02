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
- **Language**: Strict TypeScript (ESNext). No `any` types allowed.
- **Validation**: `zod` for all domain inputs.
- **Testing**: `vitest`.
- **UI Framework**: Vue 3 (Composition API using `<script setup lang="ts">`) + Vite + Tailwind v4. 
- **Hardware Payloads**: Do not guess C++ payloads; reference the strict hardware formatting rules.

## Architectural Mandate: Clean Architecture
This repository is strictly divided into two layers:
1. **Domain Layer (`/src/domain`)**: Pure TypeScript/Zod. Contains the Configuration Profile schemas and Payload Generation. ZERO Vue or DOM references allowed.
2. **Infrastructure Layer (`/src/ui`)**: Vue 3 Components. It collects user input via `v-model`, passes it to the Domain layer, and displays the result. The UI layer contains NO business logic or C++ string generation.