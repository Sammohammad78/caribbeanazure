# @caribbean-azure/design-tokens

Unified design system tokens for the Caribbean Azure platform.

## Installation

This package is part of the Caribbean Azure monorepo and is used internally.

```bash
pnpm add @caribbean-azure/design-tokens
```

## Usage

### Import Tokens in JavaScript/TypeScript

```typescript
import { colors, typography, spacing, shadows } from '@caribbean-azure/design-tokens';

// Use tokens in your components
const buttonStyle = {
  backgroundColor: colors.brand[600],
  padding: `${spacing[4]} ${spacing[6]}`,
  borderRadius: radii.md,
  boxShadow: shadows.button,
};
```

### Import CSS Custom Properties

In your global CSS file:

```css
@import '@caribbean-azure/design-tokens/tokens.css';

/* Now use CSS variables */
.button {
  background-color: var(--brand-600);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-button);
}
```

## Token Categories

### Colors
- **Brand**: Azure navy palette (`brand.900` to `brand.50`)
- **Neutrals**: Sand and Ink palettes
- **Accents**: Amber, orange for highlights
- **Semantic**: Success, error, warning, info
- **Functional**: Context-aware colors (bg, fg, border)

### Typography
- **Fonts**: Display, body, mono
- **Scale**: h1-h6, body, small, caption
- **Weights**: Regular, medium, semibold, bold

### Spacing
- **4px grid system**: `spacing[1]` = 4px, `spacing[2]` = 8px, etc.
- **Semantic presets**: Section padding, card gaps, container gutters

### Shadows
- **Elevation**: xs, sm, md, lg, xl, 2xl
- **Semantic**: button, card, cardHover, dropdown, modal
- **Glows**: Focus ring effects

### Motion
- **Durations**: fast (150ms), base (200ms), slow (300ms)
- **Easings**: out, in, inOut, bounce, spring
- **Springs**: Framer Motion presets

### Radii
- Border radius values from xs (4px) to full (9999px)

## WCAG Compliance

All color combinations meet WCAG 2.1 AA standards:
- Body text (ink-900 on sand-50): **15.2:1** ✅
- Muted text (ink-500 on sand-50): **4.7:1** ✅
- Primary button (white on brand-600): **4.9:1** ✅

## License

Private - Caribbean Azure Monorepo
