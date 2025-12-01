'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'
import { ChevronUp } from 'lucide-react'

interface NavToggleIndicatorProps {
  isVisible: boolean
  onToggle: () => void
  className?: string
}

export const NavToggleIndicator: React.FC<NavToggleIndicatorProps> = ({
  isVisible,
  onToggle,
  className
}) => {
  const { currentTheme } = useTheme()
  
  if (isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 ${className}`}
      style={{
        // Ensure space from screen bottom with safe area
        marginBottom: `calc(env(safe-area-inset-bottom) + ${currentTheme.spacing.sm})`,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          width: '48px',
          height: '32px',
          backgroundColor: currentTheme.colors.glassBackground,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid ${currentTheme.colors.glassBorder}`,
          borderRadius: '16px',
          boxShadow: currentTheme.effects.shadowLarge,
        }}
        aria-label="Show navigation"
        title="Tap to show navigation"
      >
        <ChevronUp 
          className="w-4 h-4 transition-transform duration-200"
          style={{ color: currentTheme.colors.textSecondary }}
        />
      </button>
      
      {/* Tap Area Extension (invisible but interactive) */}
      <div
        className="absolute inset-x-0 cursor-pointer"
        style={{
          bottom: '-16px',
          height: '48px', // Extended tap area
          minWidth: '120px', // Wide enough for easy tapping
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        onClick={onToggle}
        aria-hidden="true"
      />
    </motion.div>
  )
}