import React, { createContext, useContext, useState } from 'react';
import { INITIAL_SCRIBES, INITIAL_BOOKINGS } from '../data/mockData';
import { useAccessibility } from './AccessibilityContext';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { announceLive, triggerSound, speakText } = useAccessibility();

  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('student'); // 'student' | 'volunteer'
  const [scribes, setScribes] = useState(INITIAL_SCRIBES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [selectedScribe, setSelectedScribe] = useState(INITIAL_SCRIBES[0]);
  const [latestBooking, setLatestBooking] = useState(INITIAL_BOOKINGS[0]);

  // Current examination criteria entered by student
  const [examCriteria, setExamCriteria] = useState({
    examName: 'CBSE Class 12 Board Examination',
    examDate: '2026-11-18',
    timeSlot: '10:00 AM - 01:00 PM',
    durationHours: '3 Hours (+ 1 Hour Compensatory)',
    centreName: 'Kendriya Vidyalaya No. 1, R.K. Puram, New Delhi',
    city: 'Delhi NCR',
    stream: 'Science & STEM',
    subject: 'Physics',
    language: 'English',
    genderPreference: 'No preference',
    mode: 'In-person assistance',
    specialAssistance: ['Scientific diagrams dictation', 'Formula notation support']
  });

  // Filtered scribes based on criteria
  const [filteredScribes, setFilteredScribes] = useState(INITIAL_SCRIBES);

  // In-app chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Aarav Sharma (Volunteer Scribe)',
      role: 'volunteer',
      time: 'Yesterday, 04:30 PM',
      text: 'Hello Rahul! I have confirmed your booking for the CBSE Physics paper on Nov 18. I will meet you at Gate 2 of Kendriya Vidyalaya at 09:30 AM.'
    },
    {
      id: 2,
      sender: 'Rahul Verma (You)',
      role: 'student',
      time: 'Yesterday, 05:10 PM',
      text: 'Thank you Aarav! Please remember to bring your College ID card and 2 passport photos for the Scribe Undertaking Form at the centre.'
    },
    {
      id: 3,
      sender: 'Aarav Sharma (Volunteer Scribe)',
      role: 'volunteer',
      time: 'Yesterday, 05:15 PM',
      text: 'Absolutely! I have the Undertaking slip printed and my Aadhaar card ready. Looking forward to assisting you!'
    }
  ]);

  // Modals state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);

  // Navigate to tab helper
  const navigateTo = (tabName, payload = null) => {
    triggerSound('click');
    if (payload?.scribe) {
      setSelectedScribe(payload.scribe);
    }
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    announceLive(`Navigated to ${tabName.replace('-', ' ')} page.`);
  };

  const showToast = (message, type = 'info') => {
    setNotificationToast({ message, type });
    announceLive(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 4500);
  };

  // Perform scribe search
  const handleSearchScribes = (criteria) => {
    setExamCriteria(criteria);
    triggerSound('click');

    // Filter scribes matching language, subject, or city loosely
    const results = scribes.filter((s) => {
      const matchLang = criteria.language === 'Any' || s.languages.some(l => l.toLowerCase() === criteria.language.toLowerCase());
      const matchSubj = !criteria.subject || s.subjects.some(sub => sub.toLowerCase().includes(criteria.subject.toLowerCase()) || criteria.subject.toLowerCase().includes(sub.toLowerCase()));
      const matchCity = !criteria.city || s.city.toLowerCase().includes(criteria.city.toLowerCase()) || criteria.city.toLowerCase().includes(s.city.toLowerCase());
      const matchGender = criteria.genderPreference === 'No preference' || s.gender.toLowerCase() === criteria.genderPreference.toLowerCase();

      return (matchLang || matchSubj) && matchGender;
    });

    const finalResults = results.length > 0 ? results : scribes;
    setFilteredScribes(finalResults);
    setActiveTab('available-scribes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    announceLive(`Found ${finalResults.length} verified scribes matching your requirements.`);
    speakText(`Found ${finalResults.length} available scribes for ${criteria.subject || 'your examination'}.`);
  };

  // Book a scribe
  const handleBookScribe = (scribe, customNotes = '') => {
    triggerSound('success');
    const newBookingId = `SP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      id: newBookingId,
      examName: examCriteria.examName || 'Board Examination',
      subject: examCriteria.subject || 'General Studies',
      examDate: examCriteria.examDate || '2026-11-20',
      examTime: examCriteria.timeSlot || '10:00 AM - 01:00 PM',
      centreName: examCriteria.centreName || 'Examination Centre',
      centreAddress: examCriteria.centreName || 'Central Hall, University Enclave',
      city: examCriteria.city || 'Delhi NCR',
      candidateName: 'Rahul Verma',
      candidateDisability: 'Visual Impairment (100% Blindness, UDID: DL8492048)',
      scribe: scribe,
      status: 'Awaiting Volunteer Acceptance',
      statusDescription: 'Request sent to scribe. Notification dispatched to their mobile.',
      bookedOn: new Date().toISOString().split('T')[0],
      specialAssistance: examCriteria.specialAssistance || ['Dictation support', 'Seating assistance'],
      notes: customNotes
    };

    setBookings([newBooking, ...bookings]);
    setLatestBooking(newBooking);
    setActiveTab('booking-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Booking request ${newBookingId} submitted to ${scribe.name}!`, 'success');
    speakText(`Your scribe booking request has been sent to ${scribe.name}. Reference number ${newBookingId}.`);
  };

  // Register new volunteer
  const handleRegisterVolunteer = (volunteerData) => {
    triggerSound('success');
    const newVol = {
      id: `vol-${Date.now().toString().slice(-4)}`,
      name: volunteerData.name,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      qualification: volunteerData.qualification,
      institution: volunteerData.institution || 'Recognised University',
      languages: volunteerData.languages || ['English', 'Hindi'],
      subjects: volunteerData.subjects || ['General Studies'],
      experienceCount: parseInt(volunteerData.pastExperience) || 0,
      rating: 5.0,
      reviewsCount: 1,
      verifiedId: true,
      verifiedAcademic: true,
      codeOfConductSigned: true,
      location: volunteerData.location || 'Local Area',
      city: volunteerData.city || 'Delhi NCR',
      distanceKm: 2.5,
      handwritingSpeed: volunteerData.handwritingSpeed || 'Neat & Fast (35 wpm)',
      gender: volunteerData.gender || 'Not specified',
      availabilityStatus: 'Available',
      availableDates: ['2026-11-12', '2026-11-15', '2026-11-20', '2026-11-25'],
      bio: volunteerData.bio || 'Passionate volunteer dedicated to examination accessibility.',
      audioBio: `Hello, I am ${volunteerData.name}. I am excited to support visually impaired students.`,
      badges: ['Verified Volunteer 2026', 'Ethics Pledge Signed']
    };

    setScribes([newVol, ...scribes]);
    setUserRole('volunteer');
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Congratulations! You are now registered as a verified Sahpathi Scribe.', 'success');
    speakText(`Welcome to Sahpathi, ${volunteerData.name}. Your volunteer profile is now active.`);
  };

  // Volunteer accepts student request
  const handleAcceptRequest = (bookingId) => {
    triggerSound('success');
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'Confirmed',
          statusDescription: 'Request accepted by volunteer! Scribe Undertaking Form is ready.'
        };
      }
      return b;
    }));
    showToast('Booking request accepted! Scribe Undertaking Form generated.', 'success');
    speakText('You have accepted the examination scribe request.');
  };

  // Add chat message
  const handleSendChatMessage = (text) => {
    if (!text.trim()) return;
    triggerSound('click');
    const newMsg = {
      id: Date.now(),
      sender: userRole === 'student' ? 'Rahul Verma (You)' : 'Aarav Sharma (Scribe)',
      role: userRole,
      time: 'Just now',
      text: text.trim()
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        navigateTo,
        userRole,
        setUserRole,
        scribes,
        filteredScribes,
        setFilteredScribes,
        selectedScribe,
        setSelectedScribe,
        latestBooking,
        setLatestBooking,
        bookings,
        setBookings,
        examCriteria,
        setExamCriteria,
        handleSearchScribes,
        handleBookScribe,
        handleRegisterVolunteer,
        handleAcceptRequest,
        chatMessages,
        handleSendChatMessage,
        isChatOpen,
        setIsChatOpen,
        isEmergencyOpen,
        setIsEmergencyOpen,
        isCertificateOpen,
        setIsCertificateOpen,
        showToast,
        notificationToast,
      }}
    >
      {/* Visual Toast Notification Banner */}
      {notificationToast && (
        <div
          role="alert"
          className="fixed bottom-6 right-6 z-50 max-w-md bg-navy text-ivory border-2 border-amber p-4 rounded-xl shadow-2xl flex items-start space-x-3 transition-all duration-300"
        >
          <div className="w-3 h-3 mt-1.5 rounded-full bg-amber animate-ping shrink-0" />
          <div className="flex-1 text-sm font-medium">
            {notificationToast.message}
          </div>
          <button
            onClick={() => setNotificationToast(null)}
            className="text-amber hover:text-ivory text-sm font-bold ml-2 underline"
            aria-label="Dismiss notification"
          >
            Dismiss
          </button>
        </div>
      )}
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

