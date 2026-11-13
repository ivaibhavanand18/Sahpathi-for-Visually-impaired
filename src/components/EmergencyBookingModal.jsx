import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, CheckCircle, ShieldAlert, X, Send } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';

export function EmergencyBookingModal({ isOpen, onClose }) {
  const { speakText, triggerSound } = useAccessibility();
  const { showToast, scribes, setBookings, bookings, setLatestBooking, setActiveTab } = useApp();

  const [examName, setExamName] = useState('Urgent Board Examination');
  const [examDate, setExamDate] = useState('Tomorrow');
  const [centreAddress, setCentreAddress] = useState('Main City Exam Centre');
  const [subject, setSubject] = useState('General Studies');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastDone, setBroadcastDone] = useState(false);

  if (!isOpen) return null;

  const handleBroadcast = (e) => {
    e.preventDefault();
    setIsBroadcasting(true);
    triggerSound('emergency');
    speakText('Emergency scribe alert broadcasted to 18 active verified volunteers within 10 kilometers.');

    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastDone(true);
      triggerSound('success');

      // Create an emergency booking
      const emergencyBooking = {
        id: `SP-SOS-${Math.floor(1000 + Math.random() * 9000)}`,
        examName: `[EMERGENCY SOS] ${examName}`,
        subject: subject,
        examDate: 'Tomorrow Morning',
        examTime: '09:30 AM',
        centreName: centreAddress,
        centreAddress: centreAddress,
        city: 'Delhi NCR',
        candidateName: 'Rahul Verma',
        candidateDisability: 'Visual Impairment (100% Blindness)',
        scribe: scribes[0], // Auto-assigned emergency backup
        status: 'Emergency Scribe Assigned',
        statusDescription: 'Backup scribe Aarav Sharma accepted emergency SOS request. On standby.',
        bookedOn: new Date().toISOString().split('T')[0],
        specialAssistance: ['Urgent assistance', 'On-site coordination required']
      };

      setBookings([emergencyBooking, ...bookings]);
      setLatestBooking(emergencyBooking);
      showToast('Emergency scribe assigned! Scribe Aarav Sharma has confirmed availability.', 'success');
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-title"
      className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-ivory border-4 border-amber rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-700 hover:bg-gray-200"
          aria-label="Close emergency modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-red-600 text-white rounded-xl">
            <AlertTriangle className="w-7 h-7 animate-bounce" />
          </div>
          <div>
            <h2 id="sos-title" className="text-xl font-bold text-navy flex items-center gap-2">
              Emergency Scribe SOS
              <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-300">
                24-48h Urgent
              </span>
            </h2>
            <p className="text-xs text-gray-700">Rapid broadcast to verified on-call scribes in your city.</p>
          </div>
        </div>

        {!broadcastDone ? (
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div className="bg-amber-soft border-l-4 border-amber p-3 rounded-r-lg text-xs text-amber-950">
              <p className="font-semibold mb-1">When to use Emergency Scribe?</p>
              <p>Use this if your scheduled scribe cancelled at the last minute or your exam is within 48 hours. Our verified rapid-response volunteer pool is alerted immediately via SMS & WhatsApp.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1">Examination Name</label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                required
                className="w-full border-2 border-ivory-border focus:border-amber rounded-lg px-3 py-2 text-sm text-navy"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full border-2 border-ivory-border focus:border-amber rounded-lg px-3 py-2 text-sm text-navy"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy mb-1">Exam Date / Time</label>
                <input
                  type="text"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  required
                  className="w-full border-2 border-ivory-border focus:border-amber rounded-lg px-3 py-2 text-sm text-navy"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1">Examination Venue / Centre</label>
              <input
                type="text"
                value={centreAddress}
                onChange={(e) => setCentreAddress(e.target.value)}
                required
                className="w-full border-2 border-ivory-border focus:border-amber rounded-lg px-3 py-2 text-sm text-navy"
              />
            </div>

            <button
              type="submit"
              disabled={isBroadcasting}
              className={`w-full py-3 px-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                isBroadcasting
                  ? 'bg-gray-500 cursor-wait'
                  : 'bg-red-600 hover:bg-red-700 active:scale-95'
              }`}
            >
              {isBroadcasting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Broadcasting SOS to Nearby Scribes...
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5" />
                  Broadcast Emergency SOS Request
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-green-100 border-2 border-green-500 text-green-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">Emergency Scribe Assigned!</h3>
              <p className="text-sm text-gray-700 mt-1">
                Volunteer <strong>Aarav Sharma</strong> has accepted your emergency request and has been sent your examination centre details.
              </p>
            </div>

            <div className="bg-ivory-light border border-ivory-border p-3 rounded-xl text-left text-xs space-y-1">
              <p><strong>Assigned Scribe:</strong> Aarav Sharma (Delhi University)</p>
              <p><strong>Mobile Helpline:</strong> +91 98765-43210 (Masked Proxy)</p>
              <p><strong>Status:</strong> Ready for tomorrow morning</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('booking-confirmation');
                }}
                className="flex-1 py-2.5 bg-teal text-white rounded-xl font-bold text-sm hover:bg-teal-dark"
              >
                View Booking Details
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-navy text-ivory rounded-xl text-sm font-medium hover:bg-navy-light"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

