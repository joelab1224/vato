'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/contexts/theme-context'
import { Play, Brain, Zap, Briefcase, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: '/start', label: 'Start', icon: Play },
  { href: '/cognition', label: 'Cognition', icon: Brain },
  { href: '/flow', label: 'Flow', icon: Zap, prominent: true },
  { href: '/projects', label: 'Projects', icon: Briefcase },
  { href: '/colab', label: 'Colab', icon: Users },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { currentTheme } = useTheme()
  const pathname = usePathname()

  return (
    <>
      {/* Overlay (desktop only, when sidebar open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="hidden xl:block fixed inset-0 z-[140]"
            style={{
              backgroundColor: currentTheme.id === 'dark' 
                ? 'rgba(0, 0, 0, 0.4)' // Only dark theme can use dark overlay
                : 'rgba(255, 255, 255, 0.6)', // Light themes use light overlay
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            style={{ top: '56px' }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="hidden xl:block fixed left-0 w-60 h-screen z-[150]"
        style={{
          top: '56px',
          backgroundColor: currentTheme.colors.surface,
          borderRight: `1px solid ${currentTheme.colors.border}`,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: currentTheme.effects.shadowLarge,
        }}
      >
        <nav className="flex flex-col py-5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const isTalk = item.prominent

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-4 px-5 py-3 mx-3 rounded-xl
                  font-medium transition-all duration-150
                  ${isTalk ? 'my-2' : 'my-1'}
                `}
                style={{
                  backgroundColor: isTalk
                    ? currentTheme.colors.primary
                    : isActive
                    ? currentTheme.colors.backgroundElevated
                    : 'transparent',
                  color: isTalk
                    ? currentTheme.colors.textInverse
                    : isActive
                    ? currentTheme.colors.text
                    : currentTheme.colors.textSecondary,
                  fontFamily: 'var(--font-space-grotesk)',
                  border: isActive && !isTalk ? `1px solid ${currentTheme.colors.border}` : 'none',
                }}
              >
                <Icon
                  className="w-6 h-6"
                  strokeWidth={2}
                  style={{
                    stroke: isTalk
                      ? currentTheme.colors.textInverse
                      : isActive
                      ? currentTheme.colors.text
                      : currentTheme.colors.textSecondary,
                  }}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </motion.aside>
    </>
  )
}
