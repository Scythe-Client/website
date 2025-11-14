# Scythe Client Website

Full-stack Next.js website and API backend for Scythe Client, a high-performance Minecraft client.

**Stack:** Next.js 16 • React 19 • TypeScript • MongoDB • Clerk Auth • Tailwind CSS

---

## Quick Start

### Requirements
- **Node.js:** 22+
- **MongoDB** instance (local or Atlas)
- **Clerk** account with project setup
- **Inngest** account for background jobs

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file with:
```env
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLIENT_URL=http://localhost:3000
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
```

### Development
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm start            # Serve production build
npm run lint         # Run ESLint
```

---

## Project Structure

```
app/
  ├── (routes)/        # Pages: admin, community, download, features
  ├── api/             # API endpoints
  │   ├── admin/       # Admin dashboard, user/player management
  │   ├── client/      # Client integration (player registration)
  │   ├── dev/         # Development endpoints (DO NOT EXPOSE)
  │   ├── inngest/     # Webhook handler for Clerk events
  │   └── users/       # User management
  ├── models/          # Mongoose schemas (User, Player, Gate)
  ├── layout.tsx       # Root layout with providers
  ├── page.tsx         # Landing page
  └── globals.css      # Global styles

components/
  ├── ui/              # shadcn/ui components (buttons, dialogs, etc.)
  └── custom/          # Custom components (Header, Footer, SCCard)

lib/
  ├── db.ts            # MongoDB connection singleton
  ├── inngest.ts       # Background jobs (user sync, deletions)
  ├── env.ts           # Environment validation
  └── utils.ts         # Utility functions

hooks/                 # Custom React hooks
public/                # Static assets (images, logos)
scripts/               # Utility scripts
middleware.ts          # Auth + CORS + security headers
```

---

## Architecture

### Frontend
- Marketing landing page with hero, features, community sections
- Admin dashboard for user/player management
- Dark theme with purple branding (`#7a4dba`)
- Responsive design with shadcn/ui components
- Server Components by default, client components where needed

### Backend
- RESTful API for client integration
- MongoDB with Mongoose ODM (User, Player, Gate models)
- Clerk authentication with role-based access control
- Inngest background jobs for webhook processing
- Custom middleware for auth + CORS + security headers

### Key Features
- Player registration/login with ban system
- HWID tracking for multi-account detection
- Role hierarchy: OWNER → DEVELOPER → ADMIN → STAFF → PARTNER → DONATOR → BETA TESTER → DEFAULT
- Automatic user sync from Clerk to MongoDB
- Admin dashboard with search and role management

---

## API Endpoints

### Public
- `GET /api/ping` - Health check (returns "Pong!")

### Client Integration
- `POST /api/client/register-player` - Register/login player
  - Body: `{ ign, uuid, hwid? }`
  - Returns player object or ban status
- `DELETE /api/client/register-player` - Logout player
  - Body: `{ uuid }`

### Admin (Role-gated: OWNER, DEVELOPER, ADMIN)
- `GET /api/admin/dashboard?search={query}` - Search users
- `PATCH /api/admin/dashboard` - Update user role
  - Body: `{ userId, role }`
- `GET /api/admin/players` - Fetch all players
- `POST /api/admin/player-actions` - Player moderation (ban, unban)
- `POST /api/admin/user-actions` - User management

### Background Jobs
- `POST /api/inngest` - Inngest webhook handler
  - `clerk/user.created` - Auto-creates User in MongoDB
  - `clerk/user.deleted` - Deletes User from MongoDB

### Development
- `/api/dev/*` - Development endpoints (**DO NOT EXPOSE IN PRODUCTION**)

---

## Database Models

### User (`app/models/User.ts`)
Website user accounts synced from Clerk:
- `clerkId` (unique), `email` (unique), `name`, `profileImage`
- `role`: User role enum
- `createdAt`, `updatedAt`

### Player (`app/models/Player.ts`)
Minecraft player data:
- `ign` (unique), `uuid` (unique), `hwid`
- `role`: Player role enum
- `isOnline`, `isBanned`, `banReason`
- `lastSeen`, `firstSeen`, `createdAt`, `updatedAt`

### Gate (`app/models/Gate.ts`)
Feature flags/access control:
- `name`, `gatea_id` (unique), `isActive`, `lastSeen`
- `createdAt`, `updatedAt`

---

## Deployment

### Vercel (Recommended)
1. Import repository to Vercel
2. Add all environment variables
3. Configure Clerk webhook: `https://yourdomain.com/api/inngest`
4. Update `CLIENT_URL` to production domain
5. Deploy

### Security Checklist
- ✅ All environment variables configured
- ✅ MongoDB IP whitelist updated
- ✅ Clerk webhooks pointing to production
- ✅ `/api/dev/*` routes disabled in production
- ✅ CORS configured correctly via `CLIENT_URL`

---

## Authentication & Authorization

**Authentication:** Clerk handles all user auth (sign-up, sign-in, sessions)
- Custom dark theme with purple branding
- SSR-compatible with `clerkMiddleware`

**Authorization:** Role-based access control (RBAC)
- Roles stored in Clerk `publicMetadata.role` and synced to MongoDB
- Admin routes verify role before allowing access

---

## Development Guidelines

- **TypeScript:** Strict mode enabled
- **Components:** Use Server Components by default, add `'use client'` only when needed
- **API Routes:** Always validate input and handle errors properly
- **Database:** Always call `await connectDB()` before Mongoose operations
- **Security:** Never commit `.env` file or expose sensitive credentials

---

## License

This repository is licensed under BUSL 1.1 (Business Source License 1.1). Refer to the License.