// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Prediction  from "./pages/Prediction";
import Report from "./pages/Report";
import "./App.css"; // Import the CSS file
import Navbar from "./pages/Navbar";
import Technology from "./pages/Technology"

import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
     <AuthProvider>
      <div className="app-container">
        {" "}
        {/* Add a class for the app container */}
        <Router>
          <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/predict" element={<Prediction/>} />
            <Route path="/tech" element={<Technology/>} />
           <Route path = "/contact" element = {<Contact/>} />
           <Route path = "/report" element = {<Report/>} />
            {/* Define other routes here */}
          </Routes>
        </Router>
        
      </div>
      </AuthProvider>
    </>
  );
};

export default App;
