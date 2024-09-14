import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../pages/Navbar"; // Adjusted path
import { useAuth } from '../context/AuthContext';

import "./LoginPage.css";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  const { handleLogin, setIsLoggedIn } = useAuth(); // Use Auth context

  // Function to send OTP
  const sendOtp = async () => {
    setError("");

    if (phoneNumber.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    try {
      const response = await axios.post(
        "https://faceapi-two.vercel.app/api/sendOtp",
        { mobile: phoneNumber }
      );
      setOrderId(response.data.orderId);
      setShowOtpInput(true); // Show OTP input after sending OTP
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    setError("");

    try {
      const response = await axios.post(
        "https://faceapi-two.vercel.app/api/verifyOtp",
        { phoneNumber, orderId, otp }
      );

      if (response.data.success) {
        const userId = response.data.user._id; // Extract the user ID

        // Save user ID in localStorage
        localStorage.setItem("userId", userId);
        console.log(userId);
        console.log(localStorage.getItem('userId'));
        // Optionally, you can store the entire user object as a string
        // localStorage.setItem("user", JSON.stringify(response.data.user));

        handleLogin(response.data.user._id); // Use context to handle login
        setIsLoggedIn(true);
        
        navigate("/main"); // Navigate to the main page
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }}></div>
      <div
        className="login-container"
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "40px",
          textAlign: "center",
          borderRadius: "10px",
          backgroundColor: '#f7f9ff',
          border: "2px solid black", // Add this line to set the border color to black
        }}
      >
        <h2 style={{ margin: "0 0 30px 0", color: "#000" }}>Hi, Welcome Back</h2>
        <h4 style={{ margin: "0 0 30px 0", color: "#000" }}>Enter your credentials to continue</h4>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s",
            }}
          />
          <button
            onClick={sendOtp}
            style={{
              padding: "12px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "orange",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e68a00")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "orange")}
          >
            Send OTP
          </button>
        </div>
{showOtpInput &&
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s",
              }}
            />
            <button
              onClick={verifyOtp}
              style={{
                padding: "12px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "black",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "black")}
            >
              Verify OTP
            </button>
          </div>
        
            }
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </>
  );
};

export default LoginPage;
