# 🎨 CARIBBEAN AZURE - $1M DESIGN SYSTEM

**Version:** 2.0.0
**Date:** 2025-11-17
**Philosophy:** Premium, Interactive, Performance-First

---

## 🎯 DESIGN PRINCIPLES

### 1. **Visual Hierarchy**
- Bold headlines with 60-100px font size
- Clear F-pattern reading flow
- 8px grid system for perfect alignment

### 2. **Motion Design**
- All animations < 300ms (performance-first)
- Ease-out for natural feel
- Stagger effects for premium touch

### 3. **Color Psychology**
- Blue = Trust, Technology, Automation
- Cyan = Innovation, Speed
- Amber = Warmth, Success, ROI

### 4. **Glassmorphism Rules**
- Blur: 12-24px
- Opacity: 70-85%
- Border: 1px white/20%
- Shadow: 0 8px 32px rgba(0,0,0,0.1)

---

## 🎨 COLOR SYSTEM

### Brand Palette
```css
--brand-50:  #eff6ff   /* Lightest blue */
--brand-100: #dbeafe
--brand-200: #bfdbfe
--brand-300: #93c5fd
--brand-400: #60a5fa
--brand-500: #3b82f6   /* Primary Caribbean Azure */
--brand-600: #2563eb   /* Main brand */
--brand-700: #1d4ed8
--brand-800: #1e40af
--brand-900: #1e3a8a   /* Darkest */
```

### Accent Colors
```css
--cyan-400: #22d3ee    /* Speed, Innovation */
--cyan-500: #06b6d4
--cyan-600: #0891b2

--amber-400: #fbbf24   /* Success, ROI */
--amber-500: #f59e0b
--amber-600: #d97706

--purple-500: #a855f7  /* Premium features */
--purple-600: #9333ea
```

### Semantic Colors
```css
--success: #10b981
--warning: #f59e0b
--error: #ef4444
--info: #3b82f6
```

### Gradients
```css
/* Hero Gradient */
background: linear-gradient(135deg,
  #2563eb 0%,    /* Brand blue */
  #0891b2 50%,   /* Cyan */
  #9333ea 100%   /* Purple */
);

/* Premium Card */
background: linear-gradient(145deg,
  rgba(37, 99, 235, 0.1) 0%,
  rgba(147, 51, 234, 0.05) 100%
);

/* Glow Effect */
box-shadow: 0 0 80px rgba(37, 99, 235, 0.3);
```

---

## ✍️ TYPOGRAPHY

### Font Stack
```css
/* Headings - Bold, Modern */
font-family: 'Inter', -apple-system, system-ui, sans-serif;
font-weight: 700-900;
letter-spacing: -0.02em; /* Tight for premium */

/* Body - Readable */
font-family: 'Inter', system-ui, sans-serif;
font-weight: 400-500;
line-height: 1.6;
```

### Scale
```css
--text-xs:   0.75rem  /* 12px - Labels */
--text-sm:   0.875rem /* 14px - Body small */
--text-base: 1rem     /* 16px - Body */
--text-lg:   1.125rem /* 18px - Large body */
--text-xl:   1.25rem  /* 20px - Subheadings */
--text-2xl:  1.5rem   /* 24px - Section titles */
--text-3xl:  1.875rem /* 30px */
--text-4xl:  2.25rem  /* 36px - Page titles */
--text-5xl:  3rem     /* 48px */
--text-6xl:  3.75rem  /* 60px - Hero */
--text-7xl:  4.5rem   /* 72px - Giant hero */
--text-8xl:  6rem     /* 96px - Ultra hero */
```

### Usage
```tsx
// Hero Headline
<h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
  Automatiseer je werk.
  <span className="gradient-text">Versnel je groei.</span>
</h1>

// Section Title
<h2 className="text-4xl md:text-5xl font-bold tracking-tight">
  Bespaar 30-60% tijd
</h2>

// Body
<p className="text-lg text-[color:var(--fg-muted)] leading-relaxed">
  AI-gedreven workflows voor MKB
</p>
```

---

## 📐 SPACING SYSTEM

### 8px Grid
```css
--space-0: 0
--space-1: 0.25rem  /* 4px */
--space-2: 0.5rem   /* 8px */
--space-3: 0.75rem  /* 12px */
--space-4: 1rem     /* 16px */
--space-6: 1.5rem   /* 24px */
--space-8: 2rem     /* 32px */
--space-12: 3rem    /* 48px */
--space-16: 4rem    /* 64px */
--space-20: 5rem    /* 80px */
--space-24: 6rem    /* 96px */
--space-32: 8rem    /* 128px */
```

### Component Spacing
```tsx
// Section Padding
<section className="py-20 md:py-24 lg:py-32">

// Card Padding
<div className="p-8 md:p-12">

// Button Padding
<button className="px-8 py-4">
```

---

## 🎭 COMPONENT PATTERNS

### Glass Card
```tsx
<div className="
  rounded-3xl
  border border-white/20
  bg-white/10
  backdrop-blur-xl
  p-8
  shadow-[0_8px_32px_rgba(0,0,0,0.1)]
  hover:bg-white/15
  transition-all duration-300
">
  {children}
</div>
```

### Premium Button
```tsx
<button className="
  group
  relative
  px-8 py-4
  bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)]
  text-white font-semibold
  rounded-xl
  shadow-lg shadow-[color:var(--brand-600)]/25
  hover:shadow-xl hover:shadow-[color:var(--brand-600)]/40
  hover:scale-105
  transition-all duration-300
  overflow-hidden
">
  <span className="relative z-10 flex items-center gap-2">
    {text}
    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
  </span>

  {/* Glow effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
</button>
```

### Animated Stats Counter
```tsx
<div className="text-center">
  <div className="text-5xl font-black gradient-text mb-2">
    <CountUp end={2500} duration={2} suffix="+" />
  </div>
  <div className="text-sm uppercase tracking-wide text-[color:var(--fg-muted)]">
    Uren Bespaard
  </div>
</div>
```

### Feature Card with Hover
```tsx
<div className="
  group
  relative
  rounded-2xl
  border border-[color:var(--border)]
  bg-[color:var(--panel)]
  p-8
  hover:border-[color:var(--brand)]
  hover:-translate-y-2
  transition-all duration-300
">
  {/* Icon with gradient background */}
  <div className="
    mb-6
    inline-flex
    h-16 w-16
    items-center justify-center
    rounded-2xl
    bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--cyan-600)]
    text-white
    shadow-lg
    group-hover:scale-110
    transition-transform duration-300
  ">
    <Icon className="h-8 w-8" />
  </div>

  <h3 className="text-2xl font-bold mb-3">
    {title}
  </h3>

  <p className="text-[color:var(--fg-muted)] leading-relaxed">
    {description}
  </p>
</div>
```

---

## 🎬 ANIMATION LIBRARY

### Fade In Up
```tsx
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
```

### Gradient Shift
```tsx
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}
```

### Float
```tsx
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

### Pulse Glow
```tsx
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
  }
  50% {
    box-shadow: 0 0 60px rgba(37, 99, 235, 0.6);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 3s ease-in-out infinite;
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile First */
sm: 640px   /* Tablets */
md: 768px   /* Tablets landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Ultra-wide */
```

### Usage
```tsx
// Mobile: 1 column, Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Mobile: Small text, Desktop: Large text
<h1 className="text-4xl md:text-6xl lg:text-7xl">

// Mobile: Small padding, Desktop: Large padding
<section className="py-12 md:py-20 lg:py-32">
```

---

## 🎯 INTERACTION PATTERNS

### Hover States (< 300ms)
```tsx
// Lift up
hover:-translate-y-2 hover:shadow-2xl transition-all duration-200

// Scale up
hover:scale-105 transition-transform duration-200

// Brighten
hover:brightness-110 transition-all duration-200

// Border glow
hover:border-[color:var(--brand)] hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]
```

### Focus States (Accessibility)
```tsx
focus:outline-none
focus:ring-2
focus:ring-[color:var(--brand)]
focus:ring-offset-2
focus-visible:ring-2
```

### Active States
```tsx
active:scale-95
transition-transform duration-100
```

---

## 🌟 MICRO-INTERACTIONS

### Button Ripple Effect
```tsx
const handleClick = (e) => {
  const button = e.currentTarget
  const ripple = document.createElement('span')
  const rect = button.getBoundingClientRect()

  ripple.style.left = `${e.clientX - rect.left}px`
  ripple.style.top = `${e.clientY - rect.top}px`
  ripple.className = 'ripple'

  button.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
}
```

### Scroll Progress Bar
```tsx
const [scrollProgress, setScrollProgress] = useState(0)

useEffect(() => {
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (window.scrollY / totalHeight) * 100
    setScrollProgress(progress)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

return (
  <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--cyan-600)] z-50"
       style={{ width: `${scrollProgress}%` }}
  />
)
```

---

## 🎨 GLASSMORPHISM EXAMPLES

### Light Mode Glass
```css
background: rgba(255, 255, 255, 0.75);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```

### Dark Mode Glass
```css
background: rgba(20, 20, 30, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

---

## 🏆 PREMIUM TOUCHES

### Gradient Text
```tsx
<span className="bg-gradient-to-r from-[color:var(--brand-600)] to-[color:var(--cyan-600)] bg-clip-text text-transparent">
  Premium Text
</span>
```

### Mesh Gradient Background
```tsx
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/20 via-blue-500/10 to-purple-600/20" />
```

### Noise Texture
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
```

---

## ✅ CHECKLIST FOR COMPONENTS

- [ ] Uses 8px grid system
- [ ] Animations < 300ms
- [ ] Hover states defined
- [ ] Focus states accessible (WCAG AA)
- [ ] Mobile responsive (Mobile First)
- [ ] Uses design tokens (--brand, --fg, etc.)
- [ ] Glass effect (if applicable)
- [ ] Gradient touches
- [ ] Micro-interactions
- [ ] Loading states
- [ ] Error states

---

**Design System Maintained By:** Caribbean Azure Design Team
**Last Updated:** 2025-11-17
**Version:** 2.0.0 - Premium Edition
