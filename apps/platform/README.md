# Caribbean Azure Platform

Professional SaaS platform for Caribbean construction automation and 3D configurators.

## Overview

This is the main **Caribbean Azure Platform** application that provides:

### Base Tier: Automation Studio
- Lead management dashboard
- Automation playbook execution
- Performance analytics
- Quote tracking

### Pro Tier: Tools & Configurators
- **Shed Configurator**: 3D design tool for custom sheds
- **Carport Configurator**: 3D design tool for custom carports
- **Veranda Configurator**: 3D design tool for aluminum verandas
- **ROI Calculator**: Project profitability analysis

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Three Fiber** - 3D visualization
- **Zustand** - State management
- **Zod** - Runtime validation

## Project Structure

```
apps/platform/
├── app/
│   ├── (public)/              # Public landing pages
│   ├── (dashboard)/           # Authenticated dashboard area
│   │   ├── page.tsx          # Main dashboard
│   │   ├── configurators/    # 3D configurator pages
│   │   │   ├── shed/
│   │   │   ├── carport/
│   │   │   └── veranda/
│   │   ├── tools/            # Additional tools
│   │   │   └── roi/
│   │   └── settings/
│   ├── api/                  # API routes
│   │   ├── health/
│   │   └── leads/
│   ├── layout.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── dashboard/            # Dashboard components
│   │   └── Navigation.tsx
│   ├── configurators/        # Configurator-specific components
│   │   ├── shed/
│   │   ├── carport/
│   │   └── veranda/
│   ├── r3f/                  # React Three Fiber 3D components
│   │   ├── Viewer3D.tsx
│   │   └── ShedModel.tsx
│   └── shared/               # Shared UI components
│       ├── ExportButton.tsx
│       └── KPIDock.tsx
├── lib/
│   ├── mocks/                # Mock data (temporary)
│   │   ├── leads.ts
│   │   ├── automations.ts
│   │   └── quotes.ts
│   └── utils.ts
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

## Development Notes

### TODO: Integration Tasks

1. **Configurator Engine**
   - Extract calculation logic to `@caribbean-azure/configurator-engine` package
   - Implement BOM (Bill of Materials) calculations
   - Add validation rules for each product type
   - Extract preset configurations

2. **3D Visualization**
   - Extract R3F components from Syria configurator
   - Implement shared `Viewer3D` component
   - Create product-specific 3D models (Shed, Carport, Veranda)
   - Add material system (textures, colors, PBR materials)

3. **Database Integration**
   - Replace mock data with real database (Supabase/Prisma)
   - Implement authentication/authorization
   - Add data persistence for configurations
   - Implement user accounts

4. **Email & Notifications**
   - Integrate Resend for transactional emails
   - Add email templates
   - Implement lead notification system

5. **Automation Engine**
   - Build automation workflow system
   - Implement playbook execution
   - Add triggers and actions
   - Create automation dashboard

## Workspace Packages

This app uses the following workspace packages:

- `@caribbean-azure/ui` - Shared UI components
- `@caribbean-azure/types` - TypeScript type definitions
- `@caribbean-azure/utils` - Shared utilities
- `@caribbean-azure/configurator-engine` - *(To be created)* Configurator calculation engine
- `@caribbean-azure/roi` - *(To be created)* ROI calculation package

## API Routes

- `GET /api/health` - Health check endpoint
- `POST /api/leads` - Lead submission endpoint
- `GET /api/leads` - Get all leads (TODO: add auth)

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

See `.env.example` for all available options.

## License

Proprietary - Caribbean Azure Platform
