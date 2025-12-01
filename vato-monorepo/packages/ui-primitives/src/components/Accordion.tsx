import React from 'react';
import { tokens } from '../design-system/tokens';

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  icon?: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  icon,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const accordionStyles = tokens.components.accordion;

  const containerStyles: React.CSSProperties = {
    background: accordionStyles.background,
    backdropFilter: accordionStyles.backdropFilter,
    WebkitBackdropFilter: accordionStyles.backdropFilter,
    border: accordionStyles.border,
    borderRadius: accordionStyles.borderRadius,
    transition: accordionStyles.transition,
    overflow: 'hidden',
  };

  const headerStyles: React.CSSProperties = {
    padding: accordionStyles.header.padding,
    borderBottom: accordionStyles.header.borderBottom,
    cursor: 'pointer',
    transition: '200ms ease-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: isHovered ? accordionStyles.header.hover.background : 'transparent',
  };

  const contentStyles: React.CSSProperties = {
    maxHeight: isOpen ? accordionStyles.content.expanded.maxHeight : accordionStyles.content.maxHeight,
    overflow: accordionStyles.content.overflow,
    transition: accordionStyles.content.transition,
    padding: isOpen ? accordionStyles.content.expanded.padding : accordionStyles.content.padding,
  };

  const iconStyles: React.CSSProperties = {
    width: '20px',
    height: '20px',
    transition: accordionStyles.icon.transition,
    transform: isOpen ? accordionStyles.icon.expanded.transform : 'rotate(0deg)',
    color: tokens.colors.text.secondary,
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontWeight: tokens.typography.fontWeight.medium,
    fontSize: tokens.typography.fontSize.body.size,
    color: tokens.colors.text.primary,
    margin: 0,
  };

  return (
    <div style={containerStyles}>
      <div
        style={headerStyles}
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h4 style={titleStyles}>{title}</h4>
        {icon || (
          <svg
            style={iconStyles}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
      <div style={contentStyles}>
        {children}
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  className = '',
  style = {},
}) => {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set());

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing[4],
    ...style,
  };

  const handleToggle = (index: number) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(index);
      }
      
      return newOpenItems;
    });
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className} style={containerStyles}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child) && child.type === AccordionItem) {
          return React.cloneElement(child, {
            key: index,
            isOpen: openItems.has(index),
            onToggle: () => handleToggle(index),
          });
        }
        return child;
      })}
    </div>
  );
};

// Professional Accordion Group - for multiple related accordions
export interface AccordionGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spacing?: 'sm' | 'md' | 'lg';
}

export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  children,
  className = '',
  style = {},
  spacing = 'md',
}) => {
  const spacingMap = {
    sm: tokens.spacing[2],
    md: tokens.spacing[4],
    lg: tokens.spacing[6],
  };

  const groupStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingMap[spacing],
    ...style,
  };

  return (
    <div className={className} style={groupStyles}>
      {children}
    </div>
  );
};