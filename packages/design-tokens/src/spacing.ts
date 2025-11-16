/**
 * Spacing Design Tokens
 * 4px Polaris Grid System
 */

export const spacing = {
  // Base spacing scale (4px grid)
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const;

// Semantic spacing presets
export const spacingPresets = {
  sectionPaddingMobile: '40px',
  sectionPaddingDesktop: '64px',
  cardPadding: '24px',
  cardGap: '24px',
  containerGutterMobile: '16px',
  containerGutterDesktop: '24px',
} as const;

// Container widths
export const containerWidths = {
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  '2xl': '1320px',
  full: '100%',
} as const;

export type SpacingKey = keyof typeof spacing;
export type ContainerWidth = keyof typeof containerWidths;
