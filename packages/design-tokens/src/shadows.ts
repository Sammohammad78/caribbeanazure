/**
 * Shadow Design Tokens
 * Elevation and depth
 */

export const shadows = {
  xs: '0 1px 2px rgba(10, 42, 67, 0.04)',
  sm: '0 1px 3px rgba(10, 42, 67, 0.06), 0 1px 2px rgba(10, 42, 67, 0.04)',
  md: '0 4px 6px rgba(10, 42, 67, 0.07), 0 2px 4px rgba(10, 42, 67, 0.04)',
  lg: '0 10px 15px rgba(10, 42, 67, 0.1), 0 4px 6px rgba(10, 42, 67, 0.05)',
  xl: '0 20px 25px rgba(10, 42, 67, 0.15), 0 10px 10px rgba(10, 42, 67, 0.04)',
  '2xl': '0 25px 50px rgba(10, 42, 67, 0.25)',
  inner: 'inset 0 2px 4px rgba(10, 42, 67, 0.06)',
  none: 'none',
} as const;

// Semantic shadows
export const semanticShadows = {
  button: shadows.md,
  card: shadows.lg,
  cardHover: shadows.xl,
  dropdown: shadows.xl,
  modal: shadows['2xl'],
} as const;

// Glow effects (for focus states)
export const glows = {
  brand: '0 0 0 3px rgba(75, 163, 247, 0.25)',
  brandStrong: '0 0 16px rgba(75, 163, 247, 0.4), 0 0 0 3px rgba(75, 163, 247, 0.25)',
  error: '0 0 0 3px rgba(239, 68, 68, 0.25)',
  success: '0 0 0 3px rgba(16, 185, 129, 0.25)',
} as const;

export type ShadowKey = keyof typeof shadows;
export type SemanticShadow = keyof typeof semanticShadows;
export type GlowKey = keyof typeof glows;
