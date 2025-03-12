import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../../firebase";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const validateEmail = (email) => {
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidate.test(email);
  };

  const validatePassword = (password) => {
    const passwordValidate = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{9,})/;
    return passwordValidate.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must contain at least one capital letter, one special character, and be at least 9 characters long.";
    }

    if (isSignUp && !name) {
      newErrors.name = "Name is required for sign up";
    }

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        await signup(name, email, password);
        navigate("/shop");
      } else {
        // console.log("Attempting to log in with:", email, password);
        const res = await login(email, password);
        console.log("Login successful:", res);
        if (res) {
          navigate("/shop");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
