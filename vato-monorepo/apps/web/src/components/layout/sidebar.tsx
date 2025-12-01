'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
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
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={onClose}
            className="hidden xl:block fixed inset-0 z-[140]"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(25px) saturate(120%)',
              WebkitBackdropFilter: 'blur(25px) saturate(120%)',
              top: '56px',
            }}
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
          background: 'rgba(255, 255, 255, 0.9)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(25px) saturate(180%)',
          WebkitBackdropFilter: 'blur(25px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
        }}
      >
        <nav className="flex flex-col py-5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const isProminent = item.prominent

            const getNavItemStyles = () => {
              if (isProminent) {
                // Professional Primary Button Style for Flow
                return {
                  background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(8, 145, 178, 0.25), 0 2px 8px rgba(8, 145, 178, 0.15)',
                }
              }
              
              if (isActive) {
                // Professional Active State
                return {
                  background: 'rgba(8, 145, 178, 0.08)',
                  color: '#0891b2',
                  border: '1px solid rgba(8, 145, 178, 0.2)',
                }
              }
              
              // Default State
              return {
                background: 'transparent',
                color: '#64748b',
                border: 'none',
              }
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-4 px-5 py-3 mx-3 rounded-xl
                  font-medium transition-all duration-300
                  ${isProminent ? 'my-2' : 'my-1'}
                `}
                style={{
                  ...getNavItemStyles(),
                  fontFamily: '"TT Neoris", "Inter", sans-serif',
                  fontWeight: isProminent ? 600 : 100,
                }}
                onMouseEnter={(e) => {
                  if (!isActive && !isProminent) {
                    e.currentTarget.style.background = 'rgba(8, 145, 178, 0.05)';
                    e.currentTarget.style.color = '#0891b2';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !isProminent) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <Icon
                  className="w-6 h-6"
                  strokeWidth={2}
                  style={{
                    color: isProminent ? '#ffffff' : isActive ? '#0891b2' : '#64748b',
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
