import React from 'react';

export default function CalendarModal({ isOpen, onClose, venueData, eventData }) {
  if (!isOpen) return null;

  const cal = venueData.calendar;

  // Google Calendar URL
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    cal.title
  )}&dates=${cal.startTimeUtc}/${cal.endTimeUtc}&details=${encodeURIComponent(
    cal.description
  )}&location=${encodeURIComponent(cal.location)}`;

  // Generate and download .ics file for Apple Calendar, Outlook, and mobile devices
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Zetron Tech//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-rabiathul-sidhique-20261101@wedding.invitation`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${cal.startTimeUtc}`,
      `DTEND:${cal.endTimeUtc}`,
      `SUMMARY:${cal.title}`,
      `DESCRIPTION:${cal.description}`,
      `LOCATION:${cal.location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Rabiathul-Adviyya-Sidhique-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Add To Your Calendar</div>
        <div className="modal-desc">
          {eventData.day}, {eventData.date} {eventData.month} {eventData.year} at {eventData.time}
          <br />
          {venueData.name}
        </div>

        <div className="modal-options">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-btn modal-btn-primary"
            onClick={onClose}
          >
            <span>📅</span> Google Calendar
          </a>

          <button
            type="button"
            className="modal-btn modal-btn-secondary"
            onClick={handleDownloadIcs}
          >
            <span>🍏</span> Apple / Outlook (.ics)
          </button>
        </div>

        <button type="button" className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
