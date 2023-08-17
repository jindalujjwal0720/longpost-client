import React from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      copyright © <Link to="/">LongPost</Link> - 2023
    </footer>
  );
};

export default Footer;
