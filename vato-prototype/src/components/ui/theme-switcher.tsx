import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'
import { ThemeId } from '@/lib/themes'
import { Button } from './button'
import { Palette, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeOption {
  id: ThemeId
  name: string
  description: string
  preview: {
    primary: string
    secondary: string
    background: string
  }
}

const themeOptions: ThemeOption[] = [
  {
    id: 'clean',
    name: 'Clean Intelligence',
    description: 'Professional, precise, trustworthy',
    preview: {
      primary: '#2563EB',
      secondary: '#64748B',
      background: '#FFFFFF',
    },
  },
  {
    id: 'warm',
    name: 'Warm Companion',
    description: 'Friendly, approachable, comfortable',
    preview: {
      primary: '#8B5CF6',
      secondary: '#FB923C',
      background: '#FAFAF9',
    },
  },
  {
    id: 'dark',
    name: 'Dark Intelligence',
    description: 'Technical, powerful, focused',
    preview: {
      primary: '#60A5FA',
      secondary: '#A78BFA',
      background: '#0A0A0A',
    },
  },
]

export interface ThemeSwitcherProps {
  variant?: 'dropdown' | 'tabs' | 'cards'
  className?: string
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  variant = 'dropdown', 
  className 
}) => {
  const { currentTheme, themeId, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  if (variant === 'tabs') {
    return (
      <div className={cn('flex rounded-lg border overflow-hidden', className)}>
        {themeOptions.map((option) => (
          <Button
            key={option.id}
            variant={themeId === option.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTheme(option.id)}
            className="rounded-none border-0 relative overflow-hidden"
            style={{
              borderColor: currentTheme.colors.border,
            }}
          >
            {option.name}
            {themeId === option.id && (
              <motion.div
                layoutId="theme-tab-indicator"
                className="absolute inset-0 -z-10"
                style={{ backgroundColor: currentTheme.colors.primary }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Button>
        ))}
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div className={cn('grid gap-3', className)} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {themeOptions.map((option) => {
          const isSelected = themeId === option.id
          return (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
                isSelected && 'ring-2 ring-offset-2'
              )}
              style={{
                backgroundColor: option.preview.background,
                borderColor: isSelected ? option.preview.primary : currentTheme.colors.border,
                color: option.preview.background === '#0A0A0A' ? '#FFFFFF' : '#000000',
                '--tw-ring-color': option.preview.primary,
              } as React.CSSProperties}
              onClick={() => setTheme(option.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: option.preview.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: option.preview.secondary }}
                  />
                </div>
                {isSelected && <Check className="w-4 h-4" style={{ color: option.preview.primary }} />}
              </div>
              
              <h3 className="font-medium mb-1" style={{ fontSize: currentTheme.typography.sizes.sm }}>
                {option.name}
              </h3>
              
              <p className="text-xs opacity-75">
                {option.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Default dropdown variant
  return (
    <div className={cn('relative', className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Palette className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 z-50 min-w-[280px] overflow-hidden rounded-lg border shadow-lg"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border,
                boxShadow: currentTheme.effects.shadowLarge,
              }}
            >
              <div className="p-2">
                <div 
                  className="px-3 py-2 text-sm font-medium"
                  style={{ color: currentTheme.colors.text }}
                >
                  Choose Theme
                </div>
                
                {themeOptions.map((option) => {
                  const isSelected = themeId === option.id
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ backgroundColor: currentTheme.colors.background }}
                      onClick={() => {
                        setTheme(option.id)
                        setIsOpen(false)
                      }}
                      className="w-full px-3 py-3 text-left rounded-md transition-colors duration-150 flex items-center gap-3"
                    >
                      {/* Theme preview circles */}
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: option.preview.primary }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: option.preview.secondary }}
                        />
                      </div>

                      <div className="flex-1">
                        <div 
                          className="font-medium text-sm"
                          style={{ color: currentTheme.colors.text }}
                        >
                          {option.name}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: currentTheme.colors.textSecondary }}
                        >
                          {option.description}
                        </div>
                      </div>

                      {isSelected && (
                        <Check 
                          className="w-4 h-4" 
                          style={{ color: currentTheme.colors.primary }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}