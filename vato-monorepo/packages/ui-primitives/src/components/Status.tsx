import React from 'react';
import { tokens } from '../design-system/tokens';

export interface StatusDotProps {
  status: 'active' | 'warning' | 'inactive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  animated?: boolean;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  size = 'md',
  className = '',
  style = {},
  animated = true,
}) => {
  const statusStyles = tokens.components.status.dot;
  
  const sizeMap = {
    sm: { width: '6px', height: '6px' },
    md: { width: statusStyles.width, height: statusStyles.height },
    lg: { width: '12px', height: '12px' },
  };

  const statusVariants = {
    active: statusStyles.active,
    warning: statusStyles.warning,
    inactive: statusStyles.inactive,
  };

  const dotStyles: React.CSSProperties = {
    ...sizeMap[size],
    borderRadius: statusStyles.borderRadius,
    background: statusVariants[status].background,
    boxShadow: statusVariants[status].boxShadow,
    animation: animated ? statusStyles.animation : 'none',
    ...style,
  };

  return <div className={className} style={dotStyles} />;
};

// Status Indicator with label
export interface StatusIndicatorProps {
  status: 'active' | 'warning' | 'inactive';
  label: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  animated?: boolean;
  dotPosition?: 'left' | 'right';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'md',
  className = '',
  style = {},
  animated = true,
  dotPosition = 'left',
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing[2],
    flexDirection: dotPosition === 'right' ? 'row-reverse' : 'row',
    ...style,
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: tokens.typography.fontWeight.thin,
    fontSize: size === 'sm' ? tokens.typography.fontSize.micro.size : tokens.typography.fontSize.caption.size,
    color: tokens.colors.text.secondary,
  };

  return (
    <div className={className} style={containerStyles}>
      <StatusDot status={status} size={size} animated={animated} />
      <span style={labelStyles}>{label}</span>
    </div>
  );
};

// Status Card - for dashboard status display
export interface StatusCardProps {
  title: string;
  status: 'active' | 'warning' | 'inactive';
  description?: string;
  value?: string | number;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  title,
  status,
  description,
  value,
  className = '',
  style = {},
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const statusColors = {
    active: { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' },
    warning: { color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' },
    inactive: { color: '#6b7280', background: 'rgba(107, 114, 128, 0.1)' },
  };

  const cardStyles: React.CSSProperties = {
    background: tokens.components.card.professional.background,
    backdropFilter: tokens.components.card.professional.backdropFilter,
    WebkitBackdropFilter: tokens.components.card.professional.backdropFilter,
    border: tokens.components.card.professional.border,
    borderRadius: tokens.components.card.professional.borderRadius,
    boxShadow: tokens.components.card.professional.boxShadow,
    padding: tokens.spacing[4],
    transition: tokens.effects.transition,
    transform: interactive && isHovered ? 'translateY(-2px)' : 'none',
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing[2],
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: tokens.typography.fontSize.body.size,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.text.primary,
    margin: 0,
  };

  const valueStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: tokens.typography.fontSize.h2.size,
    fontWeight: tokens.typography.fontWeight.bold,
    color: statusColors[status].color,
    margin: 0,
  };

  const descriptionStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontSize: tokens.typography.fontSize.caption.size,
    fontWeight: tokens.typography.fontWeight.thin,
    color: tokens.colors.text.secondary,
    margin: 0,
  };

  const statusBadgeStyles: React.CSSProperties = {
    background: statusColors[status].background,
    color: statusColors[status].color,
    padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
    borderRadius: tokens.radius.badge,
    fontSize: tokens.typography.fontSize.micro.size,
    fontWeight: tokens.typography.fontWeight.medium,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing[1],
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
      style={cardStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={headerStyles}>
        <h3 style={titleStyles}>{title}</h3>
        <div style={statusBadgeStyles}>
          <StatusDot status={status} size="sm" />
          <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
      </div>
      
      {value && (
        <div style={valueStyles}>
          {value}
        </div>
      )}
      
      {description && (
        <p style={descriptionStyles}>
          {description}
        </p>
      )}
    </div>
  );
};

// Status List - for multiple status indicators
export interface StatusListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spacing?: 'sm' | 'md' | 'lg';
  orientation?: 'vertical' | 'horizontal';
}

export const StatusList: React.FC<StatusListProps> = ({
  children,
  className = '',
  style = {},
  spacing = 'md',
  orientation = 'vertical',
}) => {
  const spacingMap = {
    sm: tokens.spacing[2],
    md: tokens.spacing[3],
    lg: tokens.spacing[4],
  };

  const listStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: spacingMap[spacing],
    ...style,
  };

  return (
    <div className={className} style={listStyles}>
      {children}
    </div>
  );
};

// Status Summary - aggregate status display
export interface StatusSummaryProps {
  statuses: Array<{
    label: string;
    status: 'active' | 'warning' | 'inactive';
    count?: number;
  }>;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const StatusSummary: React.FC<StatusSummaryProps> = ({
  statuses,
  title,
  className = '',
  style = {},
}) => {
  const containerStyles: React.CSSProperties = {
    background: tokens.components.card.professional.background,
    backdropFilter: tokens.components.card.professional.backdropFilter,
    WebkitBackdropFilter: tokens.components.card.professional.backdropFilter,
    border: tokens.components.card.professional.border,
    borderRadius: tokens.components.card.professional.borderRadius,
    boxShadow: tokens.components.card.professional.boxShadow,
    padding: tokens.spacing[4],
    ...style,
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: tokens.typography.fontSize.h3.size,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.text.primary,
    margin: 0,
    marginBottom: tokens.spacing[3],
  };

  const summaryStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing[2],
  };

  const itemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const countStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: tokens.typography.fontSize.body.size,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.text.primary,
  };

  return (
    <div className={className} style={containerStyles}>
      {title && <h3 style={titleStyles}>{title}</h3>}
      <div style={summaryStyles}>
        {statuses.map((item, index) => (
          <div key={index} style={itemStyles}>
            <StatusIndicator
              status={item.status}
              label={item.label}
              animated={true}
            />
            {item.count !== undefined && (
              <span style={countStyles}>{item.count}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};