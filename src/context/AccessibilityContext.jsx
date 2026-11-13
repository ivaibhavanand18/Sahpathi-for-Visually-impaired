import React, { createContext, useContext, useState, useEffect } from 'react';
import { playAudioCue } from '../utils/soundEffects';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('sahpathi_theme') || 'standard');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('sahpathi_fontsize') || 'normal');
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('sahpathi_fontfamily') || 'sans');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('Welcome to Sahpathi. Digital scribe platform for visually impaired students.');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);

  // Sync theme with HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sahpathi_theme', theme);
  }, [theme]);

  // Sync font size with HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    localStorage.setItem('sahpathi_fontsize', fontSize);
  }, [fontSize]);

  // Sync font family with HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-font-family', fontFamily);
    if (fontFamily === 'dyslexic') {
      document.body.classList.add('font-dyslexic');
    } else {
      document.body.classList.remove('font-dyslexic');
    }
    localStorage.setItem('sahpathi_fontfamily', fontFamily);
  }, [fontFamily]);

  // Sync wireframe mode
  useEffect(() => {
    document.documentElement.setAttribute('data-wireframe', wireframeMode ? 'true' : 'false');
  }, [wireframeMode]);

  // Sync reduce motion
  useEffect(() => {
    document.documentElement.setAttribute('data-reduce-motion', reduceMotion ? 'true' : 'false');
  }, [reduceMotion]);

  // Screen reader / Speech Synthesis
  const speakText = (text, priority = false) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN'; // Indian English cadence if available, fallback to en-US

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      if (soundEnabled) {
        playAudioCue('click');
      }

      window.speechSynthesis.speak(utterance);
      setLiveAnnouncement(text);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const announceLive = (message) => {
    setLiveAnnouncement(message);
    if (soundEnabled) {
      playAudioCue('click');
    }
  };

  const triggerSound = (type = 'click') => {
    if (soundEnabled) {
      playAudioCue(type);
    }
  };

  const toggleHighContrast = () => {
    triggerSound('click');
    if (theme === 'hc-yellow') {
      setTheme('standard');
      speakText('Standard contrast mode activated');
    } else {
      setTheme('hc-yellow');
      speakText('High contrast yellow on black activated');
    }
  };

  const cycleFontSize = () => {
    triggerSound('click');
    const order = ['normal', 'large', 'xlarge', 'xxlarge'];
    const nextIdx = (order.indexOf(fontSize) + 1) % order.length;
    const nextSize = order[nextIdx];
    setFontSize(nextSize);
    speakText(`Text size set to ${nextSize}`);
  };

  const toggleWireframe = () => {
    triggerSound('click');
    const next = !wireframeMode;
    setWireframeMode(next);
    speakText(next ? 'Wireframe blueprint view enabled' : 'Full accessible UI view restored');
  };

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        setTheme,
        toggleHighContrast,
        fontSize,
        setFontSize,
        cycleFontSize,
        fontFamily,
        setFontFamily,
        reduceMotion,
        setReduceMotion,
        soundEnabled,
        setSoundEnabled,
        wireframeMode,
        toggleWireframe,
        isVoiceListening,
        setIsVoiceListening,
        liveAnnouncement,
        announceLive,
        speakText,
        stopSpeaking,
        isSpeaking,
        speechRate,
        setSpeechRate,
        triggerSound,
      }}
    >
      {/* Invisible Screen Reader Live Region for WCAG Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

