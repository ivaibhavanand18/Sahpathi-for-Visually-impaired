# 👁️ SAHPATHI (सहपाठी)
### Connecting Visually Impaired Students with Scribes
**Accessibility-Focused Digital Platform • Social Impact Initiative**

> *"Your Examination. Your Independence. Our Support."*  
> *Alternative Tagline: "Making education accessible, one scribe at a time."*

---

## 🌟 Overview
**Sahpathi** is an accessibility-first digital web platform engineered to empower blind and visually impaired students to find, match with, and book eligible, verified volunteer scribes for examinations without having to struggle with fragmented or last-minute arrangements.

Compliant with the **Rights of Persons with Disabilities (RPwD) Act 2016**, **Ministry of Social Justice and Empowerment (MoSJE)** guidelines, and Supreme Court directives (*Vikash Kumar v. UPSC, 2021*).

---

## ✨ Key Features

### 🎓 1. For Students Seeking a Scribe
- **Find a Scribe (Smart Exam Matcher):** Filter by exam name, academic stream, technical subjects, language, location, and specific dictation needs (diagrams, math formulas, ledgers).
- **Verified Volunteer Directory:** Browse detailed scribe profiles with verified government ID, academic records, handwriting speed audits (e.g. 36 wpm), and audio bio narration.
- **Booking Lifecycle & Status Tracker:** Instant booking reference numbers, real-time acceptance updates, and downloadable **MoSJE Form-I Scribe Declaration Undertaking**.
- **Accessible Exam Centre Locator:** Find exam venues audited for step-free ramps, ground-floor seating, and accessible transit routes.
- **Interactive Scribe Eligibility Checker:** 4-step wizard calculating board-specific documentation and compensatory time rules (+20m/hour).
- **Pre-Exam Coordination Chat:** Secure in-app communication between student and scribe before exam day.

### 🤝 2. For Volunteers Willing to Become Scribes
- **Volunteer Onboarding:** Rapid registration covering academic qualifications, subjects, handwriting speed, and ID verification simulation.
- **Scribe Honor Code & Ethics Pledge:** Non-interference pledge ensuring scribes write strictly what is dictated.
- **Interactive Scribe Orientation & Quiz:** 4-module training on non-interference, STEM dictation, and compensatory time protocols with certified badges.
- **Volunteer Dashboard:** Track volunteering hours, manage upcoming exam schedules, accept/decline student requests, and download official **Certificates of Appreciation**.

### ♿ 3. Accessibility & Universal Design
- **WCAG AAA High Contrast Themes:**
  - Standard Sahpathi (Warm Ivory `#F7F4EA` & Deep Navy `#142A43`)
  - High Contrast Yellow on Black (`#FFFF00` on `#000000`)
  - High Contrast Cyan on Black (`#00FFFF` on `#000000`)
  - Dark Navy Mode
  - Soft Low-Vision Sepia Mode
- **Built-in Screen Reader (Web Speech API):** One-click "Read Aloud" narration with adjustable speech rate.
- **Hands-Free Voice Commands:** Speech recognition for voice navigation.
- **Text Resizing & Typography:** Scale between Normal (100%), Large (120%), Extra Large (140%), and Maximum (160%) with Dyslexia-friendly font support.
- **Auditory Earcons (Web Audio API):** Auditory chimes for actions, warnings, and confirmations.
- **Wireframe Blueprint Mode:** One-click toggle between production UI and low-fidelity wireframe blueprints for design review and academic evaluation.
- **Emergency Scribe SOS:** Rapid broadcast for exam emergencies within 24–48 hours.

---

## 🛠️ Tech Stack
- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Custom Accessibility Palettes)
- **Icons:** Lucide React
- **Audio & Accessibility:** Web Speech API (Synthesis & Recognition) + Web Audio API (Earcons)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/sahpathi.git

# Navigate into the project directory
cd sahpathi

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production
```bash
npm run build
```

---

## 📄 License
This project is open-source and dedicated to social impact and equal educational opportunities for students with disabilities.

