import React from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ExternalLink, 
  CheckCircle, 
  ShieldCheck, 
  HelpCircle,
  Volume2
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export function DocumentAssistanceView() {
  const { speakText, triggerSound } = useAccessibility();

  const handlePrintUndertaking = () => {
    triggerSound('success');
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Legal Documentation & Compliance
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-2">
              Document Assistance & Scribe Forms
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-1">
              Download standard Scribe Undertaking Form-I, UDID application guidelines, and examination centre annexures.
            </p>
          </div>

          <button
            onClick={() => speakText('Document Assistance and Scribe Forms. Learn about Swavlamban UDID disability certificates, download Form-I scribe declaration format, and view required exam day paperwork.')}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to document assistance overview"
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Guide</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Printable Form-I Preview Box */}
        <div className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ivory-border pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-teal bg-teal-soft px-2 py-0.5 rounded">
                Official MoSJE Annexure Format
              </span>
              <h2 className="text-lg font-bold text-navy mt-1">
                Form-I: Letter of Undertaking for Using Scribe
              </h2>
              <p className="text-xs text-gray-600">
                To be signed by candidate & volunteer scribe and submitted to the Centre Superintendent.
              </p>
            </div>

            <button
              onClick={handlePrintUndertaking}
              className="px-4 py-2.5 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>Print Form-I</span>
            </button>
          </div>

          {/* Form Printable Document Template */}
          <div className="border-2 border-gray-300 p-6 rounded-xl bg-ivory-light text-xs font-mono space-y-4 text-gray-900 leading-relaxed">
            <div className="text-center space-y-1 font-serif">
              <h3 className="font-bold text-sm uppercase">APPENDIX - I / SCRIBE UNDERTAKING FORM</h3>
              <p className="text-[11px] italic">Certificate Regarding Physical Limitation in an Examinee to Write</p>
            </div>

            <p>
              I, <span className="font-bold underline">Rahul Verma</span>, a candidate with <span className="font-bold underline">Visual Impairment (Total Blindness)</span>, Roll Number <span className="font-bold underline">26849204</span>, appearing for <span className="font-bold underline">CBSE Class 12 Board Examination</span> at centre <span className="font-bold underline">Kendriya Vidyalaya No. 1, R.K. Puram, New Delhi</span>, hereby declare that:
            </p>

            <ol className="list-decimal list-inside space-y-1 text-[11px]">
              <li>I am arranging my own scribe named <span className="font-bold underline">Aarav Sharma</span>, resident of <span className="font-bold underline">North Campus, Delhi</span>, whose qualification is <span className="font-bold underline">Graduate in B.Sc. Physics</span>.</li>
              <li>The scribe does not hold a qualification higher than the prescribed eligibility limits of the examination board.</li>
              <li>I understand that if at any stage it is found that the scribe does not satisfy the eligibility criteria or that malpractice occurred, my candidature shall stand cancelled.</li>
            </ol>

            <div className="grid grid-cols-2 gap-4 pt-6 text-[11px] border-t border-gray-300">
              <div>
                <p className="font-bold">Signature / Thumb Impression of Candidate:</p>
                <div className="h-10 mt-2 border-b border-dashed border-gray-400" />
                <p className="text-[10px] text-gray-500 mt-1">Date: 18 / 11 / 2026</p>
              </div>
              <div>
                <p className="font-bold">Signature of Volunteer Scribe:</p>
                <div className="h-10 mt-2 border-b border-dashed border-gray-400" />
                <p className="text-[10px] text-gray-500 mt-1">Date: 18 / 11 / 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* UDID & Medical Certificate Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-teal font-bold text-base">
              <ShieldCheck className="w-5 h-5" />
              <span>Swavlamban UDID Card</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              The Unique Disability ID (UDID) issued by the Ministry of Social Justice & Empowerment is accepted universally across all examination authorities without requiring separate state medical renewals.
            </p>
            <div className="bg-ivory-light p-3 rounded-xl border border-ivory-border text-xs space-y-1">
              <p><strong>Official Portal:</strong> swavlambancard.gov.in</p>
              <p><strong>Helpline:</strong> 1800-180-5125</p>
              <p><strong>Documents needed:</strong> Aadhaar Card, Passport photo, Eye Hospital Certificate</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-base">
              <HelpCircle className="w-5 h-5 text-amber-900" />
              <span>Temporary Hospital Certificate</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              If your UDID card is pending, an official Disability Certificate issued by the Chief Medical Officer (CMO), Civil Surgeon, or Medical Superintendent of a Government District Hospital is legally valid under the RPwD Act 2016.
            </p>
            <div className="bg-ivory-light p-3 rounded-xl border border-ivory-border text-xs space-y-1">
              <p><strong>Criteria:</strong> Benchmark disability minimum 40%</p>
              <p><strong>Format:</strong> Certificate of Physical Limitation to write</p>
              <p><strong>Validity:</strong> As per certificate expiry date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

