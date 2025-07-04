import React, { useRef } from 'react';
import '../styles/About.css';
import { useReveal } from '../hooks/useReveal';
import Globe from './Globe';

const About = () => {
  const aboutRef = useRef(null);
  useReveal();

  return (
    <section className="about-section" ref={aboutRef}>
      <div className="about-bg-blobs">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      <div className="about-content">
        <div className="about-left reveal">
          <h2>
            Beyond Break-Even:<br />
            <span>How Nexus Builds Your Path to Profit</span>
          </h2>
          <p>
            Our tested and validated system has helped many clients generate over $100 thousand in revenue.
            Whether you're launching your vision or scaling an established brand, we engineer marketing that delivers.
          </p>
          <ul className="about-points">
            <li><strong>– Strategic Planning:</strong> Your success is our priority.</li>
            <li><strong>– Expert Execution:</strong> Our team drives your growth.</li>
            <li><strong>– Optimized Funnels:</strong> From traffic to conversion.</li>
            <li><strong>– Data-Driven Scaling:</strong> Campaigns that perform, predictably.</li>
          </ul>
        </div>

        <div className="about-right reveal">
            <Globe />
          </div>
        </div>
    </section>
  );
};

export default About;
