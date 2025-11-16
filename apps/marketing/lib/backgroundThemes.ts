/**
 * Caribbean Azure - Modular 3D Background Theme System
 * Research-driven design tokens for per-page visual identity
 */

export type BackgroundTheme = {
  name: string
  mood: string
  effect: 'fluid-particles' | 'neural-grid' | 'organic-waves' | 'depth-field' | 'minimal-float'
  colors: {
    primary: string
    secondary: string
    accent: string
    gradientStart: string
    gradientEnd: string
  }
  motion: {
    speed: number // 0.3 to 1.5 (base multiplier)
    parallaxIntensity: number // 0 to 1 (cursor influence)
    flowDirection: 'horizontal' | 'vertical' | 'radial'
  }
  particles: {
    count: number
    size: number
    opacity: number
  }
  performance: {
    dpr: [number, number] // [min, max] device pixel ratio
    antialias: boolean
  }
}

export const backgroundThemes: Record<string, BackgroundTheme> = {
  home: {
    name: 'Home - Confident & Approachable',
    mood: 'Tech-forward yet calming',
    effect: 'fluid-particles',
    colors: {
      primary: '#2563EB', // Azure primary
      secondary: '#06B6D4', // Cyan accent
      accent: '#F59E0B', // Warm amber
      gradientStart: '#2563EB',
      gradientEnd: '#06B6D4',
    },
    motion: {
      speed: 0.5,
      parallaxIntensity: 0.1, // Gentle 10% displacement
      flowDirection: 'radial',
    },
    particles: {
      count: 3000,
      size: 2.5,
      opacity: 0.6,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  services: {
    name: 'Services - Systematic & Intelligent',
    mood: 'Efficient, neural network aesthetic',
    effect: 'neural-grid',
    colors: {
      primary: '#0A2A43', // Navy deep
      secondary: '#2563EB', // Azure
      accent: '#06B6D4', // Cyan
      gradientStart: '#0A2A43',
      gradientEnd: '#2563EB',
    },
    motion: {
      speed: 1.2, // Faster rhythm
      parallaxIntensity: 0.15,
      flowDirection: 'horizontal',
    },
    particles: {
      count: 5000, // More nodes for grid
      size: 1.8,
      opacity: 0.7,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  about: {
