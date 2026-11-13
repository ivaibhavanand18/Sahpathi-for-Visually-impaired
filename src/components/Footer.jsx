import React from 'react';
import { ShieldCheck, Heart, Phone, Mail, MapPin, ExternalLink, HelpCircle, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAccessibility } from '../context/AccessibilityContext';

export function Footer() {
  const { navigateTo } = useApp();
  const { speakText } = useAccessibility();

  return (
    <footer
      aria-label="Footer and Accessibility Information"
      className="bg-navy-dark text-ivory/90 border-t-4 border-amber pt-12 pb-8 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-700">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-ivory overflow-hidden flex items-center justify-center border-2 border-amber shadow-sm shrink-0">
                <img
                  src="/sahpathi-logo.avif"
                  alt="Sahpathi Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-ivory">SAHPATHI</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Your Examination. Your Independence. Our Support.
              An accessibility-focused digital platform connecting blind and visually impaired students with eligible, verified volunteer scribes across India.
            </p>
            <div className="pt-2 text-xs text-amber space-y-1">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                Compliant with RPwD Act 2016 & Supreme Court Scribe Directives
              </p>
              <p className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                100% Free Social Impact Community Platform
              </p>
            </div>
          </div>

          {/* Col 3: Student Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber mb-3">Student Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('find-scribe')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Find a Scribe (Book Scribe)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('available-scribes')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Browse Available Volunteers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Student Dashboard & Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('eligibility-checker')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Scribe Eligibility Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('document-assistance')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Disability & Form-I Downloads
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Volunteer Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber mb-3">Volunteer Scribes</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('volunteer-register')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Register as a Volunteer
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('guidelines')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Scribe Ethics & Conduct Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Volunteer Dashboard & Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => speakText('Volunteer Recognition Programme provides official certificates and college social internship credits.')}
                  className="hover:text-amber transition-colors text-left"
                >
                  Certificate & Recognition
                </button>
              </li>
              <li>
                <button
                  onClick={() => speakText('Institutional & College partnerships allow university student unions to adopt Sahpathi chapters.')}
                  className="hover:text-amber transition-colors text-left"
                >
                  College Chapters & NGO Partners
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Help & Emergency */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber mb-3">Emergency & Help</h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="p-3 bg-navy rounded-lg border border-red-500/40">
                <p className="font-bold text-white flex items-center gap-1.5 text-xs text-red-300">
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  National Scribe SOS Helpline:
                </p>
                <p className="text-sm font-bold text-amber mt-1">1800-SAHPATHI (Toll Free)</p>
                <p className="text-[11px] text-gray-400">Available 24x7 for examination crises</p>
              </div>

              <p className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-teal" />
                support@sahpathi-accessibility.org
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal" />
                New Delhi • Mumbai • Kolkata • Bengaluru
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accessibility Commitment */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 SAHPATHI Platform. Accessibility-First Digital Initiative for Visually Impaired Students.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('accessibility-settings')}
              className="text-amber hover:underline font-semibold"
            >
              Accessibility Statement & Settings
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('guidelines')}
              className="hover:text-white"
            >
              Examination Protocols
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('help-support')}
              className="hover:text-white"
            >
              FAQs & Grievance Redressal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

