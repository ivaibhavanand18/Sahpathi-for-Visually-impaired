import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Languages, 
  User, 
  Sparkles, 
  Volume2, 
  CheckSquare, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { POPULAR_EXAMS, INDIAN_CITIES, SUBJECT_STREAMS } from '../data/mockData';

export function FindScribeView() {
  const { examCriteria, handleSearchScribes } = useApp();
  const { speakText, triggerSound, wireframeMode } = useAccessibility();

  const [formData, setFormData] = useState({
    examName: examCriteria.examName || 'CBSE Class 12 Board Examination',
    examDate: examCriteria.examDate || '2026-11-18',
    timeSlot: examCriteria.timeSlot || '10:00 AM - 01:00 PM',
    durationHours: examCriteria.durationHours || '3 Hours (+ 1 Hour Compensatory)',
    centreName: examCriteria.centreName || 'Kendriya Vidyalaya No. 1, R.K. Puram, New Delhi',
    city: examCriteria.city || 'Delhi NCR',
    stream: examCriteria.stream || 'Science & STEM',
    subject: examCriteria.subject || 'Physics',
    language: examCriteria.language || 'English',
    genderPreference: examCriteria.genderPreference || 'No preference',
    mode: examCriteria.mode || 'In-person assistance',
    specialAssistance: examCriteria.specialAssistance || [
      'Draws ray optics diagrams upon dictation',
      'Requires large table seating'
    ]
  });

  const specialNeedOptions = [
    'Formula & LaTeX-style notation support',
    'Scientific ray optics / circuit diagram drawing',
    'Accountancy ledgers & balance sheet column formatting',
    'Fast writing speed (minimum 32+ wpm)',
    'High endurance (for 5+ hour continuous exam papers)',
    'Wheelchair & venue mobility assistance at centre gate',
    'Bilingual translation / vocabulary clarification'
  ];

  const handleToggleSpecialNeed = (need) => {
    triggerSound('click');
    setFormData(prev => {
      const exists = prev.specialAssistance.includes(need);
      return {
        ...prev,
        specialAssistance: exists
          ? prev.specialAssistance.filter(n => n !== need)
          : [...prev.specialAssistance, need]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchScribes(formData);
  };

  const handleListenFormInstructions = () => {
    speakText('Find a Scribe form. Please enter your examination name, date, time slot, duration, examination centre address, preferred language, and subject stream. Then click Search Available Scribes to find verified volunteers.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen 02 – Find a Scribe / Booking Form Wireframe Blueprint]
          </span>
          <span>Form Specification & Fields</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Step 1 of 3: Examination Requirements
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-2">
              Find a Scribe
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-1">
              Enter your examination requirements to match with suitable, verified volunteer scribes.
            </p>
          </div>

          <button
            onClick={handleListenFormInstructions}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to form instructions"
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Instructions</span>
          </button>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-10 shadow-xl space-y-8">
        {/* Section A: Examination Basics */}
        <fieldset className="space-y-5">
          <legend className="text-lg font-bold text-navy flex items-center gap-2 border-b border-ivory-border pb-2 w-full">
            <BookOpen className="w-5 h-5 text-teal" />
            1. Examination Details & Schedule
          </legend>

          {/* Exam Name */}
          <div>
            <label htmlFor="exam-name" className="block text-xs font-bold uppercase text-navy mb-1.5">
              Examination Name <span className="text-red-500">*</span>
            </label>
            <input
              id="exam-name"
              type="text"
              list="exam-presets"
              required
              value={formData.examName}
              onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
              placeholder="e.g. CBSE Class 12 Physics, UPSC Civil Services, Delhi University"
              className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm font-medium"
            />
            <datalist id="exam-presets">
              {POPULAR_EXAMS.map((exam, idx) => (
                <option key={idx} value={exam} />
              ))}
            </datalist>
          </div>

          {/* Date, Time & Duration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="exam-date" className="block text-xs font-bold uppercase text-navy mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal" />
                Exam Date <span className="text-red-500">*</span>
              </label>
              <input
                id="exam-date"
                type="date"
                required
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>

            <div>
              <label htmlFor="time-slot" className="block text-xs font-bold uppercase text-navy mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal" />
                Time Slot <span className="text-red-500">*</span>
              </label>
              <select
                id="time-slot"
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (Morning)</option>
                <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM (Standard)</option>
                <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (Afternoon)</option>
                <option value="09:00 AM - 04:00 PM">Full Day (UPSC Mains Dual Session)</option>
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-xs font-bold uppercase text-navy mb-1.5">
                Duration (With +20m/h)
              </label>
              <input
                id="duration"
                type="text"
                value={formData.durationHours}
                onChange={(e) => setFormData({ ...formData, durationHours: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>
          </div>
        </fieldset>

        {/* Section B: Venue & Academic Stream */}
        <fieldset className="space-y-5">
          <legend className="text-lg font-bold text-navy flex items-center gap-2 border-b border-ivory-border pb-2 w-full">
            <MapPin className="w-5 h-5 text-teal" />
            2. Examination Centre & Academic Subject
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="centre-city" className="block text-xs font-bold uppercase text-navy mb-1.5">
                City / Region <span className="text-red-500">*</span>
              </label>
              <select
                id="centre-city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                {INDIAN_CITIES.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="centre-address" className="block text-xs font-bold uppercase text-navy mb-1.5">
                Exam Centre Name & Venue Address <span className="text-red-500">*</span>
              </label>
              <input
                id="centre-address"
                type="text"
                required
                value={formData.centreName}
                onChange={(e) => setFormData({ ...formData, centreName: e.target.value })}
                placeholder="e.g. Kendriya Vidyalaya R.K. Puram / Faculty of Arts"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="stream-select" className="block text-xs font-bold uppercase text-navy mb-1.5">
                Academic Stream
              </label>
              <select
                id="stream-select"
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                {SUBJECT_STREAMS.map((s, idx) => (
                  <option key={idx} value={s.stream}>{s.stream}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subject-input" className="block text-xs font-bold uppercase text-navy mb-1.5">
                Subject / Paper <span className="text-red-500">*</span>
              </label>
              <input
                id="subject-input"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Physics, History, Accountancy"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm font-semibold"
              />
            </div>

            <div>
              <label htmlFor="lang-select" className="block text-xs font-bold uppercase text-navy mb-1.5 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-teal" />
                Preferred Language <span className="text-red-500">*</span>
              </label>
              <select
                id="lang-select"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Marathi">Marathi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Section C: Scribe Preferences & Special Needs */}
        <fieldset className="space-y-5">
          <legend className="text-lg font-bold text-navy flex items-center gap-2 border-b border-ivory-border pb-2 w-full">
            <User className="w-5 h-5 text-teal" />
            3. Volunteer Preferences & Special Assistance
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gender-pref" className="block text-xs font-bold uppercase text-navy mb-1.5">
                Preferred Scribe Gender (Optional)
              </label>
              <select
                id="gender-pref"
                value={formData.genderPreference}
                onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                <option value="No preference">No preference (Recommended)</option>
                <option value="Female">Female Scribe</option>
                <option value="Male">Male Scribe</option>
              </select>
            </div>

            <div>
              <label htmlFor="mode-select" className="block text-xs font-bold uppercase text-navy mb-1.5">
                Assistance Mode
              </label>
              <select
                id="mode-select"
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                <option value="In-person assistance">In-person assistance at examination venue</option>
                <option value="Online mock test / Practice">Online mock test / practice trial</option>
              </select>
            </div>
          </div>

          {/* Special Requirements Checklist */}
          <div>
            <label className="block text-xs font-bold uppercase text-navy mb-2">
              Specific Assistance Requirements (Select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {specialNeedOptions.map((opt, idx) => {
                const checked = formData.specialAssistance.includes(opt);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleSpecialNeed(opt)}
                    className={`p-3 rounded-xl border text-left flex items-start space-x-2 transition-all ${
                      checked
                        ? 'bg-teal-soft border-teal text-navy font-bold ring-1 ring-teal'
                        : 'bg-white border-ivory-border text-gray-700 hover:border-teal/50'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${checked ? 'text-teal' : 'text-gray-300'}`} />
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </fieldset>

        {/* Regulatory Note */}
        <div className="p-4 bg-amber-soft border-l-4 border-amber rounded-r-xl text-xs text-amber-950 flex items-start space-x-3">
          <Info className="w-5 h-5 text-amber-900 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Compliance Reminder (Supreme Court & MoSJE Directives):</p>
            <p>
              Candidates are entitled to 20 minutes compensatory time per hour. Scribes will write strictly as dictated by you. After finding a scribe, you can download the ready-to-sign Scribe Undertaking Form directly from Sahpathi.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-teal hover:bg-teal-dark active:scale-[0.99] text-white font-extrabold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all focus:ring-4 focus:ring-amber"
            aria-label="Search available verified scribes"
          >
            <Search className="w-6 h-6 text-amber" />
            <span>Search Available Scribes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

