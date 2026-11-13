import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  BookOpen, 
  Languages, 
  Award, 
  Volume2, 
  Clock, 
  CheckCircle2, 
  X,
  FileCheck,
  Calendar
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';

export function ScribeProfileModal({ scribe, isOpen, onClose, onRequestBooking }) {
  const { speakText, triggerSound, wireframeMode } = useAccessibility();

  if (!isOpen || !scribe) return null;

  const handleRequestClick = () => {
    triggerSound('success');
    onRequestBooking(scribe);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scribe-modal-title"
      className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      <div className="bg-ivory border-3 border-teal rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        {/* Wireframe Marker */}
        {wireframeMode && (
          <div className="mb-3 px-3 py-1 bg-black text-white font-mono text-xs font-bold uppercase inline-block border border-dashed border-yellow-400">
            [Screen 04 – Scribe Profile Wireframe View]
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-navy hover:bg-ivory-border focus:ring-2 focus:ring-amber"
          aria-label="Close volunteer profile modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-ivory-border">
          <div className="relative">
            <img
              src={scribe.photo}
              alt={scribe.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-amber shadow-md"
            />
            <span className="absolute -bottom-2 -right-2 bg-green-600 text-white p-1.5 rounded-full shadow" title="Identity Verified">
              <ShieldCheck className="w-5 h-5" />
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 id="scribe-modal-title" className="text-2xl sm:text-3xl font-extrabold text-navy">
                {scribe.name}
              </h1>
              <span className="bg-teal text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber" />
                Verified Scribe
              </span>
            </div>

            <p className="text-sm font-semibold text-teal-dark">{scribe.qualification}</p>
            <p className="text-xs text-gray-600 mt-0.5">{scribe.institution}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-navy font-medium">
              <span className="flex items-center gap-1 bg-amber-soft px-2.5 py-1 rounded-md text-amber-900 font-bold border border-amber/30">
                <Star className="w-4 h-4 fill-amber text-amber" />
                {scribe.rating} ({scribe.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-teal" />
                {scribe.location}, {scribe.city} ({scribe.distanceKm} km away)
              </span>
              <span className="flex items-center gap-1 text-green-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                {scribe.availabilityStatus} for selected date
              </span>
            </div>

            {/* Audio bio narration */}
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
              <button
                onClick={() => speakText(scribe.audioBio || scribe.bio)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-teal/20"
                aria-label={`Listen to ${scribe.name}'s audio introduction`}
              >
                <Volume2 className="w-4 h-4" />
                Listen to Audio Introduction
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Grid Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Left Column: Academic & Languages */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-ivory-border shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-1.5">
                <Languages className="w-4 h-4" /> Languages Known & Written
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {scribe.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-ivory-muted text-navy font-semibold text-xs rounded-lg border border-ivory-border"
                  >
                    {lang} (Fluent)
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-ivory-border shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Qualified Subjects for Scribing
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {scribe.subjects.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-teal-soft text-teal-dark font-bold text-xs rounded-lg border border-teal/20"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-ivory-border shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Handwriting & Scribing Speed
              </h3>
              <p className="text-sm font-semibold text-navy">{scribe.handwritingSpeed}</p>
              <p className="text-xs text-gray-600 mt-1">Verified via Sahpathi Handwriting Speed Audit.</p>
            </div>
          </div>

          {/* Right Column: Verification & Ethics */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-ivory-border shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" /> Verification & Compliance Checks
              </h3>
              <ul className="text-xs space-y-2 text-navy">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Government Photo Identity Verified (Aadhaar / Voter ID)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Educational Qualification & Marksheet Authenticated</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Sahpathi Scribe Orientation & Ethics Training Completed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Non-Interference Code of Conduct Signed</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-ivory-border shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Experience & Track Record
              </h3>
              <p className="text-sm font-bold text-navy">
                {scribe.experienceCount} Examinations Written as Official Scribe
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {scribe.badges?.map((badge, bidx) => (
                  <span
                    key={bidx}
                    className="text-[11px] font-bold bg-amber-soft text-amber-900 border border-amber/40 px-2 py-0.5 rounded-full"
                  >
                    🏆 {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About the Volunteer Bio */}
        <div className="bg-white p-5 rounded-xl border border-ivory-border shadow-sm mb-6">
          <h3 className="text-sm font-bold text-navy mb-2">About {scribe.name}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{scribe.bio}</p>
        </div>

        {/* Mandatory Examination Authority Disclaimer */}
        <div className="p-3 bg-amber-soft border-l-4 border-amber rounded-r-lg text-xs text-amber-950 mb-6">
          <p className="font-bold">Important Statutory Notice:</p>
          <p>
            Under examination board guidelines (e.g. CBSE / UPSC), a booking confirmation through Sahpathi is a voluntary arrangement and must be presented to the examination centre superintendent along with the Scribe Undertaking Form for formal endorsement.
          </p>
        </div>

        {/* Bottom Booking Action CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ivory-border">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-navy text-navy font-bold text-sm hover:bg-navy hover:text-ivory transition-colors"
          >
            ← Back to Scribe List
          </button>

          <button
            onClick={handleRequestClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-teal hover:bg-teal-dark active:scale-95 text-white font-extrabold text-base rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all focus:ring-4 focus:ring-amber"
            aria-label={`Submit booking request to ${scribe.name}`}
          >
            <Calendar className="w-5 h-5 text-amber" />
            Request This Scribe for Examination
          </button>
        </div>
      </div>
    </div>
  );
}

