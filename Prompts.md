# Prompts.md — AI Prompting Reference

This file documents the prompts and design decisions used to generate
and iterate on the Phase 3 Registration Wizard project.

## Primary Generation Prompt (Summary)

> Generate a complete Phase 3 Registration Wizard in React + Tailwind CSS.
> Use React Hook Form + Zod for validation. Build a 3-step wizard (Personal
> Info → Account Details → Review & Submit). Dark glassmorphism UI.
> Animated progress bar. Show/hide password toggles. Real-time validation.
> Success screen after submit. Mobile-first. Production-ready code.

## Component Prompts

### App.jsx
> Compose a multi-step wizard shell with direction-aware slide animations,
> animated glassmorphism card, ambient background orbs, and a brand mark.

### Step1.jsx
> Create a Personal Information form step with RHF + Zod.
> Fields: firstName, lastName, dateOfBirth. Disabled Next until valid.

### Step2.jsx
> Create Account Details with RHF + Zod. Fields: email, password, confirmPassword.
> Show/hide password toggle. Password strength 4-bar meter.

### Step3.jsx
> Review & Submit step. Display all formData grouped. Mask password. Back + Submit.

### ProgressBar.jsx
> Animated step indicator: counter text, step dots with checkmarks, fill bar.

### SuccessScreen.jsx
> Animated success with pulsing ring, shimmer heading, account summary, CTA.

### useWizard.js
> Hook tracking currentStep, formData, navDirection, isComplete.
> Expose nextStep, prevStep, submitForm.

### schema.js
> Zod schemas: step1 (name + dob with age >=13), step2 (email, password rules, confirm match).

## Design Decisions

| Decision | Reasoning |
|---|---|
| Glassmorphism dark theme | Premium SaaS feel |
| Playfair Display headings | Distinctive, avoids generic fonts |
| Direction-aware animations | Communicates spatial navigation |
| Password strength meter | UX polish beyond minimum spec |
| State lifting via useWizard | Clean separation of concerns |
| Per-step Zod schemas | Granular validation without full-form overhead |
| Inline SVG icons | Zero external icon dependency |
