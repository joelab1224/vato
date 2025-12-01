import React from 'react';
import { tokens } from '../design-system/tokens';

// Professional Table
export interface TableProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  striped?: boolean;
  hoverable?: boolean;
}

export const Table: React.FC<TableProps> = ({
  children,
  className = '',
  style = {},
  striped = false,
  hoverable = true,
}) => {
  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: tokens.typography.fontSize.body.size,
    fontFamily: tokens.typography.fontFamily.body,
    ...style,
  };

  return (
    <table className={className} style={tableStyles}>
      {children}
    </table>
  );
};

// Table Header
export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = '',
  style = {},
}) => {
  return (
    <thead className={className} style={style}>
      {children}
    </thead>
  );
};

// Table Body
export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className = '',
  style = {},
}) => {
  return (
    <tbody className={className} style={style}>
      {children}
    </tbody>
  );
};

// Table Row
export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hoverable?: boolean;
  onClick?: () => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = '',
  style = {},
  hoverable = true,
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const rowStyles: React.CSSProperties = {
    background: isHovered && hoverable ? tokens.colors.glass.backgroundSubtle : 'transparent',
    cursor: onClick ? 'pointer' : 'default',
    transition: tokens.effects.transition,
    ...style,
  };

  const handleMouseEnter = () => {
    if (hoverable) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverable) setIsHovered(false);
  };

  return (
    <tr
      className={className}
      style={rowStyles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </tr>
  );
};

// Table Header Cell
export interface TableHeaderCellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  className = '',
  style = {},
  align = 'left',
  sortable = false,
  sortDirection = null,
  onSort,
}) => {
  const cellStyles: React.CSSProperties = {
    textAlign: align,
    padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
    borderBottom: `1px solid ${tokens.colors.vato.gray[200]}`,
    color: tokens.colors.text.secondary,
    fontWeight: tokens.typography.fontWeight.semibold,
    fontSize: tokens.typography.fontSize.caption.size,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: sortable ? 'pointer' : 'default',
    userSelect: 'none',
    ...style,
  };

  const sortIconStyles: React.CSSProperties = {
    marginLeft: tokens.spacing[1],
    display: 'inline-block',
    opacity: sortDirection ? 1 : 0.5,
    transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: tokens.effects.transition,
  };

  const handleClick = () => {
    if (sortable && onSort) {
      onSort();
    }
  };

  return (
    <th className={className} style={cellStyles} onClick={handleClick}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: align }}>
        {children}
        {sortable && (
          <span style={sortIconStyles}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 3L9 6H3L6 3Z" />
            </svg>
          </span>
        )}
      </div>
    </th>
  );
};

// Table Cell
export interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className = '',
  style = {},
  align = 'left',
}) => {
  const cellStyles: React.CSSProperties = {
    textAlign: align,
    padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
    borderBottom: `1px solid ${tokens.colors.vato.gray[100]}`,
    color: tokens.colors.text.primary,
    fontWeight: tokens.typography.fontWeight.thin,
    fontSize: tokens.typography.fontSize.body.size,
    ...style,
  };

  return (
    <td className={className} style={cellStyles}>
      {children}
    </td>
  );
};

// Professional Table Container - with glassmorphism
export interface TableContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  actions?: React.ReactNode;
}

export const TableContainer: React.FC<TableContainerProps> = ({
  children,
  title,
  className = '',
  style = {},
  actions,
}) => {
  const containerStyles: React.CSSProperties = {
    background: tokens.components.card.professional.background,
    backdropFilter: tokens.components.card.professional.backdropFilter,
    WebkitBackdropFilter: tokens.components.card.professional.backdropFilter,
    border: tokens.components.card.professional.border,
    borderRadius: tokens.components.card.professional.borderRadius,
    boxShadow: tokens.components.card.professional.boxShadow,
    padding: tokens.spacing[6],
    overflow: 'hidden',
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing[4],
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.display,
    fontSize: tokens.typography.fontSize.h3.size,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.text.primary,
    margin: 0,
  };

  const tableWrapperStyles: React.CSSProperties = {
    overflow: 'auto',
    borderRadius: tokens.radius.md,
  };

  return (
    <div className={className} style={containerStyles}>
      {(title || actions) && (
        <div style={headerStyles}>
          {title && <h3 style={titleStyles}>{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div style={tableWrapperStyles}>
        {children}
      </div>
    </div>
  );
};