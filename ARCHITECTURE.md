# Caribbean Azure Platform - Technical Architecture

## System Overview

The Caribbean Azure platform is a **unified SaaS monorepo** combining a marketing website and a multi-tier automation/configurator platform. The architecture follows modern best practices with:

- **Monorepo structure** (Turborepo + pnpm)
- **Shared design system** (design tokens + UI components)
- **Type-safe interfaces** (TypeScript throughout)
- **Mock-first development** (no external dependencies required initially)
- **Scalable architecture** (easy to add new tools/configurators)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Caribbean Azure Monorepo                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────▼───────┐   ┌──────▼────────┐
            │   Marketing   │   │   Platform    │
            │   Website     │   │   SaaS App    │
            └───────┬───────┘   └──────┬────────┘
                    │                   │
                    └─────────┬─────────┘
                              │
            ┌─────────────────▼──────────────────┐
            │         Shared Packages            │
            ├────────────────────────────────────┤
            │ • design-tokens                    │
            │ • ui (components)                  │
            │ • types                            │
            │ • utils                            │
            │ • roi (calculator)                 │
            │ • configurator-engine              │
            │ • automations                      │
            │ • email                            │
            └────────────────────────────────────┘
```

## Application Architecture

### Marketing Site (`apps/marketing`)

**Purpose**: Convert visitors into platform users

**Tech Stack**:
- Next.js 16 App Router
- next-intl (Dutch + English)
- React Three Fiber (3D backgrounds)
- Tailwind CSS v4

**Key Pages**:
- `/` - Homepage with hero, ROI calculator, testimonials
- `/oplossingen` - Solutions/pricing
- `/over-ons` - About company
- `/contact` - Contact form

**API Routes**:
- `/api/contact` - Contact form submission (Resend)
- `/api/lead` - ROI calculator lead capture
- `/api/health` - Health check

**Features**:
- SEO optimized (sitemap, robots.txt, structured data)
- i18n routing (Dutch-first)
- ROI calculator integration
- 3D interactive backgrounds

### Platform App (`apps/platform`)

**Purpose**: SaaS application with automation tools and configurators

**Tech Stack**:
- Next.js 15 App Router
- React Three Fiber (3D configurators)
- Tailwind CSS
- Mock data repositories (no DB required initially)

**Route Structure**:
```
app/
├── (public)/
│   └── page.tsx                 # Landing/login
├── (dashboard)/
│   ├── layout.tsx               # Dashboard shell + navigation
│   ├── page.tsx                 # Automation Studio dashboard
│   ├── automations/             # Workflow automation
│   ├── tools/
│   │   └── roi/                 # ROI calculator tool
│   ├── configurators/
│   │   ├── shed/                # 3D shed configurator
│   │   ├── carport/             # Carport configurator
│   │   └── veranda/             # Veranda configurator
│   ├── leads/                   # Lead management
│   ├── quotes/                  # Quote marketplace
│   └── settings/                # User/org settings
└── api/
    ├── health/                  # Health check
    ├── leads/                   # Lead CRUD
    ├── quotes/                  # Quote generation
    └── automations/             # Automation execution
```

**Tier Features**:

**Base Tier - Automation Studio**:
- Dashboard with KPIs (leads, quotes, conversion rate)
- 3 active automation playbooks
- ROI tracking & calculator
- Lead management
- Basic tools

**Pro Tier - Tools & Configurators**:
- All Base tier features
- 3D product configurators (shed, carport, veranda)
- BOM generation & export
- Quote generation & marketplace
- Advanced analytics

## Package Architecture

### Core Packages

#### 1. **design-tokens**

Centralized design system with CSS custom properties and TypeScript constants.

**Exports**:
- `colors` - Brand palette, neutrals, semantics
- `typography` - Font families, scales, weights
- `spacing` - 4px grid system
- `shadows` - Elevation system
- `motion` - Transitions, easings, springs
- `radii` - Border radius scale

**CSS Variables**:
```css
--brand-600: #0f5e9c;
--space-4: 16px;
--shadow-lg: 0 10px 15px rgba(10, 42, 67, 0.1);
```

#### 2. **ui**

Shared component library based on shadcn/ui.

**Components**:
- Form: Button, Input, Textarea, Label
- Layout: Container, Section
- Typography: Heading, Text
- Cards: Card family
- All use design-tokens for styling

**Usage Pattern**:
```typescript
import { Button, Card } from '@caribbean-azure/ui';
```

#### 3. **types**

Shared TypeScript types for type safety across apps.

**Type Categories**:
- `Organization` - Tenant model
- `User` - Account & roles (owner, admin, member, viewer)
- `Lead` - Customer inquiries
- `AutomationFlow` - Workflow definitions
- `ConfiguratorInstance` - Product configurations
- `Quote` - Proposals & pricing

#### 4. **utils**

Common utility functions.

**Utilities**:
- `cn()` - Tailwind class merging (clsx + tailwind-merge)
- `formatCurrency()` - Dutch & English number formatting
- `formatDate()` - Locale-aware date formatting
- `isValidEmail()`, `isValidDutchPhone()` - Validation

#### 5. **roi**

ROI Calculator component and logic.

**Components**:
- `<RoiCalculator />` - Full calculator with inputs
- `<RoiSummary />` - Results display

**Logic**:
- `calculateRoi()` - Annual savings = team × rate × hours × 52 × adoption
- `validateInputs()` - Input constraints
- `exportToCsv()` - CSV export

**Used in**:
- Marketing: Homepage section
- Platform: Dashboard tool

#### 6. **configurator-engine**

Parametric calculation engine for product configurators.

**Structure**:
```
configurator-engine/
├── shed/          # Shed calculations, validation, BOM, pricing
├── carport/       # Carport calculations, validation, BOM, pricing
├── veranda/       # Veranda calculations, validation, BOM, pricing
└── shared/        # Rules engine, pricing utilities
```

**Key Functions**:
- `calculateQuantities()` - Surface areas, volumes, material quantities
- `validateConfig()` - Dimension & structural validation
- `generateBOM()` - Bill of materials
- `calculatePricing()` - Pricing with regional adjustments

**Example**:
```typescript
import { calculateQuantities, PRESETS } from '@caribbean-azure/configurator-engine';

const config = PRESETS.shed.tuinhuis_standaard;
const quantities = calculateQuantities(config);
// { wallArea: 48, roofArea: 24, floorArea: 12, ... }
```

#### 7. **automations**

Pre-built automation playbooks.

**Playbooks**:
1. **Inbox to ClickUp** (8h/mo saved) - Email → Task
2. **Intake to Quote** (12h/mo saved) - Form → PDF quote
3. **Lead Routing** (6h/mo saved) - Smart assignment

**Structure**:
```typescript
interface AutomationPlaybook {
  id: string;
  name: string;
  description: string;
  category: 'inbox' | 'data' | 'integration';
  estimatedTimeSaved: number;
  difficulty: 'easy' | 'medium' | 'advanced';
  template: AutomationFlow;
}
```

**Usage**:
```typescript
import { playbooks, getPlaybookById } from '@caribbean-azure/automations';

const totalSaved = playbooks.reduce((sum, p) => sum + p.estimatedTimeSaved, 0);
```

#### 8. **email**

Email templates and sending logic (Resend integration).

**Templates**:
- Contact confirmation
- Lead notification
- Quote received
- Welcome email

**Sender**:
```typescript
import { sendEmail } from '@caribbean-azure/email';

await sendEmail({
  to: 'customer@example.com',
  template: 'quote-received',
  data: { quoteName, totalAmount },
});
```

## Data Flow

### Lead Capture Flow

```
Marketing Site
    │
    ├─ Contact Form ──────────┐
    ├─ ROI Calculator ────────┤
    └─ Configurator Demo ─────┤
                              │
                              ▼
                    POST /api/lead
                              │
                              ▼
                    Lead Repository (Mock)
                              │
                              ├─ Email Notification (Resend)
                              ├─ Slack Notification (webhook)
                              └─ CRM Sync (optional)
                              │
                              ▼
                    Platform Dashboard
                              │
                              └─ Lead Management UI
```

### Configurator Flow

```
Platform Dashboard
    │
    └─ /configurators/shed
            │
            ├─ User Adjusts Parameters
            │   (width, length, height, materials)
            │
            ▼
    @caribbean-azure/configurator-engine
            │
            ├─ calculateQuantities() ──► Surface areas, volumes
            ├─ validateConfig() ───────► Check constraints
            ├─ generateBOM() ──────────► Material list
            └─ calculatePricing() ─────► Total cost
            │
            ▼
    3D Viewer (React Three Fiber)
            │
            └─ Live preview updates
            │
            ▼
    Export Options
            │
            ├─ JSON (configuration)
            ├─ CSV (BOM)
            └─ PDF (quote) - future
```

### Automation Flow

```
Trigger Event
    │
    ├─ Email received
    ├─ Form submitted
    ├─ Webhook called
    └─ Schedule fired
            │
            ▼
    Automation Engine
            │
            ├─ Parse trigger data
            ├─ Execute actions (sequence)
            │   ├─ Send email
            │   ├─ Create task
            │   ├─ Update CRM
            │   └─ HTTP request
            │
            ▼
    Track Metrics
            │
            └─ Dashboard stats update
```

## Design System

### Token System

Design tokens flow from `design-tokens` package to all apps:

```
design-tokens/
    │
    ├─ CSS Variables (tokens.css)
    │   └─ Imported in app/globals.css
    │
    └─ TypeScript Constants (colors.ts, spacing.ts, etc.)
        └─ Used in component logic
```

### Component Hierarchy

```
Apps (marketing, platform)
    │
    ├─ Import from @caribbean-azure/ui
    │   │
    │   └─ UI components use @caribbean-azure/design-tokens
    │       └─ CSS variables & TypeScript constants
    │
    └─ Custom components
        └─ Also use design-tokens for consistency
```

## Mock Data Strategy

**Current State**: All data operations use in-memory mocks

**Mock Repositories**:
- `lib/mocks/leads.ts` - Lead CRUD operations
- `lib/mocks/automations.ts` - Automation data
- `lib/mocks/quotes.ts` - Quote generation

**Migration Path**:
1. Replace mock repositories with database clients (Prisma, Supabase)
2. Keep interface identical (Repository pattern)
3. No changes to UI components

**Example**:
```typescript
// Current (Mock)
import { createLead } from '@/lib/mocks/leads';

// Future (Database)
import { createLead } from '@/lib/db/leads';
// Same interface, different implementation
```

## Authentication (Future)

**Planned Stack**:
- NextAuth.js or Clerk for authentication
- Role-based access control (owner, admin, member, viewer)
- Organization-based multi-tenancy

**User Flow**:
```
Sign Up → Email Verification → Create Organization → Invite Team → Assign Roles
```

## Deployment Architecture

### Production Deployment

```
┌──────────────────────────────────────────────────┐
│                   Vercel Edge                     │
├──────────────────────────────────────────────────┤
│                                                   │
│  marketing.caribbeanazure.com  →  apps/marketing │
│  platform.caribbeanazure.com   →  apps/platform  │
│                                                   │
└──────────────────────────────────────────────────┘
         │                            │
         ▼                            ▼
┌─────────────────┐         ┌─────────────────┐
│  Resend (Email) │         │  Database       │
└─────────────────┘         │  (PostgreSQL)   │
                            └─────────────────┘
```

### Environment Variables

**Marketing**:
- `RESEND_API_KEY` - Email sending
- `NEXT_PUBLIC_SITE_URL` - Base URL

**Platform**:
- `NEXTAUTH_URL` - Auth URL
- `NEXTAUTH_SECRET` - Auth secret
- `DATABASE_URL` - Database connection
- `RESEND_API_KEY` - Email sending
- `STRIPE_SECRET_KEY` - Payments (future)

## Performance Considerations

### Code Splitting

- Route-based code splitting (Next.js automatic)
- Dynamic imports for heavy components (3D viewer)
- Package-level code splitting via workspace imports

### Bundle Optimization

- Tree shaking enabled
- Shared dependencies hoisted
- Turbopack for faster builds

### Caching Strategy

- Static pages cached at CDN edge
- API routes with proper cache headers
- Client-side state management (React state, URL params)

## Extensibility

### Adding New Features

**New Automation Playbook**:
1. Create in `packages/automations/src/playbooks/new-playbook.ts`
2. Export from `packages/automations/src/index.ts`
3. Display in platform dashboard

**New Configurator**:
1. Add logic to `packages/configurator-engine/src/product/`
2. Create UI in `apps/platform/app/(dashboard)/configurators/product/`
3. Add route to navigation

**New Tool**:
1. Create component in `apps/platform/app/(dashboard)/tools/tool-name/`
2. Add to navigation
3. Use shared packages for logic

### Custom Branding

All branding centralized in `design-tokens`:

```typescript
// Change brand colors
export const colors = {
  brand: {
    600: '#YOUR_COLOR', // Update primary brand color
  },
};
```

CSS variables update automatically.

## Testing Strategy

### Unit Tests

- `packages/configurator-engine` - Calculation logic
- `packages/roi` - ROI calculations
- `packages/utils` - Utility functions

**Framework**: Vitest

### Integration Tests

- API routes (contact, leads, quotes)
- Automation flows

**Framework**: Playwright (future)

### E2E Tests

- User journeys (sign up, create automation, configure shed)

**Framework**: Playwright (future)

## Security Considerations

### Input Validation

- Zod schemas for all API inputs
- Client-side validation for UX
- Server-side validation for security

### XSS Prevention

- All user input sanitized
- React escapes by default
- `sanitizeHtml()` utility for edge cases

### CSRF Protection

- Next.js built-in CSRF protection
- API routes use proper HTTP methods

### Rate Limiting

- API routes rate limited (future with Redis)
- Form submissions throttled

## Monitoring (Future)

**Planned Tools**:
- **Vercel Analytics** - Page views, performance
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Plausible** - Privacy-friendly analytics

## Conclusion

This architecture provides:

- ✅ **Unified branding** across marketing and platform
- ✅ **Shared components** for consistency
- ✅ **Type safety** throughout
- ✅ **Mock-first** development (no external dependencies)
- ✅ **Scalable** structure (easy to add features)
- ✅ **Production-ready** (can deploy immediately)
- ✅ **Well-documented** (comprehensive READMEs)

The monorepo architecture allows for rapid development while maintaining consistency and type safety across all applications and packages.
