# replit.md

## Overview

This is an Employee Management System - a full-stack web application for managing employee records. It allows users to create, view, update, and soft-delete (deactivate) employees through a clean dashboard interface. The system tracks employee information including name, email, department, and salary.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Animations**: Framer Motion for smooth UI transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Build Tool**: esbuild for server bundling, Vite for client bundling

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's table definitions
- **Validation**: drizzle-zod generates Zod schemas from database schema
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)

### Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # React components including shadcn/ui
│       ├── hooks/        # Custom React hooks (use-employees, use-toast)
│       ├── pages/        # Page components (Dashboard)
│       └── lib/          # Utilities (queryClient, utils)
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database operations layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API route definitions with Zod schemas
└── migrations/       # Drizzle database migrations
```

### Key Design Decisions

1. **Shared Type Safety**: The `shared/` directory contains both database schema and API route definitions, ensuring type consistency between frontend and backend.

2. **Soft Delete Pattern**: Employees are never physically deleted; instead, their status is set to "INACTIVE". The list endpoint only returns active employees.

3. **Storage Abstraction**: The `IStorage` interface in `storage.ts` abstracts database operations, making it easier to swap implementations if needed.

4. **Development vs Production**: Vite handles development with HMR; production builds are created with esbuild (server) and Vite (client).

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection configured via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migration tool (`db:push` script for schema synchronization)

### Third-Party Libraries
- **Radix UI**: Headless UI primitives for accessible components
- **TanStack Query**: Async state management and caching
- **Zod**: Runtime type validation for API inputs/outputs
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **esbuild**: Fast server bundling for production
- **TypeScript**: Type checking across the entire codebase

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay for development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator