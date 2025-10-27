'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { themes, type ThemeId } from '@/lib/themes'

interface AnimatedThemePreviewProps {
  themeId: ThemeId
  title: string
  description: string
  className?: string
}

export const AnimatedThemePreview: React.FC<AnimatedThemePreviewProps> = ({ 
  themeId, 
  title, 
  description, 
  className 
}) => {
  const theme = themes[themeId]
  
  // Mini version of each animated background for preview
  const renderMiniBackground = () => {
    if (themeId === 'clean') {
      return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Mini floating particles */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -15, -30, -45],
                opacity: [0, 0.6, 0.8, 0],
                rotate: [0, 45, 90, 135],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear",
              }}
            />
          ))}
          {/* Mini grid */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ['0px 0px', '20px 20px'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(37, 99, 235, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(37, 99, 235, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        </div>
      )
    }
    
    if (themeId === 'warm') {
      return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Mini floating blobs */}
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-lg"
              style={{
                left: `${10 + i * 25}%`,
                top: `${20 + (i % 2) * 50}%`,
                width: 30 + i * 5,
                height: 30 + i * 5,
                background: i % 2 === 0 ? 'rgba(139, 92, 246, 0.15)' : 'rgba(251, 146, 60, 0.12)',
              }}
              animate={{
                x: [0, Math.sin(i) * 10, Math.cos(i) * 8, 0],
                y: [0, Math.cos(i) * 8, Math.sin(i) * 10, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )
    }
    
    if (themeId === 'dark') {
      return (
        <div className="absolute inset-0 overflow-hidden">
          {/* Mini grid lines */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                style={{
                  left: `${25 * (i + 1)}%`,
                }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Mini glowing particles */}
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${15 + i * 20}%`,
                top: `${25 + (i % 2) * 45}%`,
                backgroundColor: i % 2 === 0 ? 'rgba(96, 165, 250, 0.8)' : 'rgba(34, 211, 238, 0.6)',
                boxShadow: `0 0 ${4}px ${i % 2 === 0 ? 'rgba(96, 165, 250, 0.8)' : 'rgba(34, 211, 238, 0.6)'}`,
              }}
              animate={{
                opacity: [0, 1, 0.5, 1, 0],
                scale: [0, 1, 1.2, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Mini scanning line */}
          <motion.div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            animate={{
              top: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )
    }
    
    return null
  }
  
  return (
    <div 
      className={`rounded-lg border overflow-hidden relative ${className}`}
      style={{ 
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Animated background */}
      {renderMiniBackground()}
      
      {/* Content overlay */}
      <div className="relative z-10">
        {/* Mini header */}
        <div 
          className="px-4 py-3 border-b flex items-center justify-between"
          style={{ 
            backgroundColor: theme.colors.surface + '90',
            borderBottomColor: theme.colors.border,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <span 
              className="text-sm font-medium"
              style={{ 
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {title}
            </span>
          </div>
          <div 
            className="text-xs px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: theme.colors.primary + '15',
              color: theme.colors.primary,
            }}
          >
            Research
          </div>
        </div>

        {/* Sample messages with backdrop blur for readability */}
        <div 
          className="p-4 space-y-4"
          style={{ 
            backgroundColor: theme.colors.background + '85',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* User message */}
          <div className="flex justify-end">
            <div 
              className="max-w-[70%] px-3 py-2 text-sm"
              style={{
                backgroundColor: theme.colors.userMessage,
                color: theme.colors.background,
                borderRadius: theme.spacing.borderRadius,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              Analyze the latest research on transformer architectures
            </div>
          </div>

          {/* Assistant message */}
          <div className="flex">
            <div 
              className="max-w-[85%] px-3 py-2 text-sm leading-relaxed"
              style={{
                backgroundColor: theme.colors.assistantMessage,
                color: theme.colors.text,
                borderRadius: theme.spacing.borderRadius,
                border: `1px solid ${theme.colors.border}`,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              Based on recent advances [1], transformer architectures are evolving rapidly with mixture-of-experts integration [2]...
              
              {/* Citations */}
              <div className="flex gap-1 mt-2">
                {[1, 2].map((num) => (
                  <span
                    key={num}
                    className="inline-flex items-center justify-center w-5 h-5 text-xs rounded-sm"
                    style={{
                      backgroundColor: theme.colors.citation,
                      color: theme.colors.background,
                    }}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sample input with backdrop blur */}
        <div 
          className="p-3 border-t"
          style={{ 
            backgroundColor: theme.colors.surface + '90',
            borderTopColor: theme.colors.border,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div 
            className="flex items-center gap-2 px-3 py-2 text-sm rounded border"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              color: theme.colors.textSecondary,
              fontFamily: theme.typography.fontFamily,
              borderRadius: theme.spacing.borderRadius,
            }}
          >
            Type your message...
            <div className="ml-auto">
              <div 
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <span className="text-xs text-white">→</span>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="px-4 py-2 text-center text-xs"
          style={{ 
            color: theme.colors.textSecondary,
            backgroundColor: theme.colors.surface + '90',
            backdropFilter: 'blur(8px)',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  )
}