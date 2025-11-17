# 🎯 UNIFIED DESIGN SYSTEM - ONE Pattern for Everything

## Core Principle
**ONE consistent design pattern used across EVERY page, EVERY component, EVERY section.**

---

## 1. Color System (ONLY 3 Colors)

### Primary Colors:
```css
--brand: #0F5E9C          /* Caribbean Azure Blue - Main brand */
--brand-light: #4BA3F7    /* Lighter blue for hovers/accents */
--brand-dark: #0A2A43     /* Darker blue for text on light */
```

### Neutral Colors:
```css
--text: #1a1a1a           /* Main text (dark gray, not black) */
--text-muted: #6B7280     /* Secondary text */
--bg: #FFFFFF             /* Background (white) */
--bg-subtle: #F7F7F5      /* Subtle backgrounds */
--border: #E0DED7         /* Borders */
```

### Usage Rules:
- ✅ Backgrounds: WHITE (#FFFFFF)
- ✅ Alternating sections: Light gray (#F7F7F5)
- ✅ CTAs: Brand blue (#0F5E9C)
- ✅ Text: Dark gray (#1a1a1a)
- ❌ NO gradients
- ❌ NO purple, amber, cyan mixing
- ❌ NO glassmorphism

---

## 2. Typography (Fixed Scale)

### Font Family:
```css
font-family: 'Plus Jakarta Sans', -apple-system, system-ui, sans-serif;
```

### Type Scale (Used Consistently):
```css
H1: 48px / 3rem     (font-weight: 800)  - Page titles only
H2: 36px / 2.25rem  (font-weight: 700)  - Section headings
H3: 24px / 1.5rem   (font-weight: 600)  - Subsections
H4: 20px / 1.25rem  (font-weight: 600)  - Card titles

Body Large: 18px / 1.125rem  - Hero descriptions
Body: 16px / 1rem            - Main content
Small: 14px / 0.875rem       - Captions, labels
Tiny: 12px / 0.75rem         - Legal text
```

### Usage Rules:
- ✅ H1: Only for page hero title (ONE per page)
- ✅ H2: Section headings
- ✅ H3: Card/feature titles
- ✅ Body: All paragraph text
- ❌ NO mixing sizes randomly
- ❌ NO text larger than 48px

---

## 3. Spacing System (8px Grid)

### Scale:
```css
4px   (0.25rem)   - xs  - Tiny gaps
8px   (0.5rem)    - sm  - Small gaps
16px  (1rem)      - md  - Default gap
24px  (1.5rem)    - lg  - Medium gap
32px  (2rem)      - xl  - Large gap
48px  (3rem)      - 2xl - Section padding top
64px  (4rem)      - 3xl - Section padding bottom
96px  (6rem)      - 4xl - Hero padding
```

### Usage:
- ✅ Section padding: 48px top, 64px bottom
- ✅ Card padding: 24px
- ✅ Element gaps: 16px
- ✅ Between sections: 0px (alternating backgrounds)

---

## 4. Component Patterns

### Card (Standard):
```tsx
<div className="rounded-xl border border-[color:var(--border)] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-2xl font-semibold text-[color:var(--text)] mb-3">
    Title Here
  </h3>
  <p className="text-base text-[color:var(--text-muted)]">
    Description here...
  </p>
</div>
```

**Rules:**
- ✅ White background
- ✅ Light border
- ✅ Subtle shadow
- ✅ Rounded corners (12px)
- ❌ NO glassmorphism
- ❌ NO gradients
- ❌ NO blur effects

### Button (Primary):
```tsx
<button className="rounded-lg bg-[color:var(--brand)] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[color:var(--brand-light)] transition-colors">
  Call to Action
</button>
```

### Button (Secondary):
```tsx
<button className="rounded-lg border-2 border-[color:var(--brand)] bg-transparent px-6 py-3 text-base font-semibold text-[color:var(--brand)] hover:bg-[color:var(--brand)] hover:text-white transition-all">
  Secondary Action
</button>
```

---

## 5. Section Pattern (Used Everywhere)

### Standard Section:
```tsx
<section className="py-16 md:py-20">
  <div className="container-custom max-w-7xl mx-auto px-4">
    {/* Section Badge (optional) */}
    <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/20 bg-[color:var(--brand)]/5 px-4 py-1.5 mb-4">
      <Icon className="h-4 w-4 text-[color:var(--brand)]" />
      <span className="text-sm font-medium text-[color:var(--brand)]">CATEGORY</span>
    </div>

    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--text)] mb-4">
      Section Heading
    </h2>

    {/* Description */}
    <p className="text-lg text-[color:var(--text-muted)] max-w-2xl mb-12">
      Description text here...
    </p>

    {/* Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cards here */}
    </div>
  </div>
</section>
```

### Alternating Backgrounds:
- Section 1: White background
- Section 2: Light gray background (#F7F7F5)
- Section 3: White background
- Section 4: Light gray background
- Repeat...

---

## 6. Animation Rules

### SIMPLE animations only:
```css
/* Hover transitions - 200ms */
transition: all 200ms ease;

/* Fade in on scroll (optional) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Usage:
- ✅ Hover states: Scale 1.02, shadow increase
- ✅ Button hovers: Color change only
- ✅ Subtle fade-in on scroll (optional)
- ❌ NO floating orbs
- ❌ NO complex animations
- ❌ NO mouse-following effects

---

## 7. Navigation Pattern

### Header:
```
Logo | Solutions | About | Contact | [Launch Configurator] (CTA button)
```

### Footer:
```
Company          Solutions         Legal
- About          - Automation     - Privacy
- Contact        - Integration    - Terms

© 2025 Caribbean Azure
```

**Rules:**
- ✅ Simple, clean header
- ✅ Max 4 main nav items
- ✅ Prominent configurator CTA
- ✅ Minimal footer (no broken links)

---

## 8. Page Structure (All Pages)

```
<Header />

<Hero Section>
  - H1 Title (48px)
  - Description (18px)
  - Primary CTA
  - Simple illustration/image
</Hero>

<Section 1 - White BG>
  - H2 Heading
  - Content grid
</Section 1>

<Section 2 - Gray BG>
  - H2 Heading
  - Content grid
</Section 2>

<Section 3 - White BG>
  - H2 Heading
  - Content grid
</Section 3>

<CTA Section - Brand Blue BG>
  - White text
  - CTA button (white bg, brand text)
</CTA>

<Footer />
```

---

## 9. Implementation Checklist

### Global Styles (globals.css):
- [ ] Define ONLY 3 brand colors
- [ ] Define consistent typography scale
- [ ] Remove all glassmorphism
- [ ] Remove complex animations
- [ ] Add simple hover transitions

### Components:
- [ ] Create SimpleCard component
- [ ] Create SimpleButton component
- [ ] Create SimpleSection wrapper
- [ ] Remove all *-premium.tsx components

### Pages:
- [ ] Apply pattern to homepage
- [ ] Apply pattern to /oplossingen
- [ ] Apply pattern to /over-ons
- [ ] Apply pattern to /contact
- [ ] Ensure all use SAME styles

### Navigation:
- [ ] Add configurator link to header
- [ ] Simplify footer (remove broken links)
- [ ] Test all links work

---

## Success Criteria

✅ Can't tell which page you're on without reading content (design is identical)
✅ Every heading uses exact same size/weight
✅ Every section uses exact same padding
✅ Every card looks identical
✅ Only 2-3 colors used throughout
✅ NO glassmorphism anywhere
✅ All links work
✅ Configurator is accessible

**Remember: BORING is GOOD. Consistency > Creativity.**
