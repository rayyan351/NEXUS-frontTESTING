import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Growth from "./components/Growth";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EntranceScreen from "./components/EntranceScreen";

import { useEffect } from 'react';

export const useReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // for 1-time animation
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);
};


function App() {
  return (
    <>
      <EntranceScreen/>
      <Navbar />
      <Hero />
      <About/>
      <Growth/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default App;
