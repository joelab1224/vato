'use client'

import { Menu, Search, Bell, User } from 'lucide-react'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header 
      className="sticky top-0 h-14 z-100 transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)',
      }}
    >
      <div className="flex items-center justify-between h-full px-5">
        {/* Left: Empty (removed hamburger) */}
        <div className="flex items-center gap-4">
        </div>

        {/* Center: Empty (minimal) */}
        <div className="flex-1" />

        {/* Right: Utility icons */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(8, 145, 178, 0.08)';
              e.currentTarget.style.color = '#0891b2';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#64748b';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            aria-label="Search"
          >
            <Search className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(8, 145, 178, 0.08)';
              e.currentTarget.style.color = '#0891b2';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#64748b';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(8, 145, 178, 0.08)';
              e.currentTarget.style.color = '#0891b2';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#64748b';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            aria-label="User menu"
          >
            <User className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  )
}
