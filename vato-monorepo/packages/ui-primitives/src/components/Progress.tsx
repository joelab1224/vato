import React from 'react';
import { tokens } from '../design-system/tokens';

// Linear Progress Bar with shimmer effect
export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
  showShimmer?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = '',
  style = {},
  showShimmer = true,
  size = 'md',
  variant = 'default',
}) => {
  const progressStyles = tokens.components.progress.linear;
  
  const sizeMap = {
    sm: { height: '4px' },
    md: { height: progressStyles.height },
    lg: { height: '12px' },
  };

  const variantMap = {
    default: { background: progressStyles.fill.background },
    success: { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    warning: { background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
    error: { background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
  };

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const containerStyles: React.CSSProperties = {
    height: sizeMap[size].height,
    background: progressStyles.background,
    borderRadius: progressStyles.borderRadius,
    backdropFilter: progressStyles.backdropFilter,
    WebkitBackdropFilter: progressStyles.backdropFilter,
    overflow: progressStyles.overflow,
    position: 'relative',
    ...style,
  };

  const fillStyles: React.CSSProperties = {
    height: '100%',
    width: `${percentage}%`,
    background: variantMap[variant].background,
    borderRadius: progressStyles.fill.borderRadius,
    transition: progressStyles.fill.transition,
    position: 'relative',
    overflow: 'hidden',
  };

  const shimmerStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: progressStyles.fill.shimmer.background,
    animation: showShimmer ? progressStyles.fill.shimmer.animation : 'none',
  };

  return (
    <div className={className} style={containerStyles}>
      <div style={fillStyles}>
        {showShimmer && <div style={shimmerStyles} />}
      </div>
    </div>
  );
};

// Circular Progress with conic-gradient
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'success';
  showPercentage?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 6,
  className = '',
  style = {},
  variant = 'default',
  showPercentage = true,
}) => {
  const progressStyles = tokens.components.progress.circular;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const degrees = (percentage / 100) * 360;

  const variantGradients = {
    default: 'conic-gradient(from -90deg, #0ea5e9 0deg, #0ea5e9 {degrees}deg, rgba(203, 213, 225, 0.15) {degrees}deg, rgba(203, 213, 225, 0.15) 360deg)',
    success: 'conic-gradient(from -90deg, #10b981 0deg, #10b981 {degrees}deg, rgba(203, 213, 225, 0.15) {degrees}deg, rgba(203, 213, 225, 0.15) 360deg)',
  };

  const containerStyles: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    margin: `0 auto ${tokens.spacing[4]}`,
    position: 'relative',
    ...style,
  };

  const ringStyles: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: variantGradients[variant].replace('{degrees}', degrees.toString()),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: `${strokeWidth}px`,
    transition: progressStyles.ring.transition,
  };

  const innerStyles: React.CSSProperties = {
    width: `${size - strokeWidth * 2}px`,
    height: `${size - strokeWidth * 2}px`,
    background: progressStyles.ring.inner.background,
    backdropFilter: progressStyles.ring.inner.backdropFilter,
    WebkitBackdropFilter: progressStyles.ring.inner.backdropFilter,
    borderRadius: progressStyles.ring.inner.borderRadius,
    position: 'absolute',
    boxShadow: progressStyles.ring.inner.boxShadow,
  };

  const percentageStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: size < 100 ? '1rem' : '1.5rem',
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.text.primary,
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div className={className} style={containerStyles}>
      <div style={ringStyles}>
        <div style={innerStyles} />
        {showPercentage && (
          <span style={percentageStyles}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

// Progress Card - matching Professional design
export interface ProgressCardProps {
  title: string;
  subtitle?: string;
  value: number;
  max?: number;
  variant?: 'default' | 'success';
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  interactive?: boolean;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  subtitle,
  value,
  max = 100,
  variant = 'default',
  className = '',
  style = {},
  size = 120,
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyles: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(203, 213, 225, 0.3)',
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing[6],
    textAlign: 'center' as const,
    boxShadow: `${tokens.shadows.glass}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: interactive && isHovered ? 'translateY(-4px)' : 'none',
    ...style,
  };

  const hoverCardShadow = `${tokens.shadows.glassStrong}, inset 0 1px 0 rgba(255, 255, 255, 0.25)`;

  const titleStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: tokens.typography.fontSize.h3.size,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.text.primary,
    margin: 0,
    marginBottom: tokens.spacing[1],
  };

  const subtitleStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontSize: tokens.typography.fontSize.body.size,
    fontWeight: tokens.typography.fontWeight.thin,
    color: tokens.colors.text.secondary,
    margin: 0,
  };

  const handleMouseEnter = () => {
    if (interactive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (interactive) setIsHovered(false);
  };

  return (
    <div
      className={className}
      style={{
        ...cardStyles,
        boxShadow: isHovered ? hoverCardShadow : cardStyles.boxShadow,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CircularProgress
        value={value}
        max={max}
        variant={variant}
        size={size}
        style={{ marginBottom: tokens.spacing[4] }}
      />
      <h4 style={titleStyles}>{title}</h4>
      {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
    </div>
  );
};

// Progress Grid - for multiple progress cards
export interface ProgressGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export const ProgressGrid: React.FC<ProgressGridProps> = ({
  children,
  columns,
  gap = 'md',
  className = '',
  style = {},
}) => {
  const gapMap = {
    sm: tokens.spacing[4],
    md: tokens.spacing[6],
    lg: tokens.spacing[8],
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns 
      ? `repeat(${columns}, 1fr)` 
      : 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: gapMap[gap],
    ...style,
  };

  return (
    <div className={className} style={gridStyles}>
      {children}
    </div>
  );
};