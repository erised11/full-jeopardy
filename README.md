# Game Mixer

A full-stack game hub, currently featuring custom Jeopardy! game creation and play.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Tailwind CSS v4, React Router 7 |
| Backend | Express 5, Node.js, TypeScript |
| Database | PostgreSQL (Supabase in production, local postgres in dev) |
| Deployment | Vercel (frontend + backend), Supabase (database) |
| Shared | TypeScript types package (`/shared`) |

## Project Structure

```
/
├── frontend/        React SPA
├── backend/         Express API
├── shared/          Shared TypeScript types
└── package.json     Root dev script (concurrently)
```

## Local Development

### Prerequisites

Install these once (requires [Homebrew](https://brew.sh)):

```bash
brew install node
brew install postgresql@16
```

### First-time setup

1. **Start PostgreSQL:**
   ```bash
   brew services start postgresql@16
   ```

2. **Create the local database:**
   ```bash
   /opt/homebrew/opt/postgresql@16/bin/createdb jeopardy_dev
   ```

3. **Create the games table:**
   ```bash
   /opt/homebrew/opt/postgresql@16/bin/psql -d jeopardy_dev -c "
   CREATE TABLE games (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL,
     title VARCHAR(255) NOT NULL,
     game_data JSONB NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );"
   ```

4. **Install dependencies:**
   ```bash
   npm install              # root (concurrently)
   npm install --prefix backend
   npm install --prefix frontend
   ```

5. **Create environment files** (these are gitignored and only used locally):

   `backend/.env`:
   ```
   DATABASE_URL="postgresql://localhost/jeopardy_dev"
   PORT=4000
   ```

   `frontend/.env.local`:
   ```
   VITE_API_URL=http://localhost:4000
   ```

### Running locally

```bash
npm run dev
```

Starts the backend on port 4000 and the Vite dev server concurrently. Both are color-coded in the terminal (`blue` = backend, `green` = frontend).

### After a reboot

PostgreSQL doesn't restart automatically. Run this before `npm run dev`:

```bash
brew services start postgresql@16
```

Or to have it start automatically on login:

```bash
brew services enable postgresql@16
```

## Environment Files

| File | Committed | Purpose |
|------|-----------|---------|
| `frontend/.env` | Yes | Production — points at Vercel backend |
| `frontend/.env.local` | No (`*.local` gitignored) | Local dev — overrides to `localhost:4000` |
| `backend/.env` | No (gitignored) | Local dev — local DB connection string + port |

Vite loads `.env.local` before `.env`, so local overrides win automatically. Vercel never sees `.env.local` since it's gitignored.

## Deployment

Pushing to `main` triggers automatic deployments:
- **Frontend** → Vercel (reads `frontend/.env` for env vars)
- **Backend** → Vercel (reads env vars set in Vercel dashboard)
- **Database** → Supabase (production, separate from local `jeopardy_dev`)

## API Routes

All routes are under `/games`:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/games` | List all games |
| `GET` | `/games/:id` | Get a single game |
| `POST` | `/games` | Create a new game |
| `PUT` | `/games/:id` | Update a game |
| `DELETE` | `/games/:id` | Delete a game |
