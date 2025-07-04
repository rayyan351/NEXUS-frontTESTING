import React, { useState } from "react";
import "../styles/Navbar.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["AGENCY", "APPROACH", "WORK", "THOUGHTS", "LAB"];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">NEXUS INFINITY TECH</h1>

        <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className="navbar-menu-wrapper desktop-only">
          <ul className="navbar-menu">
            {navItems.map((item, i) => (
              <li key={i}>
                <div className="nav-item-wrapper">
                  <div className="nav-dot"></div>
                  <div className="text-stack">
                    <span className="text light">{item}</span>
                    <span className="text bold">{item}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-glass"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ul>
              {navItems.map((item, i) => (
                <li key={i}>
                  <motion.span
                    whileHover={{ scale: 1.1, color: "#00aeef" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item}
                    <motion.div className="underline" layoutId="underline" />
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
