'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeId, Theme, themes, defaultTheme } from '@/lib/themes'

interface ThemeContextType {
  currentTheme: Theme
  themeId: ThemeId
  setTheme: (themeId: ThemeId) => void
  availableThemes: Record<ThemeId, Theme>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultThemeId?: ThemeId
}

export function ThemeProvider({ children, defaultThemeId = defaultTheme }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(defaultThemeId)
  const currentTheme = themes[themeId]

  const setTheme = (newThemeId: ThemeId) => {
    setThemeId(newThemeId)
    // Persist theme preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('vato-theme', newThemeId)
    }
  }

  // Load saved theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('vato-theme') as ThemeId
      if (savedTheme && themes[savedTheme]) {
        setThemeId(savedTheme)
      }
    }
  }, [])

  // Apply CSS custom properties for dynamic theming
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      
      // Apply colors
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value)
      })

      // Apply typography
      root.style.setProperty('--font-family', currentTheme.typography.fontFamily)
      root.style.setProperty('--font-family-code', currentTheme.typography.codeFontFamily)
      Object.entries(currentTheme.typography.sizes).forEach(([key, value]) => {
        root.style.setProperty(`--font-size-${key}`, value)
      })

      // Apply spacing - including systematic scale and layout-specific values
      Object.entries(currentTheme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value)
      })
      
      // Apply layout-specific CSS custom properties for responsive design
      root.style.setProperty('--header-height', currentTheme.spacing.headerHeight)
      root.style.setProperty('--bottom-nav-height', currentTheme.spacing.bottomNavHeight)

      // Apply effects
      Object.entries(currentTheme.effects).forEach(([key, value]) => {
        root.style.setProperty(`--effect-${key}`, value)
      })

      // Update body background
      document.body.style.backgroundColor = currentTheme.colors.background
      document.body.style.color = currentTheme.colors.text
      document.body.style.fontFamily = currentTheme.typography.fontFamily
    }
  }, [currentTheme])

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        setTheme,
        availableThemes: themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}