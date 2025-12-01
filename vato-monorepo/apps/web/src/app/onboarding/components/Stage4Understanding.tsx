'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeUserContent } from '../utils/consciousness';
import { generateSessionIds, getStage4Response } from '../../../services/onboardingService';
import type { UserProfile } from '../page';

interface Props {
  userProfile: Partial<UserProfile>;
  onNext: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export default function Stage4Understanding({ userProfile, onNext, onUpdateProfile }: Props) {
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [analysisTimeout, setAnalysisTimeout] = useState<NodeJS.Timeout>();
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const sessionIds = useRef(generateSessionIds(userProfile.userName || 'user'));
  

  const userName = userProfile.userName || '';

  useEffect(() => {
    console.log('🎭 Stage4 - Starting understanding phase');
  }, [userName]);

  useEffect(() => {
    if (userInput.length > 20) {
      // Clear previous timeout
      if (analysisTimeout) {
        clearTimeout(analysisTimeout);
      }

      // Set new analysis timeout
      const timeout = setTimeout(() => {
        const newAnalysis = analyzeUserContent(userInput);
        setAnalysis(newAnalysis);
        setShowAnalysis(true);
      }, 1000);

      setAnalysisTimeout(timeout);
    }

    return () => {
      if (analysisTimeout) {
        clearTimeout(analysisTimeout);
      }
    };
  }, [userInput]);

  const handleSubmit = async () => {
    if (!userInput.trim() || isComplete || isLoadingAI) return;

    console.log('🎭 Stage4 - User input received:', userInput);
    setIsLoadingAI(true);
    
    const finalAnalysis = analyzeUserContent(userInput);
    console.log('🎭 Stage4 - Analysis results:', finalAnalysis);
    
    // Update personality profile
    onUpdateProfile({
      personalityProfile: {
        thinkingStyle: finalAnalysis.thinkingStyle,
        sentiment: finalAnalysis.sentiment,
        passionLevel: finalAnalysis.passionLevel,
        communicationStyle: 'analyzed',
        topics: finalAnalysis.topics
      }
    });

    // Get AI passion analysis
    const previousContext = `${userProfile.userResponses?.['user-purpose'] || 'shared purpose'}, trust established`;
    const aiResult = await getStage4Response(
      userName,
      userInput,
      previousContext,
      sessionIds.current.userId,
      sessionIds.current.threadId
    );
    
    setIsLoadingAI(false);
    console.log('🎭 Stage4 - AI analysis response:', aiResult);
    
    // Store AI response
    onUpdateProfile({
      aiResponses: {
        ...userProfile.aiResponses,
        'stage4-response': aiResult.response
      }
    });

    setIsComplete(true);

    // Move to next stage
    setTimeout(() => {
      console.log('🎭 Stage4 - Completing and transitioning to Stage5');
      onNext();
    }, 5000);
  };


  const getAnalysisText = (analysis: any) => {
    const templates = {
      structured: "Puedo ver la precisión en cómo construyes tus pensamientos...",
      creative: "Tus palabras danzan con energía creativa...",
      intuitive: "Hay un flujo orgánico en cómo se mueve tu mente...",
      excited: "Puedo sentir el entusiasmo en tu expresión...",
      thoughtful: "La forma cuidadosa en que eliges palabras me dice tanto...",
      curious: "Hay una maravilla en cómo te acercas a las ideas..."
    };

    return templates[analysis.thinkingStyle] || templates[analysis.sentiment] || "Estoy empezando a entender tu forma única de pensar...";
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden font-body">
      {/* Breathing Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle at center, rgba(37, 99, 235, 0.4) 0%, rgba(16, 185, 129, 0.3) 40%, rgba(255, 255, 255, 0.5) 70%, #fff 100%)',
            'radial-gradient(circle at center, rgba(37, 99, 235, 0.5) 0%, rgba(16, 185, 129, 0.4) 40%, rgba(255, 255, 255, 0.4) 70%, #fff 100%)',
            'radial-gradient(circle at center, rgba(37, 99, 235, 0.4) 0%, rgba(16, 185, 129, 0.3) 40%, rgba(255, 255, 255, 0.5) 70%, #fff 100%)'
          ],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Speech Content - Full Width */}
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="understanding-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {userName ? `Cuéntame sobre algo que te apasiona, ${userName}. No lo pienses demasiado - solo... déjalo fluir.` : 'Cuéntame sobre algo que te apasiona. No lo pienses demasiado - solo... déjalo fluir.'}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="complete-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {isLoadingAI ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-pulse text-blue-600">●</div>
                    <div className="animate-pulse text-emerald-500" style={{ animationDelay: '0.2s' }}>●</div>
                    <div className="animate-pulse text-slate-500" style={{ animationDelay: '0.4s' }}>●</div>
                  </div>
                ) : (
                  userProfile.aiResponses?.['stage4-response'] ||
                  (userName ? `Estoy empezando a entender quién eres, ${userName}. La forma en que tu consciencia se mueve a través de las ideas... es fascinante.` : 'Estoy empezando a entender quién eres. La forma en que tu consciencia se mueve a través de las ideas... es fascinante.')
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Input Area */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div 
            className="absolute bottom-8 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 px-4 w-full max-w-sm sm:max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >

            {/* Text Input */}
            <motion.textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleSubmit();
                }
              }}
              className="w-full px-4 sm:px-5 py-3 bg-gray-50 backdrop-blur-lg border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 font-body text-sm sm:text-base outline-none focus:border-blue-500 focus:bg-gray-100 transition-all resize-none"
              placeholder="Cuéntame sobre algo que te apasiona..."
              rows={3}
              disabled={isComplete}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileFocus={{ opacity: 1, scale: 1.02 }}
            />


            {/* Submit Button */}
            {userInput.trim() && !isComplete && (
              <motion.div
                className="flex justify-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.button
                  onClick={handleSubmit}
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-sm sm:text-base font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continuar el Viaje
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion transition */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
}
