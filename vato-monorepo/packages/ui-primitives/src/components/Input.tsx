import React from 'react';
import { tokens } from '../design-system/tokens';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
  error?: boolean;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  size = 'md',
  variant = 'default',
  error = false,
  label,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  style = {},
  onFocus,
  onBlur,
  disabled,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const baseStyles = tokens.components.input;
  
  // Size variations
  const sizeStyles = {
    sm: { 
      height: '36px', 
      fontSize: tokens.typography.fontSize.caption.size,
      padding: `0 ${tokens.spacing[3]}`,
    },
    md: { 
      height: baseStyles.height, 
      fontSize: baseStyles.fontSize,
      padding: baseStyles.padding,
    },
    lg: { 
      height: '48px', 
      fontSize: tokens.typography.fontSize.bodyLarge.size,
      padding: `0 ${tokens.spacing[5]}`,
    },
  };

  // Variant styles
  const variantStyles = {
    default: {
      background: baseStyles.background,
      border: baseStyles.border,
    },
    ghost: {
      background: 'transparent',
      border: '1px solid transparent',
    },
  };

  // State styles
  const getStateStyles = () => {
    if (error) {
      return {
        borderColor: tokens.colors.status.error,
        boxShadow: `0 0 0 3px rgba(239, 68, 68, 0.1)`,
      };
    }
    
    if (isFocused) {
      return baseStyles.focus;
    }
    
    return {};
  };

  // Icon sizing
  const iconSize = size === 'sm' ? '16px' : size === 'lg' ? '20px' : '18px';
  const iconPadding = size === 'sm' ? tokens.spacing[2] : size === 'lg' ? tokens.spacing[3] : tokens.spacing[2];

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing[1],
    ...style,
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    fontFamily: baseStyles.fontFamily,
    fontWeight: baseStyles.fontWeight,
    color: baseStyles.color,
    borderRadius: baseStyles.borderRadius,
    backdropFilter: baseStyles.backdropFilter,
    WebkitBackdropFilter: baseStyles.backdropFilter,
    transition: baseStyles.transition,
    outline: 'none',
    
    // Size styles
    ...sizeStyles[size],
    
    // Variant styles
    ...variantStyles[variant],
    
    // State styles
    ...getStateStyles(),
    
    // Icon padding adjustments
    paddingLeft: leftIcon ? `calc(${iconSize} + ${iconPadding} + ${iconPadding})` : sizeStyles[size].padding,
    paddingRight: rightIcon ? `calc(${iconSize} + ${iconPadding} + ${iconPadding})` : sizeStyles[size].padding,
    
    // Disabled styles
    ...(disabled && {
      opacity: '0.5',
      cursor: 'not-allowed',
    }),
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: tokens.typography.fontWeight.medium,
    fontSize: tokens.typography.fontSize.caption.size,
    color: error ? tokens.colors.status.error : tokens.colors.text.secondary,
    marginBottom: tokens.spacing[1],
  };

  const helperTextStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: tokens.typography.fontWeight.thin,
    fontSize: tokens.typography.fontSize.micro.size,
    color: error ? tokens.colors.status.error : tokens.colors.text.tertiary,
    marginTop: tokens.spacing[1],
  };

  const iconBaseStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: iconSize,
    height: iconSize,
    color: tokens.colors.text.tertiary,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const leftIconStyles: React.CSSProperties = {
    ...iconBaseStyles,
    left: iconPadding,
  };

  const rightIconStyles: React.CSSProperties = {
    ...iconBaseStyles,
    right: iconPadding,
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={className} style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
        </label>
      )}
      
      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <div style={leftIconStyles}>
            {leftIcon}
          </div>
        )}
        
        <input
          {...props}
          style={inputStyles}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={props.placeholder || baseStyles.placeholder?.color}
        />
        
        {rightIcon && (
          <div style={rightIconStyles}>
            {rightIcon}
          </div>
        )}
      </div>
      
      {helperText && (
        <div style={helperTextStyles}>
          {helperText}
        </div>
      )}
    </div>
  );
};

// Professional Textarea component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
  error?: boolean;
  label?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea: React.FC<TextareaProps> = ({
  size = 'md',
  variant = 'default',
  error = false,
  label,
  helperText,
  resize = 'vertical',
  className = '',
  style = {},
  onFocus,
  onBlur,
  disabled,
  rows = 3,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const baseStyles = tokens.components.input;
  
  // Size variations
  const sizeStyles = {
    sm: { 
      fontSize: tokens.typography.fontSize.caption.size,
      padding: tokens.spacing[2],
    },
    md: { 
      fontSize: baseStyles.fontSize,
      padding: tokens.spacing[3],
    },
    lg: { 
      fontSize: tokens.typography.fontSize.bodyLarge.size,
      padding: tokens.spacing[4],
    },
  };

  // State styles
  const getStateStyles = () => {
    if (error) {
      return {
        borderColor: tokens.colors.status.error,
        boxShadow: `0 0 0 3px rgba(239, 68, 68, 0.1)`,
      };
    }
    
    if (isFocused) {
      return baseStyles.focus;
    }
    
    return {};
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing[1],
    ...style,
  };

  const textareaStyles: React.CSSProperties = {
    width: '100%',
    minHeight: `calc(${tokens.typography.fontSize.body.lineHeight} * ${rows} + ${tokens.spacing[6]})`,
    fontFamily: baseStyles.fontFamily,
    fontWeight: baseStyles.fontWeight,
    color: baseStyles.color,
    background: variant === 'ghost' ? 'transparent' : baseStyles.background,
    border: variant === 'ghost' ? '1px solid transparent' : baseStyles.border,
    borderRadius: baseStyles.borderRadius,
    backdropFilter: baseStyles.backdropFilter,
    WebkitBackdropFilter: baseStyles.backdropFilter,
    transition: baseStyles.transition,
    outline: 'none',
    resize,
    
    // Size styles
    ...sizeStyles[size],
    
    // State styles
    ...getStateStyles(),
    
    // Disabled styles
    ...(disabled && {
      opacity: '0.5',
      cursor: 'not-allowed',
    }),
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: tokens.typography.fontWeight.medium,
    fontSize: tokens.typography.fontSize.caption.size,
    color: error ? tokens.colors.status.error : tokens.colors.text.secondary,
    marginBottom: tokens.spacing[1],
  };

  const helperTextStyles: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: tokens.typography.fontWeight.thin,
    fontSize: tokens.typography.fontSize.micro.size,
    color: error ? tokens.colors.status.error : tokens.colors.text.tertiary,
    marginTop: tokens.spacing[1],
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={className} style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
        </label>
      )}
      
      <textarea
        {...props}
        style={textareaStyles}
        rows={rows}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
      
      {helperText && (
        <div style={helperTextStyles}>
          {helperText}
        </div>
      )}
    </div>
  );
};