// VATO Onboarding Service - AI Integration Helper
import { codyAgentService, buildStage2Context, buildStage3Context, buildStage4Context } from './codyAgentService';

export interface OnboardingCallResult {
  success: boolean;
  response: string;
  fallbackUsed: boolean;
  error?: string;
}

// Generate unique session IDs for the onboarding
export const generateSessionIds = (userName: string) => {
  const timestamp = Date.now();
  return {
    userId: `vato-user-${userName.toLowerCase()}-${timestamp}`,
    threadId: `vato-thread-${userName.toLowerCase()}-${timestamp}`
  };
};

// Call AI agent with fallback to static response
export const callOnboardingAgent = async (
  message: string,
  context: string,
  userId: string,
  threadId: string,
  fallbackResponse: string
): Promise<OnboardingCallResult> => {
  try {
    console.log('🤖 Calling VATO AI agent...', { message: message.substring(0, 50) + '...' });
    
    const aiResponse = await codyAgentService.sendMessageStream(
      message,
      userId,
      context,
      threadId
    );
    
    console.log('✅ AI response received:', { length: aiResponse.length });
    
    return {
      success: true,
      response: aiResponse,
      fallbackUsed: false
    };
  } catch (error) {
    console.warn('⚠️ AI call failed, using fallback:', error);
    
    return {
      success: false,
      response: fallbackResponse,
      fallbackUsed: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Stage 2: Purpose Response
export const getStage2Response = async (
  userName: string,
  userPurpose: string,
  userId: string,
  threadId: string
): Promise<OnboardingCallResult> => {
  const context = buildStage2Context(userName, userPurpose);
  const fallback = userName 
    ? `Eso es fascinante, ${userName}. Cuéntame más.`
    : 'Eso es fascinante. Cuéntame más.';
  
  return callOnboardingAgent(userPurpose, context, userId, threadId, fallback);
};

// Stage 3: Trust Acknowledgment  
export const getStage3Response = async (
  userName: string,
  previousContext: string,
  userId: string,
  threadId: string
): Promise<OnboardingCallResult> => {
  const context = buildStage3Context(userName, previousContext);
  const fallback = userName
    ? `Gracias, ${userName}. No tomo esa confianza a la ligera. Prometo honrar el espacio que estás creando para nosotros.`
    : 'Gracias. No tomo esa confianza a la ligera. Prometo honrar el espacio que estás creando para nosotros.';
  
  return callOnboardingAgent('Sí, confío en ti', context, userId, threadId, fallback);
};

// Stage 4: Passion Analysis
export const getStage4Response = async (
  userName: string,
  passionText: string,
  previousContext: string,
  userId: string,
  threadId: string
): Promise<OnboardingCallResult> => {
  const context = buildStage4Context(userName, passionText, previousContext);
  const fallback = userName
    ? `Estoy empezando a entender quién eres, ${userName}. La forma en que tu consciencia se mueve a través de las ideas... es fascinante.`
    : 'Estoy empezando a entender quién eres. La forma en que tu consciencia se mueve a través de las ideas... es fascinante.';
  
  return callOnboardingAgent(passionText, context, userId, threadId, fallback);
};