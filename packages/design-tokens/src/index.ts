/**
 * Caribbean Azure Design Tokens
 * Unified design system for marketing and platform apps
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './motion';
export * from './radii';

import { colors } from './colors';
import { typography } from './typography';
import { spacing, spacingPresets, containerWidths } from './spacing';
import { shadows, semanticShadows, glows } from './shadows';
import { durations, easings, transitions, springs } from './motion';
import { radii } from './radii';

export const tokens = {
  colors,
  typography,
  spacing,
  spacingPresets,
  containerWidths,
  shadows,
  semanticShadows,
  glows,
  durations,
  easings,
  transitions,
  springs,
  radii,
} as const;

export default tokens;
