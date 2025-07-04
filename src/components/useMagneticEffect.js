import { useEffect } from 'react';

const useMagneticEffect = (selector = '.flip-card', strength = 0.25) => {
  useEffect(() => {
    const cards = document.querySelectorAll(selector);

    cards.forEach(card => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = x - rect.width / 2;
        const dy = y - rect.height / 2;

        card.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      };

      const reset = () => {
        card.style.transform = `translate(0px, 0px)`;
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', reset);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, [selector, strength]);
};

export default useMagneticEffect;
