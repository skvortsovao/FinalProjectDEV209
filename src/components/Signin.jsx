// Import necessary dependencies
import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import './../styles/Signin.css';

const Signin = () => {
    // References for email and password input fields
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // State to toggle between Sign Up and Sign In mode
    const [isSignUp, setIsSignUp] = useState(false);

    // Hook for navigation after authentication
    const navigate = useNavigate();

    /**
     * Handles user authentication (Sign Up or Sign In).
     * @param {Event} e - Form submission event.
     */
    const handleAuth = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (isSignUp) {
            // Sign Up logic: Creates a new user and stores their data in Firestore
            try {
                console.log("Attempting to sign up user...");
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                console.log("Firebase Auth Success! UID:", user.uid);

                // Save user information in Firestore
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        email: user.email,
                        createdAt: new Date().toISOString()
                    });

                    console.log("Firestore Save Successful! User ID:", user.uid);
                } catch (firestoreError) {
                    console.error("Firestore Save Failed:", firestoreError.message);
                }

                // Redirect to the weather page after successful sign-up
                navigate('/layout/weather');
            } catch (error) {
                console.error("Firebase Auth Sign-Up Failed:", error.message);
                alert(`Error signing up: ${error.message}`);
            }
        } else {
            // Sign In logic: Authenticates an existing user
            try {
                console.log("Attempting to sign in user...");
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                console.log("User signed in successfully:", user);

                // Redirect to the weather page after successful login
                navigate('/layout/weather');
            } catch (error) {
                console.error("Firebase Auth Sign-In Failed:", error.message);
                alert(`Error signing in: ${error.message}`);
            }
        }
    };

    return (
        <div className="signin">
            {/* Application logo */}
            <img src="../../logo.png" alt="Logo" className="logo" />

            {/* Authentication form */}
            <div className="form-container">
                <form onSubmit={handleAuth}>
                    <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
                    <input ref={emailRef} type="email" placeholder="Email" required />
                    <input ref={passwordRef} type="password" placeholder="Password" required />
                    <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                    
                    {/* Toggle between Sign In and Sign Up */}
                    <h4>
                        {isSignUp ? "Already have an account?" : "Not yet registered?"}
                        <span onClick={() => setIsSignUp(!isSignUp)} className="signin_link">
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </span>
                    </h4>
                </form>
            </div>
        </div>
    );
};

export default Signin;
