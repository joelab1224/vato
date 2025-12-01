import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'
import { Send, Paperclip, Upload } from 'lucide-react'
import { Button } from './button'


const inputVariants = cva(
  'flex w-full bg-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default: 'border shadow-sm',
        ghost: 'border-transparent',
        underline: 'border-0 border-b-2 rounded-none',
      },
      size: {
        default: 'min-h-[52px] px-4 py-3 text-base',
        sm: 'min-h-[40px] px-3 py-2 text-sm',
        lg: 'min-h-[64px] px-6 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  onSend?: (message: string) => void
  onFileAttach?: () => void
  isLoading?: boolean
  maxLength?: number
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ 
    className, 
    variant, 
    size, 
    onSend, 
    onFileAttach, 
    isLoading, 
    maxLength = 4000, 
    style, 
    ...props 
  }, ref) => {
  const { currentTheme } = useTheme()
  const [value, setValue] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

    // Auto-resize textarea
    React.useEffect(() => {
      const textarea = textareaRef.current || (ref as React.RefObject<HTMLTextAreaElement>)?.current
      if (textarea) {
        textarea.style.height = 'auto'
        const newHeight = Math.min(textarea.scrollHeight, 120) // Reduced max height for lean design
        textarea.style.height = `${newHeight}px`
      }
    }, [value, ref])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
        e.preventDefault()
        handleSend()
      }
      props.onKeyDown?.(e)
    }

    const handleSend = () => {
      if (value.trim() && onSend && !isLoading) {
        onSend(value.trim())
        setValue('')
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (newValue.length <= maxLength) {
        setValue(newValue)
        props.onChange?.(e)
      }
    }

    const handleFileSelect = () => {
      fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0 && onFileAttach) {
        onFileAttach()
        // Reset the input value to allow selecting the same file again
        e.target.value = ''
      }
    }


    // Dynamic styles based on current theme - using theme-based spacing and glassmorphism
    const containerStyles: React.CSSProperties = {
      backgroundColor: currentTheme.colors.glassBackground,
      borderTopColor: currentTheme.colors.glassBorder,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      boxShadow: currentTheme.effects.shadowLarge,
      borderRadius: currentTheme.spacing.borderRadiusLarge,
      // Remove fixed positioning - handled by FloatingControls
    }

    const inputStyles: React.CSSProperties = {
      borderRadius: currentTheme.spacing.borderRadius,
      borderColor: currentTheme.colors.border,
      backgroundColor: 'transparent',  // Allow glassmorphism to show through
      color: '#2A2A2A',                // Professional design system charcoal
      fontFamily: currentTheme.typography.fontFamily,
      fontSize: currentTheme.typography.sizes.sm,
      transition: currentTheme.effects.transition,
      lineHeight: '1.4',
      fontWeight: '400',
      // Add padding to prevent cursor cutoff
      paddingTop: currentTheme.spacing.xs,
      paddingBottom: currentTheme.spacing.xs,
      paddingLeft: currentTheme.spacing.sm,
      paddingRight: currentTheme.spacing.sm,
      ...style,
    }

    const focusStyles = {
      '--tw-ring-color': currentTheme.colors.primary,
      '--tw-ring-opacity': '0.3',
      '--tw-ring-offset-width': '1px',
    } as React.CSSProperties

    return (
      <>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept="*/*"
        />
        
        <div 
          className="relative flex items-center backdrop-blur-md border-t"
          style={{
            ...containerStyles,
            gap: currentTheme.spacing.md,
            paddingLeft: currentTheme.spacing.lg,
            paddingRight: currentTheme.spacing.lg,
            paddingTop: currentTheme.spacing.md,
            paddingBottom: currentTheme.spacing.md,
          }}
        >
          {/* Main input area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              className={cn(
                'w-full bg-transparent border-0 focus:outline-none resize-none placeholder:text-sm',
                className
              )}
              style={inputStyles}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Message VATO..."
              disabled={isLoading}
              rows={1}
              {...props}
            />
            
            {/* Character count */}
            {maxLength && value.length > maxLength * 0.8 && (
              <div 
                className="absolute -top-5 right-0 text-xs font-medium"
                style={{ 
                  color: value.length > maxLength * 0.95 
                    ? currentTheme.colors.accent 
                    : currentTheme.colors.textSecondary,
                }}
              >
                {value.length}/{maxLength}
              </div>
            )}
          </div>

          {/* Right side controls */}
          <div 
            className="flex items-center"
            style={{ gap: currentTheme.spacing.xs }}
          >

            {/* File upload */}
            <button
              onClick={handleFileSelect}
              disabled={isLoading}
              className="rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                minWidth: '44px',
                minHeight: '44px',
                width: '44px',
                height: '44px',
                backgroundColor: currentTheme.colors.backgroundElevated,
                color: currentTheme.colors.textSecondary,
                border: '2px solid transparent',
                transition: 'all 200ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = '#22d3ee'
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(34, 211, 238, 0.3), 0 0 8px rgba(34, 211, 238, 0.2)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
              title="Upload file"
            >
              <Upload className="w-4 h-4" />
            </button>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!value.trim() || isLoading}
              className="rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                minWidth: '44px',
                minHeight: '44px',
                width: '44px',
                height: '44px',
                backgroundColor: currentTheme.colors.backgroundElevated,
                color: currentTheme.colors.textSecondary,
                border: (!value.trim() || isLoading) 
                  ? '2px solid transparent' 
                  : '2px solid #22d3ee',
                boxShadow: (!value.trim() || isLoading) 
                  ? 'none' 
                  : '0 0 0 1px rgba(34, 211, 238, 0.3), 0 0 8px rgba(34, 211, 238, 0.2)',
                transition: 'all 200ms ease-in-out',
              }}
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </>
    )
  }
)

ChatInput.displayName = 'ChatInput'

export { ChatInput, inputVariants }