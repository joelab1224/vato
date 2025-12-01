import React from 'react';
import { tokens, states } from '../design-system/tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  style = {},
  children,
  disabled,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const baseStyles = tokens.components.button[variant];
  
  // Size variations
  const sizeStyles = {
    sm: { height: '36px', fontSize: '0.75rem', padding: `0 ${tokens.spacing[3]}` },
    md: { height: '40px', fontSize: tokens.typography.fontSize.body.size, padding: `0 ${tokens.spacing[4]}` },
    lg: { height: '44px', fontSize: tokens.typography.fontSize.bodyLarge.size, padding: `0 ${tokens.spacing[5]}` },
  };

  // Interactive states
  const getInteractiveStyles = () => {
    if (disabled || isLoading) {
      return { opacity: '0.5', cursor: 'not-allowed', transform: 'none' };
    }
    
    if (isPressed) {
      return { transform: tokens.effects.activeScale };
    }
    
    if (isHovered) {
      return states.buttonHover[variant];
    }
    
    return {};
  };

  const combinedStyles: React.CSSProperties = {
    // Base styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    fontFamily: baseStyles.fontFamily,
    fontWeight: baseStyles.fontWeight,
    color: baseStyles.color,
    background: baseStyles.background,
    border: baseStyles.border,
    borderRadius: baseStyles.borderRadius,
    boxShadow: baseStyles.boxShadow,
    backdropFilter: baseStyles.backdropFilter,
    WebkitBackdropFilter: baseStyles.backdropFilter,
    transition: baseStyles.transition,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    outline: 'none',
    
    // Size styles (includes fontSize)
    ...sizeStyles[size],
    
    // Interactive styles
    ...getInteractiveStyles(),
    
    // Custom styles
    ...style,
  };

  const handleMouseEnter = () => {
    if (!disabled && !isLoading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (!disabled && !isLoading) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <button
      {...props}
      className={className}
      style={combinedStyles}
      disabled={disabled || isLoading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {isLoading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing[2] }}>
          <span 
            style={{
              width: '14px',
              height: '14px',
              border: '2px solid transparent',
              borderTop: `2px solid ${variant === 'primary' ? 'rgba(255, 255, 255, 0.5)' : 'currentColor'}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          Loading...
        </span>
      ) : children}
    </button>
  );
};

// CSS for loading spinner animation (should be added to global styles)
export const buttonKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;