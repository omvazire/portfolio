import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Disc3, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './MusicCard.css';

const TRACK_TITLE = "LV Sandals";
const TRACK_ARTIST = "EsDeeKid";
const SPOTIFY_URL = "https://open.spotify.com/search/EsDeeKid%20LV%20Sandals";

const MusicCard = () => {
  const { isRapMode } = useTheme();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Initialize and automatically start local audio playback when entering Alter Ego mode
  useEffect(() => {
    if (!isRapMode) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
      return;
    }

    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.85;
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => setIsPlaying(false);
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    // Load user's downloaded track
    const tryPlaySource = (src, fallbackSrc) => {
      audio.src = src;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          if (fallbackSrc) {
            audio.src = fallbackSrc;
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((e) => {
                console.warn('Playback deferred until interaction:', e);
              });
          }
        });
    };

    tryPlaySource('/audio/lv-sandals.mp3', '/lv-sandals.mp3');

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isRapMode]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Play error:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const handleSeek = (e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    audioRef.current.currentTime = clampedPos * duration;
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec) || timeInSec <= 0) return '0:00';
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isRapMode) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        className={`alter-ego-music-card ${isMinimized ? 'is-minimized' : ''}`}
        initial={{ opacity: 0, y: 50, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.92 }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      >
        {isMinimized ? (
          /* Minimized pill view */
          <div
            className="minimized-content interactive"
            onClick={() => setIsMinimized(false)}
            title="Expand Alter Ego Soundtrack Player"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsMinimized(false)}
          >
            <div className={`equalizer-indicator ${!isPlaying ? 'is-paused' : ''}`}>
              <span className="equalizer-bar" />
              <span className="equalizer-bar" />
              <span className="equalizer-bar" />
              <span className="equalizer-bar" />
              <span className="equalizer-bar" />
            </div>
            <div className="minimized-text">
              {TRACK_TITLE} <span className="minimized-artist">• {TRACK_ARTIST}</span>
            </div>
            <button
              className="music-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
              }}
              aria-label="Expand soundtrack player"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        ) : (
          /* Full expanded card */
          <>
            {/* Header */}
            <div className="music-card-header">
              <div className="music-card-brand">
                <span className="spotify-brand-icon">
                  <Disc3 size={17} className={isPlaying ? "spin-record" : ""} />
                </span>
                <span className="music-tag">Alter Ego Soundtrack</span>
              </div>

              <div className="music-card-actions">
                <div className={`equalizer-indicator ${!isPlaying ? 'is-paused' : ''}`} title={isPlaying ? "Playing" : "Paused"}>
                  <span className="equalizer-bar" />
                  <span className="equalizer-bar" />
                  <span className="equalizer-bar" />
                  <span className="equalizer-bar" />
                  <span className="equalizer-bar" />
                </div>

                <button
                  className="music-action-btn interactive"
                  onClick={() => setIsMinimized(true)}
                  aria-label="Minimize soundtrack card"
                  title="Minimize"
                >
                  <ChevronDown size={17} />
                </button>
              </div>
            </div>

            {/* Track Info Strip */}
            <div className="music-track-info">
              <div className="track-names">
                <span className="track-title">{TRACK_TITLE}</span>
                <span className="track-artist">{TRACK_ARTIST}</span>
              </div>
              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-listen-pill interactive"
                title="Search on Spotify"
              >
                <span>Spotify</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Scrubber Progress Bar */}
            <div
              className="player-progress-wrap interactive"
              ref={progressBarRef}
              onClick={handleSeek}
              title="Click to seek"
            >
              <div
                className="player-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="player-time-row">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Native Playback Controls */}
            <div className="local-player-controls">
              <button
                className="music-ctrl-btn interactive"
                onClick={restartTrack}
                title="Restart track"
                aria-label="Restart track"
              >
                <RotateCcw size={15} />
              </button>

              <button
                className="music-main-play-btn interactive"
                onClick={togglePlayback}
                title={isPlaying ? "Pause" : "Play"}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
              </button>

              <button
                className="music-ctrl-btn interactive"
                onClick={toggleMute}
                title={isMuted ? "Unmute" : "Mute"}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicCard;
