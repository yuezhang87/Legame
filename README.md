# Legame

A login-gated hub for parents/teachers to access games. Sign in, see a grid
of games, click one to play it embedded in the page.

## Adding a new game

Edit `lib/games.ts` and add an entry with a `slug`, `title`, `description`,
and the game's `url`. Nothing else needs to change — the dashboard grid and
the embed page both read from that list.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

## Auth

Email/password auth via Supabase. Any signed-in user currently sees the
same content — no separate parent/teacher roles yet.
