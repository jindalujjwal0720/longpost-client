import React, { useEffect } from "react";
import styles from "../styles/Signup.module.css";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const [error, setError] = React.useState("");
  const { user, login, resetPassword } = useAuth();
  const [message, setMessage] = React.useState("");
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

    if (!validEmail(email)) return;
    if (!validPassword(password)) return;
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange(e);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (error && error.length > 0) return;
    login(email, password);
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!validEmail(email)) return;
    resetPassword(email);
    setMessage("Check your inbox for further instructions");
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
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
          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.forgotPassword} onClick={forgotPassword}>
            Forgot Password?
          </p>
          {message && <p className={styles.message}>{message}</p>}
          <button type="submit">Login</button>
          <p className={styles.toggleAccount}>
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
