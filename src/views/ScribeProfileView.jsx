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
  Calendar,
  FileCheck,
  ArrowLeft
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';

export function ScribeProfileView() {
  const { selectedScribe, handleBookScribe, navigateTo } = useApp();
  const { speakText, triggerSound, wireframeMode } = useAccessibility();

  const scribe = selectedScribe;

  if (!scribe) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-lg font-bold text-navy">No scribe selected.</p>
        <button
          onClick={() => navigateTo('available-scribes')}
          className="mt-4 px-6 py-2 bg-teal text-white rounded-xl font-bold"
        >
          View Available Scribes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen 04 – Scribe Profile Dedicated Screen Wireframe Blueprint]
          </span>
          <span>Verified Volunteer Credentials & Scribe Record</span>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={() => navigateTo('available-scribes')}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-teal bg-white px-3 py-1.5 rounded-lg border border-ivory-border"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Available Scribes
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-10 shadow-xl space-y-8">
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-ivory-border">
          <div className="relative">
            <img
              src={scribe.photo}
              alt={scribe.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-amber shadow-md"
            />
            <span className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full shadow" title="Identity Verified">
              <ShieldCheck className="w-5 h-5" />
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-3xl font-extrabold text-navy">
                {scribe.name}
              </h1>
              <span className="bg-teal text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber" />
                Identity & Degree Verified
              </span>
            </div>

            <p className="text-sm font-semibold text-teal-dark">{scribe.qualification}</p>
            <p className="text-xs text-gray-600 mt-0.5">{scribe.institution}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-navy font-medium">
              <span className="flex items-center gap-1 bg-amber-soft px-3 py-1 rounded-md text-amber-900 font-bold border border-amber/30">
                <Star className="w-4 h-4 fill-amber text-amber" />
                {scribe.rating} ({scribe.reviewsCount} verified reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-teal" />
                {scribe.location}, {scribe.city} ({scribe.distanceKm} km away)
              </span>
              <span className="flex items-center gap-1 text-green-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                {scribe.availabilityStatus} for your examination
              </span>
            </div>

            {/* Audio bio narration */}
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-2">
              <button
                onClick={() => speakText(scribe.audioBio || scribe.bio)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-1.5 rounded-lg transition-colors border border-teal/20"
                aria-label={`Listen to ${scribe.name}'s audio introduction`}
              >
                <Volume2 className="w-4 h-4" />
                Listen to Audio Introduction
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Grid Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Academic & Languages */}
          <div className="space-y-4">
            <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-1.5">
                <Languages className="w-4 h-4" /> Languages Known & Written
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {scribe.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white text-navy font-semibold text-xs rounded-lg border border-ivory-border"
                  >
                    {lang} (Fluent)
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border">
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

            <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Handwriting Speed & Clarity
              </h3>
              <p className="text-sm font-semibold text-navy">{scribe.handwritingSpeed}</p>
              <p className="text-xs text-gray-600 mt-1">Verified during Sahpathi Scribe Onboarding.</p>
            </div>
          </div>

          {/* Right Column: Verification & Ethics */}
          <div className="space-y-4">
            <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border">
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

            <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Past Experience & Badges
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
        <div className="bg-ivory-light p-5 rounded-2xl border border-ivory-border">
          <h3 className="text-sm font-bold text-navy mb-2">Volunteer Introduction</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{scribe.bio}</p>
        </div>

        {/* Bottom Booking Action CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ivory-border">
          <button
            onClick={() => navigateTo('available-scribes')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-navy text-navy font-bold text-sm hover:bg-navy hover:text-ivory transition-colors"
          >
            ← Back to Scribe List
          </button>

          <button
            onClick={() => handleBookScribe(scribe)}
            className="w-full sm:w-auto px-8 py-4 bg-teal hover:bg-teal-dark active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all focus:ring-4 focus:ring-amber"
            aria-label={`Request ${scribe.name} for your examination`}
          >
            <Calendar className="w-5 h-5 text-amber" />
            Request This Scribe for Examination
          </button>
        </div>
      </div>
    </div>
  );
}

