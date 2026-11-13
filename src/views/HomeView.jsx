import React from 'react';
import { 
  Search, 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Award, 
  ArrowRight, 
  Volume2, 
  BookOpen, 
  Users, 
  AlertTriangle,
  Sparkles,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { SUCCESS_STORIES } from '../data/mockData';

export function HomeView() {
  const { navigateTo, setIsEmergencyOpen } = useApp();
  const { speakText, triggerSound, wireframeMode } = useAccessibility();

  const handleSpeech = (text) => {
    triggerSound('click');
    speakText(text);
  };

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300">
      {/* Wireframe Marker for College Project Presentation */}
      {wireframeMode && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider">
              [Screen 01 – Homepage Wireframe Layout & Structure]
            </span>
            <span>Desktop & Mobile Responsive Blueprint</span>
          </div>
        </div>
      )}

      {/* Emergency SOS Crisis Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="p-3 bg-red-600 text-white rounded-xl shrink-0">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-red-950 flex items-center gap-2">
                Need an Emergency Scribe within 24 to 48 Hours?
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                  Rapid SOS
                </span>
              </h2>
              <p className="text-xs text-red-900 mt-0.5">
                If your scheduled scribe is unavailable or your exam is tomorrow, our rapid volunteer network is standing by in major Indian cities.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerSound('emergency');
              setIsEmergencyOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md transition-all shrink-0 active:scale-95 focus:ring-2 focus:ring-amber"
          >
            Request Emergency Scribe Now
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        aria-labelledby="hero-headline"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-soft border border-amber/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-navy shadow-sm">
              <img
                src="/sahpathi-logo.avif"
                alt="Sahpathi Logo"
                className="w-5 h-5 rounded-full object-cover inline-block border border-amber"
              />
              <span>Accessibility-First Digital Initiative</span>
              <span className="text-gray-400">•</span>
              <span className="text-teal font-extrabold">100% Free & Verified</span>
            </div>

            <h1
              id="hero-headline"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.15]"
            >
              Every student deserves an{' '}
              <span className="text-teal underline decoration-amber decoration-4 underline-offset-4">
                equal chance.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Find examination support through a trusted, verified scribe network.
              Say goodbye to last-minute panic, informal favors, or exam cancellations.
            </p>

            <blockquote className="border-l-4 border-amber pl-4 italic text-sm text-gray-600 max-w-xl mx-auto lg:mx-0">
              "Your Examination. Your Independence. Our Support."
            </blockquote>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigateTo('find-scribe')}
                className="w-full sm:w-auto px-8 py-4 bg-teal hover:bg-teal-dark active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all focus:ring-4 focus:ring-amber"
                aria-label="Find a Scribe for your examination"
              >
                <Search className="w-5 h-5 text-amber" />
                <span>Find a Scribe</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => navigateTo('volunteer-register')}
                className="w-full sm:w-auto px-8 py-4 bg-navy hover:bg-navy-light active:scale-95 text-ivory font-extrabold text-base rounded-2xl shadow-md border-2 border-amber/50 flex items-center justify-center gap-2.5 transition-all focus:ring-4 focus:ring-amber"
                aria-label="Become a Volunteer Scribe"
              >
                <HeartHandshake className="w-5 h-5 text-amber" />
                <span>Become a Volunteer</span>
              </button>
            </div>

            {/* Audio Listen for Visually Impaired */}
            <div className="pt-2 flex items-center justify-center lg:justify-start">
              <button
                onClick={() => handleSpeech('Welcome to Sahpathi. Every student deserves an equal chance. Find examination support through a trusted scribe network. Click Find a Scribe to enter your exam details, or click Become a Volunteer to join as a scribe.')}
                className="inline-flex items-center gap-2 text-xs font-bold text-teal hover:text-teal-dark underline p-1 rounded focus:ring-2 focus:ring-amber"
                aria-label="Listen to audio overview of this section"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen to Section Overview</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration Artwork (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-br from-navy to-navy-light p-6 sm:p-8 rounded-3xl border-4 border-amber shadow-2xl text-ivory">
              {/* Illustration Decorative Graphic */}
              <div className="flex justify-between items-center pb-4 border-b border-navy-surface">
                <span className="text-xs uppercase tracking-wider font-bold text-amber">
                  Examination Room In Action
                </span>
                <span className="bg-green-500/20 text-green-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-green-400">
                  +20m/hr Compensatory Time
                </span>
              </div>

              {/* Graphic Representation */}
              <div className="my-6 space-y-4">
                <div className="bg-navy-surface p-4 rounded-2xl border border-navy-light flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-teal text-ivory flex items-center justify-center font-bold text-xl border-2 border-amber shrink-0">
                    🎓
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-amber font-bold uppercase">Candidate Dictating</p>
                    <p className="text-sm font-bold text-white">Rahul Verma</p>
                    <p className="text-xs text-gray-300">CBSE Class 12 • Physics Exam</p>
                  </div>
                </div>

                <div className="flex justify-center -my-2 relative z-10">
                  <div className="bg-amber text-navy px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-md">
                    <span>Synchronous Scribing</span> ✍️
                  </div>
                </div>

                <div className="bg-navy-surface p-4 rounded-2xl border border-navy-light flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-ivory text-navy flex items-center justify-center font-bold text-xl border-2 border-amber shrink-0">
                    ✍️
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-teal font-bold uppercase">Verified Scribe Writing</p>
                    <p className="text-sm font-bold text-white">Aarav Sharma</p>
                    <p className="text-xs text-gray-300">Fast & Legible Handwriting (36 wpm)</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-navy-surface flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center gap-1 text-green-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Identity Authenticated
                </span>
                <span className="text-amber font-semibold">Form-I Undertaking Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PLATFORM METRICS */}
      <section
        aria-label="Sahpathi Impact Metrics"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-2xl border-2 border-ivory-border shadow-md p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-navy">1,420+</p>
            <p className="text-xs sm:text-sm font-bold text-teal">Verified Scribe Volunteers</p>
            <p className="text-[11px] text-gray-500">Government ID & Degree Checked</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-navy">3,850+</p>
            <p className="text-xs sm:text-sm font-bold text-teal">Examinations Supported</p>
            <p className="text-[11px] text-gray-500">Boards, UPSC, University & Banking</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-navy">98.4%</p>
            <p className="text-xs sm:text-sm font-bold text-teal">Successful Match Rate</p>
            <p className="text-[11px] text-gray-500">Subject-matched & timely arrival</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-navy">45+</p>
            <p className="text-xs sm:text-sm font-bold text-teal">Cities & Exam Zones</p>
            <p className="text-[11px] text-gray-500">Across Delhi NCR, Mumbai, Kolkata, etc.</p>
          </div>
        </div>
      </section>

      {/* HOW SAHPATHI WORKS (Section 10.1 Screen 01 & Section 8) */}
      <section
        aria-labelledby="how-it-works-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-extrabold text-teal uppercase tracking-widest bg-teal-soft px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-extrabold text-navy">
            How Sahpathi Works
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Connecting students and scribes through a transparent, verified, and structured digital platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border-2 border-ivory-border shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-navy text-amber flex items-center justify-center font-extrabold text-xl mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Register & Enter Exam Details</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Enter your examination date, time, subject stream, examination centre, and specific requirements like diagram drawing or formula dictation.
            </p>
            <ul className="text-xs text-gray-700 space-y-1 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal" /> CBSE, UPSC & University formats
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal" /> Language & gender preference
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border-2 border-teal shadow-md relative">
            <div className="w-12 h-12 rounded-2xl bg-teal text-white flex items-center justify-center font-extrabold text-xl mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Get Matched with Verified Scribes</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Browse qualified volunteers matching your academic subject, language, and examination centre location. Listen to audio introductions.
            </p>
            <ul className="text-xs text-gray-700 space-y-1 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal" /> Identity & Degree Verified
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal" /> Scribe Ethics Code of Conduct
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border-2 border-ivory-border shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-amber text-navy flex items-center justify-center font-extrabold text-xl mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Appear for Exam with Confidence</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Coordinate meeting point beforehand via pre-exam chat, generate official Scribe Undertaking Forms, and write your paper with peace of mind.
            </p>
            <ul className="text-xs text-gray-700 space-y-1 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal" /> Compensatory time guidelines
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal" /> Standby emergency backup
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CORE PROBLEMS SOLVED (Section 2 of Brief) */}
      <section
        aria-labelledby="problems-solved-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-navy text-ivory rounded-3xl p-8 sm:p-12 border-4 border-amber shadow-xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs uppercase font-extrabold text-amber tracking-widest">
              Why Sahpathi is Essential
            </span>
            <h2 id="problems-solved-heading" className="text-2xl sm:text-4xl font-extrabold text-ivory">
              Transforming Examination Support for 3+ Million Visually Impaired Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-navy-surface p-5 rounded-2xl border border-navy-light space-y-2">
              <h3 className="text-base font-bold text-amber flex items-center gap-2">
                ❌ The Traditional Struggle
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Students had to beg friends or distant relatives, often encountering last-minute cancellations, illegible handwriting, or scribes unfamiliar with technical notations (e.g. Physics diagrams or Accountancy ledgers).
              </p>
            </div>

            <div className="bg-navy-surface p-5 rounded-2xl border border-navy-light space-y-2">
              <h3 className="text-base font-bold text-green-400 flex items-center gap-2">
                ✅ The Sahpathi Solution
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                A verified digital pool matched by subject domain, language fluency, and geographic proximity. Advance bookings, instant Form-I generation, and verified writing speed remove all anxiety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES & TESTIMONIALS (Section 4.1 & 12) */}
      <section
        aria-labelledby="stories-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-teal uppercase tracking-widest bg-teal-soft px-3 py-1 rounded-full">
            Real Impact
          </span>
          <h2 id="stories-heading" className="text-3xl font-extrabold text-navy">
            Voices of Independence & Achievement
          </h2>
          <p className="text-sm text-gray-700">
            Hear how Sahpathi helped candidates turn examination dreams into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white p-6 rounded-2xl border-2 border-ivory-border shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={story.image}
                    alt={story.studentName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber"
                  />
                  <div>
                    <h3 className="font-bold text-navy text-sm">{story.studentName}</h3>
                    <p className="text-xs text-teal font-semibold">{story.role}</p>
                    <p className="text-[11px] text-gray-500">{story.exam}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{story.story}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ivory-border flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">
                  Scribe: <strong>{story.scribeName}</strong>
                </span>
                <button
                  onClick={() => handleSpeech(`${story.studentName}, ${story.role}. ${story.story}`)}
                  className="text-teal hover:text-teal-dark p-1.5 rounded-lg hover:bg-teal-soft"
                  title="Listen to story"
                  aria-label={`Listen to ${story.studentName}'s story`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section
        aria-label="Take Action"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-teal text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to arrange a scribe or volunteer your knowledge?
          </h2>
          <p className="text-base text-teal-soft max-w-xl mx-auto">
            Join thousands of students and volunteers breaking examination barriers across India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('find-scribe')}
              className="px-8 py-3.5 bg-amber hover:bg-amber-dark text-navy font-extrabold text-sm rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Book Scribe for Upcoming Exam
            </button>
            <button
              onClick={() => navigateTo('volunteer-register')}
              className="px-8 py-3.5 bg-navy hover:bg-navy-light text-ivory font-extrabold text-sm rounded-xl shadow-md transition-transform active:scale-95"
            >
              Sign Up as Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

