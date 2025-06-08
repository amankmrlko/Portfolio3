import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Heading from "./Heading";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!userID.trim() || !password.trim()) {
      setError("Please enter both User ID and Password");
      setIsLoading(false);
      return;
    }

    try {
      const docRef = doc(db, "user", userID.trim());
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }

      const userData = docSnap.data();

      if (userData.password === password) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userID", userID.trim());

        navigate("/blogpost");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="login-container"
    >
      <Heading title="Admin Login" subtitle="" />
      <div className="login-window">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          <input
            type="text"
            name="userID"
            id="userID"
            placeholder="User Name"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button className="btn-login" type="submit" disabled={isLoading}>
            {isLoading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
