# Caribbean Azure - Unified SaaS Platform

A comprehensive monorepo combining the **Caribbean Azure marketing site** and **Caribbean Azure Platform** (SaaS app) into a unified ecosystem.

## 🏗️ Architecture Overview

This monorepo contains:

- **apps/marketing** → Caribbean Azure marketing site (Next.js, Dutch-first, SEO-optimized)
- **apps/platform** → Caribbean Azure Platform SaaS app with:
  - **Base Tier**: "Automation Studio" (inbox-to-action workflows, ROI dashboard)
  - **Pro Tier**: "Tools & Configurators" (3D shed/carport/veranda configurators)

Built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **React Three Fiber**.

## 📁 Monorepo Structure

```
caribbean-azure-monorepo/
├── apps/
│   ├── marketing/          # Caribbean Azure marketing site
│   │   ├── app/           # Next.js App Router (i18n, pages, API routes)
│   │   ├── components/    # Marketing-specific components
│   │   ├── messages/      # i18n translations (nl.json, en.json)
│   │   └── README.md      # Marketing app documentation
│   │
│   └── platform/          # Caribbean Azure Platform (SaaS)
│       ├── app/
│       │   ├── (public)/       # Public landing/auth pages
│       │   ├── (dashboard)/    # Dashboard, automations, tools, configurators
│       │   └── api/           # Platform API routes
│       ├── components/    # Platform-specific components
│       ├── lib/mocks/     # Mock data repositories
│       └── README.md      # Platform app documentation
│
├── packages/
│   ├── design-tokens/     # Unified design system (colors, typography, spacing)
│   ├── ui/               # Shared shadcn/ui components
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Shared utilities (formatting, validation, cn())
│   ├── roi/              # ROI calculator component & logic
│   ├── configurator-engine/ # Parametric engine (shed, carport, veranda)
│   ├── automations/      # Automation playbooks
│   └── email/            # Email templates & sender
│
├── turbo.json            # Turborepo pipeline configuration
├── package.json          # Root workspace configuration
├── pnpm-workspace.yaml   # pnpm workspaces
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** 8+

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Run all apps in parallel
pnpm dev

# Run marketing site only
pnpm dev:marketing

# Run platform app only
pnpm dev:platform
```

Visit:
- Marketing: http://localhost:3000
- Platform: http://localhost:3001 (or configured port)

### Build

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:marketing
pnpm build:platform
```

### Lint

```bash
# Lint all packages
pnpm lint
```

## 📦 Shared Packages

### Design Tokens (`@caribbean-azure/design-tokens`)

Unified design system with Caribbean Azure brand colors, typography, spacing, shadows, and motion.

```typescript
import { colors, spacing, shadows } from '@caribbean-azure/design-tokens';
import '@caribbean-azure/design-tokens/tokens.css';
```

**Features:**
- Azure navy brand palette (`brand.900` to `brand.50`)
- Sand & Ink neutral palettes
- WCAG AA compliant color combinations
- 4px spacing grid
- Responsive typography scale
- CSS custom properties

### UI Components (`@caribbean-azure/ui`)

Shared shadcn/ui-based components with Caribbean Azure styling.

```typescript
import { Button, Card, Input, Heading } from '@caribbean-azure/ui';
```

**Components:**
- Form: Button, Input, Textarea, Label
- Layout: Container, Section
- Typography: Heading, Text
- Cards: Card, CardHeader, CardTitle, CardContent, CardFooter

### Types (`@caribbean-azure/types`)

Shared TypeScript interfaces for the entire platform.

```typescript
import type { User, Organization, Lead, AutomationFlow } from '@caribbean-azure/types';
```

**Type Categories:**
- Organization & tenancy
- User accounts & roles
- Leads & customers
- Automation workflows
- Configurator instances
- Quotes & proposals

### Utils (`@caribbean-azure/utils`)

Shared utility functions.

```typescript
import { cn, formatCurrency, formatDate, isValidEmail } from '@caribbean-azure/utils';
```

**Utilities:**
- `cn()` - Tailwind class merging
- `formatCurrency()`, `formatNumber()`, `formatDate()`
- `isValidEmail()`, `isValidDutchPhone()`
- `slugify()`, `truncate()`, `pluralize()`

### ROI Calculator (`@caribbean-azure/roi`)

Reusable ROI calculator component used in both marketing and platform.

```typescript
import { RoiCalculator } from '@caribbean-azure/roi';

<RoiCalculator
  locale="nl"
  variant="card"
  showExport={true}
  onSubmit={(inputs, result) => {
    console.log('Annual savings:', result.annualSavings);
  }}
/>
```

**Features:**
- Team size × hourly rate × hours saved calculation
- Dutch number formatting (€12.500,00)
- CSV export
- URL parameter persistence
- Bilingual (NL/EN)

### Configurator Engine (`@caribbean-azure/configurator-engine`)

Parametric calculation engine for product configurators.

```typescript
import {
  calculateQuantities,
  validateConfig,
  generateBOM,
  PRESETS
} from '@caribbean-azure/configurator-engine';
```

**Configurators:**
- **Shed**: Dimensions, materials, openings, pricing
- **Carport**: Posts, beams, roof, options
- **Veranda**: Wall-attached, glass, heating

**Features:**
- First-principles calculations (surface areas, volumes)
- Validation & rules engine
- BOM (Bill of Materials) generation
- Pricing with regional adjustments
- 5+ presets per product

### Automations (`@caribbean-azure/automations`)

Pre-built automation playbooks.

```typescript
import { playbooks, getPlaybookById } from '@caribbean-azure/automations';

const playbook = getPlaybookById('inbox-to-clickup');
console.log(playbook.estimatedTimeSaved); // 8 hours/month
```

**Playbooks:**
- **Inbox to ClickUp**: Email → Task automation
- **Intake to Quote**: Form → PDF quote generation
- **Lead Routing**: Smart lead assignment

## 🎨 Design System

### Brand Colors

- **Brand**: Azure navy (`#0F5E9C`) with full 50-900 scale
- **Neutrals**: Sand (warm backgrounds) & Ink (text)
- **Accents**: Amber for highlights
- **Semantic**: Success, error, warning, info

### Typography

- **Display**: Geist (headings)
- **Body**: Inter (text)
- **Mono**: JetBrains Mono (code)
- **Scale**: h1 (48px) to caption (12px)

### Spacing

4px grid system: `spacing[1]` = 4px, `spacing[2]` = 8px, etc.

### Accessibility

- WCAG 2.1 AA compliant
- Body text contrast: **15.2:1**
- Minimum 16px body font size
- Focus rings on all interactive elements

## 🔧 Development Workflow

### Adding New Features

1. **Determine Scope**:
   - Marketing feature → `apps/marketing`
   - Platform feature → `apps/platform`
   - Shared component → `packages/ui`
   - Business logic → Appropriate package

2. **Use Workspace Packages**:
   ```json
   {
     "dependencies": {
       "@caribbean-azure/ui": "workspace:*",
       "@caribbean-azure/types": "workspace:*"
     }
   }
   ```

3. **Follow Design System**:
   - Use design tokens from `@caribbean-azure/design-tokens`
   - Use UI components from `@caribbean-azure/ui`
   - Maintain consistent spacing, typography, colors

### Adding New Configurators

1. Create logic in `packages/configurator-engine/src/{product}/`
2. Create UI in `apps/platform/app/(dashboard)/configurators/{product}/`
3. Use shared types from `@caribbean-azure/types`

### Adding New Automation Playbooks

1. Create playbook in `packages/automations/src/playbooks/`
2. Export from `packages/automations/src/index.ts`
3. Display in `apps/platform` dashboard

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
cd packages/configurator-engine
pnpm test
```

## 🚢 Deployment

### Marketing Site

Deploy to Vercel:

```bash
vercel --cwd apps/marketing
```

### Platform App

Deploy to Vercel:

```bash
vercel --cwd apps/platform
```

### Environment Variables

**Marketing (.env.local):**
```env
RESEND_API_KEY=re_xxxxx
NEXT_PUBLIC_SITE_URL=https://caribbeanazure.com
```

**Platform (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://api.caribbeanazure.com
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://platform.caribbeanazure.com
NEXTAUTH_SECRET=xxxxx
```

## 📊 Platform Tiers

### Base Tier: Automation Studio (€99/mo)

- Automation workflow dashboard
- 3 active automation playbooks
- ROI calculator & tracking
- Lead management
- Basic tools

### Pro Tier: Tools & Configurators (€299/mo)

Everything in Base tier, plus:
- 3D product configurators (shed, carport, veranda)
- BOM & pricing exports
- Quote generation
- Advanced analytics

## 🔄 Migration Path

From existing codebases:

1. ✅ **Caribbean Azure marketing** → `apps/marketing`
2. ✅ **Syria/configurator** → `apps/platform`
3. ✅ **Design system** → `packages/design-tokens` + `packages/ui`
4. ✅ **ROI calculator** → `packages/roi`
5. ✅ **Configurator logic** → `packages/configurator-engine`

## 🧩 Key Technologies

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS v4, CSS custom properties
- **UI**: shadcn/ui, Radix UI primitives
- **3D**: React Three Fiber, Three.js
- **Forms**: React Hook Form, Zod
- **i18n**: next-intl
- **Email**: Resend
- **Monorepo**: Turborepo, pnpm workspaces

## 📚 Documentation

- [Marketing App README](./apps/marketing/README.md)
- [Platform App README](./apps/platform/README.md)
- [Design Tokens](./packages/design-tokens/README.md)
- [UI Components](./packages/ui/README.md)
- [ROI Calculator](./packages/roi/README.md)
- [Configurator Engine](./packages/configurator-engine/README.md)
- [Automations](./packages/automations/README.md)

## 🤝 Contributing

This is a private monorepo for Caribbean Azure.

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write semantic commit messages

### Branch Strategy

- `main` - Production
- `develop` - Development
- Feature branches: `feature/your-feature-name`

## 📝 License

Private - Caribbean Azure © 2025

## 🙋 Support

For questions or issues:
- 📧 dev@caribbeanazure.com
- 📞 +31 6 87879092

---

**Built with ❤️ by Caribbean Azure**
