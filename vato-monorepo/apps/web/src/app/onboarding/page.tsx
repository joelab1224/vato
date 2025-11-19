'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stage1Awakening from './components/Stage1Awakening';
import Stage2Introduction from './components/Stage2Introduction';
import Stage3Connection from './components/Stage3Connection';
import Stage4Understanding from './components/Stage4Understanding';
import Stage5Partnership from './components/Stage5Partnership';

export interface UserProfile {
  userName: string;
  userResponses: Record<string, any>;
  personalityProfile: {
    thinkingStyle: 'structured' | 'creative' | 'intuitive';
    sentiment: 'excited' | 'thoughtful' | 'curious';
    passionLevel: number;
    communicationStyle: string;
    topics: string[];
  };
  privacyPreferences: Record<string, any>;
  registrationCompleted: boolean;
  registrationDate?: string;
}

const STORAGE_KEY = 'vatoRegistration';

export default function RegisterPage() {
  const [currentStage, setCurrentStage] = useState(1);
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({
    userResponses: {},
    personalityProfile: {
      thinkingStyle: 'intuitive',
      sentiment: 'curious',
      passionLevel: 3,
      communicationStyle: '',
      topics: []
    },
    privacyPreferences: {},
    registrationCompleted: false
  });

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setUserProfile(data);
        setCurrentStage(data.currentStage || 1);
      } catch (error) {
        console.log('No saved progress found');
      }
    }
  }, []);

  // Save progress
  const saveProgress = (updates: Partial<UserProfile>) => {
    const updatedProfile = { ...userProfile, ...updates, currentStage };
    setUserProfile(updatedProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
  };

  const goToNextStage = () => {
    const nextStage = Math.min(currentStage + 1, 5);
    setCurrentStage(nextStage);
    saveProgress({ currentStage: nextStage });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    saveProgress(updates);
  };

  const stages = [
    { id: 1, component: Stage1Awakening },
    { id: 2, component: Stage2Introduction },
    { id: 3, component: Stage3Connection },
    { id: 4, component: Stage4Understanding },
    { id: 5, component: Stage5Partnership }
  ];

  const CurrentStageComponent = stages.find(s => s.id === currentStage)?.component;

  if (!CurrentStageComponent) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <CurrentStageComponent
            userProfile={userProfile}
            onNext={goToNextStage}
            onUpdateProfile={updateProfile}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}