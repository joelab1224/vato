// Example component demonstrating the new VATO color system
// Following vato-unified-design-system-light.html guidelines

import React from 'react'
import { useTheme } from '@/contexts/theme-context'
import { createGlassStyle, getThemeColor } from './themes'

export const ColorSystemDemo: React.FC = () => {
  const { currentTheme } = useTheme()

  return (
    <div 
      className="p-6 space-y-6"
      style={{ 
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text 
      }}
    >
      {/* Primary Brand Colors */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Primary Brand Colors</h2>
        <div className="grid grid-cols-3 gap-4">
          
          {/* Primary Button */}
          <button
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: currentTheme.colors.textInverse,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.primaryHover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.primary
            }}
          >
            Primary Action
          </button>

          {/* Secondary Button */}
          <button
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{
              backgroundColor: currentTheme.colors.secondary,
              color: currentTheme.colors.textInverse,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.secondaryHover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.secondary
            }}
          >
            Secondary Action
          </button>

          {/* Accent Button */}
          <button
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{
              backgroundColor: currentTheme.colors.accent,
              color: currentTheme.colors.textInverse,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.accentHover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.accent
            }}
          >
            Accent Action
          </button>
        </div>
      </section>

      {/* Glass Morphism Effects */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Glass Morphism Effects</h2>
        <div className="grid grid-cols-2 gap-4">
          
          {/* Default Glass Card */}
          <div 
            className="p-4 rounded-xl"
            style={createGlassStyle(currentTheme, 'default')}
          >
            <h3 className="font-medium mb-2">Default Glass</h3>
            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Neutral glassmorphism effect
            </p>
          </div>

          {/* Violet Glass Card */}
          <div 
            className="p-4 rounded-xl"
            style={createGlassStyle(currentTheme, 'violet')}
          >
            <h3 className="font-medium mb-2" style={{ color: currentTheme.colors.primary }}>
              Violet Glass
            </h3>
            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Primary brand tinted glass
            </p>
          </div>

          {/* Purple Glass Card */}
          <div 
            className="p-4 rounded-xl"
            style={createGlassStyle(currentTheme, 'purple')}
          >
            <h3 className="font-medium mb-2" style={{ color: currentTheme.colors.secondary }}>
              Purple Glass
            </h3>
            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Secondary brand tinted glass
            </p>
          </div>

          {/* Pink Glass Card */}
          <div 
            className="p-4 rounded-xl"
            style={createGlassStyle(currentTheme, 'pink')}
          >
            <h3 className="font-medium mb-2" style={{ color: currentTheme.colors.accent }}>
              Pink Glass
            </h3>
            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Accent tinted glass
            </p>
          </div>
        </div>
      </section>

      {/* Message Examples */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Message Colors</h2>
        <div className="space-y-3">
          
          {/* User Message */}
          <div 
            className="max-w-xs ml-auto px-4 py-3 rounded-2xl"
            style={{
              backgroundColor: currentTheme.colors.userMessage,
              color: currentTheme.colors.textInverse,
            }}
          >
            <p>This is a user message with proper contrast</p>
          </div>

          {/* Assistant Message */}
          <div 
            className="max-w-xs mr-auto px-4 py-3 rounded-2xl"
            style={{
              backgroundColor: currentTheme.colors.assistantMessage,
              color: currentTheme.colors.text,
              border: `1px solid ${currentTheme.colors.border}`,
            }}
          >
            <p>This is an assistant message with citations 
              <span 
                className="inline-flex items-center justify-center w-5 h-5 mx-1 text-xs rounded"
                style={{
                  backgroundColor: currentTheme.colors.citation,
                  color: currentTheme.colors.textInverse,
                }}
              >
                1
              </span>
              embedded inline.
            </p>
          </div>
        </div>
      </section>

      {/* Status Colors */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Status Indicators</h2>
        <div className="grid grid-cols-4 gap-3">
          
          <div 
            className="p-3 rounded-lg text-center"
            style={{ 
              backgroundColor: currentTheme.colors.error + '20',  // 20% opacity
              color: currentTheme.colors.error,
              border: `1px solid ${currentTheme.colors.error}40` // 40% opacity
            }}
          >
            Error
          </div>
          
          <div 
            className="p-3 rounded-lg text-center"
            style={{ 
              backgroundColor: currentTheme.colors.warning + '20',
              color: currentTheme.colors.warning,
              border: `1px solid ${currentTheme.colors.warning}40`
            }}
          >
            Warning
          </div>
          
          <div 
            className="p-3 rounded-lg text-center"
            style={{ 
              backgroundColor: currentTheme.colors.success + '20',
              color: currentTheme.colors.success,
              border: `1px solid ${currentTheme.colors.success}40`
            }}
          >
            Success
          </div>
          
          <div 
            className="p-3 rounded-lg text-center"
            style={{ 
              backgroundColor: currentTheme.colors.info + '20',
              color: currentTheme.colors.info,
              border: `1px solid ${currentTheme.colors.info}40`
            }}
          >
            Info
          </div>
        </div>
      </section>

      {/* Text Hierarchy */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Text Hierarchy</h2>
        <div className="space-y-2">
          <p style={{ color: currentTheme.colors.text, fontSize: '1.125rem', fontWeight: 600 }}>
            Primary text - High contrast, main content
          </p>
          <p style={{ color: currentTheme.colors.textSecondary, fontSize: '1rem' }}>
            Secondary text - Medium contrast, supporting content
          </p>
          <p style={{ color: currentTheme.colors.textTertiary, fontSize: '0.875rem' }}>
            Tertiary text - Lower contrast, metadata and captions
          </p>
        </div>
      </section>

      {/* Color Utility Demo */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Using Color Utilities</h2>
        <div className="space-y-2 font-mono text-sm">
          <p>Primary: <span style={{ color: getThemeColor(currentTheme, 'primary') }}>
            {getThemeColor(currentTheme, 'primary')}
          </span></p>
          <p>Secondary: <span style={{ color: getThemeColor(currentTheme, 'secondary') }}>
            {getThemeColor(currentTheme, 'secondary')}
          </span></p>
          <p>Accent: <span style={{ color: getThemeColor(currentTheme, 'accent') }}>
            {getThemeColor(currentTheme, 'accent')}
          </span></p>
        </div>
      </section>
    </div>
  )
}

/* 
Usage in components:

// Basic color access
const buttonStyle = {
  backgroundColor: currentTheme.colors.primary,
  color: currentTheme.colors.textInverse,
}

// Hover states
const buttonHoverStyle = {
  backgroundColor: currentTheme.colors.primaryHover,
}

// Glass morphism
const cardStyle = createGlassStyle(currentTheme, 'violet')

// Utility function
const primaryColor = getThemeColor(currentTheme, 'primary')

// Status indicators
const errorStyle = {
  color: currentTheme.colors.error,
  backgroundColor: currentTheme.colors.error + '10', // 10% opacity
}
*/