import Weather from "./components/Weather";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";  // ✅ Import Navbar
import ButtonLogOut from "./components/ButtonLogOut";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import "./styles/App.css"; // ✅ Import classic CSS

const App = () => {
  return (
    <Router>

      <ButtonLogOut />
      <Navbar /> {/* ✅ Navbar appears on all pages except Login/Register */}
      
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Route for Weather Page */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Weather />} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
