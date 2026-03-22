# GLR Sensor Configurator

A professional, web-based tool for configuring environmental sensors and generating production-ready Arduino C++ code for the **GLR Digital Identity** project. Designed to bridge the gap between physical prototyping and digital data-driven design.

## Features

- **Modular Hardware Mapping**: Map Seeeduino LoRaWAN ports (A0, A2, D2, I2C) to specific Grove sensors with automatic code-branching.
- **LoRaWAN Keys Persistence**: Save your App EUI, Dev EUI, and App Keys in `localStorage` for seamless multi-session configuration.
- **Production-Ready Code**: Generates optimized C++ code including required headers, math transforms (e.g. Steinhart-Hart), and power management logic.
- **Web Serial Extraction**: One-click browser-based CSV download directly from the Seeeduino board (requires Chrome/Edge/Opera).
- **Comprehensive Documentation**: Built-in visual hardware guides, board layouts, and troubleshooting FAQs for design students.
- **Modern Architecture**: Leverages **Vite** and **Tailwind CSS v4** for an instant-load, high-performance portal experience.

## Project Structure

```text
├── src/
│   ├── config.js       # Sensor metadata, descriptions, and placeholder mappings
│   ├── generator.js    # C++ firmware logic and string building
│   ├── main.js         # Entry point (initialization and menu logic)
│   ├── serial.js       # Web Serial API (DUMP command and CSV parsing)
│   ├── storage.js      # Save/Load logic for configuration persistence
│   ├── style.css       # Tailwind CSS v4 directives and GLR design tokens
│   └── ui.js           # Menu toggling and dynamic instructions
├── index.html          # Core Configurator & Extraction portal
├── hardware.html       # Visual guide to 9+ Grove sensors
├── board.html          # Physical Seeeduino PCB layout & port guide
├── faq.html            # Data Dictionary & troubleshooting FAQ
└── package.json        # Dependencies and build scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (distributed with Node.js)

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd glr-sensor-configurator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:
```bash
npm run dev
```

### Production

Build the optimized static bundle:
```bash
npm run build
```
The output will be available in the `dist/` directory, ready for deployment to Vercel, Netlify, or Github Pages.

## Usage Workflow

1. **Configurator**: Use the `index.html` to select your physical sensor setup and paste your LoRaWAN keys.
2. **Deploy**: Copy the generated code into the Arduino IDE and upload it to your board.
3. **Capture**: Deploy your "Black Box" into the environment to record data.
4. **Extract**: Use the "Extract Data" tab in the portal to download your `glr_sensor_data.csv`.
5. **Inspirate**: Drag the CSV into [Kepler.gl](https://kepler.gl/) for 3D mapping or use it in Adobe Illustrator/After Effects for data-driven graphics.

## Data Dictionary (Output CSV)

The generated CSV values are formatted for immediate use:
- **Analog Sensors**: Scaled from `0.0` to `100.0` (%) for easy mapping to opacity or scale.
- **Temperature**: Provided in Degrees **Celsius**.
- **Distance**: Provided in **Centimeters** (cm).
- **GPS**: Decimal degrees (Latitude/Longitude) and Coordinated Universal Time (UTC).

---
**Grafisch Lyceum Rotterdam** | Digital Design System v1.5
