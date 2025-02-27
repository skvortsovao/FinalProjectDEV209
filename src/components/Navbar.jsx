import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // ✅ Import `auth` from `firebase.js`
import { signOut } from "firebase/auth";
import "../styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // ✅ Redirect to login page after logout
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    console.log("Auth instance:", auth); // ✅ Debugging

    return (
        <nav className="navbar">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
