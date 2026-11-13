import React from 'react';
import { Award, Download, Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export function CertificateModal({ isOpen, onClose, volunteerName = "Rohan Sen", hours = 24, examsCount = 6 }) {
  const { speakText, triggerSound } = useAccessibility();

  if (!isOpen) return null;

  const handlePrint = () => {
    triggerSound('success');
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-title"
      className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white text-navy border-4 border-amber rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-700 hover:bg-gray-200"
          aria-label="Close certificate modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas */}
        <div className="border-8 border-double border-navy p-6 sm:p-8 bg-ivory-light text-center relative rounded-lg">
          <div className="absolute top-3 left-3 text-amber opacity-60">
            <Award className="w-10 h-10" />
          </div>
          <div className="absolute top-3 right-3 text-amber opacity-60">
            <Award className="w-10 h-10" />
          </div>

          <div className="inline-block bg-teal text-ivory text-xs uppercase tracking-widest font-bold px-4 py-1 rounded-full mb-3">
            Sahpathi Social Impact Initiative
          </div>

          <h1 id="cert-title" className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight font-serif">
            Certificate of Appreciation
          </h1>
          <p className="text-xs text-gray-600 mt-1 uppercase tracking-wider font-semibold">
            For Exemplary Service as an Accessible Examination Scribe
          </p>

          <div className="my-6">
            <p className="text-xs text-gray-500 italic">This certificate is proudly conferred upon</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-teal mt-1 font-serif underline decoration-amber decoration-2 underline-offset-4">
              {volunteerName}
            </h2>
            <p className="text-xs text-gray-700 mt-3 max-w-lg mx-auto leading-relaxed">
              in grateful recognition of their voluntary contribution of <strong>{hours} hours</strong> of examination writing assistance across <strong>{examsCount} public examinations</strong>, upholding the highest standards of accessibility, integrity, and equal educational rights for visually impaired students.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-navy/20 text-xs">
            <div>
              <p className="font-bold text-navy">Verified ID</p>
              <p className="text-gray-600 flex items-center justify-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-teal" /> DL-GOV-9842
              </p>
            </div>
            <div>
              <p className="font-bold text-navy">Issue Date</p>
              <p className="text-gray-600 text-[11px]">November 2026</p>
            </div>
            <div>
              <p className="font-bold text-navy">Certificate ID</p>
              <p className="text-gray-600 text-[11px]">SP-CERT-9821</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => speakText(`Certificate of Appreciation for ${volunteerName}, recognising ${hours} volunteering hours and ${examsCount} examinations.`)}
            className="text-xs text-teal font-semibold underline flex items-center gap-1"
          >
            🔊 Listen to Certificate
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-teal hover:bg-teal-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-navy hover:bg-navy-light text-ivory rounded-xl text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

