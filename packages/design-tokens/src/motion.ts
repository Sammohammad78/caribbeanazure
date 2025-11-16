/**
 * Motion Design Tokens
 * Transitions, durations, and easing curves
 */

export const durations = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '700ms',
} as const;

export const easings = {
  out: 'cubic-bezier(0.33, 1, 0.68, 1)',
  in: 'cubic-bezier(0.32, 0, 0.67, 0)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// Semantic transitions
export const transitions = {
  fast: `${durations.fast} ${easings.out}`,
  base: `${durations.base} ${easings.out}`,
  slow: `${durations.slow} ${easings.out}`,
  bounce: `${durations.base} ${easings.bounce}`,
} as const;

// Framer Motion spring configs
export const springs = {
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  },
  responsive: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
  },
} as const;

export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;
export type Transition = keyof typeof transitions;
export type Spring = keyof typeof springs;
