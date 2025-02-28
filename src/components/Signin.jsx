import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './../styles/Signin.css';

const Signin = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign Up and Sign In
    const navigate = useNavigate();  // Initialize useNavigate

    const handleAuth = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (isSignUp) {
            // Sign Up logic
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User signed up:", user);
                    
                    navigate('/layout/weather');  // Navigate to Weather page after successful sign up
                })
                .catch((error) => {
                    console.error("Error signing up: ", error.message);
                    alert(`Error signing up: ${error.message}`);
                });
        } else {
            // Sign In logic
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User signed in:", user);
                    
                    navigate('/layout/weather');  // Navigate to Weather page after successful sign in
                })
                .catch((error) => {
                    console.error("Error signing in: ", error.message);
                    alert(`Error signing in: ${error.message}`);
                });
        }
    };

    return (
        <div className="signin">
            <img src="../../logo.png" alt="Logo" className="logo" />
            <div className="form-container">
            
            <form onSubmit={handleAuth}>
                <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
                <input ref={emailRef} type="email" id="email" name="email" placeholder="Email" required />
                <input ref={passwordRef} type="password" id="password" name="password" placeholder="Password" required />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                <h4>
                    {isSignUp ? "Already have an account?" : "Not yet registered?"}
                    <span
                        onClick={() => setIsSignUp(!isSignUp)} 
                        className="signin_link">
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </span>
                </h4>
            </form>
            </div>
        </div>
    );
};

export default Signin;