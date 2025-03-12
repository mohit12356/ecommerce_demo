// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import QrScanner from "react-qr-scanner";

// const UpiPayment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const totalAmount = location.state?.totalAmount || 0;
//   const [qrResult, setQrResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleScan = (data) => {
//     if (data) {
//       setQrResult(data.text || data);
//       alert(`QR Code Scanned: ${data.text || data}`);
//       // navigate("/payment-success", { state: { totalAmount } });
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     setError("Error scanning QR code. Please try again.");
//   };

//   const previewStyle = {
//     height: 240,
//     width: 320,
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">UPI Payment</h2>
//       <p className="text-lg mb-4">
//         Scan the QR code to pay Rs.{" "}
//         <span className="font-bold">{totalAmount}</span>
//       </p>

//       <div className="mb-4">
//         <QrScanner
//           delay={300}
//           style={previewStyle}
//           onError={handleError}
//           onScan={handleScan}
//         />
//       </div>

//       {qrResult && (
//         <p className="text-green-500 text-sm">Scanned QR Code: {qrResult}</p>
//       )}
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <button
//         onClick={() => navigate("/checkout")}
//         className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
//       >
//         Back to Checkout
//       </button>
//     </div>
//   );
// };

// export default UpiPayment;
