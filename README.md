# English Listening Quiz

A web app for practicing English listening: multiple-choice quizzes by level and an **intermediate** track with **unit-based** listening tasks (pre / while / post), local progress, and scored results.

## Features

- **Level select** — Beginner, Intermediate, Advanced (beginner/advanced can show a “coming soon” flow depending on routing).
- **Intermediate hub** — Grid and Roman-numeral tab bar for 20 units; status badges (pending / completed); restart completed tests.
- **Unit flow** — Prelistening (voice), While listening (text answers + audio), Post listening (video upload + discussion prompts from curriculum data).
- **Results** — Delayed reveal after submit, score breakdown (pre / while / post), dedicated result page (`/result?unit=…`); MCQ detailed review when no unit query.
- **UX** — Light/dark theme, gradient UI, Framer Motion transitions; progress persisted in the browser (**localStorage** via Zustand).

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix), Lucide icons |
| Routing | Wouter |
| State | Zustand (persist), TanStack Query (where used) |
| Motion | Framer Motion |
| Validation / types | Zod; shared schemas in `shared/` |
| Build | Vite 7 |
| Server | Express (`server/`) — dev server and API wiring |

## Repository layout

```
client/src/          # React app (@ → client/src)
shared/              # JSON + Zod schemas (e.g. units.json, quiz types)
server/              # Express API and static serving
scripts/             # e.g. build-units-json.mjs → shared/units.json
client/public/       # Static assets (audio under intermediate/, favicon, etc.)
```

## Getting started

**Requirements:** Node.js 20+ (recommended), npm.

```bash
git clone https://github.com/YOUR_USERNAME/Quiz-App.git
cd Quiz-App
npm install
```

### Development

Runs the Express app with Vite middleware for the client:

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5000` or similar, depending on your setup).

### Typecheck & production build

```bash
npm run check    # TypeScript
npm run build    # Vite → dist/public
```

### Intermediate curriculum data

`shared/units.json` is generated from `attached_assets/Units.md`:

```bash
npm run build:units
```

Run this after editing `Units.md` so the app and JSON stay in sync.

## npm scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (client + API) |
| `npm run build` / `npm run build:client` | Client production bundle |
| `npm run start` | Production Node entry (after build) |
| `npm run check` | `tsc` |
| `npm run build:units` | Regenerate `shared/units.json` from `Units.md` |
| `npm run vercel-build` | Vite build (used on Vercel) |


## License

[MIT](https://opensource.org/licenses/MIT) (see `package.json`).
