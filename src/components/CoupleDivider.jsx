import React from 'react';

export default function CoupleDivider() {
  return (
    <div className="divider-container scroll-animate">
      <span className="divider-line"></span>
      <img
        src="/images/ampersand.png"
        alt="&"
        className="divider-ampersand"
        width="22"
        height="24"
      />
      <span className="divider-line"></span>
    </div>
  );
}
