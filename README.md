# ADK Production Analysis Dashboard

ASW is a single-page Next.js prototype that visualizes sample screenplay analysis and production-planning metrics for a Black Panther-themed data set.

## Core features

- Production overview with script, scene, character, location, complexity, crew, and cost metrics.
- Eighths-calculator presentation for 232 generated scene cards.
- Scene-breakdown presentation with location, time, cast, crew, and technical details.
- Department analysis and collapsible detail sections.
- Fixed sidebar navigation with smooth scrolling between dashboard sections.
- Responsive dashboard styling and light client-side interactions.

## Technology stack

- Next.js 15, React 19, and TypeScript
- Tailwind CSS 4
- App Router with a single client-rendered dashboard page

## Prerequisites

- Node.js and npm

## Local setup

```bash
git clone https://github.com/varunisrani/asw.git
cd asw
npm ci
npm run dev
```

The development script runs Next.js with Turbopack, using `http://localhost:3000` by default.

Production commands:

```bash
npm run build
npm run start
```

The repository also defines `npm run lint`.

## Configuration

No environment variables are referenced by the application source.

## Project structure

- `app/page.tsx` — all dashboard data, rendering, generated scene cards, and interactions.
- `app/globals.css` — global presentation styles.
- `app/layout.tsx` — Next.js root layout and metadata.
- `logs/` — checked-in development/tool event logs; these are not consumed by the application.
- `public/` — default static assets.

## Status and limitations

This repository is a front-end demonstration, not a production analysis service. Its data is hard-coded or randomly generated in the browser, so values can change between renders and do not represent a parsed screenplay. Export Report and Settings are visual controls without implemented actions. There is no backend, persistence layer, environment configuration, or automated test script. The lint script uses `next lint`, which is not available in recent Next.js releases and may require updating.