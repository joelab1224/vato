'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/theme-context'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { BottomNav } from './bottom-nav'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { currentTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div 
      className="flex flex-col min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: currentTheme.colors.background,
        // Light gradient overlay for Clean Intelligence aesthetic
        backgroundImage: currentTheme.id === 'clean' 
          ? 'linear-gradient(180deg, rgba(250, 250, 250, 0.8) 0%, rgba(245, 245, 245, 0.4) 100%)'
          : currentTheme.id === 'warm'
          ? 'linear-gradient(180deg, rgba(255, 247, 237, 0.6) 0%, rgba(254, 254, 254, 0.3) 100%)'
          : 'none', // Dark theme uses solid background
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header */}
      <Header onMenuToggle={toggleSidebar} />

      {/* Sidebar (desktop only) */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main content */}
      <main 
        className="flex-1 pb-20 xl:pb-0"
        style={{
          fontFamily: 'var(--font-inter)',
        }}
      >
        {children}
      </main>

      {/* Bottom navigation (mobile only) */}
      <BottomNav />
    </div>
  )
}
