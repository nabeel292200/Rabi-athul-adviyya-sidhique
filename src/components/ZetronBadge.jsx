import React from 'react';

export default function ZetronBadge() {
  return (
    <div className="zetron-badge-container scroll-animate">
      <a
        href="https://www.instagram.com/zetron.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="zetron-badge"
        title="Crafted with love by Zetron Tech — Follow on Instagram"
      >
        <div className="zetron-badge-left">
          {/* Instagram Icon */}
          <svg
            className="zetron-instagram-icon"
            viewBox="0 0 24 24"
            width="17"
            height="17"
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

          {/* Crafted by Text */}
          <span className="zetron-badge-text">
            Crafted by <strong className="zetron-brand-name">zetron.tech</strong>
          </span>
        </div>

        {/* Follow Pill Button */}
        <span className="zetron-follow-btn">
          FOLLOW
        </span>
      </a>
    </div>
  );
}
