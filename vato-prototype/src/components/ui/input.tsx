import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'
import { Send, Mic, Paperclip } from 'lucide-react'
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
  onVoiceRecord?: () => void
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
    onVoiceRecord, 
    onFileAttach, 
    isLoading, 
    maxLength = 4000, 
    style, 
    ...props 
  }, ref) => {
    const { currentTheme } = useTheme()
    const [value, setValue] = React.useState('')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    // Auto-resize textarea
    React.useEffect(() => {
      const textarea = textareaRef.current || (ref as React.RefObject<HTMLTextAreaElement>)?.current
      if (textarea) {
        textarea.style.height = 'auto'
        const newHeight = Math.min(textarea.scrollHeight, 200) // Max 200px height
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

    // Dynamic styles based on current theme
    const dynamicStyles: React.CSSProperties = {
      borderRadius: currentTheme.spacing.borderRadius,
      borderColor: currentTheme.colors.border,
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.text,
      fontFamily: currentTheme.typography.fontFamily,
      fontSize: currentTheme.typography.sizes.base,
      transition: currentTheme.effects.transition,
      ...style,
    }

    const focusStyles = {
      '--tw-ring-color': currentTheme.colors.primary,
    } as React.CSSProperties

    return (
      <div 
        className="relative flex items-end gap-2 p-4 border-t"
        style={{ 
          backgroundColor: currentTheme.colors.surface,
          borderTopColor: currentTheme.colors.border,
        }}
      >
        {/* File attach button */}
        {onFileAttach && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onFileAttach}
            disabled={isLoading}
            className="shrink-0 mb-1"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        )}

        {/* Text input area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            className={cn(inputVariants({ variant, size, className }))}
            style={{ ...dynamicStyles, ...focusStyles }}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            disabled={isLoading}
            {...props}
          />
          
          {/* Character count */}
          {maxLength && (
            <div 
              className="absolute bottom-1 right-2 text-xs tabular-nums"
              style={{ 
                color: currentTheme.colors.textSecondary,
                opacity: value.length > maxLength * 0.8 ? 1 : 0,
                transition: currentTheme.effects.transition,
              }}
            >
              {value.length}/{maxLength}
            </div>
          )}
        </div>

        {/* Voice record button */}
        {onVoiceRecord && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onVoiceRecord}
            disabled={isLoading}
            className="shrink-0 mb-1"
          >
            <Mic className="h-4 w-4" />
          </Button>
        )}

        {/* Send button */}
        <Button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          size="icon"
          className="shrink-0 mb-1"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    )
  }
)

ChatInput.displayName = 'ChatInput'

export { ChatInput, inputVariants }