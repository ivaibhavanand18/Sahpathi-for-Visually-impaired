import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MessageSquare, 
  AlertTriangle, 
  Send, 
  CheckCircle,
  Volume2
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';

export function HelpSupportView() {
  const { speakText, triggerSound } = useAccessibility();
  const { setIsEmergencyOpen } = useApp();

  const [openFaq, setOpenFaq] = useState(0);
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    category: 'Examination Centre Issue',
    description: ''
  });

  const faqs = [
    {
      q: 'How far in advance should I request a scribe on Sahpathi?',
      a: 'We strongly recommend submitting your scribe request at least 7 to 14 days prior to your examination date. This allows sufficient time to coordinate with the volunteer, review subject notations (diagrams or formulas), and prepare the required Scribe Undertaking Form (Form-I).'
    },
    {
      q: 'Does a scribe receive payment or is it completely voluntary?',
      a: 'Sahpathi is a voluntary, non-commercial social impact platform. Volunteer scribes offer their time pro bono. However, where examination conducting bodies (e.g., UPSC, SSC) sanction official honorariums to scribes, the candidate may facilitate that compensation directly as per government rates.'
    },
    {
      q: 'What happens if my assigned scribe faces an emergency on exam morning?',
      a: 'Sahpathi provides an Emergency Scribe SOS feature. If a volunteer cancels, you can tap "Emergency SOS" to trigger an automated broadcast to on-call standby scribes located within 10 km of your exam venue.'
    },
    {
      q: 'Are scribes allowed to prompt or assist in solving exam questions?',
      a: 'No. Strictly prohibited. Scribes operate under a solemn non-interference pledge. They must write or type solely what the candidate dictates word-for-word, without prompting, advising, or modifying answers.'
    },
    {
      q: 'Can an examination centre refuse my chosen scribe?',
      a: 'Under the landmark Supreme Court judgment (Vikash Kumar v. UPSC, 2021) and MoSJE guidelines, candidates have the legal right to engage their own scribe. Examination centres cannot arbitrarily reject an eligible scribe who fulfills the board qualification criteria and carries Form-I.'
    }
  ];

  const handleToggleFaq = (index) => {
    triggerSound('click');
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    triggerSound('success');
    setIssueSubmitted(true);
    speakText('Your support grievance has been received. Ticket reference SP-TKT-9912 generated. Our support officer will reach out within 2 hours.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Student & Volunteer Support Desk
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-2">
              Help & Support Center
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-1">
              Find answers to common examination questions, contact our helpline, or submit an issue.
            </p>
          </div>

          <button
            onClick={() => speakText('Help and Support Center. Browse frequently asked questions about booking scribes, rules, or contact our 24x7 toll-free helpline.')}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to help center overview"
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Guide</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Rapid Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-navy text-ivory p-5 rounded-2xl border-2 border-amber space-y-2 shadow">
            <div className="flex items-center space-x-2 text-amber font-bold text-sm">
              <Phone className="w-4 h-4" />
              <span>Toll-Free Helpline</span>
            </div>
            <p className="text-xl font-extrabold text-white">1800-SAHPATHI</p>
            <p className="text-[11px] text-gray-300">Available 24x7 during examination season</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-ivory-border space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-teal font-bold text-sm">
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </div>
            <p className="text-sm font-bold text-navy truncate">support@sahpathi.org</p>
            <p className="text-[11px] text-gray-500">Average response time: 2 hours</p>
          </div>

          <div className="bg-red-50 p-5 rounded-2xl border-2 border-red-300 space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-red-700 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Exam Crisis SOS</span>
            </div>
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg shadow-sm"
            >
              Trigger Rapid SOS
            </button>
            <p className="text-[11px] text-red-800">For scribes within 24-48 hours</p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-8 shadow-md space-y-4">
          <h2 className="text-xl font-bold text-navy flex items-center gap-2 border-b border-ivory-border pb-3">
            <HelpCircle className="w-5 h-5 text-teal" /> Frequently Asked Questions
          </h2>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-ivory-border overflow-hidden transition-all"
                >
                  <button
                    onClick={() => handleToggleFaq(index)}
                    className="w-full p-4 text-left font-bold text-sm text-navy bg-ivory-light hover:bg-teal-soft flex items-center justify-between gap-4 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-ivory-border animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Report an Issue / Grievance Redressal Form */}
        <div className="bg-white rounded-3xl border-2 border-ivory-border p-6 sm:p-8 shadow-md space-y-4">
          <h2 className="text-xl font-bold text-navy border-b border-ivory-border pb-3">
            Report an Issue or Examination Centre Grievance
          </h2>

          {!issueSubmitted ? (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketData.name}
                    onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                    placeholder="Rahul Verma"
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-ivory-border focus:border-teal text-navy text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                    Category of Issue
                  </label>
                  <select
                    value={ticketData.category}
                    onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-ivory-border focus:border-teal text-navy text-sm"
                  >
                    <option value="Examination Centre Refusal / Difficulty">Examination Centre Refusal / Difficulty</option>
                    <option value="Scribe Punctuality or Conduct Issue">Scribe Punctuality or Conduct Issue</option>
                    <option value="Compensatory Time Refusal (+20m/h)">Compensatory Time Refusal (+20m/h)</option>
                    <option value="Technical or Profile Issue">Technical or Profile Issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-navy mb-1.5">
                  Describe the Issue
                </label>
                <textarea
                  rows={4}
                  required
                  value={ticketData.description}
                  onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                  placeholder="Please provide details including examination centre name, date, and superintendent response if applicable..."
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-ivory-border focus:border-teal text-navy text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-navy hover:bg-navy-light text-ivory font-bold text-sm rounded-xl flex items-center gap-2 shadow"
              >
                <Send className="w-4 h-4 text-amber" />
                <span>Submit Grievance Ticket</span>
              </button>
            </form>
          ) : (
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
              <p className="font-bold text-navy text-base">Grievance Ticket SP-TKT-9912 Logged</p>
              <p className="text-xs text-gray-600">
                Our accessibility compliance legal officer will contact the examination superintendent or assist you within 2 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

