import React, { useEffect, useRef } from 'react';

const FALLBACK_SHAPES = ['✦', '★', '✧', '♦', '✿'];
const MAX_ACTIVE_ITEMS = 10;

export default function FallingParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let activeCounter = 0;
    let isComponentMounted = true;
    let timeoutId = null;

    const craftFallingParticle = () => {
      if (!isComponentMounted || activeCounter >= MAX_ACTIVE_ITEMS) return;

      const span = document.createElement('span');
      span.className = 'particle-item';
      span.innerText = FALLBACK_SHAPES[Math.floor(Math.random() * FALLBACK_SHAPES.length)];

      const size = Math.floor(Math.random() * 12) + 10;
      const xPos = Math.random() * (window.innerWidth - 20);
      const opacity = Math.random() * 0.4 + 0.3;
      const flightDuration = Math.random() * 7 + 15; // 15 to 22 seconds

      span.style.fontSize = `${size}px`;
      span.style.left = `${xPos}px`;
      span.style.opacity = `${opacity}`;

      container.appendChild(span);
      activeCounter++;

      const animation = span.animate(
        [
          { transform: 'translateY(0px) rotate(0deg)' },
          { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 240}deg)` }
        ],
        {
          duration: flightDuration * 1000,
          easing: 'linear'
        }
      );

      animation.onfinish = () => {
        if (span.parentNode) {
          span.remove();
        }
        activeCounter--;
      };
    };

    const loop = () => {
      if (!isComponentMounted) return;
      craftFallingParticle();
      const delay = Math.random() * 800 + 400;
      timeoutId = setTimeout(loop, delay);
    };

    loop();

    return () => {
      isComponentMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="falling-container" aria-hidden="true" />;
}
