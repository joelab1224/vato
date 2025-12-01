'use client'

import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface AutoHideNavContextType {
  isNavVisible: boolean
  isTransitioning: boolean
  isAutoHideEnabled: boolean
  showNav: (manual?: boolean) => void
  hideNav: (manual?: boolean) => void
  toggleNav: () => void
}

const AutoHideNavContext = React.createContext<AutoHideNavContextType | null>(null)

interface AutoHideNavProviderProps {
  children: React.ReactNode
  autoHideDelay?: number
  showDelay?: number
  enabledOnPaths?: string[]
}

export function AutoHideNavProvider({
  children,
  autoHideDelay = 2000,
  showDelay = 5000,
  enabledOnPaths = ['/flow']
}: AutoHideNavProviderProps) {
  const pathname = usePathname()
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [wasManuallyToggled, setWasManuallyToggled] = useState(false)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  
  // Check if auto-hide is enabled for current path
  const isAutoHideEnabled = enabledOnPaths.includes(pathname)
  
  // Clear existing timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }
  
  // Start auto-hide timer
  const startAutoHideTimer = (delay: number = autoHideDelay) => {
    if (!isAutoHideEnabled) return
    
    clearTimer()
    timerRef.current = setTimeout(() => {
      setIsTransitioning(true)
      setIsNavVisible(false)
      setWasManuallyToggled(false)
      setTimeout(() => setIsTransitioning(false), 300)
    }, delay)
  }
  
  // Auto-hide timer - initial load and after manual actions
  useEffect(() => {
    if (!isAutoHideEnabled || !isNavVisible) return
    
    const delay = wasManuallyToggled ? showDelay : autoHideDelay
    startAutoHideTimer(delay)
    
    return clearTimer
  }, [isAutoHideEnabled, isNavVisible, wasManuallyToggled, autoHideDelay, showDelay])
  
  // Show navigation
  const showNav = useCallback((manual: boolean = false) => {
    if (!isAutoHideEnabled) return
    clearTimer()
    setIsTransitioning(true)
    setIsNavVisible(true)
    setWasManuallyToggled(manual)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isAutoHideEnabled])
  
  // Hide navigation  
  const hideNav = useCallback((manual: boolean = false) => {
    if (!isAutoHideEnabled) return
    clearTimer()
    setIsTransitioning(true)
    setIsNavVisible(false)
    setWasManuallyToggled(false)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isAutoHideEnabled])
  
  // Toggle navigation
  const toggleNav = useCallback(() => {
    if (isNavVisible) {
      hideNav(true)
    } else {
      showNav(true)
    }
  }, [isNavVisible, showNav, hideNav])
  
  // Reset to visible when leaving enabled paths
  useEffect(() => {
    if (!isAutoHideEnabled && !isNavVisible) {
      setIsNavVisible(true)
    }
  }, [isAutoHideEnabled, isNavVisible])
  
  return (
    <AutoHideNavContext.Provider value={{
      isNavVisible,
      isTransitioning,
      isAutoHideEnabled,
      showNav,
      hideNav,
      toggleNav,
    }}>
      {children}
    </AutoHideNavContext.Provider>
  )
}

export function useAutoHideNav() {
  const context = React.useContext(AutoHideNavContext)
  if (!context) {
    throw new Error('useAutoHideNav must be used within an AutoHideNavProvider')
  }
  return context
}