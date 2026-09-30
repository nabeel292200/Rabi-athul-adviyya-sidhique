import React from 'react';

export default function ZetronBadge() {
  return (
    <div className="zetron-badge-container">
      <a
        href="https://www.instagram.com/zetron.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="zetron-credit-link"
        title="Crafted by Zetron Tech — Follow on Instagram"
      >
        <svg
          className="zetron-instagram-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        <span className="zetron-credit-text">CRAFTED BY ZETRON.TECH</span>
      </a>
    </div>
  );
}
