import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'
import { Send, Mic, MicOff, Paperclip, Type, Upload } from 'lucide-react'
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
  onVoiceStop?: () => void
  onFileAttach?: () => void
  isLoading?: boolean
  maxLength?: number
  isRecording?: boolean
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ 
    className, 
    variant, 
    size, 
    onSend, 
    onVoiceRecord,
    onVoiceStop, 
    onFileAttach, 
    isLoading, 
    isRecording = false,
    maxLength = 4000, 
    style, 
    ...props 
  }, ref) => {
    const { currentTheme } = useTheme()
    const [value, setValue] = React.useState('')
    const [mode, setMode] = React.useState<'text' | 'audio'>('text')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // Auto-resize textarea
    React.useEffect(() => {
      const textarea = textareaRef.current || (ref as React.RefObject<HTMLTextAreaElement>)?.current
      if (textarea && mode === 'text') {
        textarea.style.height = 'auto'
        const newHeight = Math.min(textarea.scrollHeight, 120) // Reduced max height for lean design
        textarea.style.height = `${newHeight}px`
      }
    }, [value, ref, mode])

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

    const handleVoiceToggle = () => {
      if (isRecording) {
        onVoiceStop?.()
      } else {
        onVoiceRecord?.()
      }
    }

    const toggleMode = () => {
      setMode(prev => prev === 'text' ? 'audio' : 'text')
      if (mode === 'text') {
        setValue('')
      }
    }

    // Dynamic styles based on current theme - matching mobile nav glassmorphism
    const containerStyles: React.CSSProperties = {
      backgroundColor: 'rgba(232, 228, 220, 0.25)',
      borderTopColor: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      borderRadius: '20px',
    }

    const inputStyles: React.CSSProperties = {
      borderRadius: currentTheme.spacing.borderRadius,
      borderColor: currentTheme.colors.border,
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.text,
      fontFamily: currentTheme.typography.fontFamily,
      fontSize: currentTheme.typography.sizes.sm,
      transition: currentTheme.effects.transition,
      lineHeight: '1.4',
      fontWeight: '400',
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
          className="relative flex items-center gap-3 px-4 py-3 border-t backdrop-blur-md"
          style={containerStyles}
        >
          {/* Main input area */}
          <div className="flex-1 relative">
            {mode === 'text' ? (
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
            ) : (
              <div 
                className="flex items-center justify-center h-10 rounded-lg border-2 border-dashed transition-colors"
                style={{
                  borderColor: isRecording ? currentTheme.colors.primary : currentTheme.colors.border,
                  backgroundColor: isRecording ? `${currentTheme.colors.primary}10` : currentTheme.colors.background,
                }}
              >
                <span 
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ 
                    color: isRecording ? currentTheme.colors.primary : currentTheme.colors.textSecondary 
                  }}
                >
                  {isRecording ? (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Recording...
                    </>
                  ) : (
                    'Tap to record audio message'
                  )}
                </span>
              </div>
            )}
            
            {/* Character count for text mode */}
            {mode === 'text' && maxLength && value.length > maxLength * 0.8 && (
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
          <div className="flex items-center gap-1">
            {/* Mode toggle */}
            <button
              onClick={toggleMode}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: currentTheme.colors.backgroundElevated,
                color: currentTheme.colors.textSecondary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.primary
                e.currentTarget.style.color = currentTheme.colors.textInverse
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.backgroundElevated
                e.currentTarget.style.color = currentTheme.colors.textSecondary
              }}
              title={mode === 'text' ? 'Switch to audio mode' : 'Switch to text mode'}
            >
              {mode === 'text' ? <Mic className="w-4 h-4" /> : <Type className="w-4 h-4" />}
            </button>

            {/* File upload */}
            <button
              onClick={handleFileSelect}
              disabled={isLoading}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
              style={{
                backgroundColor: currentTheme.colors.backgroundElevated,
                color: currentTheme.colors.textSecondary,
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = currentTheme.colors.primary
                  e.currentTarget.style.color = currentTheme.colors.textInverse
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.backgroundElevated
                e.currentTarget.style.color = currentTheme.colors.textSecondary
              }}
              title="Upload file"
            >
              <Upload className="w-4 h-4" />
            </button>

            {/* Voice control (audio mode) or Send (text mode) */}
            {mode === 'audio' ? (
              <button
                onClick={handleVoiceToggle}
                disabled={isLoading}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: isRecording ? currentTheme.colors.accent : currentTheme.colors.primary,
                  color: currentTheme.colors.textInverse,
                  boxShadow: currentTheme.effects.shadow,
                }}
                title={isRecording ? 'Stop recording' : 'Start recording'}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!value.trim() || isLoading}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
                style={{
                  backgroundColor: (!value.trim() || isLoading) 
                    ? currentTheme.colors.backgroundElevated 
                    : currentTheme.colors.primary,
                  color: (!value.trim() || isLoading) 
                    ? currentTheme.colors.textSecondary 
                    : currentTheme.colors.textInverse,
                  boxShadow: (!value.trim() || isLoading) ? 'none' : currentTheme.effects.shadow,
                }}
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </>
    )
  }
)

ChatInput.displayName = 'ChatInput'

export { ChatInput, inputVariants }