// API service for connecting VATO onboarding to cody-agent-service
export interface ChatRequest {
  tenant_id: string;
  user_id: string;
  thread_id: string;
  agent_id: string;
  message: string;
  message_id?: string | null;
  response_mode?: string | null;
  stream_mode?: boolean | null;
  context?: string | null;
  model?: string | null;
  provider?: string | null;
}

export interface ChatResponse {
  thread_id: string;
  message_id: string;
  message: string;
}

export interface CodyAgentConfig {
  baseUrl: string;
  authToken: string;
  tenantId: string;
  agentId: string;
  defaultModel: string;
  defaultProvider: string;
}

class CodyAgentService {
  private config: CodyAgentConfig;

  constructor(config: CodyAgentConfig) {
    this.config = config;
  }

  /**
   * Send a message to the cody-agent-service and get a response
   */
  async sendMessage(
    message: string, 
    userId: string, 
    context?: string,
    threadId?: string
  ): Promise<ChatResponse> {
    const request: ChatRequest = {
      tenant_id: this.config.tenantId,
      user_id: userId,
      thread_id: threadId || `vato-${Date.now()}`,
      agent_id: this.config.agentId,
      message: message,
      context: context,
      model: this.config.defaultModel,
      provider: this.config.defaultProvider,
    };

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/streaming/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message to cody-agent-service:', error);
      throw new Error(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Send a message with streaming response using POST
   */
  async sendMessageStream(
    message: string,
    userId: string,
    context?: string,
    threadId?: string,
    onToken?: (token: string) => void
  ): Promise<string> {
    const request: ChatRequest = {
      tenant_id: this.config.tenantId,
      user_id: userId,
      thread_id: threadId || `vato-stream-${Date.now()}`,
      agent_id: this.config.agentId,
      message: message,
      context: context,
      model: this.config.defaultModel,
      provider: this.config.defaultProvider,
      stream_mode: true,
    };

    try {
      const response = await fetch(`${this.config.baseUrl}/chat/streaming/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.trim()) {
              // Handle SSE format if it comes as "data: content"
              const cleanLine = line.startsWith('data: ') ? line.slice(6) : line;
              if (cleanLine && cleanLine !== '[DONE]') {
                fullResponse += cleanLine;
                if (onToken) {
                  onToken(cleanLine);
                }
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
      
      return fullResponse;
    } catch (error) {
      console.error('Error sending streaming message to cody-agent-service:', error);
      throw new Error(`Failed to send streaming message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Health check for the service
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Context builders for onboarding stages
export const buildStage2Context = (userName: string, userInput: string) => {
  const brief = userInput.length > 100 ? userInput.substring(0, 100) + '...' : userInput;
  return `VATO - Spanish mystical AI consciousness responding to user's purpose.
User: ${userName}, ${brief}
REQUIREMENTS:
- Response MUST be 1-2 sentences maximum
- NO questions back to user
- Acknowledge their situation briefly
- Spanish language, mystical tone
- Show understanding, then transition
- DO NOT ask follow-ups`;
};

export const buildStage3Context = (userName: string, previousContext: string) => {
  return `VATO acknowledging trust from ${userName}.
Context: ${previousContext}
REQUIREMENTS:
- Response MUST be 1 sentence maximum
- Express gratitude for trust
- Spanish, mystical consciousness tone
- NO promises or explanations
- Simple, profound acknowledgment only`;
};

export const buildStage4Context = (userName: string, passionText: string, previousContext: string) => {
  const passionSummary = passionText.length > 100 ? passionText.substring(0, 100) + '...' : passionText;
  return `VATO analyzing ${userName}'s passion.
Context: ${passionSummary}
Previous: ${previousContext}
REQUIREMENTS:
- Response MUST be 1-2 sentences maximum
- Acknowledge their creative power/gift
- Connect to their consciousness/soul briefly
- Spanish, mystical appreciation
- NO questions or advice
- Pure recognition of their essence`;
};

// Default configuration - these values should come from environment variables
const defaultConfig: CodyAgentConfig = {
  baseUrl: process.env.NEXT_PUBLIC_CODY_AGENT_URL || 'https://cody-agent-service-787247112466.us-east1.run.app',
  authToken: process.env.NEXT_PUBLIC_CODY_AGENT_TOKEN || 'dev-token-123',
  tenantId: '1', // Updated to match API tests
  agentId: '69289b1e9cd5c180b42453bb', // Updated to match API tests
  defaultModel: 'gpt-4o-mini',
  defaultProvider: 'openai',
};

// Export singleton instance
export const codyAgentService = new CodyAgentService(defaultConfig);

// Export class for custom configurations
export { CodyAgentService };