'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Play, Brain, Zap, Briefcase, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAutoHideNav } from '@/contexts/auto-hide-nav-context'
import { NavToggleIndicator } from '@/components/ui/nav-toggle-indicator'

const navItems = [
  { href: '/start', label: 'Start', icon: Play },
  { href: '/cognition', label: 'Cog', icon: Brain },
  { href: '/flow', label: 'Flow', icon: Zap, prominent: true },
  { href: '/projects', label: 'Proj', icon: Briefcase },
  { href: '/colab', label: 'Colab', icon: Users },
]

export function BottomNav() {
  const pathname = usePathname()
  const { isNavVisible, isAutoHideEnabled, toggleNav } = useAutoHideNav()

  return (
    <>
      {/* Auto-hide navigation */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav
            initial={isAutoHideEnabled ? { y: 0 } : false}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-0 left-0 right-0 z-10"
            style={{
              padding: '16px',
              paddingBottom: '24px',
            }}
          >
      {/* Professional Footer Navigation Container */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '30px',
          padding: '12px 24px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 4px 16px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.03)
          `,
        }}
      >
        <div className="flex items-center justify-between gap-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const isProminent = item.prominent

            const getNavItemStyles = () => {
              if (isActive) {
                return {
                  color: '#1e293b',
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    0 2px 8px rgba(32, 33, 36, 0.1)
                  `,
                  transform: 'translateY(-1px)',
                }
              }
              
              return {
                color: 'rgba(32, 33, 36, 0.7)',
                background: 'transparent',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300"
                style={{
                  ...getNavItemStyles(),
                  minWidth: isProminent ? '60px' : '52px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(32, 33, 36, 0.9)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.backdropFilter = 'blur(12px)';
                    e.currentTarget.style.WebkitBackdropFilter = 'blur(12px)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(32, 33, 36, 0.7)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.backdropFilter = 'blur(8px)';
                    e.currentTarget.style.WebkitBackdropFilter = 'blur(8px)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }
                }}
              >
                <Icon
                  className="w-6 h-6 transition-transform duration-200"
                  strokeWidth={2}
                  style={{
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
                <span
                  className="text-[11px] font-body"
                  style={{
                    fontFamily: '"TT Neoris", "Inter", sans-serif',
                    fontWeight: 100,
                  }}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Toggle indicator when nav is hidden */}
      <NavToggleIndicator 
        isVisible={isNavVisible}
        onToggle={toggleNav}
      />
    </>
  )
}
