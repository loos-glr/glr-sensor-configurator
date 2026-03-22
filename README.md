# GLR Sensor Configurator

A professional, web-based tool for configuring environmental sensors and generating production-ready Arduino C++ code for the GLR Digital Identity project.

## Features

- **Modular Hardware Setup**: Map physical connections (Analog A0/A2, Digital D2, I2C) to specific Grove sensors.
- **LoRaWAN Integration**: Input network keys (App EUI, Dev EUI, App Key) for automatic integration into the firmware.
- **Dynamic Code Generation**: Automatically compiles C++ code with required libraries and math formulas (e.g., Steinhart-Hart for temperature).
- **Black Box Data Retrieval**: Direct browser download of sensor data using the **Web Serial API** (Chrome/Edge/Opera).
- **Modern Build System**: Built with **Vite** and **Tailwind CSS v4** for high performance and maintainability.

## Project Structure

```text
├── dist/               # Optimized production builds
├── src/
│   ├── config.js       # Sensor mappings and display names
│   ├── generator.js    # Arduino C++ code generation logic
│   ├── main.js         # Application entry point
│   ├── serial.js       # Web Serial API communication
│   ├── storage.js      # LocalStorage persistence
│   ├── style.css       # Tailwind CSS v4 design system
│   └── ui.js           # DOM manipulation and tab logic
├── index.html          # Clean application entry point
└── package.json        # Project metadata and dependencies
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

Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production

Generate a minified and optimized production build:
```bash
npm run build
```
The output will be available in the `dist/` directory.

## Usage

1. **Configure Hardware**: Select the sensors connected to your Seeeduino ports.
2. **Network Keys**: Paste your LoRaWAN keys from The Things Network console.
3. **Compile**: Click "Compile Code" to generate the Arduino payload.
4. **Deploy**: Copy the generated code and upload it via the Arduino IDE.
5. **Analyze**: Use the "Extract Data" tab to download your records as a CSV via USB.

## Built With

- [Vite](https://vitejs.dev/) - Frontend Tooling
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) - Hardware communication

---
**Grafisch Lyceum Rotterdam** | Digital Design System v1.0
