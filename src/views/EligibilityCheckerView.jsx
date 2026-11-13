import React, { useState } from 'react';
import { 
  UserCheck, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Volume2, 
  Clock, 
  Download,
  RotateCcw
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';

export function EligibilityCheckerView() {
  const { speakText, triggerSound } = useAccessibility();
  const { navigateTo } = useApp();

  const [step, setStep] = useState(1);
  const [examBoard, setExamBoard] = useState('CBSE');
  const [disabilityType, setDisabilityType] = useState('Visual Impairment (Blindness 100%)');
  const [hasUdid, setHasUdid] = useState('Yes');
  const [scribePreference, setScribePreference] = useState('Own Scribe (via Sahpathi)');
  const [resultReady, setResultReady] = useState(false);

  const handleNext = () => {
    triggerSound('click');
    if (step < 4) {
      setStep(step + 1);
    } else {
      setResultReady(true);
      triggerSound('success');
      speakText('Eligibility evaluation completed. You are 100 percent eligible for an examination scribe and compensatory time under RPwD Act guidelines.');
    }
  };

  const handleReset = () => {
    triggerSound('click');
    setStep(1);
    setResultReady(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Interactive Compliance Wizard
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-2">
              Scribe Eligibility Checker
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-1">
              Verify your scribe eligibility rules and documentation requirements for CBSE, UPSC, NTA, or Universities.
            </p>
          </div>

          <button
            onClick={() => speakText('Scribe Eligibility Checker. Answer 4 quick questions to see your exact documentation checklist and scribe entitlement rules.')}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to eligibility checker guide"
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Guide</span>
          </button>
        </div>
      </div>

      {!resultReady ? (
        <div className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-10 shadow-xl space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 border-b border-ivory-border pb-3">
            <span>Question {step} of 4</span>
            <span className="text-teal font-extrabold">{step * 25}% Completed</span>
          </div>

          {/* Question 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy">
                1. Which examination authority or board are you appearing for?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { id: 'CBSE', label: 'Central Board of Secondary Education (CBSE Class 10 / 12)' },
                  { id: 'UPSC', label: 'Union Public Service Commission (UPSC Civil Services)' },
                  { id: 'NTA', label: 'National Testing Agency (JEE, NEET, UGC-NET, CUET)' },
                  { id: 'SSC', label: 'Staff Selection Commission (SSC CGL / CHSL)' },
                  { id: 'University', label: 'State / Central University Semester Exams' },
                  { id: 'StateBoard', label: 'State Secondary / Higher Secondary Board' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setExamBoard(item.id); triggerSound('click'); }}
                    className={`p-3.5 rounded-xl border-2 text-left font-bold transition-all ${
                      examBoard === item.id
                        ? 'border-teal bg-teal-soft text-navy ring-1 ring-teal'
                        : 'border-ivory-border text-gray-700 hover:border-teal/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy">
                2. What is your benchmark disability category?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  'Visual Impairment (Blindness 100%)',
                  'Low Vision (Partial Vision / 40% to 80%)',
                  'Locomotor Disability affecting Writing Hand',
                  'Cerebral Palsy / Dyslexia with writing difficulty'
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setDisabilityType(item); triggerSound('click'); }}
                    className={`p-3.5 rounded-xl border-2 text-left font-bold transition-all ${
                      disabilityType === item
                        ? 'border-teal bg-teal-soft text-navy ring-1 ring-teal'
                        : 'border-ivory-border text-gray-700 hover:border-teal/50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy">
                3. Do you have a Unique Disability ID (UDID Card) or Medical Certificate?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { id: 'Yes', label: 'Yes, I have a valid digital UDID Card issued by GoI' },
                  { id: 'HospitalCert', label: 'I have a Govt Hospital Medical Certificate (40%+)' },
                  { id: 'Pending', label: 'UDID application is currently in process / Pending' },
                  { id: 'NeedHelp', label: 'No, I need assistance obtaining a certificate' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setHasUdid(item.id); triggerSound('click'); }}
                    className={`p-3.5 rounded-xl border-2 text-left font-bold transition-all ${
                      hasUdid === item.id
                        ? 'border-teal bg-teal-soft text-navy ring-1 ring-teal'
                        : 'border-ivory-border text-gray-700 hover:border-teal/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy">
                4. What is your preferred scribe arrangement method?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { id: 'Own Scribe (via Sahpathi)', label: 'Arranging my own verified scribe via Sahpathi (Recommended)' },
                  { id: 'Centre Provided', label: 'Request examination centre to provide an assigned scribe' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setScribePreference(item.id); triggerSound('click'); }}
                    className={`p-3.5 rounded-xl border-2 text-left font-bold transition-all ${
                      scribePreference === item.id
                        ? 'border-teal bg-teal-soft text-navy ring-1 ring-teal'
                        : 'border-ivory-border text-gray-700 hover:border-teal/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-ivory-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl border-2 border-navy text-navy font-bold text-xs hover:bg-navy hover:text-ivory transition-colors"
              >
                ← Previous
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-teal hover:bg-teal-dark text-white font-extrabold text-sm shadow-md flex items-center gap-2"
            >
              <span>{step === 4 ? 'Check My Eligibility' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 text-amber" />
            </button>
          </div>
        </div>
      ) : (
        /* Result Summary Card */
        <div className="bg-white rounded-3xl border-2 border-green-500 p-6 sm:p-10 shadow-xl space-y-6 animate-in fade-in zoom-in-95">
          <div className="flex items-center space-x-3 pb-4 border-b border-ivory-border">
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center font-bold">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold text-green-700 tracking-wider">Verification Complete</span>
              <h2 className="text-2xl font-extrabold text-navy">
                You are Fully Eligible for a Scribe & Extra Time
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 space-y-2 text-green-950">
              <p className="font-bold text-sm">✅ Entitlement Verdict ({examBoard}):</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Compensatory Time:</strong> 20 minutes additional time per hour (e.g. +60 minutes for a 3-hour exam).</li>
                <li><strong>Choice of Scribe:</strong> Absolute right to engage your own scribe or choose a Sahpathi volunteer under SC directive (Vikash Kumar v. UPSC 2021).</li>
                <li><strong>Scribe Qualification Rule:</strong> Scribe must not possess qualification higher than one grade below candidate qualification in technical streams where mandated.</li>
              </ul>
            </div>

            {/* Document Checklist */}
            <div className="bg-ivory-light p-5 rounded-2xl border border-ivory-border space-y-3">
              <h3 className="font-bold text-navy text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal" /> Required Documents to Present at Exam Centre:
              </h3>
              <ul className="text-xs space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Original UDID Card or Medical Certificate showing benchmark disability 40%+.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Candidate Examination Admit Card with Scribe Opt-in marked.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Government Photo ID of the Volunteer Scribe (Aadhaar / Voter ID).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Two passport size colour photographs of the assigned scribe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span>Signed Form-I / Scribe Declaration Undertaking Form.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-ivory-border">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-navy flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Check Another Exam
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => navigateTo('document-assistance')}
                className="px-4 py-2.5 bg-white border-2 border-teal text-teal-dark font-bold text-xs rounded-xl hover:bg-teal-soft"
              >
                Download Form-I Template
              </button>
              <button
                onClick={() => navigateTo('find-scribe')}
                className="px-5 py-2.5 bg-teal hover:bg-teal-dark text-white font-extrabold text-xs rounded-xl shadow"
              >
                Book Scribe Now →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

