'use client'

import { Menu, Search, Bell, User } from 'lucide-react'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header 
      className="sticky top-0 h-14 z-100 bg-white transition-all duration-200"
      style={{
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-center justify-between h-full px-5">
        {/* Left: Hamburger (desktop only) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="hidden xl:flex items-center justify-center w-11 h-11 transition-opacity hover:opacity-70 active:opacity-50"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 stroke-[#666666]" strokeWidth={2} />
          </button>
        </div>

        {/* Center: Empty (minimal) */}
        <div className="flex-1" />

        {/* Right: Utility icons */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center justify-center w-11 h-11 transition-opacity hover:opacity-70 active:opacity-50"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[#666666]" strokeWidth={2} />
          </button>
          <button
            className="flex items-center justify-center w-11 h-11 transition-opacity hover:opacity-70 active:opacity-50"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[#666666]" strokeWidth={2} />
          </button>
          <button
            className="flex items-center justify-center w-11 h-11 transition-opacity hover:opacity-70 active:opacity-50"
            aria-label="User menu"
          >
            <User className="w-5 h-5 stroke-[#666666]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  )
}
