import React from 'react';

export default function EventSection({ eventData, venueData, onOpenCalendar }) {
  return (
    <>
      {/* Decorative Star Shape Asset */}
      <img
        src="/images/shape1.png"
        alt="Decoration"
        className="decor-shape scroll-animate"
        width="80"
        height="80"
      />

      {/* The Wedding Celebrations Header */}
      <div className="scroll-animate">
        <h2 className="celebrations-title">{eventData.sectionTitle}</h2>
        <div className="diamond-divider">
          <span className="diamond-icon">{eventData.diamondIcon}</span>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="timeline-wrapper">
        {/* Center Dashed Line */}
        <div className="timeline-line"></div>

        {/* Event Card: The Wedding Reception */}
        <div className="event-card scroll-animate">
          <h3 className="event-card-title">{eventData.cardTitle}</h3>

          {/* Date Section Grid */}
          <div className="date-section">
            {/* Left Wing */}
            <div className="date-left-side">
              <span className="date-line"></span>
              <div className="date-side-text">{eventData.day}</div>
              <span className="date-line"></span>
            </div>

            {/* Center Stack */}
            <div className="date-center-stack">
              <div className="date-number">{eventData.date}</div>
              <div className="date-month">{eventData.month}</div>
              <div className="date-year">&#9670; {eventData.year} &#9670;</div>
            </div>

            {/* Right Wing */}
            <div className="date-right-side">
              <span className="date-line"></span>
              <div className="date-side-text">{eventData.time}</div>
              <span className="date-line"></span>
            </div>
          </div>

          {/* Venue Icon & Details */}
          <img
            src={eventData.venueIcon}
            alt=""
            className="venue-icon"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          <h3 className="venue-title">{venueData.name}</h3>

          <p className="venue-address">
            {venueData.addressLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < venueData.addressLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>

          {/* Interactive Action Buttons */}
          <div className="card-button-row">
            <a
              href={venueData.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card"
              title="Get directions to Kairali Auditorium"
            >
              GET DIRECTIONS
            </a>

            <button
              type="button"
              className="btn-card"
              onClick={onOpenCalendar}
              title="Add event to your calendar"
            >
              ADD TO CALENDAR
            </button>
          </div>

          {/* WhatsApp RSVP / Wishes Link */}
          {venueData.whatsappUrl && (
            <div style={{ marginTop: '10px' }}>
              <a
                href={venueData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-card"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderColor: 'rgba(94, 118, 103, 0.4)',
                }}
                title="Send blessings or wishes via WhatsApp"
              >
                <span>💬</span> SEND WISHES ON WHATSAPP
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
