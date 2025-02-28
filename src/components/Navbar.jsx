import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css"; // ✅ Import navbar styles

const Navbar = () => {
    const location = useLocation(); // ✅ Get the current route

    // ✅ Hide Navbar on Login/Register pages
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                     
                <ul className="nav-links">
                    <li><Link to="/">Look Up Weather</Link></li>
                    <li><Link to="/pictures">Find Pictures</Link></li>
                    <li><Link to="/album">My Album</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
