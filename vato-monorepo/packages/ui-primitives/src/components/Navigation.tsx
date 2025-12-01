import React from 'react';
import { tokens } from '../design-system/tokens';

// Tab Navigation - Professional pills
export interface TabNavItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const TabNavItem: React.FC<TabNavItemProps> = ({
  children,
  isActive = false,
  onClick,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const tabStyles = tokens.components.navigation.tab;

  const getItemStyles = (): React.CSSProperties => {
    if (disabled) {
      return {
        ...tabStyles,
        opacity: 0.5,
        cursor: 'not-allowed',
      };
    }

    if (isActive) {
      return {
        ...tabStyles,
        ...tabStyles.active,
      };
    }

    if (isHovered && !isActive) {
      return {
        ...tabStyles,
        background: 'rgba(255, 255, 255, 0.7)',
        borderColor: 'rgba(255, 255, 255, 0.35)',
        transform: 'translateY(-1px)',
      };
    }

    return tabStyles;
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      style={getItemStyles()}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export interface TabNavProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spacing?: 'sm' | 'md' | 'lg';
}

export const TabNav: React.FC<TabNavProps> = ({
  children,
  className = '',
  style = {},
  spacing = 'md',
}) => {
  const spacingMap = {
    sm: tokens.spacing[2],
    md: tokens.spacing[3],
    lg: tokens.spacing[4],
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacingMap[spacing],
    marginBottom: tokens.spacing[6],
    ...style,
  };

  return (
    <nav className={className} style={containerStyles}>
      {children}
    </nav>
  );
};

// Footer Navigation - Ultra glassmorphism
export interface FooterNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const FooterNavItem: React.FC<FooterNavItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const navStyles = tokens.components.navigation.footer;

  const getItemStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: tokens.spacing[1],
      color: 'rgba(32, 33, 36, 0.7)',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: tokens.spacing[2],
      borderRadius: '8px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      opacity: disabled ? 0.5 : 1,
    };

    if (isActive) {
      return {
        ...baseStyles,
        color: 'rgba(32, 33, 36, 1)',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(32, 33, 36, 0.1)',
        transform: 'translateY(-1px)',
      };
    }

    if (isHovered && !disabled) {
      return {
        ...baseStyles,
        color: 'rgba(32, 33, 36, 0.9)',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px) scale(1.05)',
      };
    }

    return baseStyles;
  };

  const iconStyles: React.CSSProperties = {
    width: '24px',
    height: '24px',
    transition: 'all 200ms ease-out',
    transform: isActive ? 'scale(1.1)' : 'scale(1)',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '0.7rem',
    fontWeight: tokens.typography.fontWeight.thin,
    fontFamily: tokens.typography.fontFamily.body,
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      style={getItemStyles()}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      <div style={iconStyles}>{icon}</div>
      <span style={labelStyles}>{label}</span>
    </div>
  );
};

export interface FooterNavProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  position?: 'fixed' | 'relative';
}

export const FooterNav: React.FC<FooterNavProps> = ({
  children,
  className = '',
  style = {},
  position = 'fixed',
}) => {
  const footerStyles = tokens.components.navigation.footer;

  const containerStyles: React.CSSProperties = {
    position: position,
    bottom: position === 'fixed' ? tokens.spacing[6] : 'auto',
    left: position === 'fixed' ? '50%' : 'auto',
    transform: position === 'fixed' ? 'translateX(-50%)' : 'none',
    background: footerStyles.background,
    backdropFilter: footerStyles.backdropFilter,
    WebkitBackdropFilter: footerStyles.backdropFilter,
    border: footerStyles.border,
    borderRadius: footerStyles.borderRadius,
    padding: footerStyles.padding,
    boxShadow: footerStyles.boxShadow,
    zIndex: position === 'fixed' ? 100 : 'auto',
    ...style,
  };

  const itemsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing[8],
  };

  return (
    <nav className={className} style={containerStyles}>
      <div style={itemsStyles}>
        {children}
      </div>
    </nav>
  );
};

// Breadcrumb Navigation
export interface BreadcrumbItemProps {
  children: React.ReactNode;
  href?: string;
  isLast?: boolean;
  onClick?: () => void;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  href,
  isLast = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const itemStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontSize: tokens.typography.fontSize.caption.size,
    fontWeight: isLast ? tokens.typography.fontWeight.medium : tokens.typography.fontWeight.thin,
    color: isLast ? tokens.colors.text.primary : tokens.colors.text.secondary,
    textDecoration: 'none',
    cursor: isLast ? 'default' : 'pointer',
    transition: tokens.effects.transition,
    opacity: isHovered && !isLast ? 1 : (isLast ? 1 : 0.8),
  };

  const separatorStyles: React.CSSProperties = {
    margin: `0 ${tokens.spacing[2]}`,
    color: tokens.colors.text.tertiary,
    fontSize: tokens.typography.fontSize.caption.size,
  };

  const handleClick = () => {
    if (!isLast && onClick) {
      onClick();
    }
  };

  return (
    <>
      <span
        style={itemStyles}
        onClick={handleClick}
        onMouseEnter={() => !isLast && setIsHovered(true)}
        onMouseLeave={() => !isLast && setIsHovered(false)}
      >
        {href ? (
          <a href={href} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            {children}
          </a>
        ) : (
          children
        )}
      </span>
      {!isLast && <span style={separatorStyles}>/</span>}
    </>
  );
};

export interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  className = '',
  style = {},
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...style,
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <nav className={className} style={containerStyles}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child) && child.type === BreadcrumbItem) {
          return React.cloneElement(child, {
            key: index,
            isLast: index === childrenArray.length - 1,
          });
        }
        return child;
      })}
    </nav>
  );
};

// Sidebar Navigation Item
export interface SidebarItemProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string | number;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  children,
  isActive = false,
  onClick,
  disabled = false,
  badge,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getItemStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing[3],
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      color: tokens.colors.text.secondary,
      textDecoration: 'none',
      fontSize: tokens.typography.fontSize.body.size,
      fontWeight: tokens.typography.fontWeight.medium,
      borderRadius: tokens.radius.md,
      margin: `${tokens.spacing[1]} ${tokens.spacing[3]}`,
      transition: 'all 150ms ease-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    };

    if (isActive) {
      return {
        ...baseStyles,
        background: tokens.colors.glass.accent,
        color: tokens.colors.text.accent,
        border: `1px solid ${tokens.colors.glass.accentBorder}`,
      };
    }

    if (isHovered && !disabled) {
      return {
        ...baseStyles,
        background: tokens.colors.glass.backgroundSubtle,
        color: tokens.colors.text.primary,
      };
    }

    return baseStyles;
  };

  const badgeStyles: React.CSSProperties = {
    background: tokens.colors.vato.blue[500],
    color: '#ffffff',
    fontSize: tokens.typography.fontSize.micro.size,
    fontWeight: tokens.typography.fontWeight.medium,
    padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
    borderRadius: tokens.radius.badge,
    marginLeft: 'auto',
    minWidth: '20px',
    textAlign: 'center',
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      style={getItemStyles()}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      {icon && <span style={{ display: 'flex', width: '20px', height: '20px' }}>{icon}</span>}
      <span>{children}</span>
      {badge && <span style={badgeStyles}>{badge}</span>}
    </div>
  );
};