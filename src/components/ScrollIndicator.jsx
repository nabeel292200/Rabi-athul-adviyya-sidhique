import React, { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [isFaded, setIsFaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsFaded(true);
      } else {
        setIsFaded(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="scroll-prompt"
      className={`scroll-prompt-container ${isFaded ? 'fade-out' : ''}`}
      aria-hidden="true"
    >
      <span className="scroll-text">Scroll Down</span>
      <div className="scroll-arrow">↓</div>
    </div>
  );
}
