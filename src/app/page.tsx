
"use client"

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Header } from "@/components/dashboard/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProcedureList } from "@/components/procedures/ProcedureList";
import { FormDownloader } from "@/components/forms/FormDownloader";
import { EmergencyTab } from "@/components/emergency/EmergencyTab";
import { ResourceDirectory } from "@/components/directory/ResourceDirectory";
import { FamilyResources } from "@/components/family/FamilyResources";
import { StudyUJA } from "@/components/study/StudyUJA";
import { WorkTab } from "@/components/work/WorkTab";
import { IntegrationTab } from "@/components/integration/IntegrationTab";
import { TransportTab } from "@/components/transport/TransportTab";
import { Language, translations } from "@/lib/translations";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    progress, 
    updateProgress, 
    toggleProcedure, 
    calculateCompletion,
    isLoaded
  } = useLocalStorage();

  const lang = (progress.language as Language) || 'es';
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  if (!isLoaded) return null;

  const setLang = (newLang: Language) => updateProgress({ language: newLang });
  const t = translations[lang];

  return (
    <div 
      className="min-h-screen bg-background flex flex-col max-w-lg mx-auto pb-24 overflow-x-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
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
        {activeTab === 'work' && (
          <WorkTab lang={lang} />
        )}
        {activeTab === 'family' && (
          <FamilyResources lang={lang} />
        )}
        {activeTab === 'study' && (
          <StudyUJA lang={lang} />
        )}
        {activeTab === 'transport' && (
          <TransportTab lang={lang} />
        )}
        {activeTab === 'integration' && (
          <IntegrationTab lang={lang} />
        )}
        {activeTab === 'directory' && (
          <ResourceDirectory lang={lang} />
        )}
        {activeTab === 'emergency' && (
          <EmergencyTab lang={lang} />
        )}

        <section className="mt-8 mb-4 px-2">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-primary/40 shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-normal">
              {t.disclaimer}
            </p>
          </div>
        </section>
      </main>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
      />
    </div>
  );
}
