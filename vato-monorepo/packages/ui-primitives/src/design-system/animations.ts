/**
 * VATO ANIMATION LIBRARY
 * ======================
 * Purposeful, organic motion that enhances understanding
 * 
 * Principles:
 * - Animations should reduce cognitive load, not add to it
 * - Motion reveals relationships and hierarchy
 * - 60fps minimum, smooth easing
 * - Respect prefers-reduced-motion
 */

// ============================================================================
// DURATION PRESETS
// ============================================================================

export const duration = {
  instant: 0,
  fast: 150,        // Micro-interactions, hover states
  base: 200,        // Default transitions
  moderate: 300,    // Drawers, modals
  slow: 500,        // Page transitions
  slower: 800,      // Data visualizations
} as const

// ============================================================================
// EASING FUNCTIONS
// ============================================================================

export const easing = {
  // Standard
  linear: 'linear',
  ease: 'ease',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Custom - Organic
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',       // Default for most
  snappy: 'cubic-bezier(0.4, 0.0, 1, 1)',         // Quick responses
  gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',     // Smooth, natural
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Playful
  
  // Specialized
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',    // Spring-like
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',   // Natural decel
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',     // Natural accel
} as const

// ============================================================================
// KEYFRAME ANIMATIONS
// ============================================================================

export const keyframes = {
  // Fade animations
  fadeIn: {
    name: 'fadeIn',
    keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
  },
  
  fadeOut: {
    name: 'fadeOut',
    keyframes: `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `,
  },
  
  // Slide animations
  slideUp: {
    name: 'slideUp',
    keyframes: `
      @keyframes slideUp {
        from { 
          transform: translateY(20px);
          opacity: 0;
        }
        to { 
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,
  },
  
  slideDown: {
    name: 'slideDown',
    keyframes: `
      @keyframes slideDown {
        from { 
          transform: translateY(-20px);
          opacity: 0;
        }
        to { 
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,
  },
  
  slideInLeft: {
    name: 'slideInLeft',
    keyframes: `
      @keyframes slideInLeft {
        from { 
          transform: translateX(-100%);
          opacity: 0;
        }
        to { 
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  },
  
  slideInRight: {
    name: 'slideInRight',
    keyframes: `
      @keyframes slideInRight {
        from { 
          transform: translateX(100%);
          opacity: 0;
        }
        to { 
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  },
  
  // Scale animations
  scaleIn: {
    name: 'scaleIn',
    keyframes: `
      @keyframes scaleIn {
        from { 
          transform: scale(0.95);
          opacity: 0;
        }
        to { 
          transform: scale(1);
          opacity: 1;
        }
      }
    `,
  },
  
  scaleOut: {
    name: 'scaleOut',
    keyframes: `
      @keyframes scaleOut {
        from { 
          transform: scale(1);
          opacity: 1;
        }
        to { 
          transform: scale(0.95);
          opacity: 0;
        }
      }
    `,
  },
  
  // Bounce
  bounceIn: {
    name: 'bounceIn',
    keyframes: `
      @keyframes bounceIn {
        0% {
          transform: scale(0.3);
          opacity: 0;
        }
        50% {
          transform: scale(1.05);
          opacity: 1;
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
        }
      }
    `,
  },
  
  // Pulse
  pulse: {
    name: 'pulse',
    keyframes: `
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `,
  },
  
  // Progress
  progressFill: {
    name: 'progressFill',
    keyframes: `
      @keyframes progressFill {
        from {
          stroke-dashoffset: 283;
        }
        to {
          stroke-dashoffset: var(--progress-offset, 0);
        }
      }
    `,
  },
  
  // Shimmer (loading state)
  shimmer: {
    name: 'shimmer',
    keyframes: `
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `,
  },
  
  // Rotate
  rotate: {
    name: 'rotate',
    keyframes: `
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  },
  
  // Float (subtle hover effect)
  float: {
    name: 'float',
    keyframes: `
      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-4px);
        }
      }
    `,
  },
  
  // Glow (for important elements)
  glow: {
    name: 'glow',
    keyframes: `
      @keyframes glow {
        0%, 100% {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
        }
        50% {
          box-shadow: 0 8px 32px rgba(244, 229, 168, 0.3);
        }
      }
    `,
  },
} as const

// ============================================================================
// ANIMATION PRESETS (Common combinations)
// ============================================================================

export const presets = {
  // Card entrance
  cardEnter: {
    animation: `${keyframes.slideUp.name} ${duration.base}ms ${easing.smooth}`,
    fillMode: 'both',
  },
  
  // Card exit
  cardExit: {
    animation: `${keyframes.fadeOut.name} ${duration.fast}ms ${easing.smooth}`,
    fillMode: 'both',
  },
  
  // Modal
  modalBackdrop: {
    animation: `${keyframes.fadeIn.name} ${duration.moderate}ms ${easing.smooth}`,
    fillMode: 'both',
  },
  
  modalContent: {
    animation: `${keyframes.scaleIn.name} ${duration.moderate}ms ${easing.gentle}`,
    fillMode: 'both',
  },
  
  // Drawer (side panel)
  drawerEnter: {
    animation: `${keyframes.slideInRight.name} ${duration.moderate}ms ${easing.smooth}`,
    fillMode: 'both',
  },
  
  // Toast notification
  toastEnter: {
    animation: `${keyframes.slideInRight.name} ${duration.base}ms ${easing.smooth}`,
    fillMode: 'both',
  },
  
  // Loading
  loading: {
    animation: `${keyframes.pulse.name} 1.5s ${easing.ease} infinite`,
  },
  
  spinner: {
    animation: `${keyframes.rotate.name} 1s ${easing.linear} infinite`,
  },
  
  // Skeleton loader
  skeleton: {
    animation: `${keyframes.shimmer.name} 2s ${easing.linear} infinite`,
    background: 'linear-gradient(90deg, #E8E4DC 25%, #F5F1E8 50%, #E8E4DC 75%)',
    backgroundSize: '200% 100%',
  },
  
  // Floating action button
  fabHover: {
    animation: `${keyframes.float.name} 2s ${easing.ease} infinite`,
  },
} as const

// ============================================================================
// TRANSITION UTILITIES
// ============================================================================

export const transitions = {
  // Common properties
  all: `all ${duration.base}ms ${easing.smooth}`,
  colors: `color ${duration.base}ms ${easing.smooth}, background-color ${duration.base}ms ${easing.smooth}, border-color ${duration.base}ms ${easing.smooth}`,
  opacity: `opacity ${duration.base}ms ${easing.smooth}`,
  transform: `transform ${duration.base}ms ${easing.smooth}`,
  shadow: `box-shadow ${duration.base}ms ${easing.smooth}`,
  
  // Component-specific
  card: `transform ${duration.base}ms ${easing.smooth}, box-shadow ${duration.base}ms ${easing.smooth}`,
  button: `all ${duration.fast}ms ${easing.smooth}`,
  input: `border-color ${duration.base}ms ${easing.smooth}, background-color ${duration.base}ms ${easing.smooth}`,
} as const

// ============================================================================
// STAGGER UTILITIES (for list animations)
// ============================================================================

export const stagger = {
  /**
   * Generate stagger delay for list items
   * @param index - Item index
   * @param baseDelay - Base delay in ms (default: 50)
   */
  delay: (index: number, baseDelay: number = 50): number => {
    return index * baseDelay
  },
  
  /**
   * Generate stagger animation style
   * @param index - Item index
   * @param animationName - Keyframe animation name
   * @param baseDelay - Base delay between items
   */
  style: (index: number, animationName: string = 'slideUp', baseDelay: number = 50) => ({
    animation: `${animationName} ${duration.base}ms ${easing.smooth}`,
    animationDelay: `${index * baseDelay}ms`,
    animationFillMode: 'both',
  }),
} as const

// ============================================================================
// GESTURE ANIMATIONS (touch interactions)
// ============================================================================

export const gestures = {
  // Swipe thresholds
  swipeThreshold: 50, // pixels
  
  // Pull to refresh
  pullToRefresh: {
    threshold: 80, // pixels to trigger
    maxPull: 120,  // max pull distance
  },
  
  // Press feedback
  pressScale: 0.98,
  pressDuration: duration.fast,
} as const

// ============================================================================
// ACCESSIBILITY - Respect user preferences
// ============================================================================

export const a11y = {
  /**
   * Media query for reduced motion preference
   */
  reducedMotionQuery: '@media (prefers-reduced-motion: reduce)',
  
  /**
   * Reduced motion styles
   */
  reducedMotion: {
    animation: 'none !important',
    transition: 'none !important',
  },
  
  /**
   * CSS to disable animations for users who prefer reduced motion
   */
  reducedMotionCSS: `
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `,
} as const

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

export const performance = {
  /**
   * Properties that can be animated efficiently (GPU-accelerated)
   */
  efficientProperties: [
    'transform',
    'opacity',
  ],
  
  /**
   * CSS to force GPU acceleration
   */
  willChange: (properties: string[]) => ({
    willChange: properties.join(', '),
  }),
  
  /**
   * Force hardware acceleration
   */
  accelerate: {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px',
  },
} as const

// ============================================================================
// EXPORTS
// ============================================================================

export const animations = {
  duration,
  easing,
  keyframes,
  presets,
  transitions,
  stagger,
  gestures,
  a11y,
  performance,
} as const

export type AnimationDuration = keyof typeof duration
export type AnimationEasing = keyof typeof easing
export type AnimationPreset = keyof typeof presets

export default animations
