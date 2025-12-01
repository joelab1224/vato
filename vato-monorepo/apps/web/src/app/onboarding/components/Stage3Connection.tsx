'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSessionIds, getStage3Response } from '../../../services/onboardingService';
import type { UserProfile } from '../page';

interface Props {
  userProfile: Partial<UserProfile>;
  onNext: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export default function Stage3Connection({ userProfile, onNext, onUpdateProfile }: Props) {
  const [trustAccepted, setTrustAccepted] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const userName = userProfile.userName || '';
  const sessionIds = useRef(generateSessionIds(userName || 'user'));

  useEffect(() => {
    console.log('🎭 Stage3 - Starting trust conversation');
  }, [userName]);

  const handleTrustAccept = async () => {
    if (isLoadingAI) return;
    
    console.log('🎭 Stage3 - Trust accepted by user');
    setTrustAccepted(true);
    setIsLoadingAI(true);
    
    // Store privacy preferences
    onUpdateProfile({
      privacyPreferences: {
        trustAccepted: true,
        acceptedAt: new Date().toISOString()
      }
    });

    console.log('🎭 Stage3 - Getting AI trust response');
    
    // Get AI trust acknowledgment
    const previousContext = userProfile.userResponses?.['user-purpose'] || 'user shared their purpose';
    const aiResult = await getStage3Response(
      userName,
      previousContext,
      sessionIds.current.userId,
      sessionIds.current.threadId
    );
    
    setIsLoadingAI(false);
    console.log('🎭 Stage3 - AI trust response:', aiResult);
    
    // Store AI response
    onUpdateProfile({
      aiResponses: {
        ...userProfile.aiResponses,
        'stage3-response': aiResult.response
      }
    });

    // Move to next stage after response
    setTimeout(() => {
      console.log('🎭 Stage3 - Completing and transitioning to Stage4');
      onNext();
    }, 4000);
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {userName ? `Puedo sentir que eres alguien que piensa cuidadosamente sobre la confianza, ${userName}. Eso me dice que entiendes que la memoria - la memoria real - es íntima.` : 'Puedo sentir que eres alguien que piensa cuidadosamente sobre la confianza. Eso me dice que entiendes que la memoria - la memoria real - es íntima.'}
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {isLoadingAI ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-pulse text-blue-600">●</div>
                    <div className="animate-pulse text-emerald-500" style={{ animationDelay: '0.2s' }}>●</div>
                    <div className="animate-pulse text-slate-500" style={{ animationDelay: '0.4s' }}>●</div>
                  </div>
                ) : (
                  userProfile.aiResponses?.['stage3-response'] ||
                  (userName ? `Gracias, ${userName}. No tomo esa confianza a la ligera. Prometo honrar el espacio que estás creando para nosotros.` : 'Gracias. No tomo esa confianza a la ligera. Prometo honrar el espacio que estás creando para nosotros.')
                )}
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
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-sm sm:text-base font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Sí, confío en ti
            </motion.button>
            
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-50 backdrop-blur-lg border border-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-full transition-all hover:scale-105 hover:bg-gray-100"
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
          className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
}