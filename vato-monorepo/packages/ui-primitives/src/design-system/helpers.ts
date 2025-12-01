import { tokens, createGlassStyle as _createGlassStyle, getComponentStyle } from './tokens';

/**
 * Professional Design System Helper Functions
 */

// Re-export glass style helper from tokens (renamed to avoid conflict)
export const createProfessionalGlassStyle = _createGlassStyle;

// Professional Button helper
export const createButtonStyle = (variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
  const buttonConfig = tokens.components.button[variant];
  return {
    ...buttonConfig,
    cursor: 'pointer',
    fontFamily: tokens.typography.fontFamily.body,
  };
};

// Professional Card helper
export const createCardStyle = (variant: 'professional' | 'elevated' | 'primary' = 'professional') => {
  const cardConfig = tokens.components.card[variant];
  return {
    ...cardConfig,
    WebkitBackdropFilter: cardConfig.backdropFilter,
  };
};

// Professional Badge helper
export const createBadgeStyle = (variant: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error' = 'neutral') => {
  const baseConfig = tokens.components.badge.base;
  const variantConfig = tokens.components.badge[variant];
  
  return {
    ...baseConfig,
    ...variantConfig,
    WebkitBackdropFilter: baseConfig.backdropFilter,
  };
};

// Professional Toggle helper
export const createToggleStyle = (active: boolean = false) => {
  const toggleConfig = tokens.components.toggle;
  const activeConfig = active ? toggleConfig.active : {};
  
  return {
    ...toggleConfig,
    ...activeConfig,
    WebkitBackdropFilter: toggleConfig.backdropFilter,
    cursor: 'pointer',
    position: 'relative' as const,
  };
};

// Professional Input helper
export const createInputStyle = (focused: boolean = false) => {
  const inputConfig = tokens.components.input;
  const focusConfig = focused ? inputConfig.focus : {};
  
  return {
    ...inputConfig,
    ...focusConfig,
    WebkitBackdropFilter: inputConfig.backdropFilter,
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

// Professional CSS custom properties
export const cssVariables = {
  // Professional Colors
  '--color-primary': tokens.colors.vato.blue[500],
  '--color-primary-hover': tokens.colors.vato.blue[600],
  '--color-accent': tokens.colors.vato.blue[400],
  '--color-text-primary': tokens.colors.text.primary,
  '--color-text-secondary': tokens.colors.text.secondary,
  '--color-text-tertiary': tokens.colors.text.tertiary,
  '--color-text-accent': tokens.colors.text.accent,
  
  // Professional Glass System
  '--glass-background': tokens.colors.glass.background,
  '--glass-background-strong': tokens.colors.glass.backgroundStrong,
  '--glass-border': tokens.colors.glass.border,
  '--glass-accent': tokens.colors.glass.accent,
  
  // Professional Typography
  '--font-display': tokens.typography.fontFamily.display,
  '--font-body': tokens.typography.fontFamily.body,
  '--font-code': tokens.typography.fontFamily.code,
  
  // Professional Spacing
  '--space-1': tokens.spacing[1],
  '--space-2': tokens.spacing[2],
  '--space-3': tokens.spacing[3],
  '--space-4': tokens.spacing[4],
  '--space-5': tokens.spacing[5],
  '--space-6': tokens.spacing[6],
  
  // Professional Radius
  '--radius-button': tokens.radius.button,
  '--radius-card': tokens.radius.card,
  '--radius-input': tokens.radius.input,
  '--radius-badge': tokens.radius.badge,
  
  // Professional Effects
  '--shadow-glass': tokens.shadows.glass,
  '--shadow-glass-strong': tokens.shadows.glassStrong,
  '--shadow-floating': tokens.shadows.floating,
  '--shadow-accent': tokens.shadows.accent,
  '--blur': tokens.effects.blur,
  '--blur-strong': tokens.effects.blurStrong,
  '--transition': tokens.effects.transition,
} as const;

// Professional interaction state helpers
export const getHoverState = (component: 'card' | 'button') => {
  if (component === 'card') {
    return tokens.states.glassHover;
  }
  return tokens.states.hover;
};

export const getActiveState = () => {
  return tokens.states.active;
};
