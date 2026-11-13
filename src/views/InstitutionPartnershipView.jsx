import React, { useState } from 'react';
import { 
  Building2, 
  Handshake, 
  Award, 
  Users, 
  ShieldCheck, 
  CheckCircle, 
  Send, 
  FileText, 
  Volume2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';
import { PARTNER_INSTITUTIONS } from '../data/mockData';

export function InstitutionPartnershipView() {
  const { speakText, triggerSound, wireframeMode } = useAccessibility();
  const { showToast } = useApp();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [partnerData, setPartnerData] = useState({
    institutionName: '',
    institutionType: 'University Equal Opportunity Cell (EOC)',
    contactPerson: '',
    email: '',
    phone: '',
    city: 'Delhi NCR',
    estimatedVolunteers: '50-100 Students',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerSound('success');
    setFormSubmitted(true);
    showToast('Partnership application submitted! Our Institutional Relations Director will get in touch.', 'success');
    speakText('Partnership request submitted successfully. We are excited to collaborate with your institution.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen – College & NGO Collaboration Portal Wireframe Blueprint]
          </span>
          <span>Institutional Partnership & NSS Hours Accreditation</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Institutional Engagement & NSS Chapters
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-1">
              College & NGO Collaboration
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Partner with Sahpathi to establish campus scribe chapters, offer certified social internship credits, and support inclusive examinations.
            </p>
          </div>

          <button
            onClick={() => speakText('College and NGO Collaboration Portal. Partner with Sahpathi to establish university scribe chapters and award student volunteering hours.')}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to partnership overview"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </button>
        </div>

        {/* Impact Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-ivory-border text-center">
          <div className="bg-ivory-light p-3 rounded-xl border border-ivory-border">
            <p className="text-2xl sm:text-3xl font-extrabold text-navy">45+</p>
            <p className="text-xs font-bold text-teal mt-0.5">Partner Colleges & EOCs</p>
          </div>
          <div className="bg-ivory-light p-3 rounded-xl border border-ivory-border">
            <p className="text-2xl sm:text-3xl font-extrabold text-navy">1,200+</p>
            <p className="text-xs font-bold text-teal mt-0.5">NSS Volunteers Enrolled</p>
          </div>
          <div className="bg-ivory-light p-3 rounded-xl border border-ivory-border">
            <p className="text-2xl sm:text-3xl font-extrabold text-navy">4,500+</p>
            <p className="text-xs font-bold text-teal mt-0.5">Volunteering Hours Logged</p>
          </div>
          <div className="bg-ivory-light p-3 rounded-xl border border-ivory-border">
            <p className="text-2xl sm:text-3xl font-extrabold text-navy">100%</p>
            <p className="text-xs font-bold text-teal mt-0.5">UGC & NEP Aligned</p>
          </div>
        </div>
      </div>

      {/* Grid: Benefits & Partner Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left: Partner Showcase (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal" /> Featured Institutional Chapters
          </h2>

          <div className="space-y-4">
            {PARTNER_INSTITUTIONS.map((inst) => (
              <div
                key={inst.id}
                className="bg-white rounded-2xl border-2 border-ivory-border hover:border-teal p-5 shadow-sm space-y-3 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-ivory-light border border-ivory-border flex items-center justify-center text-2xl shrink-0 shadow-sm">
                      {inst.logo}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal bg-teal-soft px-2 py-0.5 rounded">
                        {inst.type}
                      </span>
                      <h3 className="text-base font-bold text-navy mt-0.5">{inst.name}</h3>
                      <p className="text-xs text-gray-500">{inst.city} • Coordinated by {inst.coordinator}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">{inst.description}</p>

                <div className="pt-2 border-t border-ivory-border flex items-center justify-between text-xs font-bold text-teal">
                  <span>👥 {inst.activeVolunteers} Active Volunteers</span>
                  <span>✍️ {inst.examsAssisted} Exams Written</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Partnership Benefits & Registration Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-navy text-ivory rounded-3xl p-6 shadow-xl border-4 border-amber space-y-4">
            <h2 className="text-lg font-bold text-amber flex items-center gap-2">
              <Handshake className="w-5 h-5" /> Why Partner with Sahpathi?
            </h2>

            <ul className="space-y-2.5 text-xs text-gray-200">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span><strong>NSS & NEP Credits:</strong> Standardized digital certificates acknowledging voluntary service hours for academic credits.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span><strong>Free Scribe Ethics Workshops:</strong> Interactive orientation for college students on examination protocols and notation dictation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span><strong>Dedicated Campus Chapter Dashboard:</strong> Manage volunteer rosters and track exams supported across your university.</span>
              </li>
            </ul>
          </div>

          {/* Partnership Form */}
          <div className="bg-white rounded-3xl border-2 border-teal p-6 shadow-md space-y-4">
            <h3 className="text-base font-bold text-navy border-b border-ivory-border pb-2">
              Register Institutional Partnership
            </h3>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-navy mb-1">
                    College / Institution / NGO Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerData.institutionName}
                    onChange={(e) => setPartnerData({ ...partnerData, institutionName: e.target.value })}
                    placeholder="e.g. Miranda House / St. Xavier's EOC"
                    className="w-full px-3 py-2 rounded-xl border border-ivory-border focus:border-teal text-navy text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Institution Type</label>
                  <select
                    value={partnerData.institutionType}
                    onChange={(e) => setPartnerData({ ...partnerData, institutionType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-ivory-border focus:border-teal text-navy text-xs"
                  >
                    <option value="University Equal Opportunity Cell (EOC)">University Equal Opportunity Cell (EOC)</option>
                    <option value="College NSS Unit / Student Union">College NSS Unit / Student Union</option>
                    <option value="Disability Advocacy NGO">Disability Advocacy NGO</option>
                    <option value="School / Examination Board Centre">School / Examination Board Centre</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-navy mb-1">
                      Faculty / Convener Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerData.contactPerson}
                      onChange={(e) => setPartnerData({ ...partnerData, contactPerson: e.target.value })}
                      placeholder="Dr. Rajesh Sharma"
                      className="w-full px-3 py-2 rounded-xl border border-ivory-border focus:border-teal text-navy text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy mb-1">Official Email</label>
                    <input
                      type="email"
                      required
                      value={partnerData.email}
                      onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                      placeholder="eoc@college.edu.in"
                      className="w-full px-3 py-2 rounded-xl border border-ivory-border focus:border-teal text-navy text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={partnerData.phone}
                    onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })}
                    placeholder="+91 98765-XXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-ivory-border focus:border-teal text-navy text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal hover:bg-teal-dark text-white rounded-xl font-bold text-xs shadow flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-3.5 h-3.5 text-amber" />
                  <span>Submit Partnership Proposal</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center space-y-1">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                <p className="font-bold text-navy text-sm">Partnership Proposal Received!</p>
                <p className="text-xs text-gray-600">
                  We will contact your institution to formalize the Sahpathi Chapter MOU.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

