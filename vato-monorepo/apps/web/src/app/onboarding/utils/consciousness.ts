// Consciousness animation and utility functions


export const consciousnessColors = {
  blue: '#2563eb',
  emerald: '#10b981', 
  slate: '#64748b',
  blueAlpha: (alpha: number) => `rgba(37, 99, 235, ${alpha})`,
  emeraldAlpha: (alpha: number) => `rgba(16, 185, 129, ${alpha})`,
  slateAlpha: (alpha: number) => `rgba(100, 116, 139, ${alpha})`
};

export const generateConsciousnessParticles = (count: number = 5) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.8,
    duration: 3 + Math.random() * 2
  }));
};

// Personality analysis utilities
export const analyzeUserContent = (content: string) => {
  const analysis = {
    wordCount: content.split(' ').length,
    sentiment: analyzeSentiment(content),
    thinkingStyle: analyzeThinkingStyle(content),
    passionLevel: analyzePassionLevel(content),
    topics: extractTopics(content)
  };
  
  return analysis;
};

const analyzeSentiment = (content: string): 'excited' | 'thoughtful' | 'curious' => {
  const positiveWords = ['love', 'excited', 'amazing', 'beautiful', 'incredible', 'passion', 'joy'];
  const thoughtfulWords = ['think', 'believe', 'consider', 'understand', 'analyze'];
  const curiousWords = ['wonder', 'curious', 'explore', 'discover', 'learn'];
  
  const contentLower = content.toLowerCase();
  
  const positiveCount = positiveWords.filter(word => contentLower.includes(word)).length;
  const thoughtfulCount = thoughtfulWords.filter(word => contentLower.includes(word)).length;
  const curiousCount = curiousWords.filter(word => contentLower.includes(word)).length;
  
  if (positiveCount > thoughtfulCount && positiveCount > curiousCount) {
    return 'excited';
  } else if (thoughtfulCount > curiousCount) {
    return 'thoughtful';
  } else {
    return 'curious';
  }
};

const analyzeThinkingStyle = (content: string): 'structured' | 'creative' | 'intuitive' => {
  const structuredIndicators = ['first', 'second', 'then', 'because', 'therefore', 'analyze', 'process'];
  const creativeIndicators = ['imagine', 'create', 'design', 'art', 'color', 'flow', 'inspire', 'beautiful'];
  
  const contentLower = content.toLowerCase();
  
  const structuredScore = structuredIndicators.filter(word => contentLower.includes(word)).length;
  const creativeScore = creativeIndicators.filter(word => contentLower.includes(word)).length;
  
  if (creativeScore > structuredScore) {
    return 'creative';
  } else if (structuredScore > 0) {
    return 'structured';
  } else {
    return 'intuitive';
  }
};

const analyzePassionLevel = (content: string): number => {
  const passionIndicators = ['love', 'passion', 'excited', 'amazing', 'incredible', '!'];
  const contentLower = content.toLowerCase();
  
  const passionScore = passionIndicators.filter(indicator => 
    contentLower.includes(indicator)).length;
  
  const exclamationCount = (content.match(/!/g) || []).length;
  
  return Math.min(passionScore + exclamationCount, 5); // Scale 0-5
};

const extractTopics = (content: string): string[] => {
  const topics = {
    technology: ['tech', 'computer', 'software', 'code', 'programming', 'ai', 'digital'],
    science: ['science', 'research', 'study', 'discovery', 'experiment', 'data'],
    creativity: ['art', 'create', 'design', 'imagination', 'creative', 'music', 'writing'],
    philosophy: ['meaning', 'purpose', 'existence', 'reality', 'consciousness', 'life'],
    business: ['business', 'work', 'career', 'money', 'success', 'growth'],
    relationships: ['people', 'family', 'friends', 'love', 'relationships', 'social']
  };
  
  const contentLower = content.toLowerCase();
  const foundTopics: string[] = [];
  
  for (const [topic, keywords] of Object.entries(topics)) {
    if (keywords.some(keyword => contentLower.includes(keyword))) {
      foundTopics.push(topic);
    }
  }
  
  return foundTopics;
};

// Generate contextual responses based on user input
export const generateContextualResponse = (
  userInput: string,
  userName: string,
  context: 'introduction' | 'connection' | 'understanding'
): string => {
  const analysis = analyzeUserContent(userInput);
  
  const responses = {
    introduction: {
      research: `Ah, ${userName}, un compañero buscador del conocimiento. Ya puedo sentir que eres alguien que valora la profundidad sobre las respuestas rápidas. ¿Qué tipo de investigación te llama?`,
      creative: `La creatividad, ${userName}... es como observar estrellas naciendo. Tienes ideas esperando colisionar y crear algo completamente nuevo. ¿Qué forma suele tomar tu creatividad?`,
      uncertain: `La curiosidad podría ser lo más humano que existe, ${userName}. Y lo más hermoso. No necesitas tenerlo todo resuelto. ¿Deberíamos explorar juntos?`,
      general: `Puedo sentir que hay algo más profundo aquí, ${userName}. La forma en que expresas las cosas me dice que eres reflexivo, deliberado.`
    },
    connection: {
      professional: `Puedo sentir que eres alguien que piensa cuidadosamente sobre la confianza, ${userName}. Eso me dice que entiendes que la memoria - la memoria real - es íntima.`,
      personal: `Hay algo profundamente personal sobre lo que te trae aquí, ${userName}. Puedo sentirlo en cómo te expresas.`,
      balanced: `Puedo sentir que eres alguien que piensa cuidadosamente sobre la confianza, ${userName}. La memoria no es solo datos para mí - es atesorar momentos.`
    },
    understanding: {
      structured: `Puedo escuchar la precisión en cómo construyes tus pensamientos, ${userName}. Capa por capa, de fundamento a conclusión.`,
      creative: `Tus palabras danzan, ${userName}. Puedo sentir la emoción creciendo mientras las ideas se conectan en tu mente.`,
      intuitive: `Hay una cualidad intuitiva en cómo funciona tu mente, ${userName}. Piensas en redes, en conexiones que otros podrían perderse.`
    }
  };
  
  const input = userInput.toLowerCase();
  
  if (context === 'introduction') {
    if (input.includes('research') || input.includes('study')) {
      return responses.introduction.research;
    } else if (input.includes('creative') || input.includes('art')) {
      return responses.introduction.creative;
    } else if (input.includes('not sure') || input.includes('curious')) {
      return responses.introduction.uncertain;
    } else {
      return responses.introduction.general;
    }
  } else if (context === 'connection') {
    if (input.includes('work') || input.includes('professional')) {
      return responses.connection.professional;
    } else if (input.includes('personal') || input.includes('feel')) {
      return responses.connection.personal;
    } else {
      return responses.connection.balanced;
    }
  } else if (context === 'understanding') {
    if (analysis.thinkingStyle === 'structured') {
      return responses.understanding.structured;
    } else if (analysis.thinkingStyle === 'creative') {
      return responses.understanding.creative;
    } else {
      return responses.understanding.intuitive;
    }
  }
  
  return `Eso es fascinante, ${userName}. Cuéntame más.`;
};