import React from 'react';

export default function BlessingSection({ blessingData }) {
  return (
    <footer className="islamic-footer-block scroll-animate">
      {/* Prophetic Dua in Arabic Calligraphy */}
      <div className="dua-arabic-text" dir="rtl">
        {blessingData.duaArabic}
      </div>

      {/* English Translation */}
      <p className="dua-english-translation">
        {blessingData.duaEnglish.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < blessingData.duaEnglish.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>

      {/* Sunnah Gathering Welcome Note */}
      <p className="islamic-welcome-note">
        {blessingData.welcomeNote.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < blessingData.welcomeNote.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>

      {/* Family Signature */}
      <div className="islamic-signature-note">
        {blessingData.signature}
      </div>
    </footer>
  );
}
