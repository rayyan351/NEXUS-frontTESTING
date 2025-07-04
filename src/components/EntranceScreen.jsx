import React, { useEffect, useState } from 'react';
import '../styles/EntranceScreen.css';

const EntranceScreen = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 3000); // Delay before fade out
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`entrance-screen ${hide ? 'hide' : ''}`}>
      <h1 className="brand-name">NEXUS INFINITY TECH</h1>
      <p className="init-text">Initializing your digital experience...</p>
      <div className="spinner"></div>
    </div>
  );
};

export default EntranceScreen;
