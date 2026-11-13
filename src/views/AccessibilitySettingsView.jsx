import React from 'react';
import { 
  Settings, 
  Volume2, 
  Mic, 
  Eye, 
  Type, 
  Sparkles, 
  Check, 
  RefreshCw, 
  Sliders, 
  Activity,
  Layers,
  VolumeX
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export function AccessibilitySettingsView({ onOpenVoiceModal }) {
  const {
    theme,
    setTheme,
    toggleHighContrast,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    reduceMotion,
    setReduceMotion,
    soundEnabled,
    setSoundEnabled,
    wireframeMode,
    toggleWireframe,
    speechRate,
    setSpeechRate,
    speakText,
    triggerSound,
  } = useAccessibility();

  const handleTestSpeech = () => {
    speakText('Testing Sahpathi screen reader voice synthesis. All settings are operating at optimal accessibility.');
  };

  const handleResetDefaults = () => {
    triggerSound('success');
    setTheme('standard');
    setFontSize('normal');
    setFontFamily('sans');
    setReduceMotion(false);
    setSoundEnabled(true);
    setSpeechRate(1.0);
    speakText('Accessibility settings have been reset to platform defaults.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen 08 – Accessibility Settings Wireframe Blueprint]
          </span>
          <span>Universal Assistive Controls Center</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Assistive Technology Hub
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-2">
              Accessibility Settings
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-1">
              Customise your browsing experience for low vision, colour perception, screen readers, and motor independence.
            </p>
          </div>

          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-navy bg-ivory-muted hover:bg-ivory-border px-3.5 py-2 rounded-xl transition-colors border border-ivory-border shrink-0"
            aria-label="Reset accessibility settings to default"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* 1. Display Contrast & Theme Preferences */}
        <section className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-ivory-border pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-teal text-white rounded-xl">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy">Display Theme & Visual Contrast</h2>
                <p className="text-xs text-gray-600">Choose the contrast palette most comfortable for your eyesight.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {/* Standard */}
            <button
              onClick={() => { setTheme('standard'); triggerSound('click'); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                theme === 'standard'
                  ? 'border-teal ring-2 ring-teal bg-[#F7F4EA]'
                  : 'border-ivory-border bg-white hover:border-gray-400'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-[#142A43]">Sahpathi Standard</span>
                {theme === 'standard' && <Check className="w-4 h-4 text-teal" />}
              </div>
              <p className="text-xs text-gray-600">Deep Navy & Warm Ivory background for balanced reading comfort.</p>
            </button>

            {/* High Contrast Yellow on Black */}
            <button
              onClick={() => { setTheme('hc-yellow'); triggerSound('click'); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all bg-black text-yellow-400 ${
                theme === 'hc-yellow'
                  ? 'border-yellow-400 ring-2 ring-yellow-400'
                  : 'border-gray-700 hover:border-yellow-400'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-yellow-400">High Contrast (Yellow)</span>
                {theme === 'hc-yellow' && <Check className="w-4 h-4 text-yellow-400" />}
              </div>
              <p className="text-xs text-yellow-200">Max WCAG AAA rating. Deep black background with vibrant yellow.</p>
            </button>

            {/* High Contrast Cyan on Black */}
            <button
              onClick={() => { setTheme('hc-cyan'); triggerSound('click'); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all bg-black text-cyan-400 ${
                theme === 'hc-cyan'
                  ? 'border-cyan-400 ring-2 ring-cyan-400'
                  : 'border-gray-700 hover:border-cyan-400'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-cyan-400">High Contrast (Cyan)</span>
                {theme === 'hc-cyan' && <Check className="w-4 h-4 text-cyan-400" />}
              </div>
              <p className="text-xs text-cyan-200">Crisp cyan text on deep pitch black for high visibility.</p>
            </button>

            {/* Dark Navy */}
            <button
              onClick={() => { setTheme('dark'); triggerSound('click'); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all bg-[#0B1726] text-white ${
                theme === 'dark'
                  ? 'border-amber ring-2 ring-amber'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-white">Dark Mode (Night)</span>
                {theme === 'dark' && <Check className="w-4 h-4 text-amber" />}
              </div>
              <p className="text-xs text-gray-300">Midnight navy for low-light environments and glare reduction.</p>
            </button>

            {/* Soft Sepia */}
            <button
              onClick={() => { setTheme('sepia'); triggerSound('click'); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all bg-[#F4ECD8] text-[#2D2319] ${
                theme === 'sepia'
                  ? 'border-[#2D2319] ring-2 ring-[#2D2319]'
                  : 'border-ivory-border hover:border-gray-400'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-[#2D2319]">Soft Sepia</span>
                {theme === 'sepia' && <Check className="w-4 h-4 text-[#2D2319]" />}
              </div>
              <p className="text-xs text-[#2D2319]/80">Gentle warm tint that eliminates digital eye-strain.</p>
            </button>
          </div>
        </section>

        {/* 2. Typography & Font Size Scaling */}
        <section className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center space-x-3 border-b border-ivory-border pb-3">
            <div className="p-2.5 bg-teal text-white rounded-xl">
              <Type className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Text Sizing & Font Style</h2>
              <p className="text-xs text-gray-600">Scale text dimensions across every button, card, and heading.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { id: 'normal', label: 'Normal (100%)', px: '16px' },
              { id: 'large', label: 'Large (120%)', px: '19px' },
              { id: 'xlarge', label: 'Extra Large (140%)', px: '22px' },
              { id: 'xxlarge', label: 'Maximum (160%)', px: '25px' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setFontSize(item.id); triggerSound('click'); }}
                className={`p-3 rounded-2xl border-2 text-center transition-all ${
                  fontSize === item.id
                    ? 'border-teal bg-teal-soft ring-2 ring-teal text-navy font-extrabold'
                    : 'border-ivory-border bg-white text-gray-700 hover:border-teal/50'
                }`}
              >
                <span className="block text-sm">{item.label}</span>
                <span className="text-[11px] text-gray-500 font-normal">{item.px} base</span>
              </button>
            ))}
          </div>

          {/* Dyslexia friendly font */}
          <div className="pt-3 border-t border-ivory-border flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-navy">Specialised Reading Font</p>
              <p className="text-xs text-gray-600">Use high-legibility letterforms designed for easier distinction.</p>
            </div>
            <button
              onClick={() => {
                const nextFont = fontFamily === 'sans' ? 'dyslexic' : 'sans';
                setFontFamily(nextFont);
                triggerSound('click');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                fontFamily === 'dyslexic'
                  ? 'bg-teal text-white border-teal shadow'
                  : 'bg-ivory-light text-navy border-ivory-border'
              }`}
            >
              {fontFamily === 'dyslexic' ? 'High-Legibility ON' : 'Standard Sans'}
            </button>
          </div>
        </section>

        {/* 3. Screen Reader & Speech Synthesis Settings */}
        <section className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center space-x-3 border-b border-ivory-border pb-3">
            <div className="p-2.5 bg-teal text-white rounded-xl">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Built-in Screen Reader & Speech Synthesis</h2>
              <p className="text-xs text-gray-600">Adjust the speech rate and voice test for auditory reading.</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-navy mb-1.5">
                <span>Reading Speed Rate:</span>
                <span className="text-teal font-extrabold">{speechRate}x Normal Speed</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.5"
                step="0.05"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full accent-teal cursor-pointer"
                aria-label="Speech synthesis rate slider"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleTestSpeech}
                className="px-5 py-2.5 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
              >
                <Volume2 className="w-4 h-4 text-amber" />
                <span>Test Voice Sample</span>
              </button>

              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  triggerSound('click');
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                  soundEnabled
                    ? 'bg-amber-soft text-amber-950 border-amber'
                    : 'bg-gray-100 text-gray-500 border-gray-300'
                }`}
              >
                {soundEnabled ? '🔔 Auditory Earcons: ON' : '🔕 Auditory Earcons: OFF'}
              </button>
            </div>
          </div>
        </section>

        {/* 4. Motion & Wireframe Blueprint */}
        <section className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center space-x-3 border-b border-ivory-border pb-3">
            <div className="p-2.5 bg-teal text-white rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Motion & Presentation Blueprint</h2>
              <p className="text-xs text-gray-600">Toggle vestibular-safe motion and project wireframe mode.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-navy">Reduce Motion</p>
                <p className="text-xs text-gray-600">Disables animations & transitions.</p>
              </div>
              <button
                onClick={() => {
                  setReduceMotion(!reduceMotion);
                  triggerSound('click');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                  reduceMotion
                    ? 'bg-teal text-white border-teal'
                    : 'bg-white text-navy border-ivory-border'
                }`}
              >
                {reduceMotion ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-navy">Wireframe Blueprint Mode</p>
                <p className="text-xs text-gray-600">For academic and design evaluations.</p>
              </div>
              <button
                onClick={toggleWireframe}
                className={`px-4 py-2 rounded-xl text-xs font-bold border font-mono ${
                  wireframeMode
                    ? 'bg-black text-yellow-400 border-yellow-400'
                    : 'bg-white text-navy border-ivory-border'
                }`}
              >
                {wireframeMode ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

