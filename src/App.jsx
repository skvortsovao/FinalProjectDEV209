// Import required dependencies
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Import components
import Signin from "./components/Signin";
import Layout from "./components/Layout";
import Weather from "./components/Weather";
import Pictures from "./components/Pictures";
import MyAlbum from "./components/MyAlbum";

function App() {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State to store the current user's UID
  const [userId, setUserId] = useState(null);
  
  // State to store the selected city for weather and picture components
  const [selectedCity, setSelectedCity] = useState("");

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set authentication status (true if user exists)
      setUserId(user ? user.uid : null); // Store user ID or null if not authenticated
      console.log("User authenticated, UID:", user?.uid);
    });

    return unsubscribe; // Cleanup listener when component unmounts
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route for sign-in page */}
        <Route path="/" element={<Signin />} />

        {/* Protected routes that require authentication */}
        <Route path="/layout/*" element={isAuthenticated ? <Layout /> : <Signin />}>
          <Route path="weather" element={<Weather setSelectedCity={setSelectedCity} />} />
          <Route path="pictures" element={<Pictures city={selectedCity} />} />
          <Route path="my-album" element={<MyAlbum userId={userId} />} /> {/* Pass userId to MyAlbum */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
