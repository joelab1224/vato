'use client'

import * as React from 'react'
import { ThemeProvider, useTheme } from '@/contexts/theme-context'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { Message } from '@/components/ui/message'
import { ChatInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Palette, Monitor, Smartphone, Eye } from 'lucide-react'
import { themes, type ThemeId } from '@/lib/themes'
import { AnimatedBackground } from '@/components/ui/animated-backgrounds'
import { AnimatedThemePreview } from '@/components/demo/theme-preview-with-animation'

// Sample message with citations
const sampleMessage = {
  role: 'assistant' as const,
  content: 'Based on the analysis of your document about neural architectures [1], I can see several promising developments. Modern transformer models are incorporating mixture-of-experts layers [2] which significantly improve efficiency while maintaining performance. These advances align with recent research from DeepMind [3] showing 40% better parameter utilization.',
  timestamp: new Date(),
  citations: [
    {
      id: '1',
      text: 'Latest advances in transformer architectures show promising efficiency gains',
      source: 'Neural Architecture Trends 2024.pdf, pages 15-18',
      type: 'document' as const,
    },
    {
      id: '2',
      text: 'Mixture-of-Experts models demonstrate 2-4x efficiency improvements',
      source: 'Efficient AI Systems - Stanford Research',
      type: 'web' as const,
    },
    {
      id: '3',
      text: 'As discussed in our conversation about AI optimization on Jan 10th',
      source: 'Previous conversation - AI Optimization Discussion',
      type: 'memory' as const,
    },
  ],
}

interface ThemePreviewProps {
  themeId: ThemeId
  title: string
  description: string
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ themeId, title, description }) => {
  const theme = themes[themeId]
  
  return (
    <div 
      className="rounded-lg border overflow-hidden"
      style={{ 
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Mini header */}
      <div 
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <span 
            className="text-sm font-medium"
            style={{ 
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {title}
          </span>
        </div>
        <div 
          className="text-xs px-2 py-1 rounded-full"
          style={{ 
            backgroundColor: theme.colors.primary + '15',
            color: theme.colors.primary,
          }}
        >
          Research
        </div>
      </div>

      {/* Sample messages */}
      <div 
        className="p-4 space-y-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* User message */}
        <div className="flex justify-end">
          <div 
            className="max-w-[70%] px-3 py-2 text-sm"
            style={{
              backgroundColor: theme.colors.userMessage,
              color: theme.colors.background,
              borderRadius: theme.spacing.borderRadius,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Analyze the latest research on transformer architectures
          </div>
        </div>

        {/* Assistant message */}
        <div className="flex">
          <div 
            className="max-w-[85%] px-3 py-2 text-sm leading-relaxed"
            style={{
              backgroundColor: theme.colors.assistantMessage,
              color: theme.colors.text,
              borderRadius: theme.spacing.borderRadius,
              border: `1px solid ${theme.colors.border}`,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Based on recent advances [1], transformer architectures are evolving rapidly with mixture-of-experts integration [2]...
            
            {/* Citations */}
            <div className="flex gap-1 mt-2">
              {[1, 2].map((num) => (
                <span
                  key={num}
                  className="inline-flex items-center justify-center w-5 h-5 text-xs rounded-sm"
                  style={{
                    backgroundColor: theme.colors.citation,
                    color: theme.colors.background,
                  }}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sample input */}
      <div 
        className="p-3 border-t"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        }}
      >
        <div 
          className="flex items-center gap-2 px-3 py-2 text-sm rounded border"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            color: theme.colors.textSecondary,
            fontFamily: theme.typography.fontFamily,
            borderRadius: theme.spacing.borderRadius,
          }}
        >
          Type your message...
          <div className="ml-auto">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <span className="text-xs text-white">→</span>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="px-4 py-2 text-center text-xs"
        style={{ 
          color: theme.colors.textSecondary,
          backgroundColor: theme.colors.surface,
        }}
      >
        {description}
      </div>
    </div>
  )
}

const DemoContent: React.FC = () => {
  const { themeId } = useTheme()
  const [selectedDemo, setSelectedDemo] = React.useState<'overview' | 'interactive' | 'responsive'>('overview')
  
  if (selectedDemo === 'interactive') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Interactive Chat Experience</h1>
              <p className="text-gray-600">Experience the full chat interface with theme switching</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher variant="tabs" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border h-[600px] overflow-hidden">
            {/* Chat simulation */}
            <div className="h-full flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-4">
                  <Message
                    role="system"
                    content="Welcome to the VATO interactive demo! Try switching themes above."
                    timestamp={new Date()}
                  />
                  <Message
                    role="user"
                    content="Show me how citations work in different themes"
                    timestamp={new Date()}
                  />
                  <Message
                    role="assistant"
                    content={sampleMessage.content}
                    timestamp={sampleMessage.timestamp}
                    citations={sampleMessage.citations}
                    onCitationClick={(citation) => console.log('Clicked citation:', citation)}
                  />
                </div>
              </div>
              <ChatInput
                onSend={(msg) => console.log('Demo message:', msg)}
                onFileAttach={() => console.log('File attach demo')}
                onVoiceRecord={() => console.log('Voice record demo')}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedDemo === 'responsive') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Responsive Design Preview</h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Desktop Preview */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Desktop (1440px)
              </h2>
              <div 
                className="border rounded-lg overflow-hidden"
                style={{ aspectRatio: '16/10', maxHeight: '400px' }}
              >
                <div className="h-full flex flex-col text-xs scale-75 origin-top-left">
                  {/* Simulated desktop layout */}
                  <ThemePreview 
                    themeId={themeId}
                    title="Desktop Chat"
                    description="Full-featured desktop interface"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Preview */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Mobile (375px)
              </h2>
              <div 
                className="border rounded-lg overflow-hidden mx-auto"
                style={{ width: '300px', height: '600px' }}
              >
                <div className="h-full text-xs">
                  {/* Simulated mobile layout */}
                  <ThemePreview 
                    themeId={themeId}
                    title="Mobile Chat"
                    description="Touch-optimized mobile interface"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 relative">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">VATO Multi-Theme Prototype</h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience three distinct personalities for AI interaction
            </p>
            <div className="flex justify-center">
              <ThemeSwitcher variant="cards" />
            </div>
          </motion.div>
        </div>

        {/* Theme Comparison Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          <AnimatedThemePreview 
            themeId="clean"
            title="Clean Intelligence"
            description="Professional • Trustworthy • Precise"
          />
          <AnimatedThemePreview 
            themeId="warm"
            title="Warm Companion" 
            description="Friendly • Approachable • Comfortable"
          />
          <AnimatedThemePreview 
            themeId="dark"
            title="Dark Intelligence"
            description="Technical • Powerful • Focused"
          />
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '🎨', title: 'Dynamic Theming', desc: 'Real-time theme switching with smooth transitions' },
            { icon: '💬', title: 'Interactive Citations', desc: 'Click citations to view source details' },
            { icon: '📱', title: 'Responsive Design', desc: 'Optimized for desktop and mobile devices' },
            { icon: '⚡', title: 'Fast Performance', desc: 'Smooth animations and instant feedback' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="text-center p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DemoPage() {
  return (
    <ThemeProvider>
      <DemoContent />
    </ThemeProvider>
  )
}