import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

const CheckoutPage = ({ cartItems, user }) => {
  const items = Array.isArray(cartItems) ? cartItems : [];
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("checkoutFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          paymentMethod: "creditCard",
        };
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem("checkoutFormData", JSON.stringify(updatedData));
      return updatedData;
    });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Full Name is required.";
    if (!formData.address) errors.address = "Address is required.";
    if (!formData.city) errors.city = "City is required.";
    if (!formData.state) errors.state = "State is required.";
    if (!formData.postalCode) errors.postalCode = "Postal Code is required.";
    return errors;
  };
  if(!user){
    alert("please login to continue")
    navigate("/login",{
      state:{
        from:"/checkout"
      }
    });
    return;
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const checkoutData = {
      ...formData,
      totalAmount,
      items,
      user: user ? user.uid : "Guest",
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try {
      console.log("Saving order to Firestore:", checkoutData); // debug log
      await addDoc(collection(db, "orders"), checkoutData);
      alert("Order placed successfully!");

      localStorage.removeItem("checkoutFormData");

      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        paymentMethod: "creditCard",
      });

      switch (formData.paymentMethod) {
        case "creditCard":
        case "debitCard":
        case "netBanking":
        case "upi":
          navigate("/payment/upi",{state:{totalAmount}});
          break;
        default:
          alert("Invalid payment method. Please select a valid option.");
      }
    } catch (error) {
      console.error("Error while placing order:", error.code, error.message);
      alert("An error occurred while placing the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {items.length === 0 ? (
        <p>Your cart is empty. Add items to proceed to checkout.</p>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            {items.map((item, index) => (
              <div
                key={item.id || index}
                className="flex justify-between py-2 border-b"
              >
                <div className="flex gap-4">
                  <img
                    src={item.images}
                    alt={item.title}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p>
                      {item.title} x {item.quantity}
                    </p>
                    <p>Rs {item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
            <p className="font-bold mt-4">
              Total: Rs <span>{totalAmount}</span>
            </p>
          </div>

          <form onSubmit={handleCheckout} className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>

            <div className="mb-4">
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm">{formErrors.address}</p>
              )}
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.city && (
                  <p className="text-red-500 text-sm">{formErrors.city}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                {formErrors.state && (
                  <p className="text-red-500 text-sm">{formErrors.state}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              {formErrors.postalCode && (
                <p className="text-red-500 text-sm">{formErrors.postalCode}</p>
              )}
            </div>

            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
            <div className="mb-4">
              <label className="block mb-1">Select Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              >
                <option value="creditCard">Credit Card</option>
                <option value="debitCard">Debit Card</option>
                <option value="netBanking">Net Banking</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
