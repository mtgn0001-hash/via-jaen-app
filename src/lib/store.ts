
"use client"

import { useState, useEffect } from 'react';

export type ThemeType = 'purple' | 'olive' | 'night' | 'contrast' | 'ocean' | 'red';
export type ProvinceType = 'jaen';
export type AccessibilityMode = 'standard' | 'visual' | 'auditory';

export type UserProfile = {
  name: string;
  nie: string;
  phone: string;
  photo?: string; // Base64 encoded image
};

export type UserProgress = {
  procedures: { [key: string]: boolean };
  checklist: { [key: string]: boolean };
  firstSteps: { [key: string]: boolean };
  language: string;
  onboardingCompleted: boolean;
  theme: ThemeType;
  province: ProvinceType;
  easyReading: boolean;
  accessibilityMode: AccessibilityMode;
  profile: UserProfile;
};

const STORAGE_KEY = 'jaen_integra_storage';

const defaultProgress: UserProgress = {
  procedures: {},
  checklist: {},
  firstSteps: {
    empadronamiento: false,
    health: false,
    transport: false,
  },
  language: 'es',
  onboardingCompleted: false,
  theme: 'olive',
  province: 'jaen',
  easyReading: false,
  accessibilityMode: 'standard',
  profile: {
    name: '',
    nie: '',
    phone: '',
  }
};

export function useLocalStorage() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress({ ...defaultProgress, ...parsed });
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => {
      const newProgress = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const updateProfile = (profileUpdates: Partial<UserProfile>) => {
    updateProgress({
      profile: { ...progress.profile, ...profileUpdates }
    });
  };

  const toggleProcedure = (id: string) => {
    const newProcedures = { ...progress.procedures, [id]: !progress.procedures[id] };
    updateProgress({ procedures: newProcedures });
  };

  const toggleChecklist = (id: string) => {
    const newChecklist = { ...progress.checklist, [id]: !progress.checklist[id] };
    updateProgress({ checklist: newChecklist });
  };

  const toggleFirstStep = (id: string) => {
    const newFirstSteps = { ...progress.firstSteps, [id]: !progress.firstSteps[id] };
    updateProgress({ firstSteps: newFirstSteps });
  };

  const calculateCompletion = () => {
    const totalItems = 15;
    const completedItems = 
      Object.values(progress.procedures).filter(Boolean).length +
      Object.values(progress.checklist).filter(Boolean).length +
      Object.values(progress.firstSteps).filter(Boolean).length;
    return Math.min(Math.round((completedItems / totalItems) * 100), 100);
  };

  return {
    progress,
    updateProgress,
    updateProfile,
    toggleProcedure,
    toggleChecklist,
    toggleFirstStep,
    calculateCompletion,
    isLoaded
  };
}
