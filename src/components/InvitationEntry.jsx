import React from 'react';

export default function InvitationEntry({ onEnter, isFadingOut, entryData }) {
  return (
    <div
      className={`splash-wrapper ${isFadingOut ? 'fade-out' : ''}`}
      onClick={onEnter}
      role="button"
      tabIndex={0}
      aria-label="Click to Enter Invitation"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onEnter();
        }
      }}
    >
      <div className="splash-content">
        {/* Wax Seal Container with Dynamic Breathing Pulse */}
        <div className="seal-frame animated-element">
          <img
            src={entryData.sealImage}
            alt={entryData.sealAlt}
            className="seal-image"
          />
        </div>

        {/* Cinematic Invitation Entry Call-to-Action */}
        <div className="splash-text animated-element">
          {entryData.enterPrompt}
        </div>
        <div className="splash-subtext">
          {entryData.coupleSubtitle || "Rabiathul & Sidhique"}
        </div>
      </div>
    </div>
  );
}
