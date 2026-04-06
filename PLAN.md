# Plan: Jeopardy App - Full Improvement

## Context

The app is a full-stack Jeopardy game manager (React 19 + Vite + Tailwind v4 frontend, Express + PostgreSQL backend, shared types). Currently: no auth (userId hardcoded to 1), the Home page is a placeholder `<div>Home</div>`, and UI components/styles are not well-organized for reuse. The goal is to add per-game password protection, build a proper Home game hub, modernize the JeopardySelect page, and establish reusable component/style patterns.

---

## Phase 1: Reusable Component & Style Foundation

Everything else builds on this. Do it first to avoid duplicating patterns later.

### 1A. Extend Tailwind theme (`frontend/src/styles.css`)

Add semantic color variables to `@theme` that codify colors already used inline everywhere:

| Variable | Value | Replaces |
|----------|-------|----------|
| `--color-surface` | `oklch(0.25 0.05 260)` | `bg-blue-950/40` card backgrounds |
| `--color-surface-hover` | `oklch(0.30 0.06 260)` | hover states |
| `--color-border` | `oklch(0.45 0.1 260 / 0.5)` | `border-blue-700/50` |
| `--color-primary` | `#eab308` | `bg-yellow-500` CTAs |
| `--color-primary-hover` | `#facc15` | `bg-yellow-400` |
| `--color-danger` | `#dc2626` | `bg-red-600` |
| `--color-success` | `#16a34a` | `bg-green-600` |
| `--color-text-muted` | `#bfdbfe` | `text-blue-200` |
| `--color-backdrop` | `rgba(0,0,0,0.6)` | modal overlays |

### 1B. Refactor `Button.tsx`

Current Button has `fill`/`nofill` variants that don't match actual usage. Refactor to:
- Variants: `primary` (yellow CTA), `secondary` (blue ghost), `danger`, `success`, `ghost` (white outline for modals)
- Sizes: `sm`, `md`, `lg`
- Accept `icon` prop for lucide icons, `children` instead of `text`
- Spread remaining `ButtonHTMLAttributes`

### 1C. New `Modal.tsx` component

Three components duplicate `fixed inset-0 bg-black/50 flex items-center justify-center z-50`: ConfirmDialog, CreateGameModal, EditModal. Extract a reusable shell with:
- Props: `isOpen`, `onClose`, `children`, `maxWidth?`
- Handles Escape key and click-outside-to-close

### 1D. New `Input.tsx` component

Wrap the repeated `w-full px-4 py-2 border rounded-lg focus:ring-2` pattern. Accept standard input props + optional `label` and `error`.

### 1E. New `PageHeader.tsx` component

The header section pattern (border-bottom, blurred background, title + subtitle + action) is used in JeopardySelect and will be used on Home. Props: `title`, `subtitle?`, `action?` (ReactNode for CTA button).

### 1F. Refactor existing components

Update ConfirmDialog, CreateGameModal, EditModal, and JeopardySelect to use new Modal, Button, Input, PageHeader. Pure refactor, no behavior change.

**Files modified**: `styles.css`, `Button.tsx`, `Card.tsx`, `ConfirmDialog.tsx`, `CreateGameModal.tsx`, `EditModal.tsx`, `JeopardySelect.tsx`
**Files created**: `Modal.tsx`, `Input.tsx`, `PageHeader.tsx`

---

## Phase 2: Per-Game Password Protection

### 2A. Database

```sql
ALTER TABLE games ADD COLUMN password_hash TEXT;
```

Nullable -- existing games and games created without a password have NULL.

### 2B. Backend (`backend/src/Jeopardy/routes/games.ts`)

Install `bcryptjs` + `@types/bcryptjs` (pure JS, no native build needed).

- **POST /games**: Accept optional `password`. If present, `bcrypt.hash(password, 10)` → store as `password_hash`.
- **GET /games**: Return `has_password: boolean` (computed from `password_hash IS NOT NULL`). Never return the hash.
- **GET /games/:id**: Same -- include `hasPassword`, exclude hash.
- **PUT /games/:id**: If game has `password_hash`, require `password` in body and verify with `bcrypt.compare()`. Return 401 if missing/wrong.
- **DELETE /games/:id**: Same password check as PUT.
- **mapEntityToObject**: Add `hasPassword` field, never include hash.

### 2C. Shared types (`shared/types/types.ts`)

- Add `password?: string` to `JeopardyGameType` (sent on create only)
- Add `hasPassword?: boolean` to `JeopardyGameType` (returned from API)
- Add `password_hash: string | null` to `JeopardyGameEntity`
- Add `createdAt?: string` to `JeopardyGameType` (for Phase 4, do it here to avoid double-editing)

### 2D. Frontend API (`frontend/src/services/gamesApi.ts`)

- `updateGame`: Accept optional `password`, include in request body
- `deleteGame`: Accept optional `password`, include in request body (send as JSON with Content-Type header)
- Handle 401 responses specifically (throw identifiable error)

### 2E. Frontend UI

**New `PasswordPromptModal.tsx`**: Uses Modal component. Password input + Submit/Cancel. Props: `isOpen`, `onSubmit(password)`, `onCancel`, optional `error` message.

**`CreateGameModal.tsx`**: Add optional password + confirm-password fields below title. Helper text: "If set, editing and deleting will require this password."

**`JeopardySelect.tsx`**:
- Edit click on password-protected game → show PasswordPromptModal → on success, navigate to edit page with password in React Router state
- Delete click on password-protected game → show PasswordPromptModal → then show ConfirmDialog → delete with password
- Lock icon (lucide `Lock`) on protected game cards
- Games without passwords behave exactly as today

**`JeopardyEdit.tsx`**: Read password from `useLocation().state`. Pass to `gamesApi.updateGame()` on save. If 401 returned, show PasswordPromptModal for retry.

**Files modified**: `shared/types/types.ts`, `games.ts` (backend), `gamesApi.ts`, `CreateGameModal.tsx`, `JeopardySelect.tsx`, `JeopardyEdit.tsx`
**Files created**: `PasswordPromptModal.tsx`
**Packages**: `bcryptjs` + `@types/bcryptjs` in backend

---

## Phase 3: Home Page (Game Hub)

### `frontend/src/pages/Home.tsx`

Replace the placeholder with a proper game selection hub:

- Use `PageHeader` with "Welcome to Game Mixer" title, "Choose a game to get started" subtitle
- Responsive grid of game-type cards (1 col mobile, 2-3 col desktop)
- Data-driven from a `gameTypes` array (easy to extend later):

```typescript
const gameTypes = [
  { id: "jeopardy", title: "Jeopardy!", description: "Create and play custom Jeopardy games", path: "/jeopardy", icon: "/game.svg", fontClass: "font-swiss" },
  // future games go here
];
```

- Jeopardy card: uses the existing `/public/game.svg`, styled with the Jeopardy blue/gold theme, `font-swiss` for the title
- 1-2 "Coming Soon" placeholder cards (grayed out, non-clickable) to fill the grid and hint at extensibility
- Each card is a `Link` to the game's select page

**Files modified**: `Home.tsx`

---

## Phase 4: JeopardySelect Modernization

### 4A. Use shared components

Replace inline header with `PageHeader`, inline buttons with `Button`.

### 4B. Richer game cards

Add to each game card:
- Category count + question count (computed from `gameData` which is already loaded)
- Created date (formatted, using `createdAt` added to types in Phase 2C)
- Lock icon for password-protected games (from Phase 2)

### 4C. Client-side search filter

Simple text input above the game list, filters by title. Only shown when `games.length > 5`.

### 4D. Backend: include `created_at` in responses

Update `mapEntityToObject` and list endpoint to include `created_at` as `createdAt`.

**Files modified**: `JeopardySelect.tsx`, `games.ts` (backend)

---

## Implementation Order

| Order | Phase | Dependencies |
|-------|-------|-------------|
| 1st | Phase 1 (components/styles) | None |
| 2nd | Phase 2 (passwords) | Phase 1 (uses Modal, Button, Input) |
| 3rd | Phase 3 (Home page) | Phase 1 (uses PageHeader) |
| 4th | Phase 4 (JeopardySelect) | Phase 1 + 2 (uses components, hasPassword, createdAt) |

Phases 3 and 4 are independent of each other and could be done in parallel after Phase 2.

---

## Verification

1. **Phase 1**: Visual regression -- pages should look identical after refactor. No behavior change.
2. **Phase 2**: Create game with password → verify edit requires correct password → verify delete requires correct password → verify wrong password shows error → verify games without password work as before → verify play never asks for password
3. **Phase 3**: Navigate to `/` → see game hub → click Jeopardy card → arrives at `/jeopardy`
4. **Phase 4**: See enriched game cards with counts and dates → search filter works → lock icons appear on protected games
5. **Cross-cutting**: Run `npm run dev` in both frontend and backend, test all flows end-to-end
