/**
 * Border Radius Design Tokens
 */

export const radii = {
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  full: '9999px',
} as const;

export type RadiusKey = keyof typeof radii;
