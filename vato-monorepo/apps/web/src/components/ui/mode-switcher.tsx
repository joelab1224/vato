import * as React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'
import { ThemeId } from '@/lib/themes'
import { Heart, Lightbulb, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModeOption {
  id: ThemeId
  label: string
  shortLabel: string
  icon: React.ComponentType<{ className?: string }>
}

const modeOptions: ModeOption[] = [
  {
    id: 'warm',
    label: 'Emotional',
    shortLabel: 'Emo',
    icon: Heart,
  },
  {
    id: 'clean', 
    label: 'Creative',
    shortLabel: 'Cre',
    icon: Lightbulb,
  },
  {
    id: 'dark',
    label: 'Research',
    shortLabel: 'Res',
    icon: Search,
  },
]

export interface ModeSwitcherProps {
  className?: string
  /** Whether to force compact mode (icons only) */
  compact?: boolean
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ className, compact = false }) => {
  const { currentTheme, themeId, setTheme } = useTheme()

  return (
    <div 
      className={cn(
        'flex items-center rounded-full transition-all duration-200',
        // Mobile: compact with minimal padding
        'p-1 gap-1',
        // Tablet and up: more spacious
        'sm:p-1.5 sm:gap-0',
        // Ensure proper scaling
        'scale-100 hover:scale-[1.01]',
        className
      )}
      style={{ 
        backgroundColor: 'rgba(232, 228, 220, 0.25)',
        border: `1px solid rgba(255, 255, 255, 0.4)`,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      }}
    >
      {modeOptions.map((mode) => {
        const isActive = themeId === mode.id
        const Icon = mode.icon
        
        return (
          <motion.button
            key={mode.id}
            onClick={() => setTheme(mode.id)}
            className={cn(
              'relative flex items-center justify-center rounded-full transition-all duration-200',
              'text-xs font-medium min-w-0 flex-shrink-0',
              // Mobile: icon-only with 44px touch target  
              'w-10 h-10 p-0',
              // Tablet and up: add padding and gap for labels (unless compact)
              compact 
                ? 'sm:w-10 sm:h-10 sm:p-0' 
                : 'sm:w-auto sm:h-auto sm:px-3 sm:py-2 sm:gap-1.5',
              // Hover states - only for inactive buttons
              !isActive && 'hover:bg-black/5 hover:scale-[1.02]',
              // Focus states for accessibility
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              // Active button gets subtle glow
              isActive && 'ring-1 ring-black/10'
            )}
            style={{
              backgroundColor: isActive ? currentTheme.colors.primary : 'transparent',
              color: isActive ? currentTheme.colors.textInverse : currentTheme.colors.textSecondary,
              boxShadow: isActive ? currentTheme.effects.shadow : 'none',
              '--tw-ring-color': currentTheme.colors.primary,
            } as React.CSSProperties}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // Accessibility
            aria-label={`Switch to ${mode.label} mode`}
            title={mode.label}
          >
            <Icon 
              className={cn(
                'flex-shrink-0 transition-colors duration-200',
                // Mobile: larger icon for better touch target
                'w-4 h-4',
                // Desktop: smaller icon with text
                'sm:w-3.5 sm:h-3.5'
              )}
              style={{ 
                color: isActive ? currentTheme.colors.textInverse : currentTheme.colors.textSecondary
              }}
            />
            
            {/* Labels only on larger screens (unless compact mode) */}
            {!compact && (
              <span 
                className="hidden sm:inline whitespace-nowrap"
                style={{ 
                  color: isActive ? currentTheme.colors.textInverse : currentTheme.colors.textSecondary
                }}
              >
                {mode.label}
              </span>
            )}
            
            {/* Active indicator background */}
            {isActive && (
              <motion.div
                layoutId="mode-indicator"
                className="absolute inset-0 rounded-full -z-10"
                style={{ backgroundColor: currentTheme.colors.primary }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}