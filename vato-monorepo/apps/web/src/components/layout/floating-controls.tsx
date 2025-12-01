'use client'

import * as React from 'react'
import { useTheme } from '@/contexts/theme-context'
import { useAutoHideNav } from '@/hooks/use-auto-hide-nav'
import { ChatInput } from '@/components/ui/input'

interface FloatingControlsProps {
  onSendMessage?: (message: string) => void
  onFileUpload?: () => void
  isLoading?: boolean
  isNavVisible?: boolean
  isAutoHideEnabled?: boolean
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onSendMessage,
  onFileUpload,
  isLoading = false,
  isNavVisible = true,
  isAutoHideEnabled = false,
}) => {
  const { currentTheme } = useTheme()
  
  // Simple bottom calculation
  const bottomValue = isAutoHideEnabled && isNavVisible ? '120px' : '24px'

  return (
    <div 
      className="fixed inset-x-0 z-10 pointer-events-none"
      style={{
        top: '80px',
        bottom: bottomValue,
        transition: 'bottom 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Bottom floating controls - ChatInput only */}
      <div 
        className="absolute left-0 right-0 pointer-events-auto"
        style={{
          bottom: currentTheme.spacing.floatingOffset,
          paddingLeft: currentTheme.spacing.lg,
          paddingRight: currentTheme.spacing.lg,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSend={onSendMessage}
            onFileAttach={onFileUpload}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}