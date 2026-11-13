import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle, 
  Menu, 
  X, 
  HeartHandshake, 
  Settings, 
  AlertCircle,
  FileText,
  UserCheck,
  MapPin,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAccessibility } from '../context/AccessibilityContext';

export function Navbar() {
  const { activeTab, navigateTo, userRole, setUserRole, setIsEmergencyOpen } = useApp();
  const { triggerSound, speakText, wireframeMode } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core navigation items displayed in the dedicated navigation bar
  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'find-scribe', label: 'Find a Scribe', icon: Search },
    { id: 'available-scribes', label: 'Available Scribes', icon: Users },
    { id: 'exam-centres', label: 'Exam Centres', icon: MapPin },
    { id: 'volunteer-register', label: 'Volunteer', icon: HeartHandshake },
    { id: 'dashboard', label: 'My Dashboard', icon: Calendar },
    { id: 'guidelines', label: 'Guidelines', icon: BookOpen },
    { id: 'eligibility-checker', label: 'Eligibility', icon: UserCheck },
    { id: 'document-assistance', label: 'Documents', icon: FileText },
    { id: 'help-support', label: 'Help & Support', icon: HelpCircle },
    { id: 'accessibility-settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tabId) => {
    navigateTo(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="bg-navy text-ivory border-b-2 border-amber/30 sticky top-9 z-30 shadow-lg"
    >
      {/* TIER 1: Brand & Priority Actions (Always 100% within Viewing Frame) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2.5 text-left focus:ring-2 focus:ring-amber p-1 rounded-lg"
              aria-label="Sahpathi Homepage"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-ivory overflow-hidden flex items-center justify-center border-2 border-amber shadow-sm shrink-0">
                <img
                  src="/sahpathi-logo.avif"
                  alt="Sahpathi Logo - Illustration of people with disabilities and volunteer scribes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-ivory flex items-center gap-2">
                  SAHPATHI
                  {wireframeMode && (
                    <span className="text-[9px] font-mono uppercase bg-yellow-400 text-black px-1.5 py-0.5 rounded font-bold border border-black">
                      [Wireframe]
                    </span>
                  )}
                </span>
                <span className="hidden sm:block text-[11px] text-amber font-medium tracking-wide">
                  Connecting Visually Impaired Students with Scribes
                </span>
              </div>
            </button>
          </div>

          {/* Right: Emergency SOS, Help & Support, Role Switcher (Guaranteed in viewing frame) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Quick Help & Support Button */}
            <button
              onClick={() => handleNavClick('help-support')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                activeTab === 'help-support'
                  ? 'bg-teal text-white border-teal shadow'
                  : 'bg-navy-light/70 hover:bg-navy-light text-ivory border-gray-600'
              }`}
              aria-label="Help and Support Center"
              title="Help & Support, FAQs, and Helpline"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber" />
              <span className="hidden md:inline">Help & Support</span>
              <span className="md:hidden">Help</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="bg-navy-dark p-0.5 sm:p-1 rounded-xl border border-gray-700 flex items-center text-[11px] sm:text-xs">
              <button
                onClick={() => {
                  setUserRole('student');
                  speakText('Switched to Student mode');
                }}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition-all ${
                  userRole === 'student'
                    ? 'bg-teal text-white font-bold shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
                aria-pressed={userRole === 'student'}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setUserRole('volunteer');
                  speakText('Switched to Volunteer mode');
                }}
                className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition-all ${
                  userRole === 'volunteer'
                    ? 'bg-amber text-navy font-bold shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
                aria-pressed={userRole === 'volunteer'}
              >
                Volunteer
              </button>
            </div>

            {/* High-Visibility Emergency SOS Button (Always Prominent at Top Right) */}
            <button
              onClick={() => {
                triggerSound('emergency');
                setIsEmergencyOpen(true);
              }}
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-extrabold px-3 sm:px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md border-2 border-red-300 focus:ring-4 focus:ring-amber shrink-0 animate-pulse"
              aria-label="Emergency Scribe Assistance within 24 to 48 hours"
            >
              <AlertCircle className="w-4 h-4 text-white shrink-0" />
              <span className="tracking-wide">Emergency SOS</span>
            </button>

            {/* Mobile / Compact Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-navy-light text-ivory hover:text-white focus:ring-2 focus:ring-amber ml-1"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle All Navigation Tabs"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* TIER 2: Dedicated Navigation Track for All Links */}
      <div className="hidden lg:block bg-navy-dark/95 border-t border-navy-light/60 py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-1 overflow-x-auto text-xs font-semibold py-0.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap focus:ring-2 focus:ring-amber ${
                    isActive
                      ? 'bg-teal text-white font-bold shadow-sm ring-1 ring-amber'
                      : 'text-ivory/85 hover:text-white hover:bg-navy-light'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-amber shrink-0" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (When Toggled) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-dark border-t-2 border-amber p-4 space-y-2 animate-in slide-in-from-top-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-1.5 text-xs pt-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-lg flex items-center gap-2 font-medium ${
                    isActive
                      ? 'bg-teal text-white font-bold'
                      : 'text-ivory bg-navy hover:bg-navy-light'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-amber shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
