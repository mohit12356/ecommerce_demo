import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const UpiPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const totalAmount = location.state?.totalAmount || 0;

  const upiId = "7397260670@ptaxis"; // Your UPI ID
  const name = "Mohit Kumar Kolli"; // Your name

  const qrValue = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${totalAmount}&cu=INR`;

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
        {/* <p className="text-sm text-gray-500 mt-2">UPI ID: {upiId}</p>  */}
      </div>

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
