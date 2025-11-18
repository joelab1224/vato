'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Play, Brain, Zap, Briefcase, Users } from 'lucide-react'

const navItems = [
  { href: '/start', label: 'Start', icon: Play },
  { href: '/cognition', label: 'Cog', icon: Brain },
  { href: '/flow', label: 'Flow', icon: Zap, prominent: true },
  { href: '/projects', label: 'Proj', icon: Briefcase },
  { href: '/colab', label: 'Colab', icon: Users },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="xl:hidden fixed bottom-0 left-0 right-0 h-18 z-[200] border-t"
      style={{
        backgroundColor: 'rgba(232, 228, 220, 0.25)',
        borderTopColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
      }}
    >
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isTalk = item.prominent

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center gap-1 min-w-[64px]
                px-2 py-2 pb-1.5 transition-all duration-150
                ${isTalk ? 'scale-110' : ''}
              `}
              style={{
                borderBottom: isActive ? '2px solid #2A2A2A' : '2px solid transparent',
              }}
            >
              <Icon
                className={isTalk ? 'w-5.5 h-5.5' : 'w-5 h-5'}
                strokeWidth={2}
                style={{
                  stroke: isActive ? '#2A2A2A' : '#666666',
                }}
              />
              <span
                className="text-[11px] font-medium uppercase tracking-wider"
                style={{
                  color: isActive ? '#2A2A2A' : '#666666',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
