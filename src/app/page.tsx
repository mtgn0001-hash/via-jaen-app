
"use client"

import { useState, useEffect } from "react";
import { useLocalStorage, Language as LanguageType } from "@/lib/store";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/dashboard/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProcedureList } from "@/components/procedures/ProcedureList";
import { ResourceDirectory } from "@/components/directory/ResourceDirectory";
import { FamilyResources } from "@/components/family/FamilyResources";
import { StudyUJA } from "@/components/study/StudyUJA";
import { WorkTab } from "@/components/work/WorkTab";
import { EmploymentPortal } from "@/components/work/EmploymentPortal";
import { IntegrationTab } from "@/components/integration/IntegrationTab";
import { TransportTab } from "@/components/transport/TransportTab";
import { EmergencyTab } from "@/components/emergency/EmergencyTab";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { DocumentChecklist } from "@/components/procedures/DocumentChecklist";
import { WifiPoints } from "@/components/directory/WifiPoints";
import { Flashcards } from "@/components/integration/Flashcards";
import { Language, translations } from "@/lib/translations";
import { AlertCircle, ShieldAlert } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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
    if (isLoaded) {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-theme', progress.theme);
    }
  }, [lang, isRTL, progress.theme, isLoaded]);

  if (!isLoaded) return null;

  const setLang = (newLang: Language) => updateProgress({ language: newLang });
  const setTheme = (newTheme: any) => updateProgress({ theme: newTheme });
  const t = translations[lang];

  return (
    <SidebarProvider>
      <div 
        className="flex min-h-screen bg-background w-full"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <AppSidebar 
          lang={lang} 
          setLang={setLang} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          currentTheme={progress.theme}
          setTheme={setTheme}
        />

        <SidebarInset className="flex-1 overflow-x-hidden">
          {!progress.onboardingCompleted && (
            <Onboarding 
              lang={lang} 
              onComplete={() => updateProgress({ onboardingCompleted: true })} 
            />
          )}

          <Header 
            lang={lang} 
            completion={calculateCompletion()} 
          />

          <main className="flex-1 p-4 pb-20 max-w-lg mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'dashboard' && (
              <Dashboard lang={lang} setActiveTab={setActiveTab} />
            )}
            
            {activeTab === 'procedures' && (
              <div className="space-y-8">
                <DocumentChecklist lang={lang} />
                <ProcedureList 
                  lang={lang} 
                  toggleProcedure={toggleProcedure} 
                  completedProcedures={progress.procedures} 
                />
              </div>
            )}

            {activeTab === 'family' && (
              <FamilyResources lang={lang} />
            )}

            {activeTab === 'study' && (
              <StudyUJA lang={lang} />
            )}

            {activeTab === 'employment' && (
              <EmploymentPortal lang={lang} />
            )}

            {activeTab === 'work' && (
              <WorkTab lang={lang} />
            )}

            {activeTab === 'community' && (
              <div className="space-y-8">
                <IntegrationTab lang={lang} />
                <Flashcards lang={lang} />
              </div>
            )}

            {activeTab === 'directory' && (
              <div className="space-y-8">
                <WifiPoints lang={lang} />
                <ResourceDirectory lang={lang} />
                <TransportTab lang={lang} />
              </div>
            )}

            {activeTab === 'emergency' && (
              <EmergencyTab lang={lang} />
            )}

            {activeTab === 'employment_portal' && (
              <EmploymentPortal lang={lang} />
            )}

            <section className="mt-8 mb-4 px-2 space-y-3">
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-primary/40 shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-normal font-medium">
                  {t.disclaimer}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                <ShieldAlert className="h-5 w-5 text-blue-400 shrink-0" />
                <p className="text-[10px] text-blue-700 leading-normal font-bold">
                  {t.privacyNotice}
                </p>
              </div>
            </section>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
