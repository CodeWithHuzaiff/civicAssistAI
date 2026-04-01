# CivicAssist AI (MERN Stack)

A multilingual GenAI-powered public benefits navigator that helps Indian citizens discover government schemes they're eligible for.

![React](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green) ![Vite](https://img.shields.io/badge/Vite-Build-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8) ![Gemini](https://img.shields.io/badge/Gemini-2.0--flash-4285F4)

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Frontend (React + Vite)              │
│  ┌──────────┐ ┌───────────────┐ ┌─────────┐ ┌───────┐ │
│  │Home Page │ │Eligibility    │ │Results  │ │Admin  │ │
│  │          │ │Form           │ │Page     │ │Page   │ │
│  └──────────┘ └───────┬───────┘ └────┬────┘ └───┬───┘ │
│                       │              │          │      │
├───────────────────────┼──────────────┼──────────┼──────┤
│                   Backend (Node + Express)             │
│  ┌────────────────────┴──┐ ┌────────┴───┐ ┌───┴────┐ │
│  │ /api/analyze          │ │/api/translate│ │/api/   │ │
│  │ (RAG Pipeline)        │ │(Translation) │ │admin/  │ │
│  │                       │ │              │ │evaluate│ │
│  │ /api/chat             │ │              │ │        │ │
│  │ (AI Chatbot)          │ │              │ │        │ │
│  └──────────┬────────────┘ └────────────┘ │evaluate│ │
│             │                              └────────┘ │
├─────────────┼─────────────────────────────────────────┤
│         Core Engine & Database                         │
│  ┌──────┴───────┐   ┌────────────────┐   ┌────────────┐│
│  │ RAG Pipeline │   │ MongoDB &      │   │ Auth       ││
│  │ (Gemini 2.0) │   │ JWT Users      │   │ Middleware ││
│  └──────────────┘   └────────────────┘   └────────────┘│
└────────────────────────────────────────────────────────┘
```

## Features

- **Decoupled Architecture**: Clean separation between React frontend and Node.js backend.
- **AI-Powered Recommendations**: RAG pipeline using Gemini 2.0 Flash for personalized scheme matching
- **AI Chatbot**: Floating chat widget to ask questions about any scheme — powered by Gemini with fallback answers
- **Custom Authentication**: Custom JWT-based user authentication system replacing NextAuth.
- **10 Government Schemes**: PM Kisan, Ayushman Bharat, PMAY, Mudra Loan, Scholarships, LPG Subsidy, MSME Credit, Skill India, State Scholarship, Senior Pension
- **Multilingual**: English and Hindi with AI-powered translation + local fallback
- **Dark/Light Mode**: Theme toggle with system preference support
- **Responsive Design**: Mobile-first government-tech aesthetic

## Quick Start

### Prerequisites

- Node.js 18+  
- npm  
- MongoDB URI
- Gemini API key

### Installation

```bash
# Clone and enter the project
cd civicassist-ai

# Install root, backend, and frontend dependencies
npm run install-all

# Configure environment variables
# In the backend directory, create a .env file:
# PORT=5005
# MONGODB_URI=your-mongodb-uri
# GEMINI_API_KEY=your-gemini-key
# JWT_SECRET=your-secret

# Start both development servers concurrently
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Core | React 18, Vite |
| Backend Core | Node.js, Express |
| Database | MongoDB, Mongoose |
| Styling | TailwindCSS 4 |
| UI Components | ShadCN UI |
| Routing | React Router v6 |
| AI | Google Gemini 2.0 Flash |

## Folder Structure

```
civicassist-ai/
├── backend/                  # Node.js + Express
│   ├── config/               # DB and environment configuration
│   ├── controllers/          # API logic (Auth, Chat, Analyze)
│   ├── lib/                  # AI Prompts, Prompts, Schemes Data
│   ├── middleware/           # JWT and Error handling
│   ├── models/               # MongoDB models (User.js)
│   ├── routes/               # Express Routes
│   ├── server.js             # Server Entry Point
│   └── package.json
│
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── components/       # ShadCN & Custom UI components
│   │   ├── lib/              # Utils and schemas
│   │   ├── pages/            # React Pages (Home, Login, Admin, Results)
│   │   ├── App.jsx           # React Router Map
│   │   ├── main.jsx          # Mount Entry
│   │   └── index.css         # Tailwind v4 directives
│   ├── vite.config.js        # Vite config with backend proxy on 5005
│   └── package.json
│
└── package.json              # Root orchestrator with 'concurrently'
```

## Integration Details

- The frontend communicates with the backend seamlessly by proxying all requests containing `/api/*` to `http://localhost:5005` in Vite development mode.
- Users authenticate via `/api/auth/login`, and JWTs are stored client-side for subsequent API requests ensuring a stateless, decoupled architecture.

## License

MIT
