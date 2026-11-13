import React, { useState } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AppProvider, useApp } from './context/AppContext';
import { AccessibilityBar } from './components/AccessibilityBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { PreExamChatModal } from './components/PreExamChatModal';
import { EmergencyBookingModal } from './components/EmergencyBookingModal';

// Views
import { HomeView } from './views/HomeView';
import { FindScribeView } from './views/FindScribeView';
import { AvailableScribesView } from './views/AvailableScribesView';
import { ScribeProfileView } from './views/ScribeProfileView';
import { BookingConfirmationView } from './views/BookingConfirmationView';
import { VolunteerRegisterView } from './views/VolunteerRegisterView';
import { DashboardView } from './views/DashboardView';
import { AccessibilitySettingsView } from './views/AccessibilitySettingsView';
import { GuidelinesView } from './views/GuidelinesView';
import { EligibilityCheckerView } from './views/EligibilityCheckerView';
import { DocumentAssistanceView } from './views/DocumentAssistanceView';
import { HelpSupportView } from './views/HelpSupportView';
import { ExamCentresView } from './views/ExamCentresView';

function MainAppContent() {
  const { activeTab, isChatOpen, setIsChatOpen, isEmergencyOpen, setIsEmergencyOpen } = useApp();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'find-scribe':
        return <FindScribeView />;
      case 'available-scribes':
        return <AvailableScribesView />;
      case 'scribe-profile':
        return <ScribeProfileView />;
      case 'booking-confirmation':
        return <BookingConfirmationView />;
      case 'volunteer-register':
        return <VolunteerRegisterView />;
      case 'dashboard':
        return <DashboardView />;
      case 'accessibility-settings':
        return <AccessibilitySettingsView onOpenVoiceModal={() => setIsVoiceModalOpen(true)} />;
      case 'guidelines':
        return <GuidelinesView />;
      case 'eligibility-checker':
        return <EligibilityCheckerView />;
      case 'document-assistance':
        return <DocumentAssistanceView />;
      case 'exam-centres':
        return <ExamCentresView />;
      case 'help-support':
        return <HelpSupportView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Top Accessibility Bar */}
      <AccessibilityBar onOpenVoiceAssistant={() => setIsVoiceModalOpen(true)} />

      {/* Main Accessible Navigation */}
      <Navbar />

      {/* Main Landmark for Screen Readers and Keyboard Skip Links */}
      <main id="main-content" tabIndex="-1" className="flex-1 focus:outline-none">
        {renderActiveView()}
      </main>

      {/* Comprehensive Accessible Footer */}
      <Footer />

      {/* Persistent Modals */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

      <PreExamChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <EmergencyBookingModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AccessibilityProvider>
  );
}

