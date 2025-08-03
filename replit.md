# Overview

Shticky is a QR code monetization platform that allows users to earn money by placing QR code stickers and receiving payments when they are scanned. The application features a React frontend with shadcn/ui components, an Express.js backend, and uses Drizzle ORM with PostgreSQL for data management. Users can submit applications, claim QR codes, track earnings, and receive monthly automatic payouts when balance reaches $5.00 minimum threshold.

# User Preferences

Preferred communication style: Simple, everyday language.
UI/UX preferences: Full landing page with visuals and explanations for non-authenticated users, improved text contrast (gray-800 instead of gray-600), bold energetic content creator style with colorful text and fun typography, but professional and trustworthy without excessive emojis or money symbols that could appear scammy. Brand color palette: beaver (#A89182), antiflash-white (#EFEFEE), dark-green (#1D2915), ebony (#686346), night (#040D07), chamoisee (#9A7B60).

Updated sticker textures: User provided new wrinkled paper texture images with light/white backgrounds requiring enhanced text contrast and overlay styling.

Recent Changes (August 3, 2025):
- ✓ Updated sign-in page to match home page liquid glass theme with consistent colors, fonts, and glassmorphism effects
- ✓ Fixed login authentication issue by correcting bcrypt password hash for test user
- ✓ Resolved login routing problem by properly linking applications to users in database
- ✓ Created dedicated application status page for users with pending/rejected applications
- ✓ Implemented sophisticated status handling with professional UI and clear messaging
- ✓ Test users: shrhersh@gmail.com/bluebird (approved), pending@test.com/bluebird (pending)

# System Architecture

## Frontend Architecture
- **React Single Page Application** using TypeScript and Vite as the build tool
- **Component Library**: shadcn/ui with Radix UI primitives providing a comprehensive set of accessible components
- **Styling**: Tailwind CSS with custom design tokens and dark mode support
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Express.js Server** with TypeScript support using ESM modules
- **Authentication**: Replit OAuth integration with session-based authentication using express-session
- **API Design**: RESTful endpoints organized by feature (auth, applications, QR codes, payments)
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development**: Hot reload support with tsx and comprehensive logging middleware

## Database Architecture
- **ORM**: Drizzle ORM providing type-safe database operations
- **Schema Design**: 
  - Users table for authentication and profile data
  - Applications table with approval workflow (pending/approved/rejected)
  - QR codes table linking codes to users with tracking capabilities
  - Payment methods table supporting multiple payment types (bank, CashApp, PayPal)
  - Scans table for tracking QR code interactions
  - Monthly payouts table for payment history
  - Sessions table for authentication persistence
- **Database Migrations**: Managed through Drizzle Kit with schema versioning

## Authentication & Authorization
- **Custom Email/Password**: Email and password authentication system with bcrypt hashing
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **Access Control**: Middleware-based authentication checks on protected routes
- **User Management**: User accounts created only when applications are approved by admin
- **Application Flow**: Users submit applications with email/password, accounts created upon approval

## Business Logic Architecture
- **Application Workflow**: Multi-step approval process for new users
- **QR Code Management**: Code claiming system with ownership tracking
- **Payment Processing**: Monthly automatic payouts with $5.00 minimum threshold, supporting bank transfer, Cash App, and PayPal
- **Analytics**: Scan tracking and earnings calculation with tier-based system
- **Admin Features**: Application review and approval system
- **Notification System**: Yellow notification bar for users with active Shtickys but no payment method

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Connection Management**: @neondatabase/serverless with WebSocket support for serverless environments

## Authentication Services
- **Replit OAuth**: OpenID Connect provider for user authentication
- **Passport.js**: Authentication middleware with OpenID Connect strategy

## UI Framework
- **Radix UI**: Accessible component primitives for complex UI components
- **Lucide React**: Icon library providing consistent iconography
- **Tailwind CSS**: Utility-first CSS framework for styling

## Development Tools
- **Vite**: Fast build tool with React plugin and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds

## Form & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation library for runtime type checking
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## Utilities
- **date-fns**: Date manipulation library
- **clsx & class-variance-authority**: Conditional className utilities
- **memoizee**: Function memoization for performance optimization