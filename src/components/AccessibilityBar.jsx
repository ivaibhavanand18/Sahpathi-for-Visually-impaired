import React, { useState } from 'react';
import { Volume2, VolumeX, Eye, Type, Mic, Palette, Layout, Info } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export function AccessibilityBar({ onOpenVoiceAssistant }) {
  const {
    theme,
    setTheme,
    toggleHighContrast,
    fontSize,
    cycleFontSize,
    speakText,
    stopSpeaking,
    isSpeaking,
    wireframeMode,
    toggleWireframe,
  } = useAccessibility();

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const handleReadCurrentPage = () => {
    const mainEl = document.querySelector('main');
    if (mainEl) {
      const heading = mainEl.querySelector('h1, h2')?.textContent || 'Sahpathi Accessible Examination Scribe Platform';
      const firstPara = mainEl.querySelector('p')?.textContent || '';
      speakText(`${heading}. ${firstPara}`);
    } else {
      speakText('Sahpathi. Connecting visually impaired students with eligible volunteer scribes.');
    }
  };

  return (
    <>
      {/* Skip to Main Content Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-amber focus:text-navy focus:font-extrabold focus:px-4 focus:py-2 focus:rounded-md focus:shadow-2xl focus:ring-4 focus:ring-navy"
      >
        Skip to main content
      </a>

      {/* Top Universal Accessibility Quick-Bar */}
      <header
        aria-label="Universal Accessibility Toolbar"
        className="bg-navy-dark text-ivory border-b border-navy-light text-xs px-3 sm:px-6 py-2 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Tagline & Accessibility Indicator */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-amber tracking-wide flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ACCESSIBILITY TOOLBAR
            </span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span className="hidden md:inline text-gray-300 italic">
              Your Examination. Your Independence. Our Support.
            </span>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {/* Screen Reader Read Aloud */}
            {isSpeaking ? (
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition-colors"
                aria-label="Stop reading aloud"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop Audio</span>
              </button>
            ) : (
              <button
                onClick={handleReadCurrentPage}
                className="flex items-center gap-1 px-2.5 py-1 bg-teal hover:bg-teal-light text-white rounded-md font-semibold transition-colors"
                aria-label="Read current page aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Read Aloud</span>
              </button>
            )}

            {/* Voice Assistant Mic */}
            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center gap-1 px-2.5 py-1 bg-navy-surface hover:bg-navy-light text-amber border border-amber/40 rounded-md font-semibold transition-colors"
              aria-label="Open Voice Assistant for hands-free navigation"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Voice Commands</span>
            </button>

            {/* High Contrast Toggle */}
            <button
              onClick={toggleHighContrast}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition-colors ${
                theme === 'hc-yellow'
                  ? 'bg-yellow-400 text-black ring-2 ring-white'
                  : 'bg-navy-surface hover:bg-navy-light text-ivory border border-gray-600'
              }`}
              aria-pressed={theme === 'hc-yellow'}
              aria-label="Toggle High Contrast mode (WCAG AAA)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{theme === 'hc-yellow' ? 'High Contrast ON' : 'High Contrast'}</span>
            </button>

            {/* Text Size Cycle */}
            <button
              onClick={cycleFontSize}
              className="flex items-center gap-1 px-2.5 py-1 bg-navy-surface hover:bg-navy-light text-ivory border border-gray-600 rounded-md font-semibold transition-colors"
              aria-label={`Change text size. Current size is ${fontSize}`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Text: <strong className="text-amber uppercase">{fontSize}</strong></span>
            </button>

            {/* Themes Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center gap-1 px-2 py-1 bg-navy-surface hover:bg-navy-light text-ivory border border-gray-600 rounded-md font-semibold"
                aria-haspopup="true"
                aria-expanded={isThemeMenuOpen}
                aria-label="Select color vision theme"
              >
                <Palette className="w-3.5 h-3.5 text-amber" />
                <span className="hidden sm:inline">Theme</span>
              </button>

              {isThemeMenuOpen && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-navy border-2 border-amber rounded-lg shadow-xl py-1 z-50 text-xs"
                  role="menu"
                >
                  <button
                    onClick={() => { setTheme('standard'); setIsThemeMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-navy-light flex items-center justify-between ${theme === 'standard' ? 'text-amber font-bold' : 'text-ivory'}`}
                    role="menuitem"
                  >
                    <span>Sahpathi Ivory & Navy</span>
                    <span className="w-3 h-3 rounded-full bg-[#F7F4EA] border border-navy inline-block" />
                  </button>
                  <button
                    onClick={() => { setTheme('hc-yellow'); setIsThemeMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-navy-light flex items-center justify-between ${theme === 'hc-yellow' ? 'text-amber font-bold' : 'text-ivory'}`}
                    role="menuitem"
                  >
                    <span>High Contrast (Yellow)</span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block" />
                  </button>
                  <button
                    onClick={() => { setTheme('hc-cyan'); setIsThemeMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-navy-light flex items-center justify-between ${theme === 'hc-cyan' ? 'text-amber font-bold' : 'text-ivory'}`}
                    role="menuitem"
                  >
                    <span>High Contrast (Cyan)</span>
                    <span className="w-3 h-3 rounded-full bg-cyan-400 border border-black inline-block" />
                  </button>
                  <button
                    onClick={() => { setTheme('dark'); setIsThemeMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-navy-light flex items-center justify-between ${theme === 'dark' ? 'text-amber font-bold' : 'text-ivory'}`}
                    role="menuitem"
                  >
                    <span>Dark Navy Mode</span>
                    <span className="w-3 h-3 rounded-full bg-[#0B1726] border border-gray-400 inline-block" />
                  </button>
                  <button
                    onClick={() => { setTheme('sepia'); setIsThemeMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-navy-light flex items-center justify-between ${theme === 'sepia' ? 'text-amber font-bold' : 'text-ivory'}`}
                    role="menuitem"
                  >
                    <span>Soft Low-Vision Sepia</span>
                    <span className="w-3 h-3 rounded-full bg-[#F4ECD8] border border-amber-900 inline-block" />
                  </button>
                </div>
              )}
            </div>

            {/* Wireframe Blueprint Mode Switcher (Section 10 of Brief) */}
            <button
              onClick={toggleWireframe}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition-all ${
                wireframeMode
                  ? 'bg-white text-black ring-2 ring-black font-mono border-2 border-dashed border-black'
                  : 'bg-navy-surface hover:bg-navy-light text-gray-300 border border-gray-600'
              }`}
              aria-pressed={wireframeMode}
              title="Toggle Wireframe Blueprint view (for project presentation and design submission)"
              aria-label="Toggle low-fidelity wireframe blueprint mode"
            >
              <Layout className="w-3.5 h-3.5 text-amber" />
              <span>{wireframeMode ? 'Wireframe Mode: ON' : 'Wireframe View'}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

