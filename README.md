# Safari Spares Frontend

The premium automotive marketplace for Africa. Built with Next.js 16, React 19, Tailwind CSS v4, and RTK Query.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
Open http://localhost:3000 to view the app.

Environment Variables
Create a .env.local file in the root directory:

env
# Backend API URL (Go backend)
NEXT_PUBLIC_API_URL=http://localhost:8080

# App URL (used for OG metadata)
NEXT_PUBLIC_APP_URL=http://localhost:3000
For Vercel deployment, set NEXT_PUBLIC_API_URL in the Vercel Dashboard to your Render backend URL (e.g., https://safari-spares-backend-43rr.onrender.com).

Tech Stack
Layer	Technology
Framework	Next.js 16 (App Router)
UI	React 19 + Tailwind CSS v4 + shadcn/ui
State	Redux Toolkit + RTK Query
Icons	Lucide React
Forms	React Hook Form + Zod
Notifications	Sonner
Fonts	Sora (headings), Inter (body)
Design System
Safari Spares uses a Premium Dark Mode aesthetic inspired by fintech apps (Revolut, Monzo) combined with the ruggedness of the automotive world.

Colors
Role	Hex
Background	#101214 (Deep Charcoal)
Cards	#1A1D21 (Elevated Charcoal)
Primary	#14B87A (Safari Green)
Secondary	#E8A33D (Spares Gold)
Error	#F26B6B (Alert Red)
Text Primary	#F2F2F2 (Off-White)
Text Secondary	#9AA0A6 (Cool Grey)
Typography
Headings: Sora (geometric, bold)

Body: Inter (readable)

Numbers / Prices: Inter with tabular-nums

Deploy on Vercel
Push to GitHub.

Import the repo on Vercel.

Vercel auto-detects Next.js.

Set NEXT_PUBLIC_API_URL in Settings → Environment Variables:

text
NEXT_PUBLIC_API_URL=https://safari-spares-backend-43rr.onrender.com
Deploy.

Related Repositories
Backend: safari-spares-backend — Go + Echo + PostgreSQL

Documentation
Concept Note

Product BRD

Backend BRD

Backend Architecture

Brand Guidelines

