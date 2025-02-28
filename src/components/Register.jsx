import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/Form.css"; // ✅ Use shared CSS
import defaultBackground from "../assets/default.jpg";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/"); // ✅ Redirect after successful registration
        } catch (err) {
            setError("Failed to create an account");
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${defaultBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
                                                                       
        }}>

        <div className="form-wrapper">
            <div className="form-container">
                <h2>Register</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="form-box">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />

                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
     </div>
    );
};

export default Register;
