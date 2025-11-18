import { tokens } from './tokens';

/**
 * Helper functions to apply the unified design system
 */

// Glass morphism helper
export const createGlassStyle = (variant: 'default' | 'violet' | 'purple' | 'pink' = 'default') => {
  const glassConfig = tokens.components.glass[variant];
  return {
    background: glassConfig.background,
    backdropFilter: glassConfig.backdropFilter,
    WebkitBackdropFilter: glassConfig.backdropFilter,
    border: glassConfig.border,
    boxShadow: glassConfig.boxShadow,
  };
};

// Button helper
export const createButtonStyle = (variant: 'primary' | 'secondary' = 'primary') => {
  const buttonConfig = tokens.components.button[variant];
  return {
    borderRadius: buttonConfig.borderRadius,
    padding: buttonConfig.padding,
    background: buttonConfig.background,
    color: buttonConfig.color,
    height: buttonConfig.height,
    fontWeight: variant === 'primary' ? '600' : '500',
    border: buttonConfig.border,
    fontFamily: tokens.typography.fontFamily.body,
    cursor: 'pointer',
    transition: tokens.effects.transition,
  };
};

// Card helper
export const createCardStyle = () => {
  return {
    borderRadius: tokens.components.card.borderRadius,
    padding: tokens.components.card.padding,
    background: tokens.components.card.background,
    backdropFilter: tokens.components.card.backdropFilter,
    WebkitBackdropFilter: tokens.components.card.backdropFilter,
    border: tokens.components.card.border,
    boxShadow: tokens.components.card.boxShadow,
  };
};

// Badge helper
export const createBadgeStyle = () => {
  return {
    borderRadius: tokens.components.badge.borderRadius,
    padding: tokens.components.badge.padding,
    fontSize: tokens.components.badge.fontSize,
    fontWeight: tokens.components.badge.fontWeight,
    display: tokens.components.badge.display,
    alignItems: tokens.components.badge.alignItems,
    gap: tokens.components.badge.gap,
  };
};

// Container helper  
export const createContainerStyle = () => {
  return {
    maxWidth: tokens.layout.containerMaxWidth,
    margin: '0 auto',
    padding: tokens.layout.containerMargin,
  };
};

// Common CSS custom properties
export const cssVariables = {
  // Colors
  '--color-violet': tokens.colors.accent.violet,
  '--color-purple': tokens.colors.accent.purple,  
  '--color-pink': tokens.colors.accent.pink,
  '--color-text-primary': tokens.colors.text.primary,
  '--color-text-secondary': tokens.colors.text.secondary,
  '--color-text-tertiary': tokens.colors.text.tertiary,
  
  // Fonts
  '--font-display': tokens.typography.fontFamily.display,
  '--font-body': tokens.typography.fontFamily.body,
  
  // Spacing
  '--space-1': tokens.spacing[1],
  '--space-2': tokens.spacing[2],
  '--space-4': tokens.spacing[4],
  '--space-6': tokens.spacing[6],
  
  // Radius
  '--radius-button': tokens.radius.button,
  '--radius-card': tokens.radius.card,
  
  // Effects
  '--shadow-card': tokens.shadows.card,
  '--shadow-glow': tokens.shadows.glow,
} as const;