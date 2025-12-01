'use client'

import { Header } from './header'
import { BottomNav } from './bottom-nav'
import { AutoHideNavProvider } from '@/contexts/auto-hide-nav-context'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {

  return (
    <AutoHideNavProvider>
      <div 
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Header */}
        <Header />

        {/* Main content */}
        <main 
          className="flex-1 pb-20"
          style={{
            fontFamily: '"TT Neoris", "Inter", sans-serif',
            fontWeight: 100,
          }}
        >
          {children}
        </main>

        {/* Bottom navigation */}
        <BottomNav />
      </div>
    </AutoHideNavProvider>
  )
}
