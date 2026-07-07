import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../api";

const ScanQr = () => {

    // const [scanner , setScanner ] = useState(null)
    const [scanned , setScanned ] = useState(false)
    const [message , setMessage ] = useState('')
    const [msgColr , setMsgColr ] = useState('')

    useEffect(() => {
    const scannerInstance = new Html5QrcodeScanner(
        "reader",
        {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250,
            },
        },
        false
    );

    const onScanSuccess = async (decodedText) => {
        try {
            const qrData = JSON.parse(decodedText);

            const response = await api.post("/checklog/scan", {
                visitorId: qrData.visitorId,
            });

            setScanned(true);
            setMessage(response.data.message);
            setMsgColr("green");

            await scannerInstance.clear();
        } catch (error) {
            console.error(error);
            setMessage("Invalid QR Code");
            setMsgColr("red");
        }
    };

    const onScanFailure = () => {};

    scannerInstance.render(onScanSuccess, onScanFailure);

    return () => {
        scannerInstance.clear().catch(() => {});
    };
}, []);

    return (

        <div
            style={{
                width: "400px",
                margin: "40px auto",
                textAlign: "center"
            }}
        >
            <h2>Scan Visitor QR</h2>
            <div id="reader">
                {
                    scanned && (
                        <button onClick={() => window.location.reload()}>
                            Scan Again
                        </button>
                    )
                }
                {message && (
                    <div
                    style={{
                        marginTop: "20px",
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: msgColr === "green" ? "#d4edda" : "#f8d7da",
                        color: msgColr === "green" ? "#155724" : "#721c24",
                        border: `1px solid ${
                            msgColr === "green" ? "#28a745" : "#dc3545"
                        }`
                    }}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );

};

export default ScanQr;