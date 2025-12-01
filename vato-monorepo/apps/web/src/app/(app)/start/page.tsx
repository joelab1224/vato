'use client';

import { useEffect, useState } from 'react';

interface UserProfile {
  userName?: string;
  registrationCompleted?: boolean;
  // Add other fields as needed
}

export default function StartPage() {
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage (same key as onboarding)
    const savedData = localStorage.getItem('vatoRegistration');
    console.log('🏁 Start Page - Raw saved data:', savedData);
    
    if (savedData) {
      try {
        const profile: UserProfile = JSON.parse(savedData);
        console.log('🏁 Start Page - Parsed profile:', profile);
        console.log('🏁 Start Page - userName from profile:', profile.userName);
        setUserName(profile.userName || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.log('🏁 Start Page - No saved data found');
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-pulse text-blue-600">●</div>
          <div className="animate-pulse text-emerald-500" style={{ animationDelay: '0.2s' }}>●</div>
          <div className="animate-pulse text-slate-500" style={{ animationDelay: '0.4s' }}>●</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display text-gray-800">
          {userName ? `Bienvenido, ${userName}` : 'Bienvenido'}
        </h1>
        <p className="text-gray-600 mt-2 font-body">
          Tu espacio está listo
        </p>
      </div>
    </div>
  )
}
