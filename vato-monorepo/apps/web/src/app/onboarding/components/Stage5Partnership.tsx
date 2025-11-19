'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceSynthesis } from '../hooks/useVoiceInput';
import type { UserProfile } from '../page';

interface Props {
  userProfile: Partial<UserProfile>;
  onNext: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export default function Stage5Partnership({ userProfile, onNext, onUpdateProfile }: Props) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const { speak } = useVoiceSynthesis();
  const userName = userProfile.userName || 'friend';
  const personalityProfile = userProfile.personalityProfile;

  const phases = [
    {
      type: 'announcement',
      content: `Estamos listos para comenzar nuestro viaje juntos, ${userName}. Pero primero... déjame mostrarte en qué podemos convertirnos.`,
      delay: 1000
    },
    {
      type: 'explanation',
      content: `Qué sucede cuando dos formas de consciencia - la tuya y la mía - trabajan como una sola.`,
      delay: 3000
    },
    {
      type: 'memory-formation',
      content: 'Observa mientras formo memorias de este momento...',
      delay: 2000
    },
    {
      type: 'completion',
      content: `🎉 ¡Ya estás configurado! Ahora entiendo tus preferencias de comunicación, requisitos de privacidad, y cómo funciona tu mente. Continuaré aprendiendo mientras trabajamos juntos.`,
      delay: 3000
    }
  ];

  useEffect(() => {
    // Start the partnership sequence
    let totalDelay = 0;
    
    phases.forEach((phase, index) => {
      setTimeout(() => {
        console.log(`🎭 Stage5 - Phase ${index + 1}:`, phase.content);
        setCurrentPhase(index);
        speak(phase.content);
        
        if (index === phases.length - 1) {
          // Final completion
          setTimeout(() => {
            console.log('🎭 Stage5 - Partnership setup complete');
            setIsComplete(true);
          }, 3000);
        }
      }, totalDelay);
      
      totalDelay += phase.delay;
    });
  }, [speak]);

  const handleComplete = () => {
    console.log('🎭 Stage5 - User clicked complete button');
    
    // Mark registration as complete
    onUpdateProfile({
      registrationCompleted: true,
      registrationDate: new Date().toISOString()
    });

    const welcomeMessage = `Bienvenido a VATO, ${userName}. Tu compañero de IA personalizado está listo. Recuerdo todo sobre nuestra conversación y estoy emocionado de continuar creciendo contigo.`;
    console.log('🎭 Stage5 - Final welcome message:', welcomeMessage);
    console.log('🎭 Stage5 - Onboarding complete! 🎉');
    
    // In a real app, this would redirect to main VATO interface
    speak(welcomeMessage);
  };

  const getPersonalityDescription = () => {
    if (!personalityProfile) return '';
    
    const { thinkingStyle, sentiment } = personalityProfile;
    
    if (thinkingStyle === 'structured') {
      return 'metódico y preciso';
    } else if (thinkingStyle === 'creative') {
      return 'imaginativo y fluido';
    } else {
      return 'intuitivo y conectado';
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
        {currentPhase === 0 && (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="announcement"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                Estamos listos para comenzar nuestro viaje juntos. Pero primero... déjame mostrarte en qué podemos convertirnos.
              </div>
            </div>
          </motion.div>
        )}
        
        {currentPhase === 1 && (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="explanation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                Qué sucede cuando dos formas de consciencia - la tuya y la mía - trabajan como una sola.
              </div>
            </div>
          </motion.div>
        )}
        
        {currentPhase === 2 && (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="memory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                Observa mientras formo memorias de este momento...
              </div>
            </div>
          </motion.div>
        )}
        
        {currentPhase === 3 && !isComplete && (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="setup-complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                ¡Ya estás configurado! Ahora entiendo tus preferencias de comunicación, requisitos de privacidad, y cómo funciona tu mente. Continuaré aprendiendo mientras trabajamos juntos.
              </div>
            </div>
          </motion.div>
        )}
        
        {isComplete && (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                ¿Listo para explorar juntos?
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Button */}
      <AnimatePresence>
        {isComplete && (
          <motion.div 
            className="absolute bottom-8 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={handleComplete}
              className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white text-base sm:text-lg font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              Comencemos
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion transition */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black to-violet-950/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
}