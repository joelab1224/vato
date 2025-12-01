import React from 'react';
import { tokens } from '../design-system/tokens';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({
  size = 'md',
  label,
  description,
  checked = false,
  onCheckedChange,
  className = '',
  style = {},
  disabled = false,
  onChange,
  ...props
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const toggleStyles = tokens.components.toggle;
  
  // Size variations
  const sizeConfig = {
    sm: { width: '40px', height: '22px', thumbSize: '18px' },
    md: { width: toggleStyles.width, height: toggleStyles.height, thumbSize: toggleStyles.thumb.width },
    lg: { width: '64px', height: '34px', thumbSize: '28px' },
  };
  
  const config = sizeConfig[size];

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing[3],
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const switchStyles: React.CSSProperties = {
    position: 'relative',
    width: config.width,
    height: config.height,
    background: checked ? (toggleStyles.active.background || toggleStyles.background) : toggleStyles.background,
    borderRadius: toggleStyles.borderRadius,
    border: checked ? (toggleStyles.active.borderColor ? `1px solid ${toggleStyles.active.borderColor}` : toggleStyles.border) : toggleStyles.border,
    backdropFilter: toggleStyles.backdropFilter,
    WebkitBackdropFilter: toggleStyles.backdropFilter,
    boxShadow: checked ? (toggleStyles.active.boxShadow || toggleStyles.boxShadow) : toggleStyles.boxShadow,
    transition: toggleStyles.transition,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transform: isPressed && !disabled ? 'scale(0.98)' : 'scale(1)',
    flexShrink: 0,
  };

  const thumbStyles: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: checked ? `calc(100% - ${config.thumbSize} - 2px)` : '2px',
    width: config.thumbSize,
    height: config.thumbSize,
    background: checked ? (toggleStyles.thumb.active?.background || toggleStyles.thumb.background) : toggleStyles.thumb.background,
    borderRadius: toggleStyles.thumb.borderRadius,
    boxShadow: checked ? (toggleStyles.thumb.active?.boxShadow || toggleStyles.thumb.boxShadow) : toggleStyles.thumb.boxShadow,
    backdropFilter: toggleStyles.thumb.backdropFilter,
    WebkitBackdropFilter: toggleStyles.thumb.backdropFilter,
    transition: toggleStyles.thumb.transition,
  };

  const labelContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing[1],
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: tokens.typography.fontWeight.medium,
    fontSize: tokens.typography.fontSize.body.size,
    color: tokens.colors.text.primary,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };

  const descriptionStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: tokens.typography.fontWeight.thin,
    fontSize: tokens.typography.fontSize.caption.size,
    color: tokens.colors.text.secondary,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const newChecked = !checked;
    onCheckedChange?.(newChecked);
    
    // Create synthetic input event for compatibility
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        checked: newChecked,
        value: newChecked.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange?.(syntheticEvent);
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <div
      className={className}
      style={containerStyles}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hidden input for accessibility and form integration */}
      <input
        {...props}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => {}} // Controlled by onClick
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
        aria-checked={checked}
        role="switch"
      />
      
      <div style={switchStyles}>
        <div style={thumbStyles} />
      </div>
      
      {(label || description) && (
        <div style={labelContentStyles}>
          {label && (
            <div style={labelStyles}>
              {label}
            </div>
          )}
          {description && (
            <div style={descriptionStyles}>
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Professional Toggle Group component for multiple related toggles
export interface ToggleGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  orientation?: 'vertical' | 'horizontal';
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  children,
  className = '',
  style = {},
  orientation = 'vertical',
}) => {
  const groupStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: orientation === 'vertical' ? tokens.spacing[4] : tokens.spacing[6],
    ...style,
  };

  return (
    <div className={className} style={groupStyles}>
      {children}
    </div>
  );
};