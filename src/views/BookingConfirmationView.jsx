import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar, 
  FileText, 
  MessageSquare, 
  ArrowRight, 
  Download, 
  ShieldAlert, 
  Volume2, 
  Printer,
  Sparkles,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAccessibility } from '../context/AccessibilityContext';

export function BookingConfirmationView() {
  const { latestBooking, navigateTo, setIsChatOpen, handleAcceptRequest, bookings } = useApp();
  const { speakText, triggerSound, wireframeMode } = useAccessibility();

  const booking = latestBooking || bookings[0];
  const isAwaiting = booking?.status === 'Awaiting Volunteer Acceptance';

  const handleListenSummary = () => {
    if (!booking) return;
    speakText(`Booking request submitted. Reference number is ${booking.id}. Examination: ${booking.examName} on ${booking.examDate}. Scribe: ${booking.scribe?.name}. Status: ${booking.status}.`);
  };

  const handlePrintUndertaking = () => {
    triggerSound('success');
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen 05 – Booking Confirmation Wireframe Blueprint]
          </span>
          <span>Confirmation & Status Lifecycle</span>
        </div>
      )}

      {/* Main Status Header Card */}
      <div className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-10 shadow-xl space-y-8">
        <div className="text-center space-y-3 pb-6 border-b border-ivory-border">
          <div className="w-16 h-16 bg-teal text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-10 h-10 text-amber" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full inline-block">
            Step 3 of 3: Booking Request Dispatched
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-navy">
            Booking Request Submitted
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto">
            Your scribe booking request has been sent to <strong>{booking?.scribe?.name}</strong>. You will receive an instant notification once the volunteer confirms.
          </p>

          <div className="inline-flex items-center gap-2 bg-ivory-light border border-ivory-border px-4 py-2 rounded-xl text-sm font-mono text-navy font-bold">
            <span>Reference ID:</span>
            <span className="text-teal font-extrabold">{booking?.id}</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleListenSummary}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:underline"
              aria-label="Listen to booking summary"
            >
              <Volume2 className="w-4 h-4" /> Listen to Booking Summary
            </button>
          </div>
        </div>

        {/* Current Status Tracker Banner */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isAwaiting
            ? 'bg-amber-soft border-amber text-amber-950'
            : 'bg-green-50 border-green-500 text-green-950'
        }`}>
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className={`p-2.5 rounded-xl text-white shrink-0 ${isAwaiting ? 'bg-amber-dark' : 'bg-green-600'}`}>
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-xs uppercase font-extrabold tracking-wider">Current Request Status</p>
              <p className="text-base font-extrabold">{booking?.status}</p>
              <p className="text-xs text-gray-700 mt-0.5">{booking?.statusDescription}</p>
            </div>
          </div>

          {/* Interactive Simulation Button for evaluators / demo */}
          {isAwaiting && (
            <button
              onClick={() => handleAcceptRequest(booking.id)}
              className="px-4 py-2 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold shadow transition-all active:scale-95 shrink-0"
              title="Click to simulate volunteer accepting the request"
            >
              Simulate Volunteer Acceptance ✓
            </button>
          )}
        </div>

        {/* Booking Summary Card */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-navy border-b border-ivory-border pb-2">
            Booking & Examination Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border space-y-2">
              <span className="text-gray-500 font-bold uppercase text-[11px] block">Examination</span>
              <p className="font-bold text-navy text-base">{booking?.examName}</p>
              <p className="text-teal font-semibold">Subject: {booking?.subject}</p>
              <p className="flex items-center gap-1.5 text-gray-700">
                <Calendar className="w-4 h-4 text-teal" /> {booking?.examDate}
              </p>
              <p className="flex items-center gap-1.5 text-gray-700">
                <Clock className="w-4 h-4 text-teal" /> {booking?.examTime}
              </p>
            </div>

            <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border space-y-2">
              <span className="text-gray-500 font-bold uppercase text-[11px] block">Assigned Volunteer Scribe</span>
              <div className="flex items-center space-x-3">
                <img
                  src={booking?.scribe?.photo}
                  alt={booking?.scribe?.name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber"
                />
                <div>
                  <p className="font-bold text-navy text-base">{booking?.scribe?.name}</p>
                  <p className="text-xs text-gray-600">{booking?.scribe?.qualification}</p>
                  <p className="text-xs text-teal font-medium">{booking?.scribe?.languages?.join(', ')}</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 pt-1">
                <strong>Contact Protocol:</strong> Coordination via in-app chat & masked helpline.
              </p>
            </div>
          </div>

          {/* Venue & Meeting details */}
          <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border space-y-1 text-xs">
            <span className="text-gray-500 font-bold uppercase text-[11px] block">Examination Venue</span>
            <p className="font-bold text-navy text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal" /> {booking?.centreName}
            </p>
            <p className="text-gray-600 pl-5.5">{booking?.centreAddress}</p>
          </div>
        </div>

        {/* Examination Day Instructions & Mandatory Disclaimer (Section 4.5 & 13) */}
        <div className="bg-amber-soft border-2 border-amber/60 rounded-2xl p-5 space-y-3 text-xs text-amber-950">
          <div className="flex items-center space-x-2 font-bold text-sm text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-900 shrink-0" />
            <span>Important Examination Day Protocols:</span>
          </div>

          <ul className="space-y-1.5 list-disc list-inside">
            <li>
              <strong>Institutional Approval:</strong> A booking confirmation through Sahpathi facilitates voluntary scribe pairing. You must present the Scribe Undertaking Form (Form-I) to your examination centre superintendent as required by your examination board.
            </li>
            <li>
              <strong>Documents to Carry:</strong> Original Disability Certificate / UDID card, Candidate Admit Card, Scribe Photo ID, and 2 passport photos of the scribe.
            </li>
            <li>
              <strong>Arrival Time:</strong> Reach the examination centre minimum 45 minutes prior to verify seating and claim compensatory time (+20 mins/hour).
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ivory-border">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-5 py-3 bg-white hover:bg-teal-soft border-2 border-teal text-teal-dark font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-teal" />
              <span>Chat with Scribe</span>
            </button>

            <button
              onClick={handlePrintUndertaking}
              className="px-5 py-3 bg-white hover:bg-amber-soft border-2 border-amber text-navy font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-amber-dark" />
              <span>Download Scribe Undertaking (PDF)</span>
            </button>
          </div>

          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 bg-navy hover:bg-navy-light text-ivory font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>Go to My Dashboard</span>
            <ArrowRight className="w-4 h-4 text-amber" />
          </button>
        </div>
      </div>
    </div>
  );
}

