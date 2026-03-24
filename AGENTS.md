# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 16 personal portfolio/blog site. It is entirely self-contained with zero external service dependencies — no database, no Docker, no separate backend API. Content comes from Markdown files in `content/essays/`.

### Running the app

- `npm run dev` starts the Next.js dev server on port 3000.
- The app uses Turbopack in dev mode. Hot reload works out of the box; no restart needed after code changes.

### Available scripts (see `package.json`)

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier formatting |

### Notes

- No `.env` file is required. Umami analytics loads from an external CDN and fails silently if unavailable.
- Build produces viewport metadata warnings — these are pre-existing and non-blocking.
- No automated test suite exists (no `test` script in `package.json`). Validation is done via `lint`, `build`, and manual testing.
