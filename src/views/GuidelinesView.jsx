import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Volume2, 
  Scale, 
  AlertTriangle 
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { EXAMINATION_GUIDELINES } from '../data/mockData';

export function GuidelinesView() {
  const { speakText, triggerSound } = useAccessibility();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Examination Governance & Standards
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-2">
              Scribe Guidelines & Writing Protocols
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-1">
              Official protocols ensuring examination integrity, candidate autonomy, and compliance with MoSJE and Supreme Court rulings.
            </p>
          </div>

          <button
            onClick={() => speakText('Scribe Guidelines and Writing Protocols. Explaining compensatory time entitlements, candidate freedom of choice, and scribe non-interference code.')}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to guidelines overview"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Key Legal Rulings & Directives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMINATION_GUIDELINES.map((guide, idx) => (
            <div key={idx} className="bg-white rounded-2xl border-2 border-ivory-border p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-teal bg-teal-soft px-2 py-0.5 rounded">
                {guide.ruleRef}
              </span>
              <h2 className="text-base font-bold text-navy">{guide.title}</h2>
              <p className="text-xs text-gray-700 leading-relaxed">{guide.content}</p>
            </div>
          ))}
        </div>

        {/* What a Scribe CAN and CANNOT Do */}
        <div className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-8 shadow-md space-y-6">
          <h2 className="text-xl font-extrabold text-navy flex items-center gap-2">
            <Scale className="w-6 h-6 text-teal" />
            Scribe Code of Conduct: Permitted vs Prohibited Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Permitted */}
            <div className="bg-green-50/80 border-2 border-green-400 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-green-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-700" />
                Permitted & Required Actions
              </h3>
              <ul className="space-y-2 text-green-950 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Write or type words, numbers, and symbols exactly as dictated by the candidate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Read aloud question paper text, instructions, and multiple-choice options upon candidate request.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Draw diagrams, graphs, circuits, or geometric shapes following the candidate's explicit step-by-step description.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Read back the candidate's written answers for verification and proofreading before final submission.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Inform candidate of elapsed and remaining examination time.</span>
                </li>
              </ul>
            </div>

            {/* Prohibited */}
            <div className="bg-red-50/80 border-2 border-red-400 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-red-900 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-700" />
                Strictly Prohibited Violations
              </h3>
              <ul className="space-y-2 text-red-950 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold">•</span>
                  <span>Offering hints, clues, prompting, or indicating whether an answer is correct or incorrect.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold">•</span>
                  <span>Correcting spelling, grammatical errors, or factual mistakes unless specifically told to edit by the candidate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold">•</span>
                  <span>Explaining the meaning of examination questions or interpreting questions beyond reading them verbatim.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold">•</span>
                  <span>Possessing unauthorized electronic devices, smartwatches, or textbooks inside the exam hall.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compensatory Time Calculator Info */}
        <div className="bg-amber-soft border-2 border-amber rounded-2xl p-6 text-xs text-amber-950 space-y-3">
          <div className="flex items-center space-x-2 font-bold text-sm text-navy">
            <Clock className="w-5 h-5 text-amber-900" />
            <span>Compensatory Time Quick Chart (20 mins per hour)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
            <div className="bg-white p-3 rounded-xl border border-amber/40">
              <p className="font-bold text-navy">1 Hour Exam</p>
              <p className="text-teal font-extrabold text-sm">+20 Minutes</p>
              <p className="text-[10px] text-gray-500">Total: 80 Mins</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber/40">
              <p className="font-bold text-navy">2 Hour Exam</p>
              <p className="text-teal font-extrabold text-sm">+40 Minutes</p>
              <p className="text-[10px] text-gray-500">Total: 160 Mins</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber/40">
              <p className="font-bold text-navy">3 Hour Exam</p>
              <p className="text-teal font-extrabold text-sm">+60 Minutes</p>
              <p className="text-[10px] text-gray-500">Total: 240 Mins</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber/40">
              <p className="font-bold text-navy">4 Hour Exam</p>
              <p className="text-teal font-extrabold text-sm">+80 Minutes</p>
              <p className="text-[10px] text-gray-500">Total: 320 Mins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

