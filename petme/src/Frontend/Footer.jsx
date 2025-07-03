import React from "react";
import "./Footer.css";
import logo from "../photos/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="PetME Logo" className="footer-logo" />

        <div className="footer-center">
          <p>© 2025 PetME. All rights reserved.</p>
          <div className="signature">Created by Anastasios Anastasiadis</div>
        </div>

        <div className="social-links">
          <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
        {/*  */}
      </div>
    </footer>
  );
};

export default Footer;
