import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';
import { FaArrowUp, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="footer-pattern" />

      <div className="footer-content">
        <h2 className="footer-logo">Nexus Tech Infinity</h2>

        <ul className="footer-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="footer-socials">
          <a href="a"><FaFacebookF /></a>
          <a href="a"><FaTwitter /></a>
          <a href="a"><FaInstagram /></a>
          <a href="a"><FaLinkedinIn /></a>
        </div>

        <p className="footer-copy">© 2025 Nexus Tech Infinity. All rights reserved.</p>
      </div>

      {showButton && (
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
