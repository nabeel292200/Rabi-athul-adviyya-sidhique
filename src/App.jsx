import React, { useState, useEffect, useRef } from 'react';
import { weddingData } from './data/weddingData';
import InvitationEntry from './components/InvitationEntry';
import InvitationHero from './components/InvitationHero';
import BrideSection from './components/BrideSection';
import CoupleDivider from './components/CoupleDivider';
import GroomSection from './components/GroomSection';
import EventSection from './components/EventSection';
import Countdown from './components/Countdown';
import BlessingSection from './components/BlessingSection';
import MusicControl from './components/MusicControl';
import ScrollIndicator from './components/ScrollIndicator';
import FallingParticles from './components/FallingParticles';
import CalendarModal from './components/CalendarModal';
import ZetronBadge from './components/ZetronBadge';
import './styles/wedding.css';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const musicRef = useRef(null);

  // Handle entry into the invitation
  const handleEnterInvitation = () => {
    if (isFadingOut || hasEntered) return;

    // Start background music on user gesture
    if (musicRef.current) {
      musicRef.current.play();
    }

    setIsFadingOut(true);

    // Smooth transition from entry screen
    setTimeout(() => {
      setHasEntered(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1100);
  };

  // Scroll reveal observer
  useEffect(() => {
    if (!hasEntered) return;

    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.scroll-animate');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, [hasEntered]);

  return (
    <>
      {/* Floating Gentle Star & Diamond Particles */}
      <FallingParticles />

      {/* Floating Music Control Engine */}
      <MusicControl ref={musicRef} audioData={weddingData.audio} />

      {/* Landing Entry Screen */}
      {!hasEntered && (
        <InvitationEntry
          onEnter={handleEnterInvitation}
          isFadingOut={isFadingOut}
          entryData={weddingData.entry}
        />
      )}

      {/* Main Wedding Invitation */}
      <main className="page-container">
        <div className="content-box">
          {/* Top AA Monogram & Religious Bismillah */}
          <InvitationHero heroData={weddingData.hero} />

          {/* Bride Section */}
          <BrideSection brideData={weddingData.bride} />

          {/* Glowing Ampersand & Shimmering Lines */}
          <CoupleDivider />

          {/* Groom Section */}
          <GroomSection groomData={weddingData.groom} />

          {/* Event & Venue Timeline Card */}
          <EventSection
            eventData={weddingData.event}
            venueData={weddingData.venue}
            onOpenCalendar={() => setIsCalendarOpen(true)}
          />

          {/* Real Dynamic Countdown */}
          <Countdown
            countdownData={weddingData.countdown}
            targetIsoDate={weddingData.event.targetIsoDate}
          />

          {/* Islamic Blessing & Family Signature */}
          <BlessingSection blessingData={weddingData.blessing} />

          {/* Zetron Tech Footer Brand Pill Badge */}
          <ZetronBadge />
        </div>
      </main>

      {/* Scroll Down Prompt (fades out on scroll) */}
      {hasEntered && <ScrollIndicator />}

      {/* Calendar Options Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        venueData={weddingData.venue}
        eventData={weddingData.event}
      />
    </>
  );
}
