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
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ className }) => {
  const { currentTheme, themeId, setTheme } = useTheme()

  return (
    <div 
      className={cn('flex items-center rounded-full p-1', className)}
      style={{ 
        backgroundColor: currentTheme.colors.surface,
        border: `1px solid ${currentTheme.colors.border}`,
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
              'relative flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200',
              'hover:bg-opacity-80 min-w-0 flex-shrink-0'
            )}
            style={{
              backgroundColor: isActive ? currentTheme.colors.primary : 'transparent',
              color: isActive ? currentTheme.colors.background : currentTheme.colors.textSecondary,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon 
              className="w-3 h-3 flex-shrink-0" 
              style={{ 
                color: isActive ? currentTheme.colors.background : '#9CA3AF' 
              }}
            />
            
            {/* Full label on larger screens */}
            <span className="hidden sm:inline">{mode.label}</span>
            
            {/* Short label on mobile */}
            <span className="sm:hidden">{mode.shortLabel}</span>
            
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