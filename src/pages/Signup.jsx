import React, { useEffect } from "react";
import styles from "../styles/Signup.module.css";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const [error, setError] = React.useState("");
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = (email) => {
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    } else {
      setError("");
    }
    return true;
  };

  const validPassword = (password) => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    } else {
      setError("");
    }
    return true;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!validEmail(email)) return;
    if (!validPassword(password)) return;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange(e);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (error && error.length > 0) return;
    signup(email, password);
  };

  return (
    <div className={styles.container}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            type="password"
            id="confirmPassword"
            onChange={handleChange}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Sign Up</button>
          <p className={styles.toggleAccount}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
