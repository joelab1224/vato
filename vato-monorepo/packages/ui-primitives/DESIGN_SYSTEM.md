# VATO Platform Design System

> Information-centric UI modeling knowledge as living, interconnected organism

## 🎨 Design Philosophy

**System Architecture:** Visual metaphors drawn from neural networks, graph databases, and biological systems. UI elements represent nodes, pathways, and metabolic flows of information.

**Core Principle:** Minimize cognitive load through progressive disclosure, spatial consistency, and predictable interaction patterns.

**Target:** Mobile-first (320-428px primary), PWA-optimized

---

## 📐 Design Specifications

### Color Palette

```css
/* Base - Cognitive backgrounds */
--color-base-warm: #F5F1E8        /* Beige - primary background */
--color-base-neutral: #E8E4DC     /* Sand - secondary surfaces */

/* Accent - Insight highlighting */
--color-accent-primary: #F4E5A8   /* Muted yellow */

/* Text - Information structure */
--color-text-primary: #2A2A2A     /* Charcoal */
--color-text-secondary: #666666   /* Medium gray */
--color-text-tertiary: #999999    /* Light gray */

/* Surface - Knowledge containers */
--color-surface-elevated: #FFFFFF /* Pure white - cards/nodes */

/* Effects */
--color-overlay: rgba(255,255,255,0.85)  /* Glass morphism */
--color-shadow: rgba(0,0,0,0.08)         /* Elevation */
```

**Background Gradient:**
```css
background: linear-gradient(180deg, #F5F1E8 0%, #E1DCD5 100%);
```

### Typography

**Fonts:**
- **Display (Headings):** Space Grotesk (500, 600, 700)
- **Body (Text):** Inter (400, 500, 600, 700)

```typescript
fontSize: {
  h1: { size: '28px', lineHeight: '1.2', weight: '700' },
  h2: { size: '20px', lineHeight: '1.3', weight: '600' },
  body: { size: '15px', lineHeight: '1.5', weight: '400' },
  caption: { size: '13px', lineHeight: '1.4', weight: '400' },
  micro: { size: '11px', lineHeight: '1.3', weight: '500' },
}
```

**Hierarchy Rules:**
- Max 3 type sizes per view
- Headers always 600+ weight
- Body text 400 weight
- Tighter letter spacing on headings (-0.01em to -0.02em)

### Spacing System

**8px Base Increment:**
```typescript
spacing: {
  xs: '8px',    // 1 unit
  sm: '16px',   // 2 units - card separation
  md: '20px',   // 2.5 units - card padding
  lg: '32px',   // 4 units - section separation
  xl: '40px',   // 5 units
  containerMargin: '20px',
}
```

### Border Radius

**Soft, Organic Forms:**
```typescript
radius: {
  card: '20px',       // Knowledge nodes
  image: '16px',      // Visual containers
  button: '24px',     // Pill shape (CTAs)
  icon: '50%',        // Icon buttons (circular)
  indicator: '6px',   // Carousel dots
}
```

### Shadows

**Subtle Elevation:**
```css
--shadow-card: 0 8px 32px rgba(0, 0, 0, 0.06)
--shadow-card-hover: 0 12px 48px rgba(0, 0, 0, 0.08)
--shadow-card-active: 0 4px 16px rgba(0, 0, 0, 0.04)
```

### Effects

```css
--blur: blur(20px)                            /* Glass morphism */
--transition: 200ms cubic-bezier(0.4, 0, 0.2, 1)  /* Smooth easing */
```

---

## 🧱 Component Library

### Cards (Knowledge Nodes)

```typescript
card: {
  borderRadius: '20px',
  padding: '20px',
  background: '#FFFFFF',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
  gap: '16px',
}
```

**States:**
- **Idle:** Scale 1.0, default shadow
- **Hover:** Scale 1.02, enhanced shadow
- **Active:** Scale 0.98, reduced shadow

**Variant - Highlighted:**
```css
background: linear-gradient(135deg, #F4E5A8 0%, #FFFFFF 100%);
```

### Buttons

**Primary CTA:**
```typescript
{
  borderRadius: '24px',        // Pill shape
  padding: '12px 24px',
  background: 'rgba(42, 42, 42, 0.9)',
  color: '#FFFFFF',
  height: '44px',              // Touch target
  fontWeight: '500',
  letterSpacing: '-0.01em',
}
```

**Icon Buttons:**
```typescript
{
  size: '44x44px',            // Touch target
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.95)',
  boxShadow: 'card shadow',
}
```

### Image Containers

```typescript
{
  aspectRatio: '16 / 9',
  borderRadius: '16px',
  overlay: 'linear-gradient(0deg, rgba(0,0,0,0.3), transparent)',
}
```

### Data Visualizations

**Donut Charts:**
```typescript
{
  strokeWidth: '12px',
  activeColor: '#F4E5A8',      // Accent
  inactiveColor: '#E8E4DC',    // Neutral
  animation: '800ms ease-out',
}
```

### Badges

```typescript
{
  padding: '4px 12px',
  background: '#E8E4DC',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '500',
}
```

**Variant - Accent:**
```css
background: #F4E5A8;
```

### Navigation Indicators

**Carousel:**
```typescript
{
  indicatorSize: '6px',
  indicatorSpacing: '8px',
  activeWidth: '24px',         // Elongated
  inactiveColor: '#E8E4DC',
  activeColor: '#2A2A2A',
}
```

---

## 📏 Layout System

### Container

```typescript
{
  maxWidth: '428px',          // Mobile-first primary
  margin: '0 auto',
  padding: '0 20px',
}
```

### Spacing

```typescript
{
  cardSeparation: '16px',
  sectionSeparation: '32px',
}
```

### Breakpoints

```typescript
mobile: { min: '320px', max: '428px' },     // Primary target
tablet: { min: '768px', max: '1024px' },    // Scale layout
desktop: { min: '1280px' },                  // Centered container
```

---

## 🎨 Iconography

**Style:** Line-based (2px stroke weight)

**Sizes:**
- Default: 24x24px
- Compact: 20x20px

**Grid:** 24px with 2px padding

**Color:** `#2A2A2A` (text primary)

**Semantic Set:**
- add, edit, menu
- arrow-back, arrow-forward
- expand, collapse
- info, settings

---

## ♿ Accessibility Standards

### Touch Targets
- **Minimum:** 44x44px for all interactive elements

### Color Contrast
- Body text: 4.5:1 ratio
- Large text: 3:1 ratio
- WCAG AA compliant

### Focus Indicators
```css
outline: 2px solid #2A2A2A;
outline-offset: 2px;
```

### Screen Reader
- All interactive elements have `aria-label`
- Semantic HTML structure

---

## ⚡ Performance Targets

- **First Contentful Paint:** <1.2s
- **Time to Interactive:** <2.5s
- **Animation Frame Rate:** 60fps minimum
- **Image Format:** WebP with JPEG fallback
- **Font Loading:** Preconnect to Google Fonts

---

## 📦 Usage

### Import Tokens

```typescript
import { tokens } from '@vato/ui-primitives/design-system/tokens'

// Colors
const background = tokens.colors.base.warm
const accent = tokens.colors.accent.primary

// Typography
const headingFont = tokens.typography.fontFamily.display
const bodySize = tokens.typography.fontSize.body.size

// Spacing
const cardPadding = tokens.spacing.md

// Components
const cardRadius = tokens.components.card.borderRadius
```

### CSS Variables

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

:root {
  /* Colors */
  --color-base-warm: #F5F1E8;
  --color-accent-primary: #F4E5A8;
  --color-text-primary: #2A2A2A;
  
  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing */
  --spacing-md: 20px;
  --radius-card: 20px;
  
  /* Effects */
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.06);
  --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 🎯 Interaction Patterns

### State Management

**Idle:**
```css
opacity: 1;
transform: scale(1);
box-shadow: var(--shadow-card);
```

**Hover:**
```css
opacity: 1;
transform: scale(1.02);
box-shadow: var(--shadow-card-hover);
```

**Active:**
```css
opacity: 1;
transform: scale(0.98);
box-shadow: var(--shadow-card-active);
```

**Transition:**
```css
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Progressive Disclosure

- Expandable cards with chevron indicators
- Modal overlays with backdrop blur
- Bottom sheets for contextual actions

---

## 🚀 Implementation Checklist

- [x] Design tokens defined
- [x] Typography system (Space Grotesk + Inter)
- [x] Color palette (warm beige/sand)
- [x] Spacing system (8px base)
- [x] Component library specs
- [x] Interactive HTML demo
- [ ] React component primitives
- [ ] Animation library
- [ ] Storybook documentation
- [ ] Figma design kit

---

## 📚 Resources

- **Demo:** Open `design-system-demo.html` in browser
- **Tokens:** `src/design-system/tokens.ts`
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- **Icons:** Use Lucide React (2px stroke, line-based)

---

**Version:** 2.0.0  
**Last Updated:** November 2025  
**Status:** ✅ Approved & Ready for Implementation
