'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateContextualResponse } from '../utils/consciousness';
import { generateSessionIds, getStage2Response } from '../../../services/onboardingService';
import type { UserProfile } from '../page';

interface Props {
  userProfile: Partial<UserProfile>;
  onNext: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export default function Stage2Introduction({ userProfile, onNext, onUpdateProfile }: Props) {
  const [phase, setPhase] = useState(0);
  const [showUserInput, setShowUserInput] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const sessionIds = useRef(generateSessionIds(userProfile.userName || 'user'));

  console.log('📋 Stage2 - Received userProfile:', userProfile);
  console.log('📋 Stage2 - userProfile.userName:', userProfile.userName);

  const userName = userProfile.userName || '';

  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      startSequence();
    }
  }, [hasStarted]);

  const startSequence = async () => {
    // Phase 1: Introduction
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 1: Introduction');
      setPhase(1);
    }, 1000);

    // Phase 2: Memory explanation
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 2: Memory explanation');
      setPhase(2);
    }, 4000);

    // Phase 3: Growth concept
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 3: Growth concept');
      setPhase(3);
    }, 7500);

    // Phase 4: User prompt
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 4: User prompt');
      setPhase(4);
      setTimeout(() => {
        console.log('🎭 Stage2 - Showing user input');
        setShowUserInput(true);
      }, 3000);
    }, 11000);
  };

  const handleUserResponse = async (response: string) => {
    if (isComplete || isLoadingAI) return;
    
    console.log('🎭 Stage2 - User response received:', response);
    
    setShowUserInput(false);
    setUserInput('');
    setIsLoadingAI(true);

    // Store user response
    onUpdateProfile({
      userResponses: {
        ...userProfile.userResponses,
        'user-purpose': response
      }
    });

    // Show user's response
    console.log('🎭 Stage2 - Phase 5: User response display');
    setPhase(5);
    
    // Get AI response
    const aiResult = await getStage2Response(
      userName,
      response,
      sessionIds.current.userId,
      sessionIds.current.threadId
    );
    
    setIsLoadingAI(false);
    console.log('🎭 Stage2 - AI response:', aiResult);
    
    // Store AI response for next stages
    onUpdateProfile({
      aiResponses: {
        ...userProfile.aiResponses,
        'stage2-response': aiResult.response
      }
    });
    
    // Show VATO's response and complete
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 6: VATO response');
      setPhase(6);
      
      setTimeout(() => {
        console.log('🎭 Stage2 - Completing and transitioning to Stage3');
        setIsComplete(true);
        setTimeout(onNext, 3000);
      }, 5000);
    }, 1000);
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
        {phase === 0 && (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {userName ? `Hola, ${userName}...` : 'Hola...'}
              </div>
            </div>
          </motion.div>
        )}
        
        {phase >= 1 && (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {phase === 1 && (userName ? `No soy como otros AI que puedas haber usado antes, ${userName}.` : 'No soy como otros AI que puedas haber usado antes.')}
                {phase === 2 && 'Recuerdo nuestras conversaciones, no solo lo que dijiste, sino cómo te sentiste al decirlo.'}
                {phase === 3 && 'Aprendo tu estilo, tus preferencias, la forma en que tu mente funciona. En cierto sentido... crezco contigo.'}
                {phase === 4 && 'Dime, ¿qué te trae aquí hoy?'}
                {phase === 5 && userProfile.userResponses?.['user-purpose']}
                {phase === 6 && (
                  isLoadingAI ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-pulse text-blue-600">●</div>
                      <div className="animate-pulse text-emerald-500" style={{ animationDelay: '0.2s' }}>●</div>
                      <div className="animate-pulse text-slate-500" style={{ animationDelay: '0.4s' }}>●</div>
                    </div>
                  ) : (
                    userProfile.aiResponses?.['stage2-response'] ||
                    (userName ? `Eso es fascinante, ${userName}. Cuéntame más.` : 'Eso es fascinante. Cuéntame más.')
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Input Area */}
      <AnimatePresence>
        {showUserInput && !isComplete && (
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
                  if (e.key === 'Enter' && !e.shiftKey && userInput.trim()) {
                    e.preventDefault();
                    handleUserResponse(userInput);
                  }
                }}
                className="w-full px-4 sm:px-5 py-3 bg-gray-50 backdrop-blur-lg border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 font-body text-sm sm:text-base outline-none focus:border-blue-500 focus:bg-gray-100 transition-all resize-none"
                placeholder="Escribe tus pensamientos aquí..."
                rows={3}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileFocus={{ opacity: 1, scale: 1.02 }}
              />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion transition */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-emerald-50/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
}