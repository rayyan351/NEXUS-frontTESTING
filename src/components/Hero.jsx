import React, { useEffect, useRef } from "react";
import "../styles/Hero.css";
import { Player } from '@lottiefiles/react-lottie-player';
import heroAnimation from '../assets/hero-lottie.json';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".hero-heading",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      ".hero-tagline",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      ".hero-services-text",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      ".chat-btn",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.6"
    );
  }, []);

  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="AGENCY">
      <div className="hero-lights">
        {[...Array(7)].map((_, i) => (
          <span className="light-column" style={{ left: `${i * 14.2}%` }} key={i}></span>
        ))}
      </div>

      <div className="hero-content">
   <h1 className="hero-heading">
  <span className="gradient-text">Growth Driven</span><br />
  <span className="gradient-text">Marketing</span><br />
  <span className="gradient-text">For Ingenious Brands</span>
</h1>



        <p className="hero-tagline">
          We design profitable marketing campaigns for businesses ready to level up.
        </p>
        <p className="hero-services-text">
          Paid Ads • Funnels • Websites • Email Marketing • Content Distribution
        </p>

        <button className="chat-btn" onClick={scrollToContact}>
          <span className="chat-slide">
            <span className="chat-arrow">→</span>
            <span className="chat-text">LET’S CHAT</span>
            <span className="chat-dot">•</span>
          </span>
        </button>
        
      </div>

      <div className="hero-lottie-wrapper">
        <Player autoplay loop src={heroAnimation} className="hero-lottie" />
      </div>
    </section>
  );
};

export default Hero;
