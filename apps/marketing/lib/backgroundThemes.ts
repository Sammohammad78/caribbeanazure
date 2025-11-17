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
    name: 'About - Organic & Human',
    mood: 'Warm, trustworthy, flowing',
    effect: 'organic-waves',
    colors: {
      primary: '#2563EB',
      secondary: '#F59E0B',
      accent: '#06B6D4',
      gradientStart: '#F59E0B',
      gradientEnd: '#2563EB',
    },
    motion: {
      speed: 0.7,
      parallaxIntensity: 0.12,
      flowDirection: 'vertical',
    },
    particles: {
      count: 2500,
      size: 3.0,
      opacity: 0.5,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  contact: {
    name: 'Contact - Inviting & Clear',
    mood: 'Clean, approachable depth',
    effect: 'depth-field',
    colors: {
      primary: '#2563EB',
      secondary: '#06B6D4',
      accent: '#F59E0B',
      gradientStart: '#06B6D4',
      gradientEnd: '#2563EB',
    },
    motion: {
      speed: 0.4,
      parallaxIntensity: 0.2,
      flowDirection: 'radial',
    },
    particles: {
      count: 1800,
      size: 2.2,
      opacity: 0.65,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  solutions: {
    name: 'Solutions - Dynamic & Powerful',
    mood: 'Energetic, capability-focused',
    effect: 'fluid-particles',
    colors: {
      primary: '#2563EB',
      secondary: '#8B5CF6',
      accent: '#06B6D4',
      gradientStart: '#2563EB',
      gradientEnd: '#8B5CF6',
    },
    motion: {
      speed: 1.0,
      parallaxIntensity: 0.18,
      flowDirection: 'horizontal',
    },
    particles: {
      count: 4000,
      size: 2.0,
      opacity: 0.7,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  minimal: {
    name: 'Minimal - Subtle & Professional',
    mood: 'Clean, non-distracting',
    effect: 'minimal-float',
    colors: {
      primary: '#2563EB',
      secondary: '#94A3B8',
      accent: '#06B6D4',
      gradientStart: '#F8FAFC',
      gradientEnd: '#E2E8F0',
    },
    motion: {
      speed: 0.3,
      parallaxIntensity: 0.05,
      flowDirection: 'vertical',
    },
    particles: {
      count: 800,
      size: 1.5,
      opacity: 0.3,
    },
    performance: {
      dpr: [1, 2],
      antialias: false,
    },
  },
}
