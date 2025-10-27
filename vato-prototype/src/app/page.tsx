'use client'

import { ThemeProvider } from '@/contexts/theme-context'
import { ChatInterface } from '@/components/chat/chat-interface'

export default function Home() {
  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message)
  }

  const handleFileUpload = () => {
    console.log('File upload requested')
  }

  const handleVoiceRecord = () => {
    console.log('Voice recording requested')
  }

  return (
    <ThemeProvider>
      <ChatInterface
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        onVoiceRecord={handleVoiceRecord}
      />
    </ThemeProvider>
  )
}
