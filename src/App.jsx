import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import Signin from './components/Signin';
import Layout from './components/Layout';
import Weather from './components/Weather';
import Pictures from './components/Pictures';
import { auth } from './firebase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        <Route
          path="/layout/*"
          element={isAuthenticated ? <Layout /> : <Signin />}
        >
          <Route path="weather" element={<Weather />} />
          <Route path="pictures" element={<Pictures />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;