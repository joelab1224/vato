import * as React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'
import { ThemeId } from '@/lib/themes'
import { Heart, Lightbulb, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

// Professional gray colors (fixed across all themes)
const professionalGray = {
  50: '#f9fafb',
  100: '#f3f4f6', 
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
}

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
        // Ensure proper scaling
        'scale-100 hover:scale-[1.01]',
        className
      )}
      style={{ 
        backgroundColor: currentTheme.colors.glassBackground,
        border: `1px solid ${currentTheme.colors.glassBorder}`,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: currentTheme.effects.shadowLarge,
        borderRadius: currentTheme.spacing.borderRadiusLarge,
        // Theme-based spacing - mobile: compact, desktop: spacious
        padding: currentTheme.spacing.xs,
        gap: currentTheme.spacing.xs,
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
              // Hover states - only for inactive buttons
              !isActive && 'hover:bg-black/5 hover:scale-[1.02]',
              // Focus states for accessibility
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              // Active button gets subtle glow
              isActive && 'ring-1 ring-black/10'
            )}
            style={{
              // Ensure 44px minimum touch target for mobile accessibility
              minWidth: '44px',
              minHeight: '44px',
              // Theme-based padding
              paddingLeft: compact ? '0' : currentTheme.spacing.md,
              paddingRight: compact ? '0' : currentTheme.spacing.md,
              paddingTop: currentTheme.spacing.sm,
              paddingBottom: currentTheme.spacing.sm,
              gap: compact ? '0' : currentTheme.spacing.xs,
              // Professional gray colors (fixed across themes)
              backgroundColor: isActive ? professionalGray[700] : 'transparent',
              color: isActive ? '#ffffff' : professionalGray[600],
              boxShadow: isActive ? currentTheme.effects.shadow : 'none',
              '--tw-ring-color': professionalGray[700],
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
                color: isActive ? '#ffffff' : professionalGray[600]
              }}
            />
            
            {/* Labels only on larger screens (unless compact mode) */}
            {!compact && (
              <span 
                className="hidden sm:inline whitespace-nowrap"
                style={{ 
                  color: isActive ? '#ffffff' : professionalGray[600]
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
                style={{ backgroundColor: professionalGray[700] }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}