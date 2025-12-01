import React from 'react';
import { tokens, states } from '../design-system/tokens';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'professional' | 'elevated' | 'primary';
  interactive?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'professional',
  interactive = false,
  className = '',
  style = {},
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const baseStyles = tokens.components.card[variant];
  
  // Interactive styles for hoverable cards
  const getInteractiveStyles = () => {
    if (!interactive) return {};
    
    if (isHovered) {
      return {
        ...states.glassHover,
        boxShadow: tokens.shadows.floating,
      };
    }
    
    return {};
  };

  const combinedStyles: React.CSSProperties = {
    // Base card styles
    display: 'block',
    position: 'relative',
    background: baseStyles.background,
    backdropFilter: baseStyles.backdropFilter,
    WebkitBackdropFilter: baseStyles.backdropFilter,
    border: baseStyles.border,
    borderRadius: baseStyles.borderRadius,
    boxShadow: baseStyles.boxShadow,
    padding: baseStyles.padding,
    transition: baseStyles.transition,
    
    // Interactive styles
    ...getInteractiveStyles(),
    
    // Custom styles
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      setIsHovered(true);
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      setIsHovered(false);
    }
    onMouseLeave?.(e);
  };

  return (
    <div
      {...props}
      className={className}
      style={combinedStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// Professional Card Header component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className = '',
  style = {},
  children,
  ...props
}) => {
  const headerStyles: React.CSSProperties = {
    marginBottom: tokens.spacing[4],
    ...style,
  };

  return (
    <div {...props} className={className} style={headerStyles}>
      {children}
    </div>
  );
};

// Professional Card Title component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  level = 3,
  className = '',
  style = {},
  children,
  ...props
}) => {
  const titleStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontWeight: tokens.typography.fontWeight.semibold,
    fontSize: tokens.typography.fontSize.h3.size,
    lineHeight: tokens.typography.fontSize.h3.lineHeight,
    color: tokens.colors.text.primary,
    margin: 0,
    marginBottom: tokens.spacing[1],
    ...style,
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag {...props} className={className} style={titleStyles}>
      {children}
    </Tag>
  );
};

// Professional Card Content component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  className = '',
  style = {},
  children,
  ...props
}) => {
  const contentStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: tokens.typography.fontWeight.thin,
    fontSize: tokens.typography.fontSize.body.size,
    lineHeight: tokens.typography.fontSize.body.lineHeight,
    color: tokens.colors.text.primary,
    ...style,
  };

  return (
    <div {...props} className={className} style={contentStyles}>
      {children}
    </div>
  );
};

// Professional Card Footer component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className = '',
  style = {},
  children,
  ...props
}) => {
  const footerStyles: React.CSSProperties = {
    marginTop: tokens.spacing[4],
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing[2],
    ...style,
  };

  return (
    <div {...props} className={className} style={footerStyles}>
      {children}
    </div>
  );
};