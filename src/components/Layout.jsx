import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import '../styles/Layout.css';

const Layout = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/");
      })
      .catch((error) => console.error("Error signing out: ", error));
  };

  return (
    <div className="layout">
      {/* Logo at the top center */}
      {/* Log Out Button in top-right corner */}
      <button className="logout-btn" onClick={handleSignOut}>Log Out</button>
      <img src="/logo.png" alt="Logo" className="logo1" />

      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/layout/weather">Look Up Weather</Link>
        <Link to="/layout/pictures">Find Pictures</Link>
        <Link to="/layout/album">My Album</Link>
      </nav>

 

      {/* Main content section changes with routing */}
      <div className="main-content">
        <Outlet />
      </div>
      <footer className="footer">
        <p>© 2025 Tempix. Created by Henadzi(Henry) Kirykovich and Oleksandra Skvortsova</p>
      </footer>
    </div>
  );
};

export default Layout;