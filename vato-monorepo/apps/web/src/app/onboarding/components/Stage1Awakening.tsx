'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceInput, useVoiceSynthesis } from '../hooks/useVoiceInput';
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
  
  const { speak, isSpeaking } = useVoiceSynthesis();
  const { 
    isListening, 
    isSupported: voiceSupported, 
    transcript,
    startListening, 
    stopListening,
    resetTranscript 
  } = useVoiceInput({
    onResult: (text, isFinal) => {
      if (isFinal && text.trim()) {
        handleUserInput(text.trim());
      }
    }
  });

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
          
          // Text-to-speech (only if not currently speaking)
          setTimeout(() => speak(speech.text), 500);
          
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
      speak(response);
      
      // Update profile and transition
      onUpdateProfile({ userName: name });
      
      setTimeout(() => {
        console.log('🎭 Stage1 - Completing and transitioning to Stage2');
        setIsComplete(true);
        setTimeout(onNext, 2000);
      }, 3000);
    }, 500);
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

      {/* Consciousness Particles */}
      {isClient && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, #8b5cf6, rgba(139, 92, 246, 0.3))`,
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
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-white/90 leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed text-shadow-lg mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
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
            {/* Voice Input Indicator */}
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
                🎙️
              </motion.div>
            </motion.div>

            <p className="text-xs text-white/60 font-body italic mb-4 text-center">
              💭 Puedes hablar o escribir...
            </p>

            {/* Text Input Fallback */}
            <motion.input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && userName.trim() && handleUserInput(userName)}
              className="w-full px-4 sm:px-5 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder-white/50 font-body text-sm sm:text-base outline-none focus:border-violet-500 focus:bg-white/15 transition-all"
              placeholder="Escribe aquí..."
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: voiceSupported ? 0.7 : 1, scale: 1 }}
              whileFocus={{ opacity: 1, scale: 1.02 }}
            />

            {/* Voice transcript display */}
            {transcript && (
              <motion.p 
                className="mt-2 text-sm text-white/80 italic text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                "{transcript}"
              </motion.p>
            )}
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