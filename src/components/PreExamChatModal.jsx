import React, { useState } from 'react';
import { MessageSquare, Send, X, ShieldCheck, MapPin, Clock, Phone } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';

export function PreExamChatModal({ isOpen, onClose }) {
  const { speakText, triggerSound } = useAccessibility();
  const { chatMessages, handleSendChatMessage, userRole } = useApp();
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleSendChatMessage(inputText);
    setInputText('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
      className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
    >
      <div className="bg-ivory border-2 border-teal rounded-2xl max-w-2xl w-full h-[620px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Chat Header */}
        <div className="bg-navy text-ivory p-4 flex items-center justify-between border-b border-navy-light">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
                alt="Aarav Sharma"
                className="w-11 h-11 rounded-full object-cover border-2 border-amber"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-navy rounded-full" />
            </div>
            <div>
              <h2 id="chat-modal-title" className="font-bold text-base flex items-center gap-1.5">
                Aarav Sharma
                <span className="text-xs bg-teal text-white px-2 py-0.5 rounded-full font-medium">Assigned Scribe</span>
              </h2>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber" />
                CBSE Physics Exam • Kendriya Vidyalaya R.K. Puram
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => speakText('Calling Aarav Sharma at masked emergency number 9876543210')}
              className="p-2 bg-navy-light hover:bg-teal rounded-lg text-ivory text-xs flex items-center gap-1"
              aria-label="Direct helpline call"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-navy-light rounded-lg text-ivory"
              aria-label="Close chat modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Safety & Protocol Banner */}
        <div className="bg-amber-soft border-b border-amber/30 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
          <span className="flex items-center gap-1">
            ℹ️ <strong>Safety Reminder:</strong> Coordinate meeting location & documents. Scribes must never assist in solving exam questions.
          </span>
          <button
            onClick={() => speakText('Safety Reminder: Coordinate meeting location and documents. Scribes must strictly write dictation.')}
            className="text-xs underline font-bold"
          >
            Listen
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ivory-light">
          <div className="text-center my-2">
            <span className="bg-ivory-muted text-gray-600 text-xs px-3 py-1 rounded-full border border-ivory-border">
              Booking Ref: SP-2026-8842 • Exam on Nov 18, 2026
            </span>
          </div>

          {chatMessages.map((msg) => {
            const isMe = (userRole === 'student' && msg.role === 'student') || (userRole === 'volunteer' && msg.role === 'volunteer');
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[11px] text-gray-500 mb-0.5 px-1 font-medium">
                  {msg.sender} • {msg.time}
                </span>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-teal text-white rounded-tr-none'
                      : 'bg-white text-navy border border-ivory-border rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Meeting Location Quick Chips */}
        <div className="p-2 bg-ivory border-t border-ivory-border flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-semibold text-gray-600 shrink-0">Quick responses:</span>
          <button
            onClick={() => handleSendChatMessage('I will arrive 45 minutes early at Gate 1.')}
            className="px-2.5 py-1 bg-white hover:bg-teal-soft border border-ivory-border rounded-full shrink-0 text-navy"
          >
            📍 "I will arrive 45 mins early at Gate 1"
          </button>
          <button
            onClick={() => handleSendChatMessage('Please remember to bring your Aadhaar and college ID.')}
            className="px-2.5 py-1 bg-white hover:bg-teal-soft border border-ivory-border rounded-full shrink-0 text-navy"
          >
            🪪 "Bring Aadhaar & College ID"
          </button>
          <button
            onClick={() => handleSendChatMessage('I have the Scribe Undertaking Form printed.')}
            className="px-2.5 py-1 bg-white hover:bg-teal-soft border border-ivory-border rounded-full shrink-0 text-navy"
          >
            📄 "I have Scribe Undertaking Form ready"
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-ivory-border flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to coordinate exam day..."
            className="flex-1 border-2 border-ivory-border focus:border-teal rounded-xl px-4 py-2.5 text-sm text-navy focus:outline-none"
            aria-label="Type message to scribe"
          />
          <button
            type="submit"
            className="bg-navy hover:bg-navy-light text-ivory px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-colors focus:ring-2 focus:ring-amber"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

