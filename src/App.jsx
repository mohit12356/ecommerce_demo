import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductsApi from "./components/ProductsApi";
import Login from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOut";
// import UpiPayment from "./components/UpiPayment";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [user, setUser] = useState(null); // Track user authentication status
  const [cartItems, setCartItems] = useState([]); // Track cart items
  const navigate = useNavigate();

  const addtoCart = async (product, quantity) => {
    // Update the local cart state
    setCartItems((prevItems) => [...prevItems, { ...product, quantity }]);
  };
  const onDeleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("User logged in", currentUser.email);
      } else {
        console.log("User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" position="top-right" />
      <Navbar setActiveCategory={setActiveCategory} cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<ProductsApi category="shop" />} />
        <Route path="/clothes" element={<ProductsApi category="clothes" />} />
        <Route path="/shoes" element={<ProductsApi category="shoes" />} />
        <Route
          path="/electronics"
          element={<ProductsApi category="electronics" />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail addtoCart={addtoCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage cartItems={cartItems} onDeleteItem={onDeleteItem} />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cartItems={cartItems} user={user} />}
        />
        {/* <Route path="payment/upi" element={< UpiPayment />} /> */}
      </Routes>
    </>
  );
};

export default App;
