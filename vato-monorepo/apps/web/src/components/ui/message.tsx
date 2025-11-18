import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'

const messageVariants = cva(
  'relative max-w-[85%] break-words transition-all duration-200',
  {
    variants: {
      role: {
        user: 'ml-auto',
        assistant: 'mr-auto',
        system: 'mx-auto text-center',
      },
      state: {
        default: '',
        streaming: 'animate-pulse',
        error: 'border-2',
      },
    },
    defaultVariants: {
      role: 'assistant',
      state: 'default',
    },
  }
)

const messageContentVariants = cva(
  'relative overflow-hidden transition-all duration-200',
  {
    variants: {
      role: {
        user: '',
        assistant: '',
        system: 'text-center text-sm opacity-75',
      },
    },
  }
)

export interface MessageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof messageVariants> {
  content: string
  timestamp?: Date
  citations?: Array<{
    id: string
    text: string
    source: string
    type: 'document' | 'web' | 'memory'
  }>
  onCitationClick?: (citation: any) => void
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ 
    className, 
    role, 
    state, 
    content, 
    timestamp, 
    citations, 
    onCitationClick, 
    style, 
    ...props 
  }, ref) => {
    const { currentTheme } = useTheme()

    // Dynamic styles based on theme and role
    const getMessageStyles = (): React.CSSProperties => {
      const baseStyles = {
        fontFamily: currentTheme.typography.fontFamily,
        fontSize: currentTheme.typography.sizes.base,
        transition: currentTheme.effects.transition,
      }

      if (role === 'user') {
        return {
          ...baseStyles,
          backgroundColor: currentTheme.colors.userMessage,
          color: currentTheme.colors.textInverse,  // Perfect contrast for user messages
          padding: currentTheme.spacing.messagePadding,
          borderRadius: currentTheme.spacing.borderRadius,
          boxShadow: currentTheme.effects.shadow,
          fontWeight: '500', // Medium weight for better readability on colored backgrounds
        }
      } else if (role === 'assistant') {
        return {
          ...baseStyles,
          backgroundColor: currentTheme.colors.assistantMessage,
          color: currentTheme.colors.text,
          padding: currentTheme.spacing.messagePadding,
          borderRadius: currentTheme.spacing.borderRadius,
          border: `1px solid ${currentTheme.colors.border}`,
          boxShadow: currentTheme.effects.shadow,
          // Enhanced contrast for assistant messages
          backdropFilter: 'blur(10px)', // Subtle glass effect
          WebkitBackdropFilter: 'blur(10px)',
        }
      }

      return baseStyles
    }

    const getErrorStyles = () => {
      if (state === 'error') {
        return {
          borderColor: currentTheme.colors.error,
        }
      }
      return {}
    }

    const combinedStyles = { 
      ...getMessageStyles(), 
      ...getErrorStyles(), 
      ...style 
    }

    // Render content with citations
    const renderContentWithCitations = () => {
      if (!citations || citations.length === 0) {
        return content
      }

      let processedContent = content
      const citationElements: React.ReactNode[] = []

      citations.forEach((citation, index) => {
        const citationId = `[${index + 1}]`
        const citationBadge = (
          <button
            key={citation.id}
            onClick={() => onCitationClick?.(citation)}
            className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 mx-1 text-xs font-medium rounded-sm cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: currentTheme.colors.citation,
              color: currentTheme.colors.textInverse, // Perfect contrast
              fontSize: currentTheme.typography.sizes.xs,
              fontWeight: '600', // Bold for better visibility
              boxShadow: currentTheme.effects.shadow,
              border: `1px solid ${currentTheme.colors.citation}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.citationHover
              e.currentTarget.style.borderColor = currentTheme.colors.citationHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.citation
              e.currentTarget.style.borderColor = currentTheme.colors.citation
            }}
          >
            {index + 1}
          </button>
        )

        // Replace citation markers with interactive badges
        processedContent = processedContent.replace(
          citationId,
          `__CITATION_${index}__`
        )
        citationElements[index] = citationBadge
      })

      // Split content and insert citation elements
      const parts = processedContent.split(/__CITATION_(\d+)__/)
      const result: React.ReactNode[] = []

      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          // Text part
          if (parts[i]) {
            result.push(parts[i])
          }
        } else {
          // Citation part
          const citationIndex = parseInt(parts[i])
          if (citationElements[citationIndex]) {
            result.push(citationElements[citationIndex])
          }
        }
      }

      return result
    }

    return (
      <div className="mb-4 flex">
        <div
          className={cn(messageVariants({ role, state, className }))}
          ref={ref}
          {...props}
        >
          <div
            className={cn(messageContentVariants({ role }))}
            style={combinedStyles}
          >
            {renderContentWithCitations()}
            
            {timestamp && role !== 'system' && (
              <div 
                className="mt-2 text-xs opacity-50"
                style={{ 
                  color: currentTheme.colors.textSecondary,
                  fontSize: currentTheme.typography.sizes.xs 
                }}
              >
                {timestamp.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Message.displayName = 'Message'

export { Message, messageVariants }