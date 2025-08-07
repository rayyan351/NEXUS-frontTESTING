import React, { useRef, useEffect } from 'react';

const ContactCanvasBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let t = 0;

   const draw = () => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0d1a2d';
  ctx.fillRect(0, 0, width, height);

  // Triple-layer glow
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const y =
        height / 1.8 +
        Math.sin(x * 0.008 + t + i * 3) * (12 + i * 3) +
        Math.sin(x * 0.015 + t * 1.5 + i) * (8 + i * 2);

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    const alpha = 0.08 + i * 0.06;
    ctx.fillStyle =
      i === 0
        ? `rgba(0,191,255,${alpha})`
        : i === 1
        ? `rgba(78,0,255,${alpha})`
        : `rgba(255,255,255,${alpha * 0.5})`;

    ctx.fill();
  }

  t += 0.03;
  requestAnimationFrame(draw);
};

    draw();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
     style={{
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  maxHeight: '100vh', // prevent excess overflow
  opacity: 0.2,
  pointerEvents: 'none',
}}

    />
  );
};

export default ContactCanvasBackground;
