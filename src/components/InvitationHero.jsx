import React from 'react';

export default function InvitationHero({ heroData }) {
  return (
    <>
      {/* Centered Monogram with 45-degree Pendulum Swing */}
      <div className="monogram-container">
        <img
          src={heroData.monogramSvg}
          alt={heroData.monogramAlt}
          width="54"
          height="40"
          className="swinging-logo"
        />
      </div>

      {/* Islamic Bismillah in Arabic calligraphy */}
      <div className="arabic-text scroll-animate">
        {heroData.bismillah}
      </div>

      {/* Invitation Preamble */}
      <p className="invitation-text scroll-animate">
        {heroData.preambleLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < heroData.preambleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>

      {/* Shimmering Vertical Line */}
      <div className="vertical-divider scroll-animate"></div>
    </>
  );
}
