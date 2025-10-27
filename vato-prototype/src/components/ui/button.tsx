import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'

const buttonVariants = cva(
  // Base styles - will be overridden by CSS custom properties
  `inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
   disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: 'text-white shadow-sm hover:opacity-90',
        secondary: 'shadow-sm border hover:opacity-90',
        ghost: 'hover:bg-opacity-10',
        outline: 'border-2 bg-transparent hover:bg-opacity-5',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
      rounded: {
        default: '',  // Will use CSS custom property
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, style, ...props }, ref) => {
    const { currentTheme } = useTheme()

    // Dynamic styles based on current theme
    const dynamicStyles: React.CSSProperties = {
      borderRadius: rounded === 'default' ? currentTheme.spacing.borderRadius : undefined,
      fontFamily: currentTheme.typography.fontFamily,
      transition: currentTheme.effects.transition,
      ...style,
    }

    // Theme-specific variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case 'default':
          return {
            backgroundColor: currentTheme.colors.primary,
            boxShadow: currentTheme.effects.shadow,
          }
        case 'secondary':
          return {
            backgroundColor: currentTheme.colors.surface,
            color: currentTheme.colors.text,
            borderColor: currentTheme.colors.border,
            boxShadow: currentTheme.effects.shadow,
          }
        case 'ghost':
          return {
            color: currentTheme.colors.text,
          }
        case 'outline':
          return {
            color: currentTheme.colors.primary,
            borderColor: currentTheme.colors.primary,
          }
        default:
          return {}
      }
    }

    const combinedStyles = { ...dynamicStyles, ...getVariantStyles() }

    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        style={combinedStyles}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }