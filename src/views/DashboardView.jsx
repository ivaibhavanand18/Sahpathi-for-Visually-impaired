import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Search, 
  HelpCircle, 
  Bell, 
  FileText, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  Download,
  AlertTriangle,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { CertificateModal } from '../components/CertificateModal';

export function DashboardView() {
  const { 
    userRole, 
    setUserRole, 
    bookings, 
    navigateTo, 
    setIsChatOpen, 
    handleAcceptRequest, 
    isCertificateOpen, 
    setIsCertificateOpen,
    scribes
  } = useApp();
  
  const { speakText, triggerSound, wireframeMode } = useAccessibility();

  const [activeTabSub, setActiveTabSub] = useState('upcoming'); // 'upcoming' | 'history'

  const upcomingBookings = bookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled');
  const pastBookings = bookings.filter(b => b.status === 'Completed');

  const handleListenDashboard = () => {
    if (userRole === 'student') {
      speakText(`Welcome to your Student Dashboard. You have ${upcomingBookings.length} upcoming examination bookings and ${pastBookings.length} previous bookings.`);
    } else {
      speakText('Welcome to your Volunteer Scribe Dashboard. You have logged 24 volunteering hours across 6 examinations.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen 07 – My Dashboard Wireframe Blueprint]
          </span>
          <span>{userRole === 'student' ? 'Student View Layout' : 'Volunteer View Layout'}</span>
        </div>
      )}

      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
                Personal Control Center
              </span>
              <span className="text-xs bg-amber text-navy font-bold px-2.5 py-0.5 rounded-full">
                Role: {userRole === 'student' ? 'Student Candidate' : 'Volunteer Scribe'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy">
              Welcome to Sahpathi
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {userRole === 'student'
                ? 'Manage your examination requests, track assigned scribes, and coordinate exam day.'
                : 'Review examination assistance requests, manage your volunteer schedule, and download service certificates.'}
            </p>
          </div>

          {/* Switch Role + Speech Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-navy p-1 rounded-xl flex text-xs">
              <button
                onClick={() => {
                  triggerSound('click');
                  setUserRole('student');
                  speakText('Switched to Student Dashboard');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  userRole === 'student'
                    ? 'bg-teal text-white shadow'
                    : 'text-ivory hover:text-white'
                }`}
              >
                Student View
              </button>
              <button
                onClick={() => {
                  triggerSound('click');
                  setUserRole('volunteer');
                  speakText('Switched to Volunteer Dashboard');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  userRole === 'volunteer'
                    ? 'bg-amber text-navy shadow'
                    : 'text-ivory hover:text-white'
                }`}
              >
                Volunteer View
              </button>
            </div>

            <button
              onClick={handleListenDashboard}
              className="p-2 text-teal hover:bg-teal-soft rounded-xl border border-teal/20"
              title="Listen to dashboard overview"
              aria-label="Listen to dashboard overview"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Cards (Section 10.1 Screen 07 Specification) */}
        {userRole === 'student' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-ivory-border text-center">
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border">
              <p className="text-3xl font-extrabold text-navy">0{upcomingBookings.length}</p>
              <p className="text-xs font-bold text-teal mt-1">Upcoming Bookings</p>
            </div>
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border">
              <p className="text-3xl font-extrabold text-navy">0{pastBookings.length}</p>
              <p className="text-xs font-bold text-teal mt-1">Previous Bookings</p>
            </div>
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border">
              <p className="text-3xl font-extrabold text-navy">100%</p>
              <p className="text-xs font-bold text-teal mt-1">Scribe Coverage</p>
            </div>
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border">
              <p className="text-3xl font-extrabold text-navy">+20m</p>
              <p className="text-xs font-bold text-teal mt-1">Compensatory / Hour</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-ivory-border text-center">
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border">
              <p className="text-3xl font-extrabold text-navy">24 hrs</p>
              <p className="text-xs font-bold text-teal mt-1">Completed Volunteering</p>
            </div>
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border">
              <p className="text-3xl font-extrabold text-navy">06</p>
              <p className="text-xs font-bold text-teal mt-1">Exams Assisted</p>
            </div>
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border">
              <p className="text-3xl font-extrabold text-navy">5.0 ★</p>
              <p className="text-xs font-bold text-teal mt-1">Student Rating</p>
            </div>
            <div className="bg-ivory-light p-4 rounded-2xl border border-ivory-border">
              <p className="text-3xl font-extrabold text-navy">Level 2</p>
              <p className="text-xs font-bold text-teal mt-1">Master Scribe Badge</p>
            </div>
          </div>
        )}
      </div>

      {/* DASHBOARD CONTENT BODY */}
      {userRole === 'student' ? (
        /* ================= STUDENT VIEW ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Bookings Feed (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tabs for Upcoming vs Past */}
            <div className="flex border-b border-ivory-border text-xs font-bold">
              <button
                onClick={() => setActiveTabSub('upcoming')}
                className={`pb-3 px-4 border-b-2 transition-all ${
                  activeTabSub === 'upcoming'
                    ? 'border-teal text-teal text-sm'
                    : 'border-transparent text-gray-500 hover:text-navy'
                }`}
              >
                Upcoming Examination ({upcomingBookings.length})
              </button>
              <button
                onClick={() => setActiveTabSub('history')}
                className={`pb-3 px-4 border-b-2 transition-all ${
                  activeTabSub === 'history'
                    ? 'border-teal text-teal text-sm'
                    : 'border-transparent text-gray-500 hover:text-navy'
                }`}
              >
                Previous Bookings ({pastBookings.length})
              </button>
            </div>

            {/* List */}
            {activeTabSub === 'upcoming' ? (
              <div className="space-y-4">
                {upcomingBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border-2 border-ivory-border hover:border-teal p-6 shadow-sm space-y-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ivory-border pb-3">
                      <div>
                        <span className="text-[11px] font-mono text-gray-500">Ref: {b.id}</span>
                        <h2 className="text-base sm:text-lg font-extrabold text-navy">{b.examName}</h2>
                        <span className="text-xs text-teal font-semibold">Subject: {b.subject}</span>
                      </div>
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-auto ${
                        b.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-amber-soft text-amber-900 border border-amber/40'
                      }`}>
                        ● {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                      <div className="space-y-1">
                        <p className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-teal" /> Date: <strong>{b.examDate}</strong>
                        </p>
                        <p className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-teal" /> Time: {b.examTime}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-teal" /> Venue: {b.centreName}
                        </p>
                        <p className="text-gray-500 text-[11px] pl-5">{b.city}</p>
                      </div>
                    </div>

                    {/* Assigned Scribe Cardlet */}
                    <div className="bg-ivory-light p-3 rounded-xl border border-ivory-border flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={b.scribe?.photo}
                          alt={b.scribe?.name}
                          className="w-10 h-10 rounded-full object-cover border border-amber"
                        />
                        <div>
                          <p className="text-xs font-bold text-navy flex items-center gap-1">
                            {b.scribe?.name}
                            <ShieldCheck className="w-3 h-3 text-green-600" />
                          </p>
                          <p className="text-[11px] text-gray-600">{b.scribe?.qualification}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsChatOpen(true)}
                        className="px-3 py-1.5 bg-teal hover:bg-teal-dark text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-ivory-border text-xs">
                      <button
                        onClick={() => navigateTo('booking-confirmation')}
                        className="font-bold text-teal hover:underline flex items-center gap-1"
                      >
                        View Booking Details →
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="text-gray-600 hover:text-navy flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Scribe Slip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {pastBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border-2 border-ivory-border p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-gray-500">Ref: {b.id}</span>
                        <h2 className="text-base font-bold text-navy">{b.examName}</h2>
                        <span className="text-xs text-gray-600">{b.examDate} • Scribe: {b.scribe?.name}</span>
                      </div>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                        Completed
                      </span>
                    </div>

                    {b.feedbackGiven && (
                      <div className="bg-ivory-light p-3 rounded-lg text-xs text-gray-700 italic border border-ivory-border">
                        "{b.feedbackGiven.comment}" — Rated {b.feedbackGiven.rating}★
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Access Sidebar (4 cols) (Section 10.1 Screen 07) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-teal">
                Quick Access
              </h2>

              <div className="space-y-2 text-xs font-semibold">
                <button
                  onClick={() => navigateTo('find-scribe')}
                  className="w-full text-left p-3 rounded-xl bg-ivory-light hover:bg-teal-soft border border-ivory-border hover:border-teal flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2 text-navy">
                    <Search className="w-4 h-4 text-teal" /> Find a Scribe
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <button
                  onClick={() => navigateTo('guidelines')}
                  className="w-full text-left p-3 rounded-xl bg-ivory-light hover:bg-teal-soft border border-ivory-border hover:border-teal flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2 text-navy">
                    <FileText className="w-4 h-4 text-teal" /> Scribe Guidelines & Protocols
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <button
                  onClick={() => navigateTo('accessibility-settings')}
                  className="w-full text-left p-3 rounded-xl bg-ivory-light hover:bg-teal-soft border border-ivory-border hover:border-teal flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2 text-navy">
                    <Bell className="w-4 h-4 text-teal" /> Accessibility Settings
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <button
                  onClick={() => navigateTo('help-support')}
                  className="w-full text-left p-3 rounded-xl bg-ivory-light hover:bg-teal-soft border border-ivory-border hover:border-teal flex items-center justify-between transition-all"
                >
                  <span className="flex items-center gap-2 text-navy">
                    <HelpCircle className="w-4 h-4 text-teal" /> Help & Support / FAQs
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Compensatory Time Card */}
            <div className="bg-amber-soft border-2 border-amber/50 rounded-2xl p-5 space-y-2 text-xs text-amber-950">
              <p className="font-bold text-sm text-navy">Your Right to Compensatory Time</p>
              <p className="leading-relaxed">
                As per Ministry of Social Justice guidelines, candidate Rahul Verma is entitled to <strong>60 additional minutes</strong> on a 3-hour exam paper.
              </p>
              <button
                onClick={() => navigateTo('guidelines')}
                className="text-xs font-bold text-teal underline block pt-1"
              >
                View MoSJE Scribe Order Copy →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= VOLUNTEER VIEW ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Incoming Student Requests Queue (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              <Users className="w-5 h-5 text-teal" /> Assigned Student Examination Requests
            </h2>

            <div className="space-y-4">
              {bookings.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border-2 border-ivory-border p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ivory-border pb-3">
                    <div>
                      <span className="text-xs font-mono text-gray-500">Request ID: {req.id}</span>
                      <h3 className="text-base font-bold text-navy">{req.examName}</h3>
                      <p className="text-xs text-teal font-semibold">Subject: {req.subject}</p>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full self-start ${
                      req.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-soft text-amber-900'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                    <div>
                      <p><strong>Candidate:</strong> {req.candidateName}</p>
                      <p className="text-gray-500 text-[11px]">{req.candidateDisability}</p>
                      <p className="mt-1"><strong>Date & Time:</strong> {req.examDate} • {req.examTime}</p>
                    </div>
                    <div>
                      <p><strong>Centre:</strong> {req.centreName}</p>
                      <p className="text-gray-500 text-[11px]">{req.centreAddress}</p>
                    </div>
                  </div>

                  {/* Accept / Decline actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ivory-border">
                    {req.status === 'Awaiting Volunteer Acceptance' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptRequest(req.id)}
                          className="px-4 py-2 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold shadow"
                        >
                          Accept Scribe Request ✓
                        </button>
                        <button
                          onClick={() => alert('Request deferred to standby volunteer.')}
                          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-medium"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" /> You have accepted this examination request!
                      </span>
                    )}

                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="px-3 py-1.5 bg-ivory-light hover:bg-teal-soft border border-ivory-border rounded-lg text-xs font-semibold text-navy flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-teal" /> Pre-Exam Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Recognition & Impact (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Volunteer Recognition
              </h3>

              <div className="bg-ivory-light p-4 rounded-xl border border-ivory-border text-center space-y-2">
                <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center mx-auto text-navy font-bold text-xl shadow">
                  🏆
                </div>
                <h4 className="font-bold text-navy text-sm">Master Scribe Certificate</h4>
                <p className="text-xs text-gray-600">
                  Awarded for 20+ verified examination volunteering hours.
                </p>
                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="w-full py-2 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold shadow"
                >
                  View & Download Certificate
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-ivory-border">
                  <span className="text-gray-600">Scribe Ethics Training</span>
                  <span className="font-bold text-green-700">Completed ✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-ivory-border">
                  <span className="text-gray-600">ID & Academic Check</span>
                  <span className="font-bold text-green-700">Verified ✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-ivory-border">
                  <span className="text-gray-600">Active Availability</span>
                  <span className="font-bold text-teal">On Standby</span>
                </div>
              </div>
            </div>

            <div className="bg-navy text-ivory rounded-2xl p-6 shadow-md space-y-3 text-xs">
              <h4 className="font-bold text-amber text-sm">Scribe Conduct Reminder</h4>
              <p className="text-gray-300 leading-relaxed">
                As a volunteer scribe, write strictly what the candidate dictates. Always carry your government photo ID and two passport photos to the examination centre.
              </p>
              <button
                onClick={() => navigateTo('guidelines')}
                className="text-amber font-bold underline"
              >
                Read Examination Scribe Manual →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        volunteerName={userRole === 'volunteer' ? 'Rohan Sen' : 'Aarav Sharma'}
        hours={24}
        examsCount={6}
      />
    </div>
  );
}

