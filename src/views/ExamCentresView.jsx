import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  Navigation, 
  Phone, 
  ShieldCheck, 
  SlidersHorizontal, 
  Star, 
  Volume2, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';
import { ACCESSIBLE_EXAM_CENTRES, INDIAN_CITIES } from '../data/mockData';

export function ExamCentresView() {
  const { speakText, triggerSound, wireframeMode } = useAccessibility();
  const { examCriteria, setExamCriteria, navigateTo } = useApp();

  const [selectedCity, setSelectedCity] = useState('All');
  const [requiredFacility, setRequiredFacility] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const facilitiesList = [
    'Ground Floor Seating',
    'Wide Ramps & Railings',
    'Accessible Washrooms',
    'Dedicated PwD Parking',
    'Braille Signage'
  ];

  const filteredCentres = ACCESSIBLE_EXAM_CENTRES.filter(centre => {
    const cityMatch = selectedCity === 'All' || centre.city.toLowerCase().includes(selectedCity.toLowerCase());
    const facilityMatch = requiredFacility === 'All' || centre.facilities.some(f => f.toLowerCase().includes(requiredFacility.toLowerCase()));
    const queryMatch = !searchQuery || centre.name.toLowerCase().includes(searchQuery.toLowerCase()) || centre.area.toLowerCase().includes(searchQuery.toLowerCase());
    return cityMatch && facilityMatch && queryMatch;
  });

  const handleSelectCentre = (centre) => {
    triggerSound('success');
    setExamCriteria({
      ...examCriteria,
      centreName: `${centre.name}, ${centre.area}`,
      city: centre.city
    });
    speakText(`Selected ${centre.name} as your examination venue. Opening Find a Scribe form.`);
    navigateTo('find-scribe');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen – Accessible Examination Centres Locator Wireframe Blueprint]
          </span>
          <span>Venue Accessibility Directory & Transit Guide</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Venue Accessibility Directory
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
              Accessible Examination Centres Locator
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Find examination venues audited for step-free access, ground-floor seating, accessible metro transit, and disability support desks.
            </p>
          </div>

          <button
            onClick={() => speakText(`Accessible Examination Centres Directory. Found ${filteredCentres.length} verified accessible venues in your selected filters.`)}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to examination centres overview"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-6 pt-4 border-t border-ivory-border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">
              Search by Centre / College Name:
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Kendriya Vidyalaya, Faculty of Arts"
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-ivory-border focus:border-teal focus:outline-none text-navy"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">
              Filter by City:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-ivory-border focus:border-teal focus:outline-none text-navy"
            >
              <option value="All">All Cities</option>
              {INDIAN_CITIES.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">
              Required Accessibility Facility:
            </label>
            <select
              value={requiredFacility}
              onChange={(e) => setRequiredFacility(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-ivory-border focus:border-teal focus:outline-none text-navy"
            >
              <option value="All">All Accessible Facilities</option>
              {facilitiesList.map((f, i) => (
                <option key={i} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Centres Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCentres.map((centre) => (
          <article
            key={centre.id}
            aria-labelledby={`centre-name-${centre.id}`}
            className="bg-white rounded-3xl border-2 border-ivory-border hover:border-teal p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-ivory-border pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-teal bg-teal-soft px-2 py-0.5 rounded">
                    {centre.city}
                  </span>
                  <h2
                    id={`centre-name-${centre.id}`}
                    className="text-lg font-bold text-navy mt-1"
                  >
                    {centre.name}
                  </h2>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-teal shrink-0" />
                    {centre.area} - PIN {centre.pinCode}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="flex items-center gap-0.5 font-bold text-amber-900 bg-amber-soft px-2 py-0.5 rounded text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber text-amber" /> {centre.rating}
                  </span>
                  <p className="text-[10px] text-gray-500 mt-0.5">({centre.reviewsCount} reviews)</p>
                </div>
              </div>

              {/* Transit & Metro Connectivity */}
              <div className="bg-ivory-light p-3 rounded-xl border border-ivory-border text-xs space-y-1">
                <p className="font-bold text-navy flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-teal" />
                  Accessible Metro / Transit Route:
                </p>
                <p className="text-gray-700 pl-5">{centre.metroNearby}</p>
              </div>

              {/* Accessibility Features Badges */}
              <div>
                <span className="text-gray-500 font-bold block text-[11px] mb-1.5">
                  Verified Accessibility Amenities:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {centre.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-green-50 text-green-800 border border-green-200 rounded-lg font-semibold text-[11px] flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Superintendant Contact */}
              <div className="pt-2 text-xs text-gray-600 space-y-1 border-t border-ivory-border">
                <p>
                  <strong>Centre Superintendent / Contact:</strong> {centre.centreSuperintendent}
                </p>
                <p className="text-[11px] text-gray-500">
                  <strong>Boards Hosted:</strong> {centre.affiliatedBoards.join(', ')}
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6 pt-4 border-t border-ivory-border flex items-center justify-between gap-3">
              <button
                onClick={() => speakText(`${centre.name}. Located at ${centre.area}. Facilities include: ${centre.facilities.join(', ')}.`)}
                className="text-teal hover:text-teal-dark p-1 text-xs font-bold underline flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4" /> Listen
              </button>

              <button
                onClick={() => handleSelectCentre(centre)}
                className="px-4 py-2 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all"
              >
                <span>Select for My Exam</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

