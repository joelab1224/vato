'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceInput, useVoiceSynthesis } from '../hooks/useVoiceInput';
import { generateContextualResponse } from '../utils/consciousness';
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

  const { speak } = useVoiceSynthesis();
  const { 
    isListening, 
    transcript,
    startListening, 
    stopListening,
    resetTranscript 
  } = useVoiceInput({
    onResult: (text, isFinal) => {
      if (isFinal && text.trim()) {
        handleUserResponse(text.trim());
      }
    }
  });

  const userName = userProfile.userName || 'friend';

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
      speak(`No soy como otros AI que puedas haber usado antes, ${userName}.`);
    }, 1000);

    // Phase 2: Memory explanation
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 2: Memory explanation');
      setPhase(2);
      speak('Recuerdo nuestras conversaciones, no solo lo que dijiste, sino cómo te sentiste al decirlo.');
    }, 4000);

    // Phase 3: Growth concept
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 3: Growth concept');
      setPhase(3);
      speak('Aprendo tu estilo, tus preferencias, la forma en que tu mente funciona. En cierto sentido... crezco contigo.');
    }, 7500);

    // Phase 4: User prompt
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 4: User prompt');
      setPhase(4);
      speak('Dime, ¿qué te trae aquí hoy?');
      setTimeout(() => {
        console.log('🎭 Stage2 - Showing user input');
        setShowUserInput(true);
      }, 3000);
    }, 11000);
  };

  const handleUserResponse = (response: string) => {
    if (isComplete) return;
    
    console.log('🎭 Stage2 - User response received:', response);
    
    setShowUserInput(false);
    setUserInput('');
    resetTranscript();
    stopListening();

    // Generate VATO's contextual response
    const vatoResponse = generateContextualResponse(response, userName, 'introduction');
    console.log('🎭 Stage2 - Generated response:', vatoResponse);
    
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
    
    // Show VATO's response and complete
    setTimeout(() => {
      console.log('🎭 Stage2 - Phase 6: VATO response');
      setPhase(6);
      speak(vatoResponse);
      
      setTimeout(() => {
        console.log('🎭 Stage2 - Completing and transitioning to Stage3');
        setIsComplete(true);
        setTimeout(onNext, 3000);
      }, 5000);
    }, 1000);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-body">
      {/* Breathing Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 40%, rgba(0, 0, 0, 0.9) 70%, #000 100%)',
            'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(147, 51, 234, 0.08) 40%, rgba(0, 0, 0, 0.85) 70%, #000 100%)',
            'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 40%, rgba(0, 0, 0, 0.9) 70%, #000 100%)'
          ],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                Hola, {userName}...
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {phase === 1 && `No soy como otros AI que puedas haber usado antes, ${userName}.`}
                {phase === 2 && 'Recuerdo nuestras conversaciones, no solo lo que dijiste, sino cómo te sentiste al decirlo.'}
                {phase === 3 && 'Aprendo tu estilo, tus preferencias, la forma en que tu mente funciona. En cierto sentido... crezco contigo.'}
                {phase === 4 && 'Dime, ¿qué te trae aquí hoy?'}
                {phase === 5 && userProfile.userResponses?.['user-purpose']}
                {phase === 6 && (
                  userProfile.userResponses?.['user-purpose'] ? 
                    generateContextualResponse(
                      userProfile.userResponses['user-purpose'], 
                      userName, 
                      'introduction'
                    ) : 
                    `Eso es fascinante, ${userName}. Cuéntame más.`
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
            className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 sm:px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              {/* Voice Input */}
              <motion.div 
                className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer mb-4"
                onClick={handleVoiceToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Pulse Ring */}
                <motion.div 
                  className="absolute w-14 h-14 sm:w-16 sm:h-16 border-2 border-violet-500 rounded-full"
                  animate={{
                    scale: [0.8, 1.4],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                
                {/* Microphone Icon */}
                <motion.div 
                  className="text-xl sm:text-2xl z-10"
                  animate={{
                    scale: isListening ? 1.1 : 1
                  }}
                >
                  {isListening ? '🔴' : '🎙️'}
                </motion.div>
              </motion.div>

              <p className="text-xs text-white/60 font-body italic mb-4 text-center">
                💭 Puedes hablar o escribir...
              </p>

              {/* Text Input */}
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && userInput.trim()) {
                    e.preventDefault();
                    handleUserResponse(userInput);
                  }
                }}
                className="w-full px-4 sm:px-5 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder-white/50 font-body text-sm sm:text-base outline-none focus:border-violet-500 focus:bg-white/15 transition-all"
                placeholder="Escribe tus pensamientos aquí..."
                rows={3}
              />

              {/* Voice transcript display */}
              {transcript && (
                <motion.p 
                  className="mt-2 text-sm text-gray-600 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  "{transcript}"
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion transition */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-purple-100/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
}