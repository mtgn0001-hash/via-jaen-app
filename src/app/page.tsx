"use client"

import { useState } from "react";
import { useLocalStorage } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Header } from "@/components/dashboard/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProcedureList } from "@/components/procedures/ProcedureList";
import { FormDownloader } from "@/components/forms/FormDownloader";
import { EmergencyTab } from "@/components/emergency/EmergencyTab";
import { ResourceDirectory } from "@/components/directory/ResourceDirectory";
import { Language } from "@/lib/translations";

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    progress, 
    updateProgress, 
    toggleProcedure, 
    calculateCompletion,
    isLoaded
  } = useLocalStorage();

  if (!isLoaded) return null;

  const setLang = (lang: Language) => updateProgress({ language: lang });
  const lang = (progress.language as Language) || 'es';

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto pb-20 overflow-x-hidden">
      <Header 
        lang={lang} 
        setLang={setLang} 
        completion={calculateCompletion()} 
      />

      <main className="flex-1 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'dashboard' && (
          <Dashboard lang={lang} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'procedures' && (
          <ProcedureList 
            lang={lang} 
            toggleProcedure={toggleProcedure} 
            completedProcedures={progress.procedures} 
          />
        )}
        {activeTab === 'forms' && (
          <FormDownloader lang={lang} />
        )}
        {activeTab === 'directory' && (
          <ResourceDirectory lang={lang} />
        )}
        {activeTab === 'emergency' && (
          <EmergencyTab lang={lang} />
        )}
      </main>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
      />
    </div>
  );
}