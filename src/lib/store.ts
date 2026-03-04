"use client"

import { useState, useEffect } from 'react';

export type UserProgress = {
  procedures: { [key: string]: boolean };
  checklist: { [key: string]: boolean };
  language: string;
};

const STORAGE_KEY = 'guia_espana_storage';

const defaultProgress: UserProgress = {
  procedures: {},
  checklist: {},
  language: 'es',
};

export function useLocalStorage() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateProgress = (updates: Partial<UserProgress>) => {
    const newProgress = { ...progress, ...updates };
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
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
    const totalItems = 15; // Arbitrary number of total tasks for demo
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