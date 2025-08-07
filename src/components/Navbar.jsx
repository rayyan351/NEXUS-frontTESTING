import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

  const navItems = [
    { label: "AGENCY", target: "AGENCY" },
    { label: "PROFIT PATH", target: "profit-framework" },
    { label: "APPROACH", target: "approach" },
    { label: "CONTACT", target: "contact" },
  ];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleNavClick = (target) => {
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(target);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      navItems.forEach((item) => {
        const el = document.getElementById(item.target);
        if (!el) return;
        const top = el.offsetTop - 140; // navbar offset
        const bottom = top + el.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) current = item.target;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img
          src={require("../assets/logo-nexus 2.png")}
          alt="Nexus Infinity Tech Logo"
          className="navbar-logo"
        />

        <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop menu */}
        <div className="navbar-menu-wrapper desktop-only">
          <ul className="navbar-menu">
            {navItems.map((item, i) => (
              <li
                key={i}
                onClick={() => handleNavClick(item.target)}
                className={activeSection === item.target ? "active" : ""}
              >
                <div className="nav-item-wrapper">
                  <div className="nav-dot"></div>
                  <div className="text-stack">
                    <span className="text light">{item.label}</span>
                    <span className="text bold">{item.label}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
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
                    onClick={() => handleNavClick(item.target)}
                  >
                    {item.label}
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
