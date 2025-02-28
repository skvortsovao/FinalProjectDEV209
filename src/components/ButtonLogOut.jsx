import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // ✅ Import `auth` from `firebase.js`
import { signOut } from "firebase/auth";
import "../styles/ButtonLogOut.css";

const ButtonLogOut = () => {
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
        <nav className="logout">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default ButtonLogOut;
