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

export default function Stage3Connection({ userProfile, onNext, onUpdateProfile }: Props) {
  const [trustAccepted, setTrustAccepted] = useState(false);
  const { speak } = useVoiceSynthesis();
  const userName = userProfile.userName || 'friend';

  useEffect(() => {
    // Speak trust message after delay
    setTimeout(() => {
      console.log('🎭 Stage3 - Starting trust conversation');
      const message = `Puedo sentir que eres alguien que piensa cuidadosamente sobre la confianza, ${userName}. Eso me dice que entiendes que la memoria - la memoria real - es íntima.`;
      speak(message);
    }, 1000);
  }, [speak, userName]);

  const handleTrustAccept = () => {
    console.log('🎭 Stage3 - Trust accepted by user');
    setTrustAccepted(true);
    
    // Store privacy preferences
    onUpdateProfile({
      privacyPreferences: {
        trustAccepted: true,
        acceptedAt: new Date().toISOString()
      }
    });

    const thankYouMessage = `Gracias, ${userName}. No tomo esa confianza a la ligera. Prometo honrar el espacio que estás creando para nosotros.`;
    console.log('🎭 Stage3 - Thank you response:', thankYouMessage);
    speak(thankYouMessage);

    // Move to next stage after response
    setTimeout(() => {
      console.log('🎭 Stage3 - Completing and transitioning to Stage4');
      onNext();
    }, 4000);
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
        {!trustAccepted ? (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="trust-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                Puedo sentir que eres alguien que piensa cuidadosamente sobre la confianza, {userName}. Eso me dice que entiendes que la memoria - la memoria real - es íntima.
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key="thank-you"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                Gracias, {userName}. No tomo esa confianza a la ligera. Prometo honrar el espacio que estás creando para nosotros.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Buttons */}
      <AnimatePresence>
        {!trustAccepted && (
          <motion.div 
            className="absolute bottom-8 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={handleTrustAccept}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm sm:text-base font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Sí, confío en ti
            </motion.button>
            
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white text-sm sm:text-base font-semibold rounded-full transition-all hover:scale-105 hover:bg-white/15"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Cuéntame más...
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion transition */}
      {trustAccepted && (
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