import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  ArrowRight, 
  SlidersHorizontal, 
  Volume2, 
  CheckCircle2, 
  Sparkles,
  Search,
  BookOpen,
  Languages,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { ScribeProfileModal } from '../components/ScribeProfileModal';

export function AvailableScribesView() {
  const { filteredScribes, examCriteria, navigateTo, setSelectedScribe, handleBookScribe } = useApp();
  const { speakText, triggerSound, wireframeMode } = useAccessibility();

  const [selectedLang, setSelectedLang] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [sortBy, setSortBy] = useState('match');
  const [activeModalScribe, setActiveModalScribe] = useState(null);

  // Filter scribes locally
  const displayedScribes = filteredScribes
    .filter(s => {
      const langMatch = selectedLang === 'All' || s.languages.includes(selectedLang);
      const genderMatch = selectedGender === 'All' || s.gender.toLowerCase() === selectedGender.toLowerCase();
      return langMatch && genderMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceCount - a.experienceCount;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return 0; // Default match
    });

  const handleOpenProfile = (scribe) => {
    triggerSound('click');
    setSelectedScribe(scribe);
    setActiveModalScribe(scribe);
  };

  const handleQuickBook = (scribe) => {
    setActiveModalScribe(null);
    handleBookScribe(scribe);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen 03 – Available Scribes List Wireframe Blueprint]
          </span>
          <span>Matched Volunteers Directory</span>
        </div>
      )}

      {/* Header & Current Exam Criteria Summary */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
                Step 2 of 3: Volunteer Selection
              </span>
              <span className="text-xs bg-amber text-navy font-bold px-2.5 py-0.5 rounded-full">
                {displayedScribes.length} Verified Matches Found
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Available Scribes for Your Examination
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Showing volunteers matched for <strong>{examCriteria.examName}</strong> ({examCriteria.subject}) on <strong>{examCriteria.examDate}</strong> at {examCriteria.centreName}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('find-scribe')}
              className="text-xs font-bold text-navy bg-ivory-muted hover:bg-ivory-border px-3.5 py-2 rounded-xl transition-colors"
            >
              ← Edit Exam Details
            </button>
            <button
              onClick={() => speakText(`Found ${displayedScribes.length} available scribes. Volunteer 1 is ${displayedScribes[0]?.name}, with ${displayedScribes[0]?.experienceCount} exams written.`)}
              className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20"
              aria-label="Read scribe results aloud"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen</span>
            </button>
          </div>
        </div>

        {/* Filters and Sorting Bar */}
        <div className="mt-6 pt-4 border-t border-ivory-border flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-gray-500 uppercase tracking-wider font-bold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-teal" /> Filter by:
            </span>

            {/* Language filter */}
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-ivory-border bg-ivory-light text-navy focus:outline-none focus:border-teal"
              aria-label="Filter by Language"
            >
              <option value="All">All Languages</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
              <option value="Marathi">Marathi</option>
              <option value="Tamil">Tamil</option>
            </select>

            {/* Gender filter */}
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-ivory-border bg-ivory-light text-navy focus:outline-none focus:border-teal"
              aria-label="Filter by Gender"
            >
              <option value="All">Any Gender</option>
              <option value="Female">Female Scribes</option>
              <option value="Male">Male Scribes</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-bold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-ivory-border bg-ivory-light text-navy font-bold focus:outline-none focus:border-teal"
              aria-label="Sort scribes"
            >
              <option value="match">Best Match Score</option>
              <option value="rating">Highest Rating (5.0★)</option>
              <option value="experience">Most Exams Written</option>
              <option value="distance">Nearest to Exam Centre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scribes Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedScribes.map((scribe, index) => (
          <article
            key={scribe.id}
            aria-labelledby={`scribe-name-${scribe.id}`}
            className="bg-white rounded-2xl border-2 border-ivory-border hover:border-teal shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Card Top Section */}
            <div className="p-5">
              <div className="flex items-start space-x-4">
                <div className="relative shrink-0">
                  <img
                    src={scribe.photo}
                    alt={scribe.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber shadow"
                  />
                  <span
                    className="absolute -bottom-1 -right-1 bg-green-600 text-white p-1 rounded-full text-[10px] shadow"
                    title="Identity & Academic Records Verified"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2
                      id={`scribe-name-${scribe.id}`}
                      className="text-base sm:text-lg font-bold text-navy truncate"
                    >
                      {scribe.name}
                    </h2>
                    <span className="bg-green-100 text-green-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-green-300">
                      Available
                    </span>
                  </div>

                  <p className="text-xs text-teal-dark font-medium truncate mt-0.5">
                    {scribe.qualification}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="flex items-center gap-0.5 font-bold text-amber-900 bg-amber-soft px-2 py-0.5 rounded text-[11px]">
                      <Star className="w-3 h-3 fill-amber text-amber" /> {scribe.rating}
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      ({scribe.experienceCount} exams written)
                    </span>
                  </div>
                </div>
              </div>

              {/* Languages & Subjects Tags */}
              <div className="mt-4 space-y-2 text-xs">
                <div>
                  <span className="text-gray-500 font-semibold block text-[11px] mb-1">
                    Languages Written & Spoken:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {scribe.languages.map((l, i) => (
                      <span
                        key={i}
                        className="bg-ivory-muted text-navy px-2 py-0.5 rounded font-medium text-[11px]"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 font-semibold block text-[11px] mb-1">
                    Qualified Subjects:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {scribe.subjects.slice(0, 3).map((s, i) => (
                      <span
                        key={i}
                        className="bg-teal-soft text-teal-dark px-2 py-0.5 rounded font-bold text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                    {scribe.subjects.length > 3 && (
                      <span className="text-[10px] text-gray-500">+{scribe.subjects.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-ivory-border flex items-center justify-between text-gray-600 text-[11px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal" />
                    {scribe.location} ({scribe.distanceKm} km away)
                  </span>
                  <button
                    onClick={() => speakText(`${scribe.name}, ${scribe.qualification}, ${scribe.languages.join(' and ')}, rating ${scribe.rating} stars.`)}
                    className="text-teal hover:text-teal-dark p-1"
                    title="Audio overview"
                    aria-label={`Listen to ${scribe.name}'s details`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="p-3 bg-ivory-light border-t border-ivory-border flex items-center gap-2">
              <button
                onClick={() => handleOpenProfile(scribe)}
                className="flex-1 py-2 px-3 bg-white hover:bg-ivory-muted border border-ivory-border text-navy rounded-xl text-xs font-bold transition-colors text-center"
              >
                View Full Profile →
              </button>

              <button
                onClick={() => handleQuickBook(scribe)}
                className="flex-1 py-2 px-3 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold transition-colors shadow text-center"
              >
                Request Scribe
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Scribe Detailed Profile Modal */}
      <ScribeProfileModal
        scribe={activeModalScribe}
        isOpen={Boolean(activeModalScribe)}
        onClose={() => setActiveModalScribe(null)}
        onRequestBooking={handleQuickBook}
      />
    </div>
  );
}

