export async function downloadViaWebSerial() {
    const statusEl = document.getElementById('serialStatus');
    
    if (!('serial' in navigator)) {
        statusEl.innerHTML = "❌ Browser not supported. Use Chrome or Edge, or use the manual fallback below.";
        statusEl.classList.replace('text-glr-neon', 'text-red-500');
        return;
    }

    statusEl.innerHTML = "Waiting for port selection...";
    statusEl.classList.replace('text-red-500', 'text-glr-neon');

    let port;
    try {
        // Request port and open connection
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        statusEl.innerHTML = "Connected! Sending DUMP command...";

        // Send "DUMP\n" command
        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        const writer = textEncoder.writable.getWriter();
        await writer.write("DUMP\n");
        writer.close();

        // Setup reader
        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        const reader = textDecoder.readable.getReader();

        let csvData = "";
        let isCapturing = false;
        statusEl.innerHTML = "Receiving data from Black Box... Please wait.";

        // Read data stream
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break; // Stream closed
            }
            if (value) {
                if (value.includes("--- BEGIN BLACK BOX DATA DUMP ---")) {
                    isCapturing = true;
                }
                
                if (isCapturing) {
                    csvData += value;
                    if (csvData.includes("--- END OF DATA DUMP ---")) {
                        break; // End of transmission detected
                    }
                }
            }
        }

        // Close streams
        reader.cancel();
        await readableStreamClosed.catch(() => { /* Ignore abort errors */ });
        await port.close();

        // Clean the data payload
        let cleanCsv = "";
        try {
            let startIndex = csvData.indexOf("Time_UTC"); // The start of the actual CSV header
            let endIndex = csvData.indexOf("--- END OF DATA DUMP ---");
            cleanCsv = csvData.substring(startIndex, endIndex).trim();
        } catch (err) {
            throw new Error("Could not format CSV correctly.");
        }

        if (!cleanCsv) throw new Error("No data received.");

        // Create Downloadable File
        const blob = new Blob([cleanCsv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "glr_sensor_data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        statusEl.innerHTML = "✅ Download successful! You can now disconnect the battery.";

    } catch (error) {
        console.error("Web Serial Error:", error);
        statusEl.innerHTML = "❌ Error connecting or reading data. Try again or use the manual method.";
        statusEl.classList.replace('text-glr-neon', 'text-red-500');
        if (port && port.readable) {
            try { await port.close(); } catch(e){}
        }
    }
}
