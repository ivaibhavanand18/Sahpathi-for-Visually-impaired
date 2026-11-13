import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Award, 
  Volume2, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useApp } from '../context/AppContext';

export function ScribeTrainingView() {
  const { speakText, triggerSound, wireframeMode } = useAccessibility();
  const { showToast, setIsCertificateOpen } = useApp();

  const [activeModule, setActiveModule] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const modules = [
    {
      title: '1. The Non-Interference Principle',
      subtitle: 'Candidate dictates, scribe writes verbatim.',
      content: 'As a scribe, your handwriting is an assistive conduit for the candidate\'s intellect. You must write word-for-word what the candidate dictates. Never correct spelling or grammatical errors unless instructed. Never prompt, suggest synonyms, or hint whether an answer is correct or incorrect.',
      keyTakeaway: 'Rule of Thumb: Write only what you hear from the candidate, exactly as they dictate.'
    },
    {
      title: '2. Dictation Protocols for STEM & Formulas',
      subtitle: 'Equations, fractions, chemical reactions, and diagrams.',
      content: 'When a candidate dictates mathematical formulas or chemical equations, ask them to specify powers, subscripts, and fractions (e.g., "x squared plus y squared equals r squared"). For ray optics, biological cycles, or circuit diagrams, the candidate will describe the visual coordinates step-by-step.',
      keyTakeaway: 'Always read back the dictated equation or show the drawn figure for candidate verification.'
    },
    {
      title: '3. Compensatory Time & Invigilator Protocol',
      subtitle: 'Claiming +20 minutes per hour without conflict.',
      content: 'Visually impaired candidates with 40%+ benchmark disability are legally entitled to minimum 20 minutes compensatory time per hour. If an invigilator or hall supervisor attempts to collect the answer sheet early, politely present the Supreme Court judgment order and Scribe Undertaking Form Form-I. Request the Centre Superintendent if needed.',
      keyTakeaway: 'Remain calm, polite, and ensure the candidate receives their full compensatory time.'
    },
    {
      title: '4. Examination Day Punctuality & Etiquette',
      subtitle: 'Pre-exam meeting, documents checklist, and pacing.',
      content: 'Arrive minimum 45 minutes before exam commencement. Meet the candidate at the agreed gate. Ensure you carry your government photo ID, college ID, and 2 passport photos. Inform the candidate gently about time checkpoints (e.g. "1 hour remaining", "30 minutes remaining").',
      keyTakeaway: 'Punctuality and calmness reduce candidate anxiety by 90%.'
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      q: 'During the exam, the candidate makes an obvious spelling mistake in a history essay. What should you do?',
      options: [
        { text: 'Correct the spelling quietly without disturbing the candidate', correct: false },
        { text: 'Write the word exactly as dictated without altering it', correct: true },
        { text: 'Whisper the correct spelling to the candidate', correct: false }
      ],
      explanation: 'Scribes must never correct candidate errors independently. Write strictly as dictated.'
    },
    {
      id: 2,
      q: 'How much compensatory time is a visually impaired candidate entitled to for a 3-hour examination paper?',
      options: [
        { text: '30 minutes total', correct: false },
        { text: '60 minutes (20 minutes per hour of examination)', correct: true },
        { text: 'No extra time if they use a scribe', correct: false }
      ],
      explanation: 'Under MoSJE directives and Supreme Court rulings, candidates receive 20 minutes per hour whether they use a scribe or not.'
    },
    {
      id: 3,
      q: 'The invigilator rings the 3-hour bell and demands the candidate submit the paper, ignoring the compensatory hour. What should you do?',
      options: [
        { text: 'Immediately submit the paper to avoid conflict', correct: false },
        { text: 'Politely inform the invigilator about MoSJE Form-I and request the Centre Superintendent to verify', correct: true },
        { text: 'Shout at the invigilator in the hall', correct: false }
      ],
      explanation: 'Politely refer to the signed Form-I Scribe Declaration and request the Centre Superintendent to intervene.'
    }
  ];

  const handleSelectAnswer = (qId, optionIdx) => {
    triggerSound('click');
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleGradeQuiz = () => {
    triggerSound('click');
    let total = 0;
    quizQuestions.forEach(q => {
      const selected = quizAnswers[q.id];
      if (selected !== undefined && q.options[selected].correct) {
        total += 1;
      }
    });
    setScore(total);
    setQuizSubmitted(true);

    if (total === quizQuestions.length) {
      triggerSound('success');
      showToast('Congratulations! You passed the Scribe Ethics Quiz with 100%!', 'success');
      speakText('Congratulations! You answered all questions correctly and earned the Sahpathi Certified Scribe badge.');
    } else {
      speakText(`You scored ${total} out of ${quizQuestions.length}. Review the explanations and retry.`);
    }
  };

  const handleResetQuiz = () => {
    triggerSound('click');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Wireframe Marker */}
      {wireframeMode && (
        <div className="mb-4 p-3 bg-black text-white font-mono text-xs border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider">
            [Screen – Scribe Orientation & Ethics Certification Blueprint]
          </span>
          <span>Volunteer Training Modules & Scenario Evaluation</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border-2 border-ivory-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-soft px-3 py-1 rounded-full">
              Volunteer Accreditation Course
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy mt-1">
              Scribe Orientation & Ethics Training
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Master examination writing protocols, STEM dictation techniques, and earn your verified <strong>Sahpathi Certified Scribe</strong> badge.
            </p>
          </div>

          <button
            onClick={() => speakText('Scribe Orientation and Ethics Training. Complete 4 interactive modules on non-interference, diagram dictation, and compensatory time protocols.')}
            className="flex items-center gap-1.5 text-xs font-bold text-teal bg-teal-soft hover:bg-teal hover:text-white px-3.5 py-2 rounded-xl transition-colors border border-teal/20 shrink-0"
            aria-label="Listen to training course overview"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Module Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {modules.map((m, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveModule(idx); triggerSound('click'); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeModule === idx
                  ? 'bg-teal text-white shadow ring-2 ring-amber'
                  : 'bg-white text-navy border border-ivory-border hover:bg-ivory-light'
              }`}
            >
              Module {idx + 1}
            </button>
          ))}
        </div>

        {/* Active Module Card */}
        <div className="bg-white rounded-3xl border-2 border-teal p-6 sm:p-8 shadow-md space-y-4">
          <div className="border-b border-ivory-border pb-3">
            <span className="text-[11px] font-bold uppercase text-teal">Orientation Module {activeModule + 1} of 4</span>
            <h2 className="text-xl font-bold text-navy mt-1">{modules[activeModule].title}</h2>
            <p className="text-xs text-gray-500">{modules[activeModule].subtitle}</p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {modules[activeModule].content}
          </p>

          <div className="p-4 bg-amber-soft border-l-4 border-amber rounded-r-xl text-xs text-amber-950 font-semibold">
            {modules[activeModule].keyTakeaway}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => speakText(`${modules[activeModule].title}. ${modules[activeModule].content}. Key takeaway: ${modules[activeModule].keyTakeaway}`)}
              className="text-xs font-bold text-teal underline flex items-center gap-1"
            >
              <Volume2 className="w-4 h-4" /> Listen to Module
            </button>

            {activeModule < 3 ? (
              <button
                onClick={() => { setActiveModule(activeModule + 1); triggerSound('click'); }}
                className="px-4 py-2 bg-navy text-ivory rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <span>Next Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs font-bold text-green-700">All Modules Completed! Take the quiz below.</span>
            )}
          </div>
        </div>

        {/* Interactive Scenario Quiz */}
        <div className="bg-white rounded-3xl border-2 border-ivory-border p-6 sm:p-8 shadow-md space-y-6">
          <div className="border-b border-ivory-border pb-3">
            <span className="text-xs font-bold uppercase text-teal">Certification Evaluation</span>
            <h3 className="text-xl font-bold text-navy mt-0.5">Scribe Ethics & Conduct Scenario Quiz</h3>
            <p className="text-xs text-gray-600">Answer 3 scenario-based questions to unlock your Certified Scribe credential.</p>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, qIndex) => (
              <div key={q.id} className="space-y-2 text-xs">
                <p className="font-bold text-sm text-navy">
                  {qIndex + 1}. {q.q}
                </p>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = quizAnswers[q.id] === optIndex;
                    let optionStyle = 'bg-ivory-light border-ivory-border text-navy hover:border-teal';

                    if (quizSubmitted) {
                      if (opt.correct) {
                        optionStyle = 'bg-green-100 border-green-500 text-green-950 font-bold';
                      } else if (isSelected && !opt.correct) {
                        optionStyle = 'bg-red-100 border-red-500 text-red-950';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-teal-soft border-teal text-navy font-bold ring-1 ring-teal';
                    }

                    return (
                      <button
                        key={optIndex}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectAnswer(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt.text}</span>
                        {quizSubmitted && opt.correct && (
                          <CheckCircle className="w-4 h-4 text-green-700 shrink-0" />
                        )}
                        {quizSubmitted && isSelected && !opt.correct && (
                          <XCircle className="w-4 h-4 text-red-700 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <p className="text-[11px] text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-200 mt-1">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Quiz Action */}
          <div className="pt-4 border-t border-ivory-border flex flex-wrap items-center justify-between gap-4">
            {!quizSubmitted ? (
              <button
                onClick={handleGradeQuiz}
                disabled={Object.keys(quizAnswers).length < 3}
                className={`px-6 py-3 rounded-xl font-bold text-xs text-white shadow transition-all ${
                  Object.keys(quizAnswers).length === 3
                    ? 'bg-teal hover:bg-teal-dark'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Answers for Grading
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-between w-full gap-3">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-extrabold px-3 py-1 rounded-xl ${
                    score === 3 ? 'bg-green-100 text-green-800' : 'bg-amber-soft text-amber-900'
                  }`}>
                    Your Score: {score} / 3 ({score === 3 ? 'Passed ✓' : 'Review & Retry'})
                  </span>
                  {score === 3 && (
                    <span className="text-xs font-bold text-teal flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber" /> Certified Scribe Badge Unlocked!
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2 border border-ivory-border text-navy rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                  </button>
                  {score === 3 && (
                    <button
                      onClick={() => setIsCertificateOpen(true)}
                      className="px-4 py-2 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold shadow flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5 text-amber" /> View Official Certificate
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

