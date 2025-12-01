'use client'

import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

export interface UseAutoHideNavProps {
  autoHideDelay?: number
  showDelay?: number
  enabledOnPaths?: string[]
}

export function useAutoHideNav({
  autoHideDelay = 2000,
  showDelay = 5000,  // 5 seconds after manual toggle
  enabledOnPaths = ['/flow']
}: UseAutoHideNavProps = {}) {
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
      // Reset transition state after animation completes
      setTimeout(() => setIsTransitioning(false), 300)
    }, delay)
  }
  
  // Auto-hide timer - initial load and after manual actions
  useEffect(() => {
    if (!isAutoHideEnabled || !isNavVisible) return
    
    // Use longer delay if manually toggled
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
    setWasManuallyToggled(false)  // Always false when hiding
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isAutoHideEnabled])
  
  // Toggle navigation
  const toggleNav = useCallback(() => {
    if (isNavVisible) {
      hideNav(true)  // Manual hide
    } else {
      showNav(true)  // Manual show - will stay visible for 5 seconds
    }
  }, [isNavVisible, showNav, hideNav])
  
  // Reset to visible when leaving enabled paths
  useEffect(() => {
    if (!isAutoHideEnabled && !isNavVisible) {
      setIsNavVisible(true)
    }
  }, [isAutoHideEnabled, isNavVisible])
  
  return {
    isNavVisible,
    isTransitioning,
    isAutoHideEnabled,
    showNav,
    hideNav,
    toggleNav,
  }
}