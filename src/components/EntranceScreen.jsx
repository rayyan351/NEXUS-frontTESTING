import React, { useEffect, useState } from 'react';
import '../styles/EntranceScreen.css';

// If your logo is in /src/assets:
// import logo from '../assets/logo.svg';
// If it's in /public, just use "/logo.svg" below.
import logo from '../assets/logo-nexus 2.png'; // change this path if needed

const EntranceScreen = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 3000); // Delay before fade out
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`entrance-screen ${hide ? 'hide' : ''}`} aria-hidden={hide}>
      <img
        src={logo}
        alt="Nexus Infinity Tech"
        className="brand-logo"
        draggable="false"
      />
      <p className="init-text">Initializing your digital experience...</p>
      <div className="spinner" />
    </div>
  );
};

export default EntranceScreen;
