# CivicAssist AI

A multilingual GenAI-powered public benefits navigator that helps Indian citizens discover government schemes they're eligible for.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8) ![Gemini](https://img.shields.io/badge/Gemini-2.0--flash-4285F4)

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                   │
│  ┌──────────┐ ┌───────────────┐ ┌─────────┐ ┌───────┐ │
│  │Home Page │ │Eligibility    │ │Results  │ │Admin  │ │
│  │          │ │Form           │ │Page     │ │Page   │ │
│  └──────────┘ └───────┬───────┘ └────┬────┘ └───┬───┘ │
│                       │              │          │      │
├───────────────────────┼──────────────┼──────────┼──────┤
│                  API Routes          │          │      │
│  ┌────────────────────┴──┐ ┌────────┴───┐ ┌───┴────┐ │
│  │ /api/analyze          │ │/api/translate│ │/api/   │ │
│  │ (RAG Pipeline)        │ │(Translation) │ │admin/  │ │
│  │                       │ │              │ │evaluate│ │
│  │ /api/chat             │ │              │ │        │ │
│  │ (AI Chatbot)          │ │              │ │        │ │
│  └──────────┬────────────┘ └────────────┘ │evaluate│ │
│             │                              └────────┘ │
├─────────────┼─────────────────────────────────────────┤
│         Core Engine                                    │
│  ┌──────┴───────┐  ┌──────────────┐  ┌──────────────┐│
│  │ RAG Pipeline │  │ Keyword      │  │ Rule-based   ││
│  │ (Gemini 2.0) │  │ Similarity   │  │ Filtering    ││
│  └──────────────┘  └──────────────┘  └──────────────┘│
│  ┌────────────────────────────────────────────────────┐│
│  │ Knowledge Base: 10 Indian Government Schemes      ││
│  └────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────┘
```

## Features

- **AI-Powered Recommendations**: RAG pipeline using Gemini 2.0 Flash for personalized scheme matching
- **AI Chatbot**: Floating chat widget to ask questions about any scheme — powered by Gemini with fallback answers
- **10 Government Schemes**: PM Kisan, Ayushman Bharat, PMAY, Mudra Loan, Scholarships, LPG Subsidy, MSME Credit, Skill India, State Scholarship, Senior Pension
- **Multilingual**: English and Hindi with AI-powered translation + local fallback
- **Dark/Light Mode**: Theme toggle with system preference support
- **Voice Input**: Mock voice input for accessibility
- **Document Upload**: Mock OCR for auto-filling profile from documents
- **Admin Panel**: Evaluation mode with test profiles and precision/recall metrics
- **Responsive Design**: Mobile-first government-tech aesthetic

## Quick Start

### Prerequisites

- Node.js 18+  
- npm  
- Gemini API key

### Installation

```bash
# Clone and enter the project
cd civicassist-ai

# Install dependencies
npm install

# Copy environment file and add your Gemini API key
cp .env.example .env.local
# Edit .env.local and set: GEMINI_API_KEY=your-key-here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Profiles

Use these profiles to test the eligibility checker:

| Profile | Income | State | Age | Occupation | Category | Expected Schemes |
|---------|--------|-------|-----|------------|----------|------------------|
| Young Farmer | ₹1,20,000 | UP | 28 | Farmer | - | PM Kisan, Ayushman Bharat |
| SC Student | ₹1,50,000 | Bihar | 20 | Student | SC | SC/ST Scholarship, Ayushman |
| Senior Citizen | ₹90,000 | Maharashtra | 68 | Retired | - | Senior Pension, Ayushman |
| Woman Entrepreneur | ₹2,50,000 | Gujarat | 35 | Self-employed | - | Mudra Loan, MSME Credit |
| BPL Family | ₹80,000 | Rajasthan | 40 | Laborer | - | LPG Subsidy, PMAY, Ayushman |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript (ES6+) |
| Styling | TailwindCSS 4 |
| UI Components | ShadCN UI |
| AI | Google Gemini 2.0 Flash |
| Theme | next-themes (dark/light/system) |
| Search | Local keyword-based cosine similarity |
| Deployment | Vercel-ready |

## Folder Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.js      # RAG pipeline endpoint
│   │   ├── chat/route.js         # AI chatbot endpoint
│   │   ├── translate/route.js    # Translation endpoint
│   │   ├── ocr/route.js          # Mock OCR endpoint
│   │   └── admin/evaluate/route.js # Evaluation endpoint
│   ├── eligibility/page.jsx      # Eligibility form
│   ├── results/page.jsx          # Results display
│   ├── admin/page.jsx            # Admin panel
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Home page
├── components/
│   ├── ui/                       # ShadCN components
│   ├── Navbar.jsx
│   ├── SchemeCard.jsx
│   ├── LoadingAnimation.jsx
│   ├── VoiceInputButton.jsx
│   ├── LanguageToggle.jsx
│   ├── ChatBot.jsx
│   ├── ThemeProvider.jsx
│   └── ThemeToggle.jsx
└── lib/
    ├── ai/
    │   ├── rag.js                # RAG pipeline (Gemini)
    │   └── prompts.js            # Prompt templates
    ├── schemes/
    │   ├── schemes-data.js       # 10 government schemes
    │   └── embeddings.js         # Search & filtering
    └── utils.js                  # Utilities
```

## How It Works

1. **User Input**: User fills the eligibility form with income, state, occupation, etc.
2. **Keyword Search**: System finds relevant schemes using keyword-based semantic similarity
3. **Rule Filtering**: Hard constraints (income limits, age, state, category) are applied
4. **AI Analysis**: Gemini 2.0 Flash generates personalized explanations for each matching scheme
5. **Results**: User receives scheme cards with benefits, qualification reasons, documents, and next steps

## Notes

- Without a Gemini API key, the app uses rule-based fallback recommendations
- The OCR feature is mocked — it returns sample data for any uploaded document
- Voice input is mocked — it fills in a random sample description
- The vector search uses keyword similarity instead of real embeddings for simplicity

## License

MIT
