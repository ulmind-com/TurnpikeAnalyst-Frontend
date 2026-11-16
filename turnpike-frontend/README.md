# Turnpike Frontend — Public Website & Intern Portal

> **SSR marketing platform, grounded AI support assistant, public certificate verification, and full-lifecycle internship portal.**  
> Built with **React 19**, **TanStack Start**, **TanStack Router**, **Tailwind CSS v4**, and **Firebase Auth**, deployed to **Vercel** (`Root Directory: turnpike-frontend`).

> **Full System Design (All Actors, Backend, Admin & Data Flows):** [ARCHITECTURE.md](./ARCHITECTURE.md)  
> **Deployment Runbook:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Repository Layout

```text
├── turnpike-frontend/                 # App root (Vercel Root Directory)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── __root.tsx             # HTML shell, webfonts, QueryClient, Sonner Toaster
│   │   │   ├── _site.tsx              # Sticky SiteHeader, AuroraBackground, SiteFooter, SupportChat
│   │   │   └── _site/                 # 22 public & intern pages
│   │   ├── components/
│   │   │   ├── site/                  # Header, MegaMenu, Hero, ServicesExplorer, SupportChat, WaveDivider
│   │   │   ├── internship/            # 4-step DossierForm, SubmissionSummary, GoogleSignInButton
│   │   │   └── shared/                # BookCallDialog
│   │   ├── content/                   # Static marketing copy & technical service catalogs
│   │   ├── server.ts · start.ts · router.tsx
│   │   ├── styles.css                 # Tailwind v4 entry (@source self + shared)
│   │   └── vercel.json                # Nitro Vercel build + security headers
└── packages/shared/                   # @turnpike/shared (47 Radix UI primitives, Axios, Zustand, Tokens)
```

---

## What Users Can See & Do (Visitor, Employer & Intern Flows)

```mermaid
flowchart TB
    SITE["<b>Turnpike Frontend (turnpike-frontend)</b><br/>Sticky Navigation · Dark/Light Theme · Grounded Support Chat"]

    subgraph VIS["Visitor & Employer Access (No Login Required)"]
        V1["<b>Consultancy & Solutions</b><br/>/ · /services · /services/:slug · /industries/:slug · /software-support"]
        V2["<b>Academy & Insights</b><br/>/training · /training/:slug · /blog · /blog/:slug · /blog-posts"]
        V3["<b>Company & Enquiries</b><br/>/about · /our-clients · /career · /faq · /contact · Book a Call"]
        V4["<b>Grounded Support Widget</b><br/>Real-time answers from admin-curated knowledge base"]
        V5["<b>Certificate Verification</b><br/>/verify/:certificateNumber — instant validity & holder check"]
    end

    subgraph INT["Intern Access (Google Sign-In via Firebase -> CLIENT Role)"]
        I1["<b>Programme & Tracks</b><br/>/internship & /internship/:slug (Choose 1, 2, or 3 months)"]
        I2["<b>Custom Proposal</b><br/>/internship/propose (Bring your own project in any stack)"]
        I3["<b>Intern Dashboard</b><br/>/internship/dashboard (Deadlines, active enrollments, PDF certificates)"]
        I4["<b>Project Workspace</b><br/>/internship/dashboard/:enrollmentId (4-step dossier, .zip upload, AI Q&A)"]
    end

    SITE --> VIS
    SITE --> INT
```

---

## End-to-End Intern Journey & Dual-Source Verification Flow

```mermaid
sequenceDiagram
    actor I as Intern
    participant FE as Turnpike Frontend
    participant FB as Firebase Auth
    participant API as Turnpike Backend
    participant AI as AI Review Chain

    I->>FE: Visit /internship -> Click "Continue with Google"
    FE->>FB: signInWithPopup(GoogleAuthProvider)
    FB-->>FE: Firebase ID Token
    FE->>API: POST /api/v1/auth/google
    API-->>FE: Access + Refresh JWT (CLIENT account auto-created)

    alt Select Curated Brief
        I->>FE: /internship/:slug -> Select 1, 2, or 3 months
    else Propose Own Project
        I->>FE: /internship/propose -> Title, Summary & Duration
    end
    FE->>API: POST /api/v1/internship/enroll
    API-->>FE: Enrollment + Calendar Deadline

    Note over I,FE: 4-Step Dossier (Auto-saved in localStorage)
    I->>FE: Step 1: GitHub Repo URL, Live URL & Local Demo Video Link
    I->>FE: Step 2: Purpose, Technologies, Architecture, Data Flow, Use Cases & Benefits
    I->>FE: Step 3: Mermaid Source OR Diagram Image Uploads (PNG/JPEG/WebP)
    I->>FE: Step 4: Upload Project Source Code (.zip, max 60 MB)
    FE->>API: POST .../source-archive (Zip-slip & Zip-bomb checked in memory)
    FE->>API: POST .../submit
    API-->>FE: 200 OK (status = AI_REVIEWING)

    FE->>API: Poll enrollment status until QUESTIONS_PENDING
    API->>AI: Compare GitHub Repo Snapshot + .zip Archive + Dossier Claims
    AI-->>API: Admin-only claim checks + Project-specific follow-up questions
    API-->>FE: Display Follow-Up Questions

    I->>FE: Answer project-specific questions
    FE->>API: POST .../answers -> status = UNDER_REVIEW
    Note over I,API: Admin watches demo video & approves -> Certificate PDF issued
    I->>FE: Download Certificate PDF & share /verify/TA-YYYY-XXXXXXXXXX
```

---

## Complete Route Map (22 Pages)

| Route Path | Rendering | Actor | Purpose |
|---|---|---|---|
| `/` | SSR | Visitor | Hero, metrics, services explorer, tech stack, featured articles |
| `/services` & `/services/$slug` | SSR | Visitor | 15+ consultancy service categories & sub-service specifications |
| `/industries/$slug` | SSR | Visitor | Industry solutions & client case groupings |
| `/software-support` | SSR | Visitor | Managed enterprise software support & SLAs |
| `/training` & `/training/$slug` | SSR | Visitor | Enterprise ECM, OpenShift, Cloud DevOps & AI/ML courses |
| `/blog`, `/blog/$slug`, `/blog-posts`, `/blog-posts/$slug` | SSR | Visitor | Technical articles & insights |
| `/about`, `/our-clients`, `/career`, `/faq`, `/contact` | SSR | Visitor | Company overview, global partners, careers, FAQs, lead capture |
| `/verify/$certificateNumber` | SSR | Employer | Public certificate verification without login |
| `/internship` | SSR | Visitor / Intern | Internship programme overview & published project briefs |
| `/internship/$slug` | SSR | Intern | Brief requirements & 1 / 2 / 3 month enrollment |
| `/internship/propose` | Client | Intern (`CLIENT`) | Propose custom internship project |
| `/internship/dashboard` | Client (`ssr: false`) | Intern (`CLIENT`) | Personal projects, status tracking & certificates |
| `/internship/dashboard/$enrollmentId` | Client (`ssr: false`) | Intern (Owner) | 4-step dossier wizard, `.zip` upload, AI Q&A & PDF download |

---

## Technologies Used in Turnpike Frontend

| Category | Technologies & Libraries |
|---|---|
| **Framework & Routing** | React 19 (`react` 19.2), TanStack Start (`@tanstack/react-start`), TanStack Router (`@tanstack/react-router`), Nitro (`vercel` preset) |
| **Build & Tooling** | Vite 8, TypeScript 5.8, Bun Workspaces (`@turnpike/shared`), ESLint 9, Prettier 3 |
| **Styling & Design System** | Tailwind CSS v4 (`@tailwindcss/vite`, `@tailwindcss/typography`), `tw-animate-css`, shared `oklch` CSS tokens (light & dark) |
| **UI & Motion** | 47 Radix UI primitives (`shadcn`), Lucide React, Motion (`motion` 12), GSAP, Lenis smooth scroll, Embla Carousel, Sonner |
| **Diagrams & Content** | Mermaid (`mermaid` 12.3) live architecture/data-flow preview, `react-markdown`, `rehype-raw` |
| **State, Forms & API** | TanStack React Query v5, Zustand v5 (persisted auth store), React Hook Form, Zod, Axios (with silent JWT refresh) |
| **Authentication** | Firebase Web SDK v12 (`signInWithPopup` Google OAuth -> exchanged for backend JWTs) |

---

## Local Development

```bash
bun install
cp turnpike-frontend/.env.example turnpike-frontend/.env   # set VITE_API_BASE_URL=http://127.0.0.1:8000
bun run dev                                                # http://localhost:3000
```

### Environment Variables (`turnpike-frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Yes | Backend API base URL (no trailing slash) |
| `VITE_FIREBASE_*` | Optional | Overrides default Firebase Web Config in `packages/shared/src/lib/firebase.ts` |

## Production Deployment (Vercel)

- **Root Directory:** `turnpike-frontend`
- **Build Command:** Managed by `turnpike-frontend/vercel.json` (`cd .. && bun install && cd turnpike-frontend && NITRO_PRESET=vercel bun run build`)
- **Security Headers:** `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy`.

---

*Published from the Turnpike Analyst monorepo. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the complete platform blueprint.*
