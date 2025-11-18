/**
 * VATO Platform Design System
 * 
 * Information-centric UI modeling knowledge as living, interconnected organism
 */

// Export design tokens
export { tokens, colors, typography, spacing, radius, shadows, effects, components, states, layout, iconography, accessibility, performance } from './tokens'
export type { DesignTokens } from './tokens'

// Export animations
export { animations, duration, easing, keyframes, presets, transitions, stagger, gestures, a11y, performance as animationPerformance } from './animations'
export type { AnimationDuration, AnimationEasing, AnimationPreset } from './animations'

// Re-export default
export { default } from './tokens'
export { default as animationLibrary } from './animations'
