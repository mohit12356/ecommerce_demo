import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QRCodeCanvas } from "qrcode.react"; 

const UpiPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const totalAmount = location.state?.totalAmount || 0;
  const [qrResult, setQrResult] = useState(null);
  const [error, setError] = useState(null);

  // 🔁 Replace this with your real UPI ID
  const upiId = "7397260670@ptaxis"; // <-- YOUR UPI ID
  const name = "Mohit Kumar Kolli"; // Your name

  const qrValue = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${totalAmount}&cu=INR`;

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        setQrResult(decodedText);
        alert(`QR Code Scanned: ${decodedText}`);
        scanner.clear();
      },
      (errMsg) => {
        console.warn("QR Scan Error:", errMsg);
        setError("Error scanning QR code. Please try again.");
      }
    );

    return () => {
      scanner
        .clear()
        .catch((err) => console.error("Failed to clear scanner", err));
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">UPI Payment</h2>
      <p className="text-lg mb-4">
        Scan this QR code to pay{" "}
        <span className="font-bold">Rs. {totalAmount}</span>
      </p>

      {/* UPI QR Code */}
      <div className="mb-6">
        <QRCodeCanvas value={qrValue} size={200} />
        <p className="text-sm text-gray-500 mt-2">UPI ID: {upiId}</p>
      </div>

      {/* QR Scanner (optional) */}
      {/* <h3 className="text-xl font-semibold mb-2">Scan a QR Code</h3> */}
      <div id="qr-reader" className="mb-4" style={{ width: "320px" }}></div>

      {qrResult && (
        <p className="text-green-600 text-sm">Scanned QR Code: {qrResult}</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={() => navigate("/checkout")}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back to Checkout
      </button>
    </div>
  );
};

export default UpiPayment;
