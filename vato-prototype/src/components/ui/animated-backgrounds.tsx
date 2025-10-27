'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Clean Intelligence - Bold geometric depth layers
export const CleanBackground: React.FC = () => {
  // Large geometric shapes with depth
  const geometricLayers = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: 150 + i * 80,
    opacity: 0.08 - i * 0.01,
    delay: i * 2,
    duration: 20 + i * 5,
  }))

  // Floating particles with trails
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    initialX: Math.random() * 100,
    initialY: 100 + Math.random() * 20,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 8,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Bold gradient foundation */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 60%, rgba(16, 185, 129, 0.12) 0%, transparent 50%),
            linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(100, 116, 139, 0.05) 100%)
          `
        }}
      />
      
      {/* Large geometric depth layers */}
      {geometricLayers.map((layer, i) => (
        <motion.div
          key={`layer-${layer.id}`}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
            width: layer.size,
            height: layer.size,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            delay: layer.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full border-2 backdrop-blur-sm"
            style={{
              borderColor: `rgba(37, 99, 235, ${layer.opacity})`,
              background: `rgba(37, 99, 235, ${layer.opacity * 0.3})`,
              transform: 'rotate(45deg)',
              borderRadius: '20%',
            }}
          />
        </motion.div>
      ))}

      {/* Enhanced floating particles with trails */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute"
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -800],
            x: [
              0, 
              Math.sin(particle.id * 0.5) * 60, 
              Math.cos(particle.id * 0.3) * 40, 
              Math.sin(particle.id * 0.8) * 80
            ],
            opacity: [0, 0.8, 1, 0.6, 0],
            rotate: [0, 180, 360],
            scale: [0.5, 1.2, 1, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        >
          <div
            className="rounded backdrop-blur-md"
            style={{
              width: particle.size,
              height: particle.size,
              background: `linear-gradient(45deg, 
                rgba(37, 99, 235, 0.6), 
                rgba(16, 185, 129, 0.4))`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(37, 99, 235, 0.3)`,
            }}
          />
        </motion.div>
      ))}

      {/* Dynamic grid with depth */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px', '0px 0px'],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

// Warm Companion - Bold organic waves with vibrant depth
export const WarmBackground: React.FC = () => {
  // Large flowing organic shapes
  const organicWaves = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: 300 + i * 120,
    opacity: 0.15 - i * 0.02,
    delay: i * 3,
    duration: 25 + i * 5,
    color: i % 3 === 0 ? 'rgba(139, 92, 246, OPACITY)' : 
           i % 3 === 1 ? 'rgba(251, 146, 60, OPACITY)' : 
           'rgba(20, 184, 166, OPACITY)',
  }))

  // Floating energy particles
  const energyParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Rich gradient foundation */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 25% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 60%), 
            radial-gradient(ellipse 80% 60% at 75% 70%, rgba(251, 146, 60, 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 60% 80% at 50% 90%, rgba(20, 184, 166, 0.15) 0%, transparent 55%),
            linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(251, 146, 60, 0.06) 100%)
          `
        }}
      />

      {/* Large flowing organic waves */}
      {organicWaves.map((wave, i) => (
        <motion.div
          key={`wave-${wave.id}`}
          className="absolute"
          style={{
            left: `${-10 + i * 20}%`,
            top: `${-10 + i * 15}%`,
            width: wave.size,
            height: wave.size * 0.8,
          }}
          animate={{
            x: [
              0, 
              Math.sin(i * 0.3) * 100, 
              Math.cos(i * 0.4) * 120, 
              Math.sin(i * 0.6) * 80,
              0
            ],
            y: [
              0, 
              Math.cos(i * 0.2) * 60, 
              Math.sin(i * 0.5) * 90, 
              Math.cos(i * 0.7) * 50,
              0
            ],
            scale: [0.8, 1.3, 1.1, 1.4, 0.8],
            rotate: [0, 15, -10, 20, 0],
          }}
          transition={{
            duration: wave.duration,
            repeat: Infinity,
            delay: wave.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-full blur-2xl"
            style={{
              background: `radial-gradient(ellipse, 
                ${wave.color.replace('OPACITY', wave.opacity.toString())} 0%, 
                ${wave.color.replace('OPACITY', (wave.opacity * 0.3).toString())} 70%, 
                transparent 100%)`,
            }}
          />
        </motion.div>
      ))}

      {/* Floating energy particles with trails */}
      {energyParticles.map((particle) => (
        <motion.div
          key={`energy-${particle.id}`}
          className="absolute"
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            x: [
              0, 
              Math.sin(particle.id * 0.4) * 150,
              Math.cos(particle.id * 0.6) * 100,
              Math.sin(particle.id * 0.8) * 200,
              0
            ],
            y: [
              0,
              Math.cos(particle.id * 0.3) * 120,
              Math.sin(particle.id * 0.5) * 80,
              Math.cos(particle.id * 0.7) * 160,
              0
            ],
            scale: [0.3, 1.5, 1.0, 1.8, 0.3],
            opacity: [0, 0.9, 0.7, 1, 0],
            rotate: [0, 180, 90, 270, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="rounded-full blur-sm"
            style={{
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, 
                rgba(251, 146, 60, 0.8) 0%, 
                rgba(139, 92, 246, 0.6) 40%,
                rgba(20, 184, 166, 0.4) 100%)`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(251, 146, 60, 0.4)`,
            }}
          />
        </motion.div>
      ))}

      {/* Dynamic breathing effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.1, 0.3, 0.15, 0.35, 0.1],
          scale: [1, 1.05, 1.02, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 50%, 
            rgba(139, 92, 246, 0.08) 0%, 
            rgba(251, 146, 60, 0.06) 30%,
            rgba(20, 184, 166, 0.04) 60%,
            transparent 100%)`
        }}
      />
    </div>
  )
}

// Dark Intelligence - Bold cyberpunk matrix with intense depth
export const DarkBackground: React.FC = () => {
  // Massive circuit board elements
  const circuitElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: 200 + i * 100,
    opacity: 0.15 - i * 0.015, // More transparent
    delay: i * 3, // Slower start delays
    duration: 25 + i * 8, // Much slower durations
  }))

  // High-energy data streams
  const dataStreams = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    width: Math.random() * 3 + 1,
    delay: Math.random() * 8, // Slower, more spread delays
    duration: 6 + Math.random() * 4, // Slower streams
    isVertical: i % 2 === 0,
  }))

  // Powerful energy cores
  const energyCores = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 8,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 10, // More staggered timing
    duration: 12 + Math.random() * 8, // Much slower cores
    color: i % 3 === 0 ? 'rgba(96, 165, 250, 0.6)' : // More transparent
           i % 3 === 1 ? 'rgba(34, 211, 238, 0.5)' : 
           'rgba(167, 139, 250, 0.4)',
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Intense cyberpunk foundation */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 25% 20%, rgba(96, 165, 250, 0.12) 0%, transparent 70%),
            radial-gradient(ellipse 70% 50% at 80% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 65%),
            radial-gradient(ellipse 50% 70% at 50% 50%, rgba(167, 139, 250, 0.08) 0%, transparent 80%),
            linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%)
          `
        }}
      />

      {/* Large circuit board elements */}
      {circuitElements.map((circuit, i) => (
        <motion.div
          key={`circuit-${circuit.id}`}
          className="absolute border opacity-10"
          style={{
            left: `${-5 + i * 12}%`,
            top: `${-5 + i * 10}%`,
            width: circuit.size,
            height: circuit.size,
            borderColor: `rgba(96, 165, 250, ${circuit.opacity})`,
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [0.9, 1.2, 1.0, 1.3, 0.9],
            x: [0, 30, -20, 40, 0],
            y: [0, -25, 35, -15, 0],
          }}
          transition={{
            duration: circuit.duration,
            repeat: Infinity,
            delay: circuit.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(from 0deg, 
                transparent 0deg, 
                rgba(96, 165, 250, ${circuit.opacity * 0.3}) 90deg,
                transparent 180deg,
                rgba(34, 211, 238, ${circuit.opacity * 0.2}) 270deg,
                transparent 360deg)`,
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
            }}
          />
        </motion.div>
      ))}

      {/* Intense data stream matrix */}
      <div className="absolute inset-0">
        {dataStreams.map((stream, i) => (
          <motion.div
            key={`stream-${stream.id}`}
            className="absolute bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{
              [stream.isVertical ? 'left' : 'top']: `${(i * 8.33) % 100}%`,
              [stream.isVertical ? 'width' : 'height']: `${stream.width}px`,
              [stream.isVertical ? 'height' : 'width']: '100%',
            }}
            animate={{
              opacity: [0, 0.8, 1, 0.6, 0],
              [stream.isVertical ? 'scaleY' : 'scaleX']: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: stream.duration,
              repeat: Infinity,
              delay: stream.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Powerful energy cores */}
      {energyCores.map((core) => (
        <motion.div
          key={`core-${core.id}`}
          className="absolute"
          style={{
            left: `${core.initialX}%`,
            top: `${core.initialY}%`,
          }}
          animate={{
            x: [
              0, 
              Math.sin(core.id * 0.7) * 200,
              Math.cos(core.id * 0.5) * 150,
              Math.sin(core.id * 0.9) * 250,
              0
            ],
            y: [
              0,
              Math.cos(core.id * 0.4) * 180,
              Math.sin(core.id * 0.6) * 120,
              Math.cos(core.id * 0.8) * 220,
              0
            ],
            scale: [0.5, 2.0, 1.5, 2.5, 0.5],
            opacity: [0, 1, 0.8, 1, 0],
            rotate: [0, 360, 180, 540, 720],
          }}
          transition={{
            duration: core.duration,
            repeat: Infinity,
            delay: core.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="rounded-full blur-md"
            style={{
              width: core.size,
              height: core.size,
              background: `radial-gradient(circle, 
                ${core.color} 0%, 
                ${core.color.replace(/[0-9.]+\)/, '0.4)')} 60%, 
                transparent 100%)`,
              boxShadow: `
                0 0 ${core.size * 2}px ${core.color},
                0 0 ${core.size * 4}px ${core.color.replace(/[0-9.]+\)/, '0.3)')},
                inset 0 0 ${core.size / 2}px ${core.color.replace(/[0-9.]+\)/, '0.8)')}`,
            }}
          />
        </motion.div>
      ))}

      {/* Multiple scanning effects */}
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        style={{ opacity: 0.3 }}
        animate={{
          top: ['-4px', '100%', '-4px'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute h-full w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
        style={{ opacity: 0.2 }}
        animate={{
          left: ['-4px', '100%', '-4px'],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Enhanced digital noise */}
      <motion.div
        className="absolute inset-0 opacity-8"
        animate={{
          backgroundPosition: ['0px 0px', '200px 200px', '0px 0px'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tech-noise' x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse'%3E%3Crect x='0' y='0' width='1' height='1' fill='%2360a5fa' opacity='0.3'/%3E%3Crect x='3' y='2' width='1' height='1' fill='%2322d3ee' opacity='0.2'/%3E%3Crect x='1' y='4' width='1' height='1' fill='%23a78bfa' opacity='0.25'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23tech-noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// Main component that renders the appropriate background
export const AnimatedBackground: React.FC = () => {
  const { themeId } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  // If user prefers reduced motion, show subtle static backgrounds instead
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {themeId === 'clean' && (
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, 
                rgba(37, 99, 235, 0.03) 0%, 
                rgba(16, 185, 129, 0.02) 50%, 
                rgba(100, 116, 139, 0.03) 100%)`
            }}
          />
        )}
        {themeId === 'warm' && (
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, 
                rgba(139, 92, 246, 0.04) 0%, 
                transparent 50%), 
              radial-gradient(ellipse at 70% 80%, 
                rgba(251, 146, 60, 0.03) 0%, 
                transparent 50%)`
            }}
          />
        )}
        {themeId === 'dark' && (
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(ellipse at 20% 10%, rgba(96, 165, 250, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 90%, rgba(34, 211, 238, 0.04) 0%, transparent 50%)
              `
            }}
          />
        )}
      </div>
    )
  }

  return (
    <>
      {themeId === 'clean' && <CleanBackground />}
      {themeId === 'warm' && <WarmBackground />}
      {themeId === 'dark' && <DarkBackground />}
    </>
  )
}
