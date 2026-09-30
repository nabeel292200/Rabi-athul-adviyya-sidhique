import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const MusicControl = forwardRef(function MusicControl({ audioData }, ref) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Expose playAudio and pauseAudio methods to parent
  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Playback prevented by browser policy:', err);
            setIsPlaying(false);
          });
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
    toggle: () => {
      toggleMusic();
    },
    isPlaying: () => isPlaying,
  }));

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback blocked:', err);
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      // Loop seamlessly
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="audio-player-container">
      {/* Background Wedding Audio Track */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        id="bg-music"
      >
        <source src={audioData.sourceMp3} type="audio/mpeg" />
        {audioData.sourceWav && <source src={audioData.sourceWav} type="audio/wav" />}
      </audio>

      {/* Floating Music Button with Gentle Pulse Ring */}
      <button
        id="music-btn"
        className={`music-toggle-btn ${!isPlaying ? 'pulse' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleMusic();
        }}
        aria-label={isPlaying ? 'Pause background wedding music' : 'Play background wedding music'}
        title={isPlaying ? 'Pause music' : 'Play wedding music'}
      >
        <span id="music-icon" role="img" aria-label="music status">
          {isPlaying ? '⏸️' : '🎵'}
        </span>
      </button>
    </div>
  );
});

export default MusicControl;
