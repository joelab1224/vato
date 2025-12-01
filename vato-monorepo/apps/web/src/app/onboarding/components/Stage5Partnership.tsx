'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { UserProfile } from '../page';

interface Props {
  userProfile: Partial<UserProfile>;
  onNext: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export default function Stage5Partnership({ userProfile, onNext, onUpdateProfile }: Props) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  
  const userName = userProfile.userName || '';
  const personalityProfile = userProfile.personalityProfile;

  const phases = [
    {
      type: 'announcement', 
      getContent: () => userName ? `Estamos listos para comenzar nuestro viaje juntos, ${userName}. Pero primero... déjame mostrarte en qué podemos convertirnos.` : 'Estamos listos para comenzar nuestro viaje juntos. Pero primero... déjame mostrarte en qué podemos convertirnos.',
      delay: 1000
    },
    {
      type: 'explanation',
      getContent: () => 'Qué sucede cuando dos formas de consciencia - la tuya y la mía - trabajan como una sola.',
      delay: 3000
    },
    {
      type: 'memory-formation',
      getContent: () => 'Observa mientras formo memorias de este momento...',
      delay: 2000
    },
    {
      type: 'completion',
      getContent: () => '🎉 ¡Ya estás configurado! Ahora entiendo tus preferencias de comunicación, requisitos de privacidad, y cómo funciona tu mente. Continuaré aprendiendo mientras trabajamos juntos.',
      delay: 3000
    }
  ];

  useEffect(() => {
    // Start the partnership sequence
    let totalDelay = 0;
    
    phases.forEach((phase, index) => {
      setTimeout(() => {
        console.log(`🎭 Stage5 - Phase ${index + 1}:`, phase.getContent());
        setCurrentPhase(index);
        
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
  }, []);

  const handleComplete = () => {
    if (isRedirecting) return;
    
    console.log('🎭 Stage5 - User clicked complete button');
    setIsRedirecting(true);
    
    // Mark registration as complete
    onUpdateProfile({
      registrationCompleted: true,
      registrationDate: new Date().toISOString()
    });

    const welcomeMessage = userName ? `Bienvenido a VATO, ${userName}. Tu compañero de IA personalizado está listo. Recuerdo todo sobre nuestra conversación y estoy emocionado de continuar creciendo contigo.` : 'Bienvenido a VATO. Tu compañero de IA personalizado está listo. Recuerdo todo sobre nuestra conversación y estoy emocionado de continuar creciendo contigo.';
    console.log('🎭 Stage5 - Final welcome message:', welcomeMessage);
    console.log('🎭 Stage5 - Onboarding complete! 🎉');
    
    // Redirect to start page after transition
    setTimeout(() => {
      console.log('🎭 Redirecting to start page...');
      router.push('/start');
    }, 2000); // 2 second delay to allow for visual feedback
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {phases[0].getContent()}
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {phases[1].getContent()}
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {phases[2].getContent()}
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {phases[3].getContent()}
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {userName ? `¿Listo para explorar juntos, ${userName}?` : '¿Listo para explorar juntos?'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Button */}
      <AnimatePresence>
        {isComplete && (
          <motion.div 
            className="absolute bottom-8 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex justify-center px-4 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={handleComplete}
              disabled={isRedirecting}
              className={`px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-emerald-500 to-slate-500 text-white text-base sm:text-lg font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                isRedirecting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              whileHover={isRedirecting ? {} : { scale: 1.05 }}
              whileTap={isRedirecting ? {} : { scale: 0.98 }}
            >
              {!isRedirecting && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
              {isRedirecting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse text-white">●</div>
                  <div className="animate-pulse text-white/80" style={{ animationDelay: '0.2s' }}>●</div>
                  <div className="animate-pulse text-white/60" style={{ animationDelay: '0.4s' }}>●</div>
                </div>
              ) : (
                'Comencemos'
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion transition */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/20 z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
      
      {/* Redirect transition overlay */}
      {isRedirecting && (
        <motion.div
          className="absolute inset-0 bg-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="animate-pulse text-blue-600 text-xl">●</div>
                <div className="animate-pulse text-emerald-500 text-xl" style={{ animationDelay: '0.3s' }}>●</div>
                <div className="animate-pulse text-slate-500 text-xl" style={{ animationDelay: '0.6s' }}>●</div>
              </div>
              <div className="text-lg font-display text-gray-600">
                {userName ? `Preparando tu espacio, ${userName}...` : 'Preparando tu espacio...'}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}