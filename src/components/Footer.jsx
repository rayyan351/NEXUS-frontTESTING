import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';
import { FaArrowUp, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
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
        {/* Logo Image */}
        <img
          src={require('../assets/logo-nexus 2.png')}
          alt="Nexus Infinity Tech"
          className="footer-logo-img"
        />

        <ul className="footer-links">
          <li><a href="#AGENCY">Agency</a></li>
          <li><a href="#profit-framework">Profit Path</a></li>
          <li><a href="#approach">Approach</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="footer-socials">
          <a href="a"><FaFacebookF /></a>
          <a href="a"><FaTwitter /></a>
          <a href="a"><FaInstagram /></a>
          <a href="a"><FaLinkedinIn /></a>
        </div>

        <p className="footer-copy">© 2025 Nexus Infinity Tech. All rights reserved.</p>
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
