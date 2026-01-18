# 🛸 Orbit

A Jira-like project management and issue tracking API built with NestJS, Prisma, and PostgreSQL.

## ✨ Features

- **Authentication** - JWT-based auth with register, login, and protected routes
- **Projects** - Create and manage projects with team members
- **Issues** - Full issue tracking with Kanban board support (drag-and-drop ready)
- **Database** - PostgreSQL with Prisma ORM 7.x and Supabase integration

## 🚀 Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 7.x with driver-adapter pattern
- **Auth**: Passport.js + JWT
- **Validation**: class-validator + class-transformer

## 📋 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |
| GET | `/auth/me` | Get current user profile (🔐) |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/projects` | Create a project (🔐) |
| GET | `/projects` | Get user's projects (🔐) |
| GET | `/projects/:id` | Get project details (🔐) |

### Issues
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/issues` | Create an issue (🔐) |
| GET | `/issues?projectId=1` | Get issues by project (🔐) |
| PATCH | `/issues/:id` | Update issue status/position (🔐) |

> 🔐 = Requires JWT authentication via `Authorization: Bearer <token>` header

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Supabase account)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@host:5432/database?uselibpqcompat=true&sslmode=require"
JWT_SECRET="your-secret-key"
```

### Running the App

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run start:prod
```

## 📊 Database Schema

```
User ─────┬───── Project
          │         │
          │         │
          └──── Issue ──── Comment
```

- **User**: Authentication and profile data
- **Project**: Project container with owner and members
- **Issue**: Tasks/bugs with status, priority, and Kanban position
- **Comment**: Issue discussions

## 📝 Request Examples

### Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "name": "John Doe"}'
```

### Create Project
```bash
curl -X POST http://localhost:3000/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Project", "key": "MYP"}'
```

### Create Issue
```bash
curl -X POST http://localhost:3000/issues \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Fix login bug", "type": "BUG", "priority": "HIGH", "projectId": 1}'
```

## 📄 License

MIT
