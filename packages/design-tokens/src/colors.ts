/**
 * Caribbean Azure Brand Colors & Design Tokens
 * Unified color system for marketing and platform apps
 */

export const colors = {
  // Brand Colors (Azure Navy Palette)
  brand: {
    900: '#0A2A43', // Deep navy - headers, dark backgrounds
    800: '#0D3A5A',
    700: '#0E4A72',
    600: '#0F5E9C', // Primary brand - buttons, links, CTA
    500: '#2B7BBF',
    400: '#4BA3F7', // Light azure - hover states, glows, focus rings
    300: '#7DBFFF',
    200: '#A8D5FF',
    100: '#E3F2FD', // Ultra light - subtle backgrounds, badges
    50: '#F0F8FF',
  },

  // Neutral Palette (Sand & Ink)
  sand: {
    50: '#F7F7F5',  // Page background (warm sand)
    100: '#EEEDE9',
    200: '#E0DED7', // Border color
    300: '#D1CFCA',
    400: '#B8B6B1',
    500: '#9E9C97',
    600: '#84827D',
    700: '#6A6863',
    800: '#504E49',
    900: '#36342F',
  },

  ink: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF', // Subtle text
    500: '#6B7280', // Muted text
    600: '#4B5563',
    700: '#3A3D4A', // Secondary text
    800: '#1F2937',
    900: '#0E0F14', // Body text (deep ink)
  },

  // Accent Colors (Sparingly Used)
  accent: {
    amber: '#FFB703',
    amberLight: '#FFF8E6',
    orange: '#F59E0B',
    orangeLight: '#FEF3C7',
  },

  // Semantic Colors
  semantic: {
    success: '#10B981',
    successLight: '#D1FAE5',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
  },

  // Functional Colors (Light Mode)
  light: {
    bg: '#F7F7F5',        // var(--sand-050)
    bgElevated: '#FFFFFF', // Elevated surfaces (cards, inputs)
    panel: '#FFFFFF',      // Panel/card backgrounds
    muted: '#E0DED7',      // var(--sand-200)
    border: '#E0DED7',     // var(--sand-200)
    fg: '#0E0F14',         // var(--ink-900) Primary text
    fgMuted: '#6B7280',    // var(--ink-500) Muted text
    fgSubtle: '#9CA3AF',   // var(--ink-400) Subtle/secondary text
    brandSoft: '#E3F2FD',  // var(--brand-100)
    brand: '#0F5E9C',      // var(--brand-600) Primary brand
    brandStrong: '#0A2A43', // var(--brand-900) Strong brand
  },

  // Functional Colors (Dark Mode)
  dark: {
    bg: '#0E0F14',
    bgElevated: '#1A1B20',
    panel: '#1F2937',
    muted: '#374151',
    border: '#374151',
    fg: '#F9FAFB',
    fgMuted: '#9CA3AF',
    fgSubtle: '#6B7280',
    brandSoft: '#0F5E9C',
    brand: '#4BA3F7',
    brandStrong: '#7DBFFF',
  },
} as const;

export type ColorScale = typeof colors;
export type BrandColor = keyof typeof colors.brand;
export type SemanticColor = keyof typeof colors.semantic;
