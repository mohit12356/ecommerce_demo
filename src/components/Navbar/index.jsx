import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, auth } from "../../../firebase";
import { toast } from "react-toastify";
import cart from "../../assets/trolley.png";

const Navbar = ({ cartItems, }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const handleLogout = () => {
    if (auth.currentUser) {
      logout(navigate);
    } else {
      toast.info("You are already logged out");
    }
  };

  return (
    <div className="flex justify-between p-3 m-1 bg-blue-200">
      <div>Shopping</div>
      <div className="flex gap-8">
        <Link
          to="/"
          className={`px-4 py-2 rounded ${
            isActive("/") ? "bg-blue-500 text-white" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className={`px-4 py-2 rounded ${
            isActive("/shop") ? "bg-blue-500 text-white" : ""
          }`}
        >
          Shop
        </Link>
        <Link
          to="/clothes"
          className={`px-4 py-2 rounded ${
            isActive("/clothes") ? "bg-blue-500 text-white" : ""
          }`}
        >
          Clothes
        </Link>
        <Link
          to="/shoes"
          className={`px-4 py-2 rounded ${
            isActive("/shoes") ? "bg-blue-500 text-white" : ""
          }`}
        >
          Shoes
        </Link>
        <Link
          to="/electronics"
          className={`px-4 py-2 rounded ${
            isActive("/electronics") ? "bg-blue-500 text-white" : ""
          }`}
        >
          Electronics
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <Link
          to="/login"
          className={`px-4 py-2 rounded ${
            isActive("/login") ? "bg-blue-500 text-white" : ""
          }`}
        >
          Login
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-500 text-white"
        >
          Logout
        </button>
        <Link to="/cart" className="relative">
          <img src={cart} alt="Cart" className="w-10 h-10" />
          {cartItems.length > 0 && (
            <p className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
