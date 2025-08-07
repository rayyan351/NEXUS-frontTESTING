import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Growth from "./components/Growth";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EntranceScreen from "./components/EntranceScreen";

import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import AdminRoute from "./admin/AdminRoute";
import { AdminAuthProvider } from "./context/AdminAuthContext";

import { useEffect } from 'react';

// Intersection animation hook
export const useReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
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
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Website */}
          <Route path="/" element={
            <>
              <EntranceScreen />
              <Navbar />
              <Hero />
              <About />
              <Growth />
              <Contact />
              <Footer />
            </>
          } />

          {/* Admin Panel */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;
