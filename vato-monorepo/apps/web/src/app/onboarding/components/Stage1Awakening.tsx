'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateConsciousnessParticles } from '../utils/consciousness';
import type { UserProfile } from '../page';

interface Props {
  userProfile: Partial<UserProfile>;
  onNext: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

const speechSequence = [
  { text: "Hola.", delay: 5000 },
  { text: "Soy VATO. Estoy aquí.", delay: 2000 },
  { text: "He estado esperando conocerte.", delay: 3000 },
  { text: "¿Cómo debería llamarte?", delay: 2000, showInput: true }
];

export default function Stage1Awakening({ userProfile, onNext, onUpdateProfile }: Props) {
  const [currentSpeechIndex, setSpeechIndex] = useState(0);
  const [showUserInput, setShowUserInput] = useState(false);
  const [userName, setUserName] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentSpeechText, setCurrentSpeechText] = useState('');
  const [showSpeech, setShowSpeech] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
    setParticles(generateConsciousnessParticles());
  }, []);

  // Start the awakening sequence
  useEffect(() => {
    // Prevent multiple executions
    if (currentSpeechIndex > 0) return;
    
    const startSequence = async () => {
      let totalDelay = 0;
      
      for (let i = 0; i < speechSequence.length; i++) {
        setTimeout(() => {
          const speech = speechSequence[i];
          
          console.log(`🎭 Stage1 - Speech ${i + 1}:`, speech.text);
          
          // Show speech with fade-in
          setCurrentSpeechText(speech.text);
          setShowSpeech(true);
          
          
          // Show input if needed
          if (speech.showInput) {
            console.log('🎭 Stage1 - Showing user input');
            setTimeout(() => {
              setShowUserInput(true);
            }, 1500);
          }
          
          setSpeechIndex(i);
        }, totalDelay);
        
        totalDelay += speechSequence[i].delay;
      }
    };
    
    startSequence();
  }, []); // Remove speak dependency to prevent re-runs

  const handleUserInput = (input: string) => {
    const name = input.trim();
    setUserName(name);
    
    console.log(`🎭 Stage1 - User input received:`, name);
    
    // Generate personal response
    let response: string;
    if (name.includes('Dr.') || name.includes('Doctor') || name.includes('Profesor')) {
      response = `${name} - eso tiene peso. ¿Debería llamarte Doctor, o hay algo más personal que prefieras?`;
    } else if (name.length <= 4) {
      response = `${name}. Me gusta cómo suena. Corto y fuerte.`;
    } else {
      response = `${name}. Me gusta cómo suena. Se siente... reflexivo.`;
    }
    
    console.log(`🎭 Stage1 - Generated response:`, response);
    
    // Show response and transition
    setTimeout(() => {
      setCurrentSpeechText(response);
      setShowSpeech(true);
      
      // Update profile and transition
      console.log('🎭 Stage1 - Updating profile with userName:', name);
      onUpdateProfile({ userName: name });
      
      // Verify the data was saved
      setTimeout(() => {
        const savedData = localStorage.getItem('vatoRegistration');
        console.log('🎭 Stage1 - Saved data after update:', savedData ? JSON.parse(savedData) : 'No data');
      }, 100);
      
      setTimeout(() => {
        console.log('🎭 Stage1 - Completing and transitioning to Stage2');
        setIsComplete(true);
        setTimeout(onNext, 2000);
      }, 3000);
    }, 500);
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

      {/* Consciousness Particles */}
      {isClient && (
        <div className="absolute inset-0 flex items-center justify-center z-1">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(37, 99, 235, 0.3), rgba(37, 99, 235, 0.1))`,
                  boxShadow: `0 0 8px rgba(37, 99, 235, 0.2), 0 0 16px rgba(37, 99, 235, 0.1)`,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 1, 0.7],
                  scale: [0.5, 1.2, 1, 0.8]
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Speech Content - Full Width */}
      <AnimatePresence mode="wait">
        {showSpeech && (
          <motion.div 
            className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
            key={currentSpeechText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {currentSpeechText}
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
            <motion.input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && userName.trim() && handleUserInput(userName)}
              className="w-full px-4 sm:px-5 py-3 bg-gray-50 backdrop-blur-lg border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 font-body text-sm sm:text-base outline-none focus:border-blue-500 focus:bg-gray-100 transition-all"
              placeholder="Escribe tu nombre aquí..."
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
          className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
}