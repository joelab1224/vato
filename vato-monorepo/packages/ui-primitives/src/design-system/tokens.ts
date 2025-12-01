/**
 * VATO PROFESSIONAL DESIGN SYSTEM
 * ===============================
 * Professional glassmorphism design system with sophisticated visual hierarchy
 * 
 * Philosophy:
 * - Professional, precise, trustworthy aesthetic
 * - Sophisticated glassmorphism with subtle depth
 * - Clean typography hierarchy for optimal readability
 * - Minimal cognitive load through consistent patterns
 */

// ============================================================================
// COLOR SYSTEM - Professional Palette
// ============================================================================

export const colors = {
  // VATO Professional Colors - Primary cyan/blue system
  vato: {
    blue: {
      50: '#f0f9ff',   // Ultra light
      100: '#e0f2fe',  // Very light
      200: '#bae6fd',  // Light
      300: '#7dd3fc',  // Medium light
      400: '#38bdf8',  // Medium
      500: '#0891b2',  // Primary - Professional cyan
      600: '#0e7490',  // Dark
      700: '#155e75',  // Very dark
    },
    gray: {
      25: '#fcfcfd',   // Ultra light
      50: '#f8f9fa',   // Very light background
      100: '#f1f3f4',  // Light background
      200: '#e8eaed',  // Light border
      300: '#dadce0',  // Medium light
      400: '#bdc1c6',  // Medium
      500: '#9aa0a6',  // Medium text
      600: '#80868b',  // Dark text
      700: '#5f6368',  // Very dark text
      800: '#3c4043',  // Almost black
      900: '#202124',  // Pure text black
    },
  },

  // Professional Glass System - Sophisticated transparency
  glass: {
    // Base glass effects
    background: 'rgba(255, 255, 255, 0.3)',      // Default glass
    backgroundStrong: 'rgba(255, 255, 255, 0.5)', // Strong glass
    backgroundSubtle: 'rgba(255, 255, 255, 0.2)', // Subtle glass
    
    // Accent glass effects
    accent: 'rgba(8, 145, 178, 0.1)',            // Cyan accent glass
    accentBorder: 'rgba(8, 145, 178, 0.2)',      // Cyan accent border
    
    // Professional borders
    border: 'rgba(255, 255, 255, 0.3)',          // Default border
    borderStrong: 'rgba(255, 255, 255, 0.5)',    // Strong border
  },

  // Text Hierarchy - Professional grays
  text: {
    primary: '#374151',      // Main content (gray-700)
    secondary: '#6b7280',    // Supporting text (gray-500)
    tertiary: '#9ca3af',     // Meta information (gray-400)
    accent: '#0891b2',       // Accent text (cyan-600)
  },

  // Background System - Clean foundation
  background: {
    primary: 'linear-gradient(135deg, #ddd6fe 0%, #e0e7ff 25%, #ffffff 50%, #f0f9ff 75%, #dbeafe 100%)',
    elevated: '#ffffff',     // Pure white cards
    glass: 'rgba(248, 250, 252, 0.7)', // Professional glass
  },

  // Professional Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #0891b2 0%, #38bdf8 100%)',        // Cyan gradient
    primaryLight: 'linear-gradient(135deg, #7dd3fc 0%, #bae6fd 100%)',   // Light cyan
    dark: 'linear-gradient(135deg, rgba(32, 33, 36, 0.8) 0%, rgba(60, 64, 67, 0.7) 50%, rgba(95, 99, 104, 0.6) 100%)', // Professional dark
    darkHover: 'linear-gradient(135deg, rgba(32, 33, 36, 0.9) 0%, rgba(60, 64, 67, 0.8) 30%, rgba(95, 99, 104, 0.7) 70%, rgba(128, 134, 139, 0.6) 100%)', // Dark hover
  },

  // Status Colors - Professional variants
  status: {
    success: '#10b981',      // Emerald
    warning: '#f59e0b',      // Amber  
    error: '#ef4444',        // Red
    info: '#0891b2',         // Professional cyan
  },
} as const

// ============================================================================
// TYPOGRAPHY SYSTEM - Professional Hierarchy
// ============================================================================

export const typography = {
  // Professional Font Family System
  fontFamily: {
    display: '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"TT Neoris", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    code: '"SF Mono", "Monaco", "Consolas", monospace',
  },

  // Professional Font Sizes and Hierarchy
  fontSize: {
    // Large displays and metrics
    display: { size: '3.5rem', lineHeight: '1', weight: '700' },      // 56px - large metrics
    h1: { size: '1.75rem', lineHeight: '1.2', weight: '600' },        // 28px - page titles
    h2: { size: '1.25rem', lineHeight: '1.3', weight: '600' },        // 20px - section headers
    h3: { size: '1.125rem', lineHeight: '1.3', weight: '600' },       // 18px - card titles
    
    // Body text hierarchy
    body: { size: '0.875rem', lineHeight: '1.5', weight: '100' },     // 14px - main content (thin)
    bodyLarge: { size: '1rem', lineHeight: '1.6', weight: '100' },    // 16px - emphasized content
    caption: { size: '0.75rem', lineHeight: '1.4', weight: '100' },   // 12px - supporting text
    micro: { size: '0.6875rem', lineHeight: '1.3', weight: '500' },   // 11px - labels (medium)
  },

  // Professional Weight System
  fontWeight: {
    thin: '100',      // Body text - elegant and light
    regular: '400',   // Standard fallback
    medium: '500',    // Labels and micro text
    semibold: '600',  // All headings
    bold: '700',      // Large metrics and numbers only
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
// BORDER RADIUS - Professional Subtle Curves
// ============================================================================

export const radius = {
  // Professional radius system - subtle curves
  sm: '0.375rem',        // 6px - small elements
  md: '0.5rem',          // 8px - standard elements
  lg: '0.75rem',         // 12px - cards and containers
  xl: '1rem',            // 16px - large containers
  full: '9999px',        // Full radius
  
  // Semantic aliases - matching Professional design
  card: '1rem',          // 16px - cards (--radius-xl)
  button: '0.5rem',      // 8px - buttons (--radius-md)
  input: '0.75rem',      // 12px - inputs (--radius-lg)
  badge: '0.375rem',     // 6px - badges (--radius-sm)
} as const

// ============================================================================
// SHADOWS - Professional Glass Elevation
// ============================================================================

export const shadows = {
  // Professional glass shadows
  glass: '0 4px 20px rgba(0, 0, 0, 0.08)',          // Standard glass shadow
  glassStrong: '0 8px 32px rgba(0, 0, 0, 0.12)',    // Strong glass shadow
  floating: '0 12px 40px rgba(0, 0, 0, 0.15)',      // Floating elements
  accent: '0 8px 32px rgba(8, 145, 178, 0.2)',      // Accent cyan shadow
  
  // Standard elevation system
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  
  // Semantic aliases - Professional glass system
  card: '0 4px 20px rgba(0, 0, 0, 0.08)',           // Glass shadow
  cardHover: '0 12px 40px rgba(0, 0, 0, 0.15)',     // Floating shadow
  cardActive: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',    // Pressed shadow
} as const

// ============================================================================
// EFFECTS - Professional Glass Morphism & Animations
// ============================================================================

export const effects = {
  // Professional backdrop filters
  blur: 'blur(25px)',                                    // Standard glass blur
  blurStrong: 'blur(40px)',                             // Strong glass blur
  blurSubtle: 'blur(16px)',                             // Subtle glass blur
  
  // Professional animation system
  transition: '300ms cubic-bezier(0.4, 0, 0.2, 1)',    // Standard Professional timing
  transitionFast: '150ms ease-out',                     // Quick interactions
  transitionSlow: '400ms cubic-bezier(0.4, 0, 0.2, 1)', // Smooth complex animations
  
  // Professional transform presets
  hoverScale: 'scale(1.02) translateY(-1px)',           // Subtle hover lift
  hoverScaleButton: 'scale(1.02) translateY(-1px)',     // Button hover
  hoverScaleCard: 'translateY(-3px)',                   // Card hover
  activeScale: 'scale(0.98)',                           // Press down effect
} as const

// ============================================================================
// COMPONENT TOKENS - Professional Patterns
// ============================================================================

export const components = {
  // Professional Cards - Glass morphism system
  card: {
    // Standard professional card
    professional: {
      background: 'rgba(248, 250, 252, 0.7)',
      backdropFilter: effects.blur,
      border: `1px solid ${colors.glass.border}`,
      borderRadius: radius.card,
      boxShadow: shadows.glass,
      padding: spacing.md,
      transition: effects.transition,
    },
    // Elevated card variant
    elevated: {
      background: 'rgba(248, 250, 252, 0.8)',
      backdropFilter: effects.blurStrong,
      border: `1px solid ${colors.glass.borderStrong}`,
      borderRadius: radius.card,
      boxShadow: shadows.floating,
      padding: spacing.lg,
      transition: effects.transition,
    },
    // Primary card (pure white)
    primary: {
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: effects.blur,
      border: `1px solid ${colors.glass.border}`,
      borderRadius: radius.card,
      boxShadow: shadows.glass,
      padding: spacing.md,
      transition: effects.transition,
    },
  },

  // Professional Buttons
  button: {
    // Primary button - dark gradient
    primary: {
      background: colors.gradients.dark,
      backdropFilter: effects.blur,
      color: '#ffffff',
      border: '1px solid rgba(60, 64, 67, 0.4)',
      borderRadius: radius.button,
      boxShadow: `${shadows.glass}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
      height: '40px',
      padding: `0 ${spacing.sm}`,
      fontFamily: typography.fontFamily.body,
      fontWeight: typography.fontWeight.thin,
      fontSize: typography.fontSize.body.size,
      transition: effects.transition,
    },
    // Secondary button - light glass
    secondary: {
      background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.5) 0%, rgba(241, 245, 249, 0.4) 100%)',
      backdropFilter: effects.blur,
      color: colors.text.primary,
      border: '1px solid rgba(203, 213, 225, 0.3)',
      borderRadius: radius.button,
      boxShadow: `${shadows.glass}, inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
      height: '40px',
      padding: `0 ${spacing.sm}`,
      fontFamily: typography.fontFamily.body,
      fontWeight: typography.fontWeight.thin,
      fontSize: typography.fontSize.body.size,
      transition: effects.transition,
    },
    // Ghost button - minimal
    ghost: {
      background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.2) 0%, rgba(226, 232, 240, 0.15) 100%)',
      backdropFilter: effects.blurSubtle,
      color: colors.text.secondary,
      border: '1px solid rgba(203, 213, 225, 0.2)',
      borderRadius: radius.button,
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      height: '40px',
      padding: `0 ${spacing.sm}`,
      fontFamily: typography.fontFamily.body,
      fontWeight: typography.fontWeight.thin,
      fontSize: typography.fontSize.body.size,
      transition: effects.transition,
    },
  },

  // Professional Badges - Glass morphism system
  badge: {
    // Base badge styles
    base: {
      fontFamily: typography.fontFamily.body,
      fontSize: typography.fontSize.caption.size,
      fontWeight: typography.fontWeight.thin,
      padding: `${spacing[1]} ${spacing[2]}`,
      borderRadius: radius.badge,
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[1],
      border: '1px solid transparent',
      backdropFilter: effects.blur,
      boxShadow: `${shadows.glass}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
      transition: effects.transition,
    },
    // Primary badge - dark
    primary: {
      background: colors.gradients.dark,
      color: '#ffffff',
      borderColor: 'rgba(60, 64, 67, 0.4)',
    },
    // Secondary badge - gray
    secondary: {
      background: 'linear-gradient(135deg, rgba(154, 160, 166, 0.25) 0%, rgba(189, 193, 198, 0.2) 50%, rgba(218, 220, 224, 0.15) 100%)',
      color: colors.text.secondary,
      borderColor: 'rgba(154, 160, 166, 0.25)',
    },
    // Neutral badge - light
    neutral: {
      background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.7) 0%, rgba(241, 245, 249, 0.5) 50%, rgba(226, 232, 240, 0.4) 100%)',
      color: colors.text.primary,
      borderColor: 'rgba(203, 213, 225, 0.25)',
    },
    // Status badges
    success: {
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(21, 128, 61, 0.1) 100%)',
      color: '#15803d',
      borderColor: 'rgba(34, 197, 94, 0.2)',
    },
    warning: {
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%)',
      color: '#d97706',
      borderColor: 'rgba(251, 191, 36, 0.2)',
    },
    error: {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.1) 100%)',
      color: '#b91c1c',
      borderColor: 'rgba(239, 68, 68, 0.2)',
    },
  },

  // Professional Toggle Switch
  toggle: {
    width: '52px',
    height: '28px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    backdropFilter: effects.blurSubtle,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: effects.transition,
    // Active state
    active: {
      background: colors.gradients.dark,
      borderColor: 'rgba(60, 64, 67, 0.3)',
      boxShadow: '0 4px 16px rgba(32, 33, 36, 0.2)',
    },
    // Toggle thumb
    thumb: {
      width: '22px',
      height: '22px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '50%',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(8px)',
      transition: effects.transition,
      // Active thumb
      active: {
        background: 'rgba(255, 255, 255, 0.98)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },

  // Professional Input Fields
  input: {
    fontFamily: typography.fontFamily.body,
    fontWeight: typography.fontWeight.thin,
    height: '44px',
    padding: `0 ${spacing.sm}`,
    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.4) 100%)',
    backdropFilter: effects.blurSubtle,
    border: '1px solid rgba(203, 213, 225, 0.3)',
    borderRadius: radius.input,
    color: colors.text.primary,
    fontSize: typography.fontSize.body.size,
    transition: effects.transition,
    // Focus state
    focus: {
      borderColor: 'rgba(60, 64, 67, 0.4)',
      background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)',
      boxShadow: '0 0 0 3px rgba(60, 64, 67, 0.1)',
    },
    // Placeholder
    placeholder: {
      color: colors.text.tertiary,
      fontWeight: typography.fontWeight.thin,
    },
  },

  // Professional Navigation - Ultra glassmorphism
  navigation: {
    // Footer navigation - ultra glass
    footer: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(40px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '30px',
      padding: `${spacing[3]} ${spacing[6]}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
    },
    // Tab navigation - professional pills
    tab: {
      padding: `${spacing[3]} ${spacing[5]}`,
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: effects.blurSubtle,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '20px',
      color: colors.text.secondary,
      fontFamily: typography.fontFamily.body,
      fontWeight: typography.fontWeight.thin,
      fontSize: typography.fontSize.body.size,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      transition: effects.transition,
      // Active tab
      active: {
        background: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        color: colors.text.primary,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },

  // Professional Progress Indicators
  progress: {
    // Linear progress bar
    linear: {
      height: '8px',
      background: 'linear-gradient(135deg, rgba(189, 193, 198, 0.3) 0%, rgba(203, 213, 225, 0.2) 100%)',
      borderRadius: '9999px',
      backdropFilter: 'blur(8px)',
      overflow: 'hidden',
      // Progress fill
      fill: {
        background: colors.gradients.dark,
        borderRadius: '9999px',
        transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)',
        // Shimmer effect
        shimmer: {
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
          animation: 'shimmer 2s ease-in-out infinite',
        },
      },
    },
    // Circular progress
    circular: {
      size: '120px',
      strokeWidth: '6px',
      background: 'rgba(203, 213, 225, 0.15)',
      // Progress ring using conic-gradient
      ring: {
        background: 'conic-gradient(from -90deg, #0ea5e9 0deg, #0ea5e9 280deg, rgba(203, 213, 225, 0.15) 280deg, rgba(203, 213, 225, 0.15) 360deg)',
        borderRadius: '50%',
        padding: '6px',
        transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        // Inner circle
        inner: {
          background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.98) 0%, rgba(241, 245, 249, 0.95) 100%)',
          backdropFilter: effects.blur,
          borderRadius: '50%',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        },
      },
    },
  },

  // Professional Status Indicators
  status: {
    // Status dot - animated
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      animation: 'pulse-professional 2s ease-in-out infinite',
      // Status variants
      active: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)',
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        boxShadow: '0 0 8px rgba(245, 158, 11, 0.4)',
      },
      inactive: {
        background: 'linear-gradient(135deg, rgba(154, 160, 166, 0.8) 0%, rgba(128, 134, 139, 0.6) 100%)',
        boxShadow: '0 0 8px rgba(154, 160, 166, 0.3)',
      },
    },
  },

  // Professional Accordion
  accordion: {
    background: colors.glass.background,
    backdropFilter: effects.blur,
    border: `1px solid ${colors.glass.border}`,
    borderRadius: radius.card,
    transition: effects.transition,
    // Header
    header: {
      padding: `${spacing[4]} ${spacing[5]}`,
      borderBottom: '1px solid rgba(203, 213, 225, 0.1)',
      // Hover state
      hover: {
        background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.4) 0%, rgba(241, 245, 249, 0.3) 100%)',
      },
    },
    // Content area
    content: {
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), padding 300ms ease-out',
      padding: `0 ${spacing[5]}`,
      // Expanded state
      expanded: {
        maxHeight: '200px',
        padding: `${spacing[4]} ${spacing[5]}`,
      },
    },
    // Icon rotation
    icon: {
      transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      expanded: {
        transform: 'rotate(180deg)',
      },
    },
  },

  // Focus Indicators (Accessibility)
  focus: {
    outline: '2px solid',
    outlineColor: colors.text.primary,
    outlineOffset: '2px',
  },
} as const

// ============================================================================
// PROFESSIONAL INTERACTION STATES
// ============================================================================

export const states = {
  // Standard interaction states
  idle: {
    opacity: '1',
    transform: 'scale(1) translateY(0)',
    boxShadow: shadows.card,
    transition: effects.transition,
  },
  hover: {
    opacity: '1',
    transform: effects.hoverScaleCard,
    boxShadow: shadows.cardHover,
    transition: effects.transition,
  },
  active: {
    opacity: '1',
    transform: effects.activeScale,
    boxShadow: shadows.cardActive,
    transition: effects.transitionFast,
  },
  // Professional glass states
  glassHover: {
    background: 'rgba(248, 250, 252, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    transform: 'translateY(-3px)',
    transition: effects.transition,
  },
  // Button states
  buttonHover: {
    primary: {
      background: colors.gradients.darkHover,
      transform: effects.hoverScaleButton,
      boxShadow: `${shadows.glassStrong}, inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
    },
    secondary: {
      background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.7) 0%, rgba(186, 230, 253, 0.5) 100%)',
      border: '1px solid rgba(8, 145, 178, 0.35)',
      transform: 'translateY(-1px)',
    },
    ghost: {
      background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.4) 0%, rgba(186, 230, 253, 0.3) 100%)',
      color: colors.text.primary,
      border: '1px solid rgba(8, 145, 178, 0.2)',
      transform: 'translateY(-1px)',
    },
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

// ============================================================================
// PROFESSIONAL HELPER FUNCTIONS
// ============================================================================

// Helper to create professional glass styles
export const createGlassStyle = (variant: 'default' | 'strong' | 'subtle' | 'accent' = 'default') => {
  const variants = {
    default: {
      background: colors.glass.background,
      backdropFilter: effects.blur,
      border: `1px solid ${colors.glass.border}`,
      boxShadow: shadows.glass,
    },
    strong: {
      background: colors.glass.backgroundStrong,
      backdropFilter: effects.blurStrong,
      border: `1px solid ${colors.glass.borderStrong}`,
      boxShadow: shadows.glassStrong,
    },
    subtle: {
      background: colors.glass.backgroundSubtle,
      backdropFilter: effects.blurSubtle,
      border: `1px solid ${colors.glass.border}`,
      boxShadow: shadows.glass,
    },
    accent: {
      background: colors.glass.accent,
      backdropFilter: effects.blur,
      border: `1px solid ${colors.glass.accentBorder}`,
      boxShadow: shadows.accent,
    },
  }
  
  return variants[variant]
}

// Helper to get Professional component styles
export const getComponentStyle = (component: keyof typeof components, variant?: string) => {
  const componentStyles = components[component]
  if (variant && typeof componentStyles === 'object' && variant in componentStyles) {
    return (componentStyles as any)[variant]
  }
  return componentStyles
}

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

// Note: Individual token exports are handled via the main tokens object

// Professional Design System Documentation
export const PROFESSIONAL_DESIGN_SYSTEM = {
  name: 'VATO Professional Design System',
  version: '1.0.0',
  description: 'Professional glassmorphism design system with sophisticated visual hierarchy',
  principles: [
    'Professional, precise, trustworthy aesthetic',
    'Sophisticated glassmorphism with subtle depth',
    'Clean typography hierarchy for optimal readability',
    'Minimal cognitive load through consistent patterns',
  ],
  colorPalette: {
    primary: colors.vato.blue[500],
    accent: colors.vato.blue[600],
    neutral: colors.vato.gray[500],
  },
  typography: {
    display: typography.fontFamily.display,
    body: typography.fontFamily.body,
    weightStrategy: 'Thin body (100), Semibold headings (600), Bold metrics (700)',
  },
  glassMorphism: {
    blur: effects.blur,
    background: colors.glass.background,
    border: colors.glass.border,
  },
} as const

export default tokens
