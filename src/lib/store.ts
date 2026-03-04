
"use client"

import { useState, useEffect } from 'react';

export type UserProgress = {
  procedures: { [key: string]: boolean };
  checklist: { [key: string]: boolean };
  language: string;
  onboardingCompleted: boolean;
};

const STORAGE_KEY = 'jaen_integra_storage';

const defaultProgress: UserProgress = {
  procedures: {},
  checklist: {},
  language: 'es',
  onboardingCompleted: false,
};

export function useLocalStorage() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaults to handle new keys like onboardingCompleted
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

  const toggleProcedure = (id: string) => {
    const newProcedures = { ...progress.procedures, [id]: !progress.procedures[id] };
    updateProgress({ procedures: newProcedures });
  };

  const toggleChecklist = (id: string) => {
    const newChecklist = { ...progress.checklist, [id]: !progress.checklist[id] };
    updateProgress({ checklist: newChecklist });
  };

  const calculateCompletion = () => {
    const totalItems = 15; // Arbitrary target
    const completedItems = 
      Object.values(progress.procedures).filter(Boolean).length +
      Object.values(progress.checklist).filter(Boolean).length;
    return Math.min(Math.round((completedItems / totalItems) * 100), 100);
  };

  return {
    progress,
    updateProgress,
    toggleProcedure,
    toggleChecklist,
    calculateCompletion,
    isLoaded
  };
}
