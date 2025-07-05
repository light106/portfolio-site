# Portfolio Website - Replit Documentation

## Overview

This is a professional portfolio website for Engr. Shadman Sakib, an AI Lead Coach and ICT Lecturer. The application is built as a full-stack web application using a modern React frontend with a Node.js/Express backend, featuring a contact form system and professional portfolio showcase.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: Configured for PostgreSQL with Drizzle ORM
- **Session Storage**: Connect-pg-simple for PostgreSQL sessions
- **Development**: Hot module replacement via Vite middleware

### Build System
- **Development**: Vite dev server with Express backend
- **Production**: Static build output served by Express
- **TypeScript**: Shared types between frontend and backend via `shared/` directory
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)

## Key Components

### Contact Management System
- Contact form with validation (firstName, lastName, email, subject, message)
- Server-side validation using Zod schemas
- RESTful API endpoints for contact submission and retrieval
- **PostgreSQL database integration with Drizzle ORM**

### UI Components
- Comprehensive shadcn/ui component library
- Custom themed components for portfolio sections
- Responsive design with mobile-first approach
- Dark/light theme support via CSS variables

### Portfolio Sections
- Hero section with professional introduction
- About section with career objectives and expertise areas
- Experience timeline with detailed job descriptions
- Education history with academic achievements
- Skills showcase with proficiency levels
- Certifications and awards display
- Projects portfolio with technical details
- Contact form for professional inquiries

## Data Flow

1. **Client Request**: User interacts with React components
2. **State Management**: TanStack Query manages API calls and caching
3. **API Layer**: Express routes handle business logic
4. **Data Persistence**: Drizzle ORM interfaces with PostgreSQL (when configured)
5. **Response**: JSON responses sent back to client
6. **UI Update**: React components re-render with new data

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **zod**: Schema validation library

### Development Tools
- **tsx**: TypeScript execution engine for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

## Deployment Strategy

### Development
- Run `npm run dev` to start development server
- Vite serves frontend with HMR
- Express backend runs concurrently
- Auto-reload on file changes

### Production Build
- `npm run build` creates optimized production build
- Frontend assets bundled to `dist/public/`
- Backend bundled to `dist/index.js`
- `npm start` serves production application

### Database Setup
- Run `npm run db:push` to sync database schema
- Drizzle migrations stored in `migrations/` directory
- Environment variable `DATABASE_URL` required for PostgreSQL connection

## Changelog
```
Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Database integration - Added PostgreSQL database with Drizzle ORM, replaced MemStorage with DatabaseStorage
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```