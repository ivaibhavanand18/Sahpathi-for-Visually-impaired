import React, { useState } from 'react';
import { 
  HeartHandshake, 
  CheckCircle2, 
  ShieldCheck, 
  Upload, 
  BookOpen, 
  Clock, 
  Languages, 
  Volume2, 
  Award,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { INDIAN_CITIES, SUBJECT_STREAMS } from '../data/mockData';

export function VolunteerRegisterView() {
  const { handleRegisterVolunteer, navigateTo } = useApp();
  const { speakText, triggerSound, wireframeMode } = useAccessibility();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: 'Graduate in B.A. / B.Sc / B.Com',
    institution: 'Delhi University',
    city: 'Delhi NCR',
    location: 'North / South Campus',
    languages: ['English', 'Hindi'],
    subjects: ['General Studies', 'History', 'English Literature'],
    pastExperience: '2',
    handwritingSpeed: 'Fast & Highly Legible (35 wpm)',
    gender: 'Female',
    idType: 'Aadhaar Card',
    idNumber: '',
    agreedPledge: false,
    bio: 'Passionate student eager to contribute my handwriting and time to support visually impaired peers in examinations.'
  });

  const availableLangs = ['English', 'Hindi', 'Bengali', 'Marathi', 'Tamil', 'Telugu', 'Urdu', 'Gujarati'];
  const availableSubjs = ['English Literature', 'History', 'Political Science', 'Economics', 'Science & Physics', 'Mathematics', 'Commerce & Accountancy', 'General Studies', 'Law'];

  const handleToggleLang = (lang) => {
    triggerSound('click');
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleToggleSubj = (subj) => {
    triggerSound('click');
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subj)
        ? prev.subjects.filter(s => s !== subj)
        : [...prev.subjects, subj]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedPledge) {
      alert('Please read and accept the Scribe Honor Code & Ethics Pledge before submitting.');
      return;
    }
    handleRegisterVolunteer(formData);
  };

  const handleListenInstructions = () => {
    speakText('Become a Sahpathi Volunteer. Register to support visually impaired students during examinations. Fill in your name, contact details, educational qualification, languages, subjects you can write for, and accept the Scribe Ethics pledge.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen 06 – Volunteer Registration Form Wireframe Blueprint]
          </span>
          <span>Volunteer Onboarding & Credentials Capture</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Volunteer Network Enrollment
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-2">
              Become a Sahpathi Volunteer Scribe
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-1">
              "Your time and knowledge can make a difference." Empower visually impaired students to write exams with dignity.
            </p>
          </div>

          <button
            onClick={handleListenInstructions}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to volunteer registration instructions"
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Guide</span>
          </button>
        </div>
      </div>

      {/* Volunteer Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-10 shadow-xl space-y-8">
        {/* Personal Details */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-navy flex items-center gap-2 border-b border-ivory-border pb-2 w-full">
            <HeartHandshake className="w-5 h-5 text-teal" />
            1. Personal & Contact Information
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rohan Sen / Ananya Iyer"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. rohan.sen@university.edu.in"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Phone Number (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765-XXXXX"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                City / Region <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                {INDIAN_CITIES.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Preferred Area / Campus
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. South Delhi / Kothrud"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>
          </div>
        </fieldset>

        {/* Qualifications & Scribing Capabilities */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-navy flex items-center gap-2 border-b border-ivory-border pb-2 w-full">
            <BookOpen className="w-5 h-5 text-teal" />
            2. Academic Qualification & Writing Capabilities
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Current Qualification / Degree <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g. B.Sc. Physics (Final Year), M.A. English"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                College / University / Occupation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. St. Stephen's College / IIT Delhi"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Estimated Handwriting Speed
              </label>
              <select
                value={formData.handwritingSpeed}
                onChange={(e) => setFormData({ ...formData, handwritingSpeed: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                <option value="Very Fast (38+ wpm)">Very Fast (38+ wpm, UPSC / Essay ready)</option>
                <option value="Fast & Highly Legible (35 wpm)">Fast & Highly Legible (35 wpm)</option>
                <option value="Moderate & Neat (28-32 wpm)">Moderate & Neat (28-32 wpm)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Previous Scribe Experience (No. of exams)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.pastExperience}
                onChange={(e) => setFormData({ ...formData, pastExperience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              />
            </div>
          </div>

          {/* Languages selection */}
          <div>
            <label className="block text-xs font-bold uppercase text-navy mb-2">
              Languages Known & Written (Select all applicable) <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableLangs.map((lang, idx) => {
                const selected = formData.languages.includes(lang);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleLang(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      selected
                        ? 'bg-teal text-white border-teal shadow-sm'
                        : 'bg-ivory-light text-navy border-ivory-border hover:border-teal'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}{lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subjects willing to assist */}
          <div>
            <label className="block text-xs font-bold uppercase text-navy mb-2">
              Subjects You are Confident Writing For <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSubjs.map((subj, idx) => {
                const selected = formData.subjects.includes(subj);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleSubj(subj)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      selected
                        ? 'bg-amber text-navy border-amber shadow-sm'
                        : 'bg-ivory-light text-navy border-ivory-border hover:border-amber'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}{subj}
                  </button>
                );
              })}
            </div>
          </div>
        </fieldset>

        {/* Identity Verification Simulation */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-navy flex items-center gap-2 border-b border-ivory-border pb-2 w-full">
            <ShieldCheck className="w-5 h-5 text-teal" />
            3. Identity Verification & Trust Badge
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                Identity Document Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.idType}
                onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                className="w-full px-3 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm"
              >
                <option value="Aadhaar Card">Government Aadhaar Card</option>
                <option value="College Student ID Card">Official College Student ID Card</option>
                <option value="Voter ID Card">Voter ID Card (Election Commission)</option>
                <option value="Passport">Indian Passport</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                ID Document Number / Registration No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                placeholder="e.g. XXXX-XXXX-4921 / DU-ST-8819"
                className="w-full px-4 py-3 rounded-xl border-2 border-ivory-border focus:border-teal focus:outline-none text-navy text-sm font-mono"
              />
            </div>
          </div>

          <div className="p-4 border-2 border-dashed border-teal/50 rounded-2xl bg-teal-soft text-center text-xs text-navy space-y-1">
            <Upload className="w-6 h-6 text-teal mx-auto mb-1" />
            <p className="font-bold">Digital Document Upload (Simulated for College Demo)</p>
            <p className="text-gray-600">ID verification confirms your volunteer profile and unlocks the Verified Scribe badge.</p>
          </div>
        </fieldset>

        {/* Scribe Ethics Honor Code (Section 4.9 & 13) */}
        <div className="bg-amber-soft border-2 border-amber rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-navy font-bold text-sm">
            <Award className="w-5 h-5 text-amber-900" />
            <span>Sahpathi Scribe Honor Code & Ethics Pledge</span>
          </div>

          <p className="text-xs text-amber-950 leading-relaxed">
            "I pledge to serve with complete integrity. I will write strictly what the candidate dictates to me. I will not prompt, suggest answers, correct candidate errors, or solve problems independently. I understand that violating examination authority rules is a punishable offence."
          </p>

          <label className="flex items-start space-x-3 pt-2 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.agreedPledge}
              onChange={(e) => setFormData({ ...formData, agreedPledge: e.target.checked })}
              className="w-5 h-5 rounded border-2 border-amber text-teal focus:ring-teal mt-0.5"
            />
            <span className="text-xs font-bold text-navy">
              I have read and solemnly agree to the Sahpathi Scribe Ethics Code & Non-Interference Examination Protocol.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-4 px-6 bg-teal hover:bg-teal-dark active:scale-[0.99] text-white font-extrabold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all focus:ring-4 focus:ring-amber"
            aria-label="Submit volunteer registration"
          >
            <Sparkles className="w-6 h-6 text-amber" />
            <span>Complete Volunteer Registration</span>
          </button>
        </div>
      </form>
    </div>
  );
}

