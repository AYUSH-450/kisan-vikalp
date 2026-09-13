# SmartProcure - Comprehensive Project Overview

This document provides a complete technical and functional overview of the **SmartProcure** frontend prototype. It is designed to be provided to any AI model to quickly onboard it to the project's structure, features, and architecture.

---

## 1. Project Background
- **Project Name:** SmartProcure
- **Target Event:** Smart India Hackathon 2026 (Problem Statement SIH26032)
- **Goal:** To solve the problem of long queues, uncertainty, and lack of transparency at agricultural procurement centres by building an intelligent orchestration platform.

## 2. Core Value Proposition
SmartProcure replaces the traditional guessing game of crop procurement by answering three questions for farmers:
1. **WHERE? (Smart Centre Recommendation):** Dynamically redirects load away from congested centres by calculating total expected wait time + travel time.
2. **WHEN? (AI Scheduling & Leave-Now):** Provides a virtual queue and predictive ETA, telling the farmer exactly when to leave their farm to arrive "just-in-time".
3. **WHAT'S HAPPENING? (Live Tracking):** Offers end-to-end transparency from Check-In to Quality Inspection, Weighing, and Final Payment Disbursement.

---

## 3. Technology Stack & Architecture
- **Framework:** React 18 + Vite
- **Language:** TypeScript (Strict typing for strict state machine enforcement)
- **Styling:** Tailwind CSS (with utility library `clsx` and `tailwind-merge`)
- **Routing:** React Router DOM (v6)
- **Icons:** Lucide React
- **Mapping:** React Leaflet + Leaflet (OpenStreetMap tiles)
- **Charts:** Recharts
- **QR Codes:** `qrcode.react`
- **State Management:** React Context API + Singleton Mock Service (`mockDataService.ts`). *Note: Redux/Zustand were explicitly omitted to keep the architecture clean and ready for a real backend API.*

---

## 4. The Three Connected Experiences

The application is split into three distinct, interconnected portals. They all share the same mock data state, meaning an action in one portal immediately reflects in the others.

### A. The Farmer Portal (`/farmer`)
*Mobile-first experience for the farmer.*
- **Farmer Home:** Dashboard showing upcoming procurement status, active token, and immediate actions.
- **Book Procurement:** Interface to select crop (e.g., Paddy) and quantity, leading to the **Smart Centre Recommendation** engine which justifies *why* a specific centre is chosen based on wait times.
- **Digital Pass:** A secure QR code pass (`SP-TX938421-SECURE`) that explicitly does *not* contain Aadhaar or bank info.
- **Virtual Queue & Travel Plan:** Displays the live queue position (e.g., Token A042) and a "When should I leave?" travel timeline (Travel Time + Safety Buffer) with dynamic amber/red "LEAVE NOW" states.
- **Live Status Tracking:** A linear timeline showing the exact progression of the crop through the centre.

### B. The Procurement Officer Portal (`/officer`)
*Tablet/Desktop experience for centre staff.*
- **Dashboard:** KPIs showing daily processing rate (e.g., 20/hr), capacity utilization, and waiting farmers.
- **QR Scanner:** Interface to verify the farmer's Digital Pass.
- **Queue Management:** A live table of farmers currently at the centre, allowing the officer to advance them through the workflow.
- **Workflow Steps:** Distinct interfaces to Check-In, perform Quality Inspection, capture actual Weighing, and complete the procurement.

### C. The Government Admin Command Centre (`/admin`)
*Desktop-first, data-rich experience for state administrators.*
- **Dashboard:** High-level state-wide KPIs.
- **GIS Command Map:** A Leaflet-based interactive map plotting all procurement centres with color-coded risk markers (Green/Amber/Red). Clicking a centre shows detailed capacity, wait times, and AI recommendations.
- **AI Demand Forecast:** A Recharts-powered dashboard predicting tomorrow's arrivals, highlighting capacity gaps, and providing explicit load-balancing recommendations (e.g., "Redirect 120 bookings from Centre A to Centre B").
- **Alerts & Reports:** Operational alert management and CSV reporting views.

---

## 5. The State Machine & Mock Backend
To simulate a real connected backend without deploying a database, the app uses `src/services/mockDataService.ts`.

- **Singleton Pattern:** The service is instantiated once. All portals read/write to this single instance in-memory.
- **Canonical Demo Transaction:** The app is strictly hardcoded to default to a canonical transaction for demo purposes:
  - **Farmer:** Ramesh Kumar (`F12345`)
  - **Transaction ID:** `TX938421`
  - **Token:** `A042`
  - **Centre:** Centre B
- **Strict Status Typing:** Transactions strictly follow the flow: `'Booked' | 'Confirmed' | 'Checked In' | 'Quality Inspection' | 'Weighing' | 'Completed' | 'Paid'`.
- **Demo Reset:** A "Reset Demo State" button in the Admin Settings allows presenters to reset `TX938421` back to its initial state for repeatable hackathon presentations.

---

## 6. Project Directory Structure
```text
smartprocure/
├── src/
│   ├── components/         # Reusable UI components (Button, Card, Badge, Toast)
│   ├── features/           # React Context providers (FarmerContext, OfficerContext, AdminContext)
│   ├── layouts/            # Top-level shell layouts (FarmerLayout, OfficerLayout, AdminLayout)
│   ├── pages/              # Page components
│   │   ├── admin/          # Command Centre pages (GISMap, DemandForecast, etc.)
│   │   ├── farmer/         # Farmer mobile pages (BookProcurement, TravelMap, DigitalPass, etc.)
│   │   ├── officer/        # Centre operations pages (Scanner, QueueManagement, Weighing, etc.)
│   │   ├── LandingPage.tsx # The premium product showcase and role selector
│   │   └── LoginPage.tsx   # Demo role switcher
│   ├── services/           # mockDataService.ts (The simulated backend)
│   ├── types/              # Global TypeScript interfaces (Transaction, Centre, Forecast, etc.)
│   ├── utils/              # Helper utilities (cn.ts for tailwind-merge)
│   ├── App.tsx             # Main React Router configuration
│   └── main.tsx            # React entry point
├── DEMO_GUIDE.md           # The exact script/flow to follow during a live hackathon presentation
├── package.json            # Dependencies and scripts (npm run dev, npm run build)
├── tailwind.config.js      # Custom theme colors (primary green, surface neutrals)
└── tsconfig.json           # Strict TypeScript configuration
```

---

## 7. How to Access and Run
1. Navigate to the project directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. The application starts at the Landing Page. From there, you can click "Explore Farmer", "Explore Centre", or "Open Command Centre" to access the respective portals.

*Note: As this is an in-memory prototype, executing a hard page refresh (F5) will reset the `mockDataService` state back to default.*
