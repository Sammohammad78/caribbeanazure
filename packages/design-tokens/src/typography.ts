/**
 * Typography Design Tokens
 * Font families, scales, weights, and line heights
 */

export const typography = {
  // Font Families
  fonts: {
    display: '"Geist", "Inter Tight", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
  },

  // Font Weights
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Type Scale (Desktop)
  scale: {
    h1: {
      size: '48px',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      weight: 700,
    },
    h2: {
      size: '32px',
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
      weight: 700,
    },
    h3: {
      size: '24px',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      weight: 600,
    },
    h4: {
      size: '20px',
      lineHeight: '1.4',
      letterSpacing: 'normal',
      weight: 600,
    },
    h5: {
      size: '18px',
      lineHeight: '1.4',
      letterSpacing: 'normal',
      weight: 600,
    },
    h6: {
      size: '16px',
      lineHeight: '1.5',
      letterSpacing: 'normal',
      weight: 600,
    },
    body: {
      size: '16px',
      lineHeight: '1.625',
      letterSpacing: 'normal',
      weight: 400,
    },
    small: {
      size: '14px',
      lineHeight: '1.5',
      letterSpacing: 'normal',
      weight: 400,
    },
    caption: {
      size: '12px',
      lineHeight: '1.4',
      letterSpacing: '0.02em',
      weight: 400,
    },
  },

  // Mobile Scale
  scaleMobile: {
    h1: {
      size: '36px',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      weight: 700,
    },
    h2: {
      size: '28px',
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
      weight: 700,
    },
    h3: {
      size: '22px',
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      weight: 600,
    },
    h4: {
      size: '18px',
      lineHeight: '1.4',
      letterSpacing: 'normal',
      weight: 600,
    },
    // body, small, caption stay the same
  },
} as const;

export type TypographyScale = keyof typeof typography.scale;
