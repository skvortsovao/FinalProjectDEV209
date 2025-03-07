// Import required dependencies
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import '../styles/Layout.css'; // Import styling for layout component

const Layout = () => {
  const navigate = useNavigate(); // Hook for navigation

  /**
   * Handles user sign-out and redirects to the login page.
   */
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/"); // Redirect to the sign-in page after logout
      })
      .catch((error) => console.error("Error signing out: ", error));
  };

  return (
    <div className="layout">
      {/* Log Out button positioned at the top-right corner */}
      <button className="logout-btn" onClick={handleSignOut}>Log Out</button>

      {/* Application logo centered at the top */}
      <img src="/logo.png" alt="Logo" className="logo1" />

      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/layout/weather">Look Up Weather</Link>
        <Link to="/layout/pictures">Find Pictures</Link>
        <Link to="/layout/my-album">My Album</Link> {/* Ensure route matches App.jsx */}
      </nav>

      {/* Main content section where child components will be rendered */}
      <div className="main-content">
        <Outlet /> {/* Displays the currently active route */}
      </div>

      {/* Footer section with application credits */}
      <footer className="footer">
        <p>© 2025 Tempix. Created by Henadzi(Henry) Kirykovich and Oleksandra Skvortsova</p>
      </footer>
    </div>
  );
};

export default Layout;
