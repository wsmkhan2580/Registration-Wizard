# Phase 3 — Registration Wizard

A production-grade, multi-step registration wizard built with **React**, **Tailwind CSS**, **React Hook Form**, and **Zod**.

## Tech Stack

| Layer      | Library                        |
|------------|--------------------------------|
| UI         | React 18 + Tailwind CSS 3      |
| Forms      | React Hook Form 7              |
| Validation | Zod 3 + @hookform/resolvers    |
| Build      | Vite 5                         |
| Fonts      | Playfair Display, DM Sans, JetBrains Mono |

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## Project Structure

```
src/
├── App.jsx
├── components/
│   ├── Step1.jsx
│   ├── Step2.jsx
│   ├── Step3.jsx
│   ├── ProgressBar.jsx
│   └── SuccessScreen.jsx
├── hooks/
│   └── useWizard.js
├── validation/
│   └── schema.js
├── data/
│   └── initialFormData.js
└── index.css
```

## Features

- Multi-step wizard with forward/back navigation
- Data persistence across all steps via state lifting
- Real-time Zod validation with per-field error messages
- Next button disabled until current step is valid
- Show/hide password toggle with eye icons
- Password strength meter (Weak → Strong)
- Direction-aware slide animations
- Animated progress bar with step dots + fill line
- Dark glassmorphism UI with ambient orb backgrounds
- Animated success screen after submission
- Console payload log on final submit
- Mobile-first, fully responsive

## Design System

- Dark theme only
- Color palette: `#4f8ef7` (blue) · `#9b6dff` (purple) · `#22d3ee` (cyan)
- Glassmorphism: `backdrop-blur-xl`, `bg-white/[0.04]`, `border-white/[0.08]`
- Typography: Playfair Display + DM Sans + JetBrains Mono
