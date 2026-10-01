import React from 'react';

export default function GroomSection({ groomData }) {
  return (
    <section className="person-section groom-section scroll-animate">
      <div className="badge-ornament-wrap">
        <span className="badge-flourish left">✧</span>
        <h2 className="label-heading label-groom">{groomData.badge}</h2>
        <span className="badge-flourish right">✧</span>
      </div>

      <div className="name-wrapper">
        <div className="name-script" data-name={groomData.name}>
          {groomData.name}
        </div>
      </div>

      {/* Elegant Golden Flourish Accent */}
      <div className="name-flourish-accent" aria-hidden="true">
        <svg viewBox="0 0 160 14" className="flourish-svg" fill="none">
          <path
            d="M8 7 C 35 7, 50 2, 70 7 C 75 8.2, 78 8.2, 80 7 C 82 8.2, 85 8.2, 90 7 C 110 2, 125 7, 152 7"
            stroke="url(#groomGoldGrad)"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <circle cx="80" cy="7" r="2.2" fill="url(#groomGoldGrad)" />
          <circle cx="72" cy="7" r="1.2" fill="url(#groomGoldGrad)" />
          <circle cx="88" cy="7" r="1.2" fill="url(#groomGoldGrad)" />
          <defs>
            <linearGradient id="groomGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b16c15" stopOpacity="0.05" />
              <stop offset="25%" stopColor="#d4af37" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f5e19f" stopOpacity="1" />
              <stop offset="75%" stopColor="#d4af37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#b16c15" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="label-parent">{groomData.relation}</div>
      <div className="parent-names">{groomData.parents}</div>
    </section>
  );
}

