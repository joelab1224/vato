# VATO Platform Design System

> Information-centric UI modeling knowledge as living, interconnected organism

## 🎨 Design Philosophy

**System Architecture:** Visual metaphors drawn from neural networks, graph databases, and biological systems. UI elements represent nodes, pathways, and metabolic flows of information.

**Core Principle:** Minimize cognitive load through progressive disclosure, spatial consistency, and predictable interaction patterns.

**Design Approach:**
1. **Information-Centric** - Architecture built around knowledge flows
2. **Organic Forms** - Soft, natural aesthetics (20px radius, glass morphism)
3. **Cognitive Palette** - Warm beige/sand tones to reduce eye strain
4. **Mobile-First** - 320-428px primary target, PWA-optimized
5. **Independent** - Separate from chat module themes (Clean/Warm/Dark)

## 👁 Quick Preview

**[Open design-system-demo.html](./design-system-demo.html)** in your browser to see all components in action.

**Key Features:**
- ✨ Warm beige gradient background (#F5F1E8 → #E1DCD5)
- 📝 Space Grotesk (headings) + Inter (body)
- 🎴 Knowledge node cards with glass morphism
- 📊 Animated donut charts
- 👆 44x44px touch targets
- 🎨 Muted yellow accent (#F4E5A8)

## 📱 Platform Modules

| Module | Purpose | Icon |
|--------|---------|------|
| **Home** | Dashboard & overview | `home` |
| **Knowledge** | Document management | `book` |
| **Cognition** | Memory & agents | `brain` |
| **Talk** ⭐ | Chat/voice (prominent) | `message-circle` |
| **Settings** | Configuration | `settings` |
| **Auth** | Login/signup | `lock` |

## 🎨 Color System

### Primary Colors (Trust & Intelligence)
```typescript
primary: {
  500: '#3B82F6',  // Main brand color
  600: '#2563EB',  // Hover states
  700: '#1D4ED8',  // Active states
}
```

### Module-Specific Accents
```typescript
modules: {
  home: '#3B82F6',      // Blue
  knowledge: '#8B5CF6',  // Purple
  cognition: '#EC4899',  // Pink
  talk: '#14B8A6',       // Teal (PROMINENT)
  settings: '#64748B',   // Slate
}
```

### Semantic Colors
```typescript
success: '#10B981'  // Green
error: '#EF4444'    // Red
warning: '#F59E0B'  // Amber
info: '#3B82F6'     // Blue
```

### Neutral Scale (Clean & Minimal)
```typescript
neutral: {
  0: '#FFFFFF',     // Pure white (backgrounds)
  50: '#FAFAFA',    // Off-white (surfaces)
  100: '#F5F5F5',   // Light gray
  300: '#D4D4D4',   // Borders
  600: '#525252',   // Body text
  900: '#171717',   // Headings
}
```

## 📝 Typography

### Font Stack
```css
sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
mono: ui-monospace, "SF Mono", Monaco, "Cascadia Code", monospace
```

### Type Scale (Mobile-Optimized)
| Token | Size | Usage |
|-------|------|-------|
| `xs` | 12px | Captions, labels |
| `sm` | 14px | Secondary text |
| `base` | **16px** | Body text (mobile optimal) |
| `lg` | 18px | Emphasized text |
| `xl` | 20px | Small headings |
| `2xl` | 24px | Section headings |
| `3xl` | 30px | Page titles |
| `4xl` | 36px | Hero text |

### Font Weights
- `normal` (400) - Body text
- `medium` (500) - UI elements, buttons
- `semibold` (600) - Headings
- `bold` (700) - Emphasis

## 📏 Spacing

Based on **4px/0.25rem** base unit:

```typescript
spacing: {
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px (base)
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
}
```

### Touch Targets
All interactive elements meet **44x44px minimum** for accessibility:
- Small: `40px`
- **Base: `44px`** (iOS/Android standard)
- Large: `48px`
- XL: `56px`

## 🔘 Border Radius

Soft, modern curves:
```typescript
radius: {
  sm: '6px',      // Subtle
  base: '8px',    // Default (buttons, inputs)
  md: '12px',     // Cards
  lg: '16px',     // Large cards
  xl: '20px',     // Modals
  full: '9999px', // Pills, avatars
}
```

## 🌑 Shadows

Subtle elevation system:
```typescript
shadows: {
  sm: '0 1px 3px rgba(0,0,0,0.1)',
  base: '0 2px 8px rgba(0,0,0,0.08)',    // Default cards
  md: '0 4px 12px rgba(0,0,0,0.1)',      // Elevated
  lg: '0 8px 24px rgba(0,0,0,0.12)',     // Modals
  
  // Colored shadows for vibrant accents
  primary: '0 4px 12px rgba(59,130,246,0.2)',
  accent: '0 4px 12px rgba(20,184,166,0.2)',
}
```

## 🎬 Animations

### Duration
```typescript
fast: '150ms',      // Micro-interactions
base: '200ms',      // Default transitions
moderate: '300ms',  // Modals, drawers
slow: '500ms',      // Page transitions
```

### Easing
```typescript
easeOut: 'cubic-bezier(0, 0, 0.2, 1)',     // Most common
easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth
spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)' // Bouncy
```

## 🧱 Component Tokens

### Buttons
```typescript
button: {
  height: {
    base: '44px',    // Touch-friendly
  },
  padding: '0 1.5rem',
  radius: '8px',
  fontWeight: '500',
  minWidth: '80px',
}
```

### Inputs
```typescript
input: {
  height: '44px',
  padding: '0 1rem',
  radius: '8px',
  fontSize: '16px',   // Prevents iOS zoom
  borderWidth: '1px',
}
```

### Cards
```typescript
card: {
  padding: '1.5rem',  // 24px
  radius: '12px',
  shadow: 'base',
  border: '1px solid #E5E5E5',
}
```

### Navigation (Mobile Bottom Nav)
```typescript
nav: {
  height: '72px',
  itemSize: '48px',
  iconSize: '24px',
  gap: '8px',
}
```

### Floating Action Button (Talk Module)
```typescript
fab: {
  size: '56px',
  radius: 'full',
  shadow: 'lg',
  position: {
    bottom: 'calc(env(safe-area-inset-bottom) + 5rem)',
    right: '1rem',
  },
}
```

## 📱 Mobile-First Layout

### Safe Area (PWA)
```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
```

### Breakpoints
```typescript
sm: '640px',   // Large phones
md: '768px',   // Tablets
lg: '1024px',  // Small laptops
xl: '1280px',  // Desktop
```

### Mobile Dimensions
```typescript
mobile: {
  headerHeight: '56px',
  tabBarHeight: '64px',
  bottomNav: '72px',
  fabSize: '56px',
}
```

## 📦 Usage

### Import Tokens
```typescript
import { tokens } from '@vato/ui-primitives/design-system/tokens'

// Access colors
const primaryColor = tokens.colors.primary[500]
const talkColor = tokens.colors.modules.talk.primary

// Access spacing
const baseSpacing = tokens.spacing[4]

// Access component tokens
const buttonHeight = tokens.components.button.height.base
```

### Use with Tailwind (Future)
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        // ... etc
      }
    }
  }
}
```

### Use with CSS Variables
```css
:root {
  --color-primary: #3B82F6;
  --color-talk: #14B8A6;
  --spacing-base: 1rem;
  --radius-base: 0.5rem;
  --shadow-base: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

## 🎯 Module-Specific Guidelines

### Talk Module (PROMINENT)
- **Primary color:** Teal `#14B8A6`
- **FAB enabled:** Yes (quick access)
- **Layout:** Full-screen
- **Bottom nav:** Always visible with prominent icon
- **Interaction:** Tap FAB or bottom nav to access

### Home Module
- **Layout:** Grid-based cards
- **Card spacing:** 16px (`spacing[4]`)
- **Background:** White with gray sections

### Knowledge Module
- **Layout:** List with search
- **Accent:** Purple `#8B5CF6`
- **Item spacing:** 12px (`spacing[3]`)

### Cognition Module
- **Layout:** Timeline/graph view
- **Accent:** Pink `#EC4899`
- **Node spacing:** 24px (`spacing[6]`)

### Settings Module
- **Layout:** Sectioned list
- **Accent:** Slate `#64748B`
- **Section spacing:** 32px (`spacing[8]`)

## ✅ Accessibility

### Touch Targets
- Minimum **44x44px** for all interactive elements
- 48px recommended for primary actions

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- All colors tested for WCAG AA compliance

### Focus States
- 2px focus ring using primary color
- 4px offset for visibility
- Clear focus indicators on all interactive elements

## 🔄 Comparison: Platform vs Chat Themes

| Aspect | Platform Design | Chat Themes |
|--------|----------------|-------------|
| **Purpose** | Entire app navigation & features | Chat interface only |
| **Themes** | Single unified theme | 3 themes (Clean/Warm/Dark) |
| **Target** | Mobile-first PWA | Any device |
| **Colors** | Module-specific accents | Theme-specific palettes |
| **Switching** | No theme switching | User can switch |
| **Consistency** | Fixed, always the same | Variable per user preference |

## 📚 Resources

- **Figma:** [Design Files](#) (Coming soon)
- **Storybook:** [Component Library](#) (Coming soon)
- **Icons:** Lucide React (`lucide-react`)
- **Fonts:** System fonts (no external fonts needed)

## 🚀 Roadmap

- [ ] Create base component primitives
- [ ] Build Storybook documentation
- [ ] Tailwind CSS configuration
- [ ] Dark mode support (future)
- [ ] Animation library
- [ ] Accessibility testing suite
- [ ] Figma design kit

---

**Version:** 1.0.0  
**Last Updated:** November 2025  
**Maintainer:** VATO Team
