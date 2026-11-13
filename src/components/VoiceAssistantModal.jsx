import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Command, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';

export function VoiceAssistantModal({ isOpen, onClose }) {
  const { speakText, stopSpeaking, toggleHighContrast, cycleFontSize, triggerSound, announceLive } = useAccessibility();
  const { navigateTo, userRole, setUserRole, setIsEmergencyOpen } = useApp();

  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  // Setup Web Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setListening(true);
        triggerSound('voice-listen');
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        processVoiceCommand(currentTranscript);
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition notice:', e.error);
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      setRecognitionInstance(recognition);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionInstance) {
      speakText('Voice recognition is active in simulated mode. You can click any shortcut command below.');
      return;
    }

    if (listening) {
      recognitionInstance.stop();
      setListening(false);
    } else {
      try {
        recognitionInstance.start();
        setListening(true);
        announceLive('Listening for voice commands. Say Go to Find Scribe, or High Contrast.');
      } catch (err) {
        console.warn('Could not start recognition:', err);
      }
    }
  };

  const processVoiceCommand = (cmdText) => {
    const text = cmdText.toLowerCase();

    if (text.includes('home') || text.includes('go to home')) {
      executeAction('Navigating to Home', () => navigateTo('home'));
    } else if (text.includes('find scribe') || text.includes('book scribe') || text.includes('exam details')) {
      executeAction('Opening Find a Scribe Form', () => navigateTo('find-scribe'));
    } else if (text.includes('available scribes') || text.includes('view scribes')) {
      executeAction('Opening Available Scribes', () => navigateTo('available-scribes'));
    } else if (text.includes('volunteer') || text.includes('become volunteer')) {
      executeAction('Opening Volunteer Registration', () => navigateTo('volunteer-register'));
    } else if (text.includes('dashboard') || text.includes('my dashboard')) {
      executeAction('Opening Dashboard', () => navigateTo('dashboard'));
    } else if (text.includes('guidelines') || text.includes('rules')) {
      executeAction('Opening Scribe Guidelines', () => navigateTo('guidelines'));
    } else if (text.includes('eligibility') || text.includes('check eligibility')) {
      executeAction('Opening Scribe Eligibility Checker', () => navigateTo('eligibility-checker'));
    } else if (text.includes('documents') || text.includes('forms')) {
      executeAction('Opening Document Assistance', () => navigateTo('document-assistance'));
    } else if (text.includes('contrast') || text.includes('high contrast')) {
      executeAction('Toggled High Contrast Mode', () => toggleHighContrast());
    } else if (text.includes('emergency') || text.includes('sos')) {
      executeAction('Opening Emergency Scribe Assistance', () => setIsEmergencyOpen(true));
    } else if (text.includes('student view')) {
      executeAction('Switching to Student Role', () => setUserRole('student'));
    } else if (text.includes('volunteer view')) {
      executeAction('Switching to Volunteer Role', () => setUserRole('volunteer'));
    }
  };

  const executeAction = (label, actionFn) => {
    setLastAction(label);
    triggerSound('success');
    speakText(label);
    actionFn();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-assistant-title"
      className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-ivory text-navy border-4 border-teal rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ivory-border pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-teal text-ivory rounded-xl">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 id="voice-assistant-title" className="text-xl font-bold text-navy flex items-center gap-2">
                Sahpathi Voice Assistant
                <span className="text-xs bg-amber text-navy px-2 py-0.5 rounded-full font-bold">Hands-Free</span>
              </h2>
              <p className="text-sm text-gray-700">Navigate and book scribes using voice commands.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 text-navy focus:ring-2 focus:ring-amber"
            aria-label="Close voice assistant modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Listening Button & Animation */}
        <div className="text-center py-6 bg-ivory-light rounded-xl border border-ivory-border my-3">
          <button
            onClick={toggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white transition-all transform shadow-lg ${
              listening
                ? 'bg-red-600 scale-110 ring-8 ring-red-300 animate-pulse'
                : 'bg-teal hover:bg-teal-dark active:scale-95'
            }`}
            aria-label={listening ? 'Stop listening' : 'Start voice recognition'}
          >
            {listening ? <MicOff className="w-9 h-9" /> : <Mic className="w-9 h-9" />}
          </button>

          <p className="mt-4 font-semibold text-navy text-lg">
            {listening ? 'Listening... Speak your command now' : 'Click the microphone to speak'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            (Works in supported browsers or click the sample commands below)
          </p>

          {transcript && (
            <div className="mt-4 mx-4 p-3 bg-white rounded-lg border border-teal text-left">
              <span className="text-xs font-bold text-teal block uppercase tracking-wider">Heard:</span>
              <p className="text-sm italic font-medium text-navy">"{transcript}"</p>
            </div>
          )}

          {lastAction && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>{lastAction}</span>
            </div>
          )}
        </div>

        {/* Available Voice Commands Shortcuts */}
        <div>
          <h3 className="text-sm font-bold text-navy mb-2 flex items-center gap-1.5">
            <Command className="w-4 h-4 text-teal" />
            Quick Voice Command Shortcuts (Click to execute):
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => executeAction('Opening Find a Scribe Form', () => { navigateTo('find-scribe'); onClose(); })}
              className="text-left p-2.5 bg-white border border-ivory-border hover:border-teal rounded-lg font-medium text-navy transition-colors hover:bg-teal-soft"
            >
              🗣️ "Find a Scribe"
            </button>
            <button
              onClick={() => executeAction('Opening Available Scribes', () => { navigateTo('available-scribes'); onClose(); })}
              className="text-left p-2.5 bg-white border border-ivory-border hover:border-teal rounded-lg font-medium text-navy transition-colors hover:bg-teal-soft"
            >
              🗣️ "Show Available Scribes"
            </button>
            <button
              onClick={() => executeAction('Opening My Dashboard', () => { navigateTo('dashboard'); onClose(); })}
              className="text-left p-2.5 bg-white border border-ivory-border hover:border-teal rounded-lg font-medium text-navy transition-colors hover:bg-teal-soft"
            >
              🗣️ "Open My Dashboard"
            </button>
            <button
              onClick={() => executeAction('Opening Volunteer Registration', () => { navigateTo('volunteer-register'); onClose(); })}
              className="text-left p-2.5 bg-white border border-ivory-border hover:border-teal rounded-lg font-medium text-navy transition-colors hover:bg-teal-soft"
            >
              🗣️ "Become a Volunteer"
            </button>
            <button
              onClick={() => executeAction('Toggled High Contrast', () => toggleHighContrast())}
              className="text-left p-2.5 bg-white border border-ivory-border hover:border-teal rounded-lg font-medium text-navy transition-colors hover:bg-teal-soft"
            >
              🗣️ "High Contrast Mode"
            </button>
            <button
              onClick={() => executeAction('Opening Emergency Scribe Assistance', () => { setIsEmergencyOpen(true); onClose(); })}
              className="text-left p-2.5 bg-red-50 border border-red-200 hover:border-red-500 rounded-lg font-bold text-red-900 transition-colors"
            >
              🚨 "Emergency Scribe Assistance"
            </button>
          </div>
        </div>

        {/* Footer controls */}
        <div className="mt-5 pt-3 border-t border-ivory-border flex justify-between items-center text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-teal" /> Audio feedback enabled
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-navy text-ivory rounded-lg font-medium hover:bg-navy-light"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

