'use client'

import * as React from 'react'
import { useTheme } from '@/contexts/theme-context'
import { Message } from '@/components/ui/message'
import { ChatInput } from '@/components/ui/input'
import { FloatingControls } from '@/components/layout/floating-controls'
import { useAutoHideNav } from '@/contexts/auto-hide-nav-context'
import { ModeSwitcher } from '@/components/ui/mode-switcher'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, FileText, Search, Brain } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-backgrounds'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  citations?: Array<{
    id: string
    text: string
    source: string
    type: 'document' | 'web' | 'memory'
  }>
}

interface ChatInterfaceProps {
  onSendMessage?: (message: string) => void
  onFileUpload?: () => void
  isLoading?: boolean
  className?: string
}

// Demo messages with citations
const demoMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'system',
    content: 'Welcome to VATO! I\'m your AI assistant with persistent memory and document integration.',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    role: 'user',
    content: 'What is the current state of AI in autonomous systems?',
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'AI in autonomous systems is rapidly evolving across multiple domains. Current developments show significant progress in self-driving vehicles [1], robotic process automation [2], and intelligent decision-making systems [3]. The integration of large language models with traditional control systems is creating more sophisticated autonomous agents capable of complex reasoning and adaptation.',
    timestamp: new Date(Date.now() - 3400000),
    citations: [
      {
        id: 'cite1',
        text: 'Tesla\'s Full Self-Driving capabilities demonstrate advanced neural network processing',
        source: 'Recent Advances in Autonomous Vehicles - Tech Report 2024',
        type: 'document'
      },
      {
        id: 'cite2',
        text: 'RPA market expected to reach $30.85 billion by 2027',
        source: 'Automation Industry Analysis - McKinsey',
        type: 'web'
      },
      {
        id: 'cite3',
        text: 'As discussed in our previous conversation about AI decision frameworks',
        source: 'Previous conversation on 2024-01-15',
        type: 'memory'
      }
    ]
  },
  {
    id: '4',
    role: 'user',
    content: 'Can you analyze the document I uploaded about neural architectures?',
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: '5',
    role: 'assistant',
    content: 'Based on your uploaded document "Neural Architecture Trends 2024.pdf" [1], I can see several key innovations in transformer architectures. The paper highlights mixture-of-experts models [1] and discusses the efficiency gains from sparse attention mechanisms [1]. Would you like me to dive deeper into any specific architecture mentioned?',
    timestamp: new Date(Date.now() - 1700000),
    citations: [
      {
        id: 'cite4',
        text: 'Mixture-of-Experts models show 2-4x efficiency improvements over dense models',
        source: 'Neural Architecture Trends 2024.pdf, pages 12-15',
        type: 'document'
      }
    ]
  }
]

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSendMessage,
  onFileUpload,
  isLoading = false,
  className
}) => {
  const { currentTheme } = useTheme()
  const { isNavVisible, isAutoHideEnabled } = useAutoHideNav()
  const [messages, setMessages] = React.useState<ChatMessage[]>(demoMessages)
  const [selectedCitation, setSelectedCitation] = React.useState<any>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, newMessage])
    onSendMessage?.(content)

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand your question about "${content}". Let me process this and provide a comprehensive response with relevant sources and context from our previous discussions.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  const handleCitationClick = (citation: any) => {
    setSelectedCitation(citation)
  }


  // Dynamic padding calculation for message area - should match FloatingControls spacing
  const messageAreaPaddingBottom = React.useMemo(() => {
    if (!isAutoHideEnabled) {
      // Normal spacing when auto-hide is disabled - match FloatingControls
      return `calc(env(safe-area-inset-bottom) + var(--spacing-bottomNavHeight, ${currentTheme.spacing.bottomNavHeight}) + var(--spacing-lg, ${currentTheme.spacing.lg}))`
    }
    
    if (isNavVisible) {
      // Full spacing when nav is visible - match FloatingControls exactly
      return `calc(env(safe-area-inset-bottom) + var(--spacing-bottomNavHeight, ${currentTheme.spacing.bottomNavHeight}) + var(--spacing-lg, ${currentTheme.spacing.lg}))`
    } else {
      // Minimal spacing when nav is hidden - match FloatingControls exactly
      return `calc(env(safe-area-inset-bottom) + var(--spacing-3xl, ${currentTheme.spacing['3xl']}))`
    }
  }, [isAutoHideEnabled, isNavVisible, currentTheme])


  return (
    <div 
      className="flex flex-col h-screen transition-colors duration-300 relative"
      style={{ backgroundColor: 'transparent' }}  // Allow AnimatedBackground to show through
    >
      {/* Animated Background Layer (z-0) */}
      <AnimatedBackground />

      {/* Messages Area - Scrollable Container (z-10 - same plane as BottomNav) */}
      <div 
        className="flex-1 relative overflow-hidden z-10"
        style={{ 
          backgroundColor: 'transparent',  // Allow AnimatedBackground to show through
          // Use dynamic viewport height for mobile browser compatibility
          height: '100dvh',
        }}
      >
        <div 
          key={`messages-${isNavVisible}-${isAutoHideEnabled}`}
          className="absolute inset-0 overflow-y-auto"
          style={{
            // Dynamic padding based on floating controls and nav visibility
            paddingTop: `calc(var(--spacing-headerHeight, ${currentTheme.spacing.headerHeight}) + var(--spacing-lg, ${currentTheme.spacing.lg}) + var(--spacing-2xl, ${currentTheme.spacing['2xl']}))`,
            paddingBottom: messageAreaPaddingBottom,
            paddingLeft: currentTheme.spacing.containerPadding,
            paddingRight: currentTheme.spacing.containerPadding,
            // Scroll behavior optimization
            scrollBehavior: 'smooth',
            // Match nav animation timing for smooth movement
            transition: 'padding-bottom 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    ease: currentTheme.id === 'dark' ? 'easeOut' : 'easeInOut'
                  }}
                >
                  <Message
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                    citations={message.citations}
                    onCitationClick={handleCitationClick}
                    state={isLoading && index === messages.length - 1 ? 'streaming' : 'default'}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* ModeSwitcher Layer (z-20) - Above Messages Area */}
      <div 
        className="fixed left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto"
        style={{
          top: `calc(var(--spacing-headerHeight, ${currentTheme.spacing.headerHeight}) + var(--spacing-lg, ${currentTheme.spacing.lg}))`,
        }}
      >
        <ModeSwitcher />
      </div>

      {/* Floating Controls Layer (z-10) - ChatInput only */}
      <FloatingControls
        key={`floating-controls-${isNavVisible}-${isAutoHideEnabled}`}
        onSendMessage={handleSendMessage}
        onFileUpload={onFileUpload}
        isLoading={isLoading}
        isNavVisible={isNavVisible}
        isAutoHideEnabled={isAutoHideEnabled}
      />

      {/* Overlays Layer (z-30) - Citation level */}
      <AnimatePresence>
        {selectedCitation && (
          <>
            {/* Citation Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCitation(null)}
              className="fixed inset-0 bg-black/50 z-30"
            />

            {/* Citation Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-96 z-30 overflow-hidden shadow-2xl backdrop-blur-xl"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderLeft: `1px solid ${currentTheme.colors.border}`,
                // Enhanced glass morphism for citation panel
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: currentTheme.effects.shadowLarge,
              }}
            >
              <div className="p-6 border-b" style={{ borderBottomColor: currentTheme.colors.border }}>
                <div className="flex items-center justify-between">
                  <h3 
                    className="font-semibold"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontSize: currentTheme.typography.sizes.lg 
                    }}
                  >
                    Source Details
                  </h3>
                  <button
                    onClick={() => setSelectedCitation(null)}
                    className="p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                    style={{
                      color: currentTheme.colors.textSecondary,
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = currentTheme.colors.backgroundElevated
                      e.currentTarget.style.color = currentTheme.colors.text
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = currentTheme.colors.textSecondary
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div 
                  className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: currentTheme.colors.background }}
                >
                  {selectedCitation.type === 'document' && <FileText className="w-4 h-4" />}
                  {selectedCitation.type === 'web' && <Search className="w-4 h-4" />}
                  {selectedCitation.type === 'memory' && <Brain className="w-4 h-4" />}
                  <span 
                    className="text-sm font-medium capitalize"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {selectedCitation.type}
                  </span>
                </div>

                <h4 
                  className="font-medium mb-3"
                  style={{ 
                    color: currentTheme.colors.text,
                    fontSize: currentTheme.typography.sizes.base 
                  }}
                >
                  {selectedCitation.source}
                </h4>

                <div 
                  className="p-4 rounded-lg mb-4"
                  style={{ 
                    backgroundColor: currentTheme.colors.citationBackground,
                    border: `1px solid ${currentTheme.colors.border}`,
                    // Subtle glass effect for citation text
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <p 
                    className="text-sm leading-relaxed font-medium"
                    style={{ 
                      color: currentTheme.colors.text,
                      lineHeight: '1.6', // Better reading experience
                    }}
                  >
                    {selectedCitation.text}
                  </p>
                </div>

                <button
                  className="w-full py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: currentTheme.colors.primary,
                    color: currentTheme.colors.textInverse,
                    boxShadow: currentTheme.effects.shadow,
                    border: `1px solid ${currentTheme.colors.primary}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = currentTheme.colors.primaryHover
                    e.currentTarget.style.borderColor = currentTheme.colors.primaryHover
                    e.currentTarget.style.boxShadow = currentTheme.effects.shadowLarge
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = currentTheme.colors.primary
                    e.currentTarget.style.borderColor = currentTheme.colors.primary
                    e.currentTarget.style.boxShadow = currentTheme.effects.shadow
                  }}
                >
                  View Original Source
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}