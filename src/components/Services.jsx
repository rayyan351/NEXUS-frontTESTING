import React, { useEffect, useRef } from 'react';
import '../styles/Services.css';

const services = [
  {
    title: 'Lead Generation',
    description: 'Get quality leads that convert.',
  },
  {
    title: 'Facebook Ads',
    description: 'Run high-converting ad campaigns.',
  },
  {
    title: 'Web Development',
    description: 'Build sleek, responsive websites.',
  },
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.album-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${0.2 + index * 0.2}s`;
    });
  }, []);

  return (
    <section className="stacked-gallery-section" id="services" ref={sectionRef}>
      <h2 className="stacked-gallery-title">Our Services</h2>
      <div className="album-stack">
        {services.map((service, index) => (
          <div className="album-card" key={index}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
