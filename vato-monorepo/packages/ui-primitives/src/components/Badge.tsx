import React from 'react';
import { tokens } from '../design-system/tokens';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  className = '',
  style = {},
  children,
  icon,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const baseStyles = tokens.components.badge.base;
  const variantStyles = tokens.components.badge[variant];
  
  // Size variations
  const sizeStyles = {
    sm: { 
      fontSize: tokens.typography.fontSize.micro.size,
      padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
      gap: tokens.spacing[1],
    },
    md: { 
      fontSize: tokens.typography.fontSize.caption.size,
      padding: baseStyles.padding,
      gap: baseStyles.gap,
    },
  };

  // Hover styles
  const getHoverStyles = () => {
    if (isHovered) {
      return {
        transform: 'translateY(-1px)',
        boxShadow: `${tokens.shadows.glassStrong}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
      };
    }
    return {};
  };

  const combinedStyles: React.CSSProperties = {
    // Base styles
    fontFamily: baseStyles.fontFamily,
    fontWeight: baseStyles.fontWeight,
    borderRadius: baseStyles.borderRadius,
    display: baseStyles.display,
    alignItems: baseStyles.alignItems,
    border: baseStyles.border,
    backdropFilter: baseStyles.backdropFilter,
    WebkitBackdropFilter: baseStyles.backdropFilter,
    boxShadow: baseStyles.boxShadow,
    transition: baseStyles.transition,
    
    // Size styles
    ...sizeStyles[size],
    
    // Variant styles
    background: variantStyles.background,
    color: variantStyles.color,
    borderColor: variantStyles.borderColor,
    
    // Hover styles
    ...getHoverStyles(),
    
    // Custom styles
    ...style,
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <span
      {...props}
      className={className}
      style={combinedStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && (
        <span style={{ 
          display: 'flex', 
          alignItems: 'center',
          width: size === 'sm' ? '12px' : '14px',
          height: size === 'sm' ? '12px' : '14px',
        }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

// Professional Status Badge - convenience wrapper
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'online' | 'offline' | 'busy' | 'away';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  ...props
}) => {
  const statusConfig = {
    online: { variant: 'success' as const, icon: '●' },
    busy: { variant: 'warning' as const, icon: '●' },
    offline: { variant: 'error' as const, icon: '●' },
    away: { variant: 'secondary' as const, icon: '●' },
  };

  const config = statusConfig[status];

  return (
    <Badge 
      {...props} 
      variant={config.variant}
      icon={<span style={{ fontSize: '8px' }}>{config.icon}</span>}
    >
      {children}
    </Badge>
  );
};