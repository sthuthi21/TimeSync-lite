// LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase"; 
import "./LoginPage.css";
import googleLogo from "../images/googlelogo.jpg";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Signed in user:", user);
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Welcome to TimeSync</h2>
        <p className="subtitle">Sign in to manage your time efficiently</p>
        <button onClick={handleGoogleSignIn} className="google-btn">
          <img
            src={googleLogo}
            alt="Google logo"
            className="google-logo"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;


