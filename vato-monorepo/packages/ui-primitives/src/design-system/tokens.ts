/**
 * VATO PLATFORM DESIGN SYSTEM V2
 * ===============================
 * Information-centric UI modeling knowledge as living, interconnected organism
 * 
 * Philosophy:
 * - Visual metaphors from neural networks, graph databases, biological systems
 * - Minimize cognitive load through progressive disclosure
 * - Spatial consistency and predictable interaction patterns
 */

// ============================================================================
// COLOR SYSTEM - Cognitive & Natural Palette
// ============================================================================

export const colors = {
  // Base Colors - Light theme foundation
  base: {
    primary: '#ffffff',      // Pure white
    secondary: '#fafafa',    // Light gray (zinc-50)
    elevated: 'rgba(255, 255, 255, 0.6)', // Glass background
  },

  // Accent Colors - Vibrant accents
  accent: {
    violet: '#8b5cf6',       // Primary violet
    purple: '#9333ea',       // Secondary purple
    pink: '#ec4899',         // Accent pink
  },

  // Text Colors - Zinc scale
  text: {
    primary: '#18181b',      // zinc-900 - main content
    secondary: '#52525b',    // zinc-600 - supporting text
    tertiary: '#a1a1aa',     // zinc-400 - meta information
  },

  // Surface Colors - Glass morphism
  surface: {
    elevated: '#ffffff',     // Pure white cards
    glass: 'rgba(255, 255, 255, 0.6)', // Glass effect
    glassViolet: 'rgba(139, 92, 246, 0.08)', // Violet glass
    glassPurple: 'rgba(147, 51, 234, 0.08)', // Purple glass
    glassPink: 'rgba(236, 72, 153, 0.08)',   // Pink glass
  },

  // Effects
  shadow: 'rgba(0, 0, 0, 0.08)',  // Glass border
  
  // Gradients
  gradients: {
    ambient: 'linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f0ff 100%)',
    violetPurple: 'linear-gradient(135deg, #8b5cf6 0%, #9333ea 100%)',
    purplePink: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    violetPink: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  },

  // Status Colors
  status: {
    error: '#ef4444',        // Red
    warning: '#f59e0b',      // Amber
    success: '#10b981',      // Emerald
    info: '#8b5cf6',         // Violet
  },
} as const

// ============================================================================
// TYPOGRAPHY SYSTEM - Hierarchy & Readability
// ============================================================================

export const typography = {
  // Font Family
  fontFamily: {
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    display: '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
  },

  // Font Sizes with Line Heights (Max 3 per view rule)
  fontSize: {
    h1: { size: '28px', lineHeight: '1.2', weight: '600' },
    h2: { size: '20px', lineHeight: '1.3', weight: '600' },
    body: { size: '15px', lineHeight: '1.5', weight: '400' },
    caption: { size: '13px', lineHeight: '1.4', weight: '400' },
    micro: { size: '11px', lineHeight: '1.3', weight: '500' },
  },

  // Font Weights
  fontWeight: {
    regular: '400',   // Body text only
    semibold: '600',  // Headers only
  },
} as const

// ============================================================================
// SPACING SYSTEM - 8px Base Increment
// ============================================================================

export const spacing = {
  // Tailwind 4px base system
  1: '0.25rem',         // 4px
  2: '0.5rem',          // 8px
  3: '0.75rem',         // 12px
  4: '1rem',            // 16px
  5: '1.25rem',         // 20px
  6: '1.5rem',          // 24px
  8: '2rem',            // 32px
  10: '2.5rem',         // 40px
  12: '3rem',           // 48px
  
  // Semantic aliases
  xs: '0.5rem',         // 8px
  sm: '1rem',           // 16px
  md: '1.5rem',         // 24px
  lg: '2rem',           // 32px
  xl: '2.5rem',         // 40px
  containerMargin: '1rem', // 16px
} as const

// ============================================================================
// BORDER RADIUS - Soft, Organic Forms
// ============================================================================

export const radius = {
  sm: '0.5rem',          // 8px
  md: '0.75rem',         // 12px
  lg: '1rem',            // 16px
  xl: '1.25rem',         // 20px
  full: '9999px',        // Full radius
  
  // Semantic aliases
  card: '1rem',          // 16px - cards
  button: '0.75rem',     // 12px - buttons
  input: '0.75rem',      // 12px - inputs
  badge: '9999px',       // Full - badges
} as const

// ============================================================================
// SHADOWS - Elevation System
// ============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  glow: '0 0 30px rgba(139, 92, 246, 0.25)',
  
  // Semantic aliases
  card: '0 4px 16px rgba(0, 0, 0, 0.04)',
  cardHover: '0 0 30px rgba(139, 92, 246, 0.25)',
  cardActive: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
} as const

// ============================================================================
// BACKDROP FILTER - Glass Morphism
// ============================================================================

export const effects = {
  blur: 'blur(20px)',
  transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// ============================================================================
// COMPONENT TOKENS - Specific Patterns
// ============================================================================

export const components = {
  // Cards (Glass morphism)
  card: {
    borderRadius: radius.card,
    padding: spacing.md,
    background: colors.surface.glass,
    backdropFilter: effects.blur,
    border: `1px solid ${colors.shadow}`,
    boxShadow: shadows.card,
  },

  // Glass variants
  glass: {
    default: {
      background: colors.surface.glass,
      backdropFilter: effects.blur,
      border: `1px solid ${colors.shadow}`,
      boxShadow: shadows.card,
    },
    violet: {
      background: colors.surface.glassViolet,
      backdropFilter: effects.blur,
      border: '1px solid rgba(139, 92, 246, 0.15)',
      boxShadow: '0 4px 16px rgba(139, 92, 246, 0.1)',
    },
    purple: {
      background: colors.surface.glassPurple,
      backdropFilter: effects.blur,
      border: '1px solid rgba(147, 51, 234, 0.15)',
      boxShadow: '0 4px 16px rgba(147, 51, 234, 0.1)',
    },
    pink: {
      background: colors.surface.glassPink,
      backdropFilter: effects.blur,
      border: '1px solid rgba(236, 72, 153, 0.15)',
      boxShadow: '0 4px 16px rgba(236, 72, 153, 0.1)',
    },
  },

  // Buttons
  button: {
    primary: {
      borderRadius: radius.button,
      padding: `0 ${spacing.md}`,
      background: colors.gradients.violetPurple,
      color: colors.surface.elevated,
      height: '44px',
      fontWeight: '600',
      border: 'none',
    },
    secondary: {
      borderRadius: radius.button,
      padding: `0 ${spacing.md}`,
      background: colors.surface.glass,
      backdropFilter: effects.blur,
      color: colors.text.primary,
      height: '44px',
      border: `1px solid ${colors.shadow}`,
    },
  },


  // Badges
  badge: {
    borderRadius: radius.badge,
    padding: `${spacing[1]} ${spacing[3]}`,
    fontSize: '0.75rem',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
  },

  // Navigation
  bottomNav: {
    background: colors.surface.glass,
    backdropFilter: effects.blur,
    border: `1px solid ${colors.shadow}`,
    padding: spacing[4],
    boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)',
  },

  // Navigation
  carousel: {
    indicatorSize: '6px',
    indicatorSpacing: '8px',
  },

  // Focus Indicators (Accessibility)
  focus: {
    outline: '2px solid',
    outlineColor: colors.text.primary,
    outlineOffset: '2px',
  },
} as const

// ============================================================================
// INTERACTION STATES
// ============================================================================

export const states = {
  idle: {
    opacity: '1',
    scale: '1',
    shadow: shadows.card,
  },
  hover: {
    opacity: '1',
    scale: '1.02',
    shadow: shadows.cardHover,
  },
  active: {
    opacity: '1',
    scale: '0.98',
    shadow: shadows.cardActive,
  },
} as const

// ============================================================================
// LAYOUT SYSTEM - Mobile-First
// ============================================================================

export const layout = {
  // Container
  containerMaxWidth: '428px',      // Mobile-first primary
  containerMargin: spacing.containerMargin,

  // Breakpoints
  breakpoints: {
    mobile: { min: '320px', max: '428px' },    // Primary target
    tablet: { min: '768px', max: '1024px' },   // Scale layout
    desktop: { min: '1280px' },                 // Centered container
  },

  // Spacing
  cardSeparation: spacing.sm,
  sectionSeparation: spacing.lg,
} as const

// ============================================================================
// ICONOGRAPHY SPECS
// ============================================================================

export const iconography = {
  style: 'line-based',
  strokeWidth: '2px',
  size: {
    default: '24px',
    compact: '20px',
  },
  grid: '24px',
  padding: '2px',
  color: colors.text.primary,
  
  semanticSet: [
    'add',
    'edit',
    'menu',
    'arrow-back',
    'arrow-forward',
    'expand',
    'collapse',
    'info',
    'settings',
  ],
} as const

// ============================================================================
// ACCESSIBILITY STANDARDS
// ============================================================================

export const accessibility = {
  touchTarget: {
    minimum: '44px',
  },
  contrast: {
    bodyText: '4.5:1',
    largeText: '3:1',
  },
  focusIndicator: components.focus,
  screenReaderLabels: true,
} as const

// ============================================================================
// PERFORMANCE TARGETS
// ============================================================================

export const performance = {
  firstContentfulPaint: '1.2s',
  timeToInteractive: '2.5s',
  animationFrameRate: '60fps',
  imageFormat: 'webp',
  imageFallback: 'jpeg',
} as const

// ============================================================================
// EXPORTS
// ============================================================================

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  effects,
  components,
  states,
  layout,
  iconography,
  accessibility,
  performance,
} as const

export type DesignTokens = typeof tokens

export default tokens
