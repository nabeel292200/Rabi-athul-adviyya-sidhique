import React, { useState, useEffect } from 'react';

export default function Countdown({ countdownData, targetIsoDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00',
    hasArrived: false,
  });

  useEffect(() => {
    const targetTimestamp = new Date(targetIsoDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          mins: '00',
          secs: '00',
          hasArrived: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0'),
        hasArrived: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetIsoDate]);

  return (
    <div className="countdown-container scroll-animate">
      <h4 className="countdown-title">{countdownData.title}</h4>

      {timeLeft.hasArrived ? (
        <div className="countdown-arrived">
          {countdownData.arrivedMessage}
        </div>
      ) : (
        <div className="countdown-display" aria-label="Countdown to wedding reception">
          <div className="countdown-segment">
            <span className="countdown-number" id="cd-days">{timeLeft.days}</span>
            <span className="countdown-label">Days</span>
          </div>

          <span className="countdown-colon" aria-hidden="true">:</span>

          <div className="countdown-segment">
            <span className="countdown-number" id="cd-hours">{timeLeft.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>

          <span className="countdown-colon" aria-hidden="true">:</span>

          <div className="countdown-segment">
            <span className="countdown-number" id="cd-mins">{timeLeft.mins}</span>
            <span className="countdown-label">Mins</span>
          </div>

          <span className="countdown-colon" aria-hidden="true">:</span>

          <div className="countdown-segment">
            <span className="countdown-number" id="cd-secs">{timeLeft.secs}</span>
            <span className="countdown-label">Secs</span>
          </div>
        </div>
      )}
    </div>
  );
}
