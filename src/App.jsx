import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Signin from "./components/Signin";
import Layout from "./components/Layout";
import Weather from "./components/Weather";
import Pictures from "./components/Pictures";
import MyAlbum from "./components/MyAlbum"; // ✅ Import MyAlbum
import { auth } from "./firebase";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCity, setSelectedCity] = useState(""); // ✅ Store selected city

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user !== null);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />

        {/* Only show Layout and nested routes if authenticated */}
        <Route path="/layout/*" element={isAuthenticated ? <Layout /> : <Signin />}>
          <Route path="weather" element={<Weather setSelectedCity={setSelectedCity} />} />
          <Route path="pictures" element={<Pictures city={selectedCity} />} />
          <Route path="my-album" element={<MyAlbum />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
