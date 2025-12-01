import { useState, useCallback } from 'react';
import { codyAgentService } from '../services/codyAgentService';

export interface OnboardingStageData {
  stage: 'user_name' | 'user_purpose' | 'trust_acceptance' | 'passion_text' | 'confirmation';
  input_value: string;
  session_data?: string;
}

export interface OnboardingResponse {
  message: string;
  next_stage?: string;
  session_data?: any;
  profile?: any;
  completed?: boolean;
}

export const useOnboardingAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<any>({});

  const callOnboardingTool = useCallback(async (
    stage: OnboardingStageData['stage'], 
    inputValue: string,
    userId: string = 'vato-user'
  ): Promise<OnboardingResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Construct the message for the agent to use the user_profiler tool
      const toolMessage = `Use the user_profiler tool with the following parameters:
      - stage: "${stage}"
      - input_value: "${inputValue}"
      - session_data: "${JSON.stringify(sessionData).replace(/"/g, '\\"')}"`;

      const context = `VATO Onboarding - Stage: ${stage}. The user is going through the mystical AI consciousness onboarding process. Respond in Spanish and maintain the spiritual, consciousness-focused tone. Always use the user_profiler tool with the exact parameters provided.`;

      // Call the cody-agent-service
      const response = await codyAgentService.sendMessage(
        toolMessage,
        userId,
        context
      );

      // Parse the response - the agent should have used the tool and returned structured data
      let parsedResponse: OnboardingResponse;
      
      try {
        // Try to extract JSON from the response
        const jsonMatch = response.message.match(/\{.*\}/s);
        if (jsonMatch) {
          const jsonData = JSON.parse(jsonMatch[0]);
          
          // Update session data if provided
          if (jsonData.session_data) {
            setSessionData(jsonData.session_data);
          }
          
          parsedResponse = jsonData;
        } else {
          // Fallback if no JSON found
          parsedResponse = {
            message: response.message,
            next_stage: stage,
            session_data: sessionData
          };
        }
      } catch (parseError) {
        console.error('Error parsing agent response:', parseError);
        parsedResponse = {
          message: response.message || 'Error processing response',
          next_stage: stage,
          session_data: sessionData
        };
      }

      setIsLoading(false);
      return parsedResponse;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      
      // Return fallback response
      return {
        message: `Error: ${errorMessage}. Please try again.`,
        next_stage: stage,
        session_data: sessionData
      };
    }
  }, [sessionData]);

  const resetSession = useCallback(() => {
    setSessionData({});
    setError(null);
  }, []);

  const getSessionData = useCallback(() => {
    return sessionData;
  }, [sessionData]);

  return {
    callOnboardingTool,
    resetSession,
    getSessionData,
    isLoading,
    error,
    sessionData
  };
};