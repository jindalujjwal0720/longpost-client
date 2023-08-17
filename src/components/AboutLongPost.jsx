import React from "react";
import styles from "../styles/AboutLongPost.module.css";
import logo from "../assets/L.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AboutLongPost = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <img src={logo} alt="About Long Post" className={styles.logo} />
      <div className={styles.text}>
        <h2 className={styles.title}>About Long Post</h2>
        <p className={styles.description}>
          Long Post is a social platform for sharing long-form content.
          <br />
          <br />
          Websites like Facebook, Instagram, LinkedIn, etc all focus on
          short-form content. Users are limited to a few sentences or a few
          paragraphs at most. Long Post is different. Long Post is a social
          platform for sharing long-form content. Users can share their
          thoughts, ideas, and opinions in long-form content. Long Post is a
          social platform for sharing long-form content.
          <br />
          <br />
          Anyone can create an account and start sharing their long-form content
          and anyone with the link can read it.
        </p>
      </div>
      {!user && (
        <div className={styles.buttons}>
          <Link to="/signup" className={styles.button}>
            Sign Up
          </Link>
          <Link to="/login" className={styles.button}>
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default AboutLongPost;
