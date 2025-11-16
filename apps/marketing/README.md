# Caribbean Azure Marketing Site

This is the marketing website for Caribbean Azure, extracted from the source repository and set up as part of the unified monorepo structure.

## Directory Structure

```
apps/marketing/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx            # Locale layout wrapper
│   │   ├── page.tsx              # Homepage
│   │   ├── contact/              # Contact page
│   │   ├── oplossingen/          # Solutions page
│   │   ├── over-ons/             # About page
│   │   └── privacy/              # Privacy policy
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form endpoint
│   │   └── health/               # Health check endpoint
│   ├── globals.css               # Global styles with design tokens
│   ├── tokens.css                # Design system tokens
│   ├── layout.tsx                # Root layout
│   ├── robots.ts                 # Robots.txt generation
│   └── sitemap.ts                # Sitemap generation
├── components/
│   ├── layout/                   # Layout components (header, footer, etc.)
│   ├── sections/                 # Page sections (hero, CTA, etc.)
│   ├── brand/                    # Brand components (logo)
│   ├── 3d/                       # 3D components (Hero3D)
│   ├── backgrounds/              # Background effects
│   ├── providers/                # React providers (theme)
│   ├── seo/                      # SEO components (structured data)
│   └── ui/                       # UI primitives (button, card, etc.)
├── config/
│   ├── site.ts                   # Site configuration
│   └── tokens.ts                 # Design system tokens
├── lib/
│   ├── i18n.ts                   # Internationalization config
│   ├── utils.ts                  # Utility functions
│   ├── format.ts                 # Formatting utilities
│   └── backgroundThemes.ts       # Background theme configurations
├── messages/
│   ├── nl.json                   # Dutch translations (69KB)
│   └── en.json                   # English translations (53KB)
├── middleware.ts                 # i18n middleware
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
└── components.json               # shadcn/ui configuration
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **3D Graphics**: React Three Fiber + Three.js
- **Animation**: Framer Motion
- **i18n**: next-intl (Dutch + English)
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Icons**: Lucide React

## Key Features

- **Bilingual**: Dutch (primary) and English support
- **Design System**: Comprehensive token-based design system
- **3D Backgrounds**: Interactive React Three Fiber backgrounds
- **Premium Brand**: Azure navy color palette with micro-interactions
- **SEO Optimized**: Structured data, sitemap, robots.txt
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for Lighthouse ≥95

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Configuration

### Site Settings

Edit `config/site.ts` to update:
- Site name and description
- Contact information
- WhatsApp link
- Email addresses

### Design Tokens

All design tokens are defined in:
- `app/globals.css` - CSS custom properties
- `app/tokens.css` - Typography, spacing, animation tokens
- `config/tokens.ts` - JavaScript/TypeScript tokens

### Translations

Update content in:
- `messages/nl.json` - Dutch translations
- `messages/en.json` - English translations

## Component Notes

### Extracted Components

The following components were fully extracted from the source:
- Layout: Header, Footer, Container, Section, SkipToContent
- Brand: Logo
- 3D: Hero3D, BackgroundEngine
- Providers: ThemeProvider
- UI: Button, Card, Input, Textarea

### Simplified Placeholders

These components have simplified implementations and can be enhanced:
- Section components (hero, CTA, testimonials, FAQ, etc.)
- SEO components (structured data schemas)

## Next Steps

1. **Review and Test**: Test the app with `pnpm dev`
2. **Enhance Components**: Replace simplified placeholders with full implementations
3. **Update Imports**: Convert to workspace packages where appropriate:
   - Create `@caribbean-azure/ui` package for shared UI components
   - Create `@caribbean-azure/utils` package for shared utilities
4. **Environment Variables**: Set up `.env.local` for API keys (Resend, etc.)
5. **Deploy**: Configure for Vercel deployment

## Workspace Integration

### Planned Package References

- `@caribbean-azure/ui` - Shared UI components
- `@caribbean-azure/utils` - Shared utility functions
- `@caribbean-azure/config` - Shared configuration

These packages should be created in the monorepo and referenced in `package.json`.

## Notes

- All file paths use absolute imports via `@/` alias
- The app uses Tailwind CSS v4 with CSS-based configuration
- 3D components are performance-optimized with DPR capping
- All forms include proper validation with Zod schemas
- Contact form ready for Resend email integration

## License

Proprietary - © 2024 Caribbean Azure
