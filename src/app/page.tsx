"use client"

import { useState, useEffect } from "react";
import { useLocalStorage, ThemeType } from "@/lib/store";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/dashboard/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProcedureList } from "@/components/procedures/ProcedureList";
import { ResourceDirectory } from "@/components/directory/ResourceDirectory";
import { FamilyResources } from "@/components/family/FamilyResources";
import { StudyUJA } from "@/components/study/StudyUJA";
import { EmploymentPortal } from "@/components/work/EmploymentPortal";
import { EmergencyTab } from "@/components/emergency/EmergencyTab";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { DocumentChecklist } from "@/components/procedures/DocumentChecklist";
import { FormVisualGuide } from "@/components/procedures/FormVisualGuide";
import { WifiPoints } from "@/components/directory/WifiPoints";
import { Language, translations } from "@/lib/translations";
import { CommonAndalucia } from "@/components/regional/CommonAndalucia";
import { AlertCircle } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { EmergencyFAB } from "@/components/layout/EmergencyFAB";
import { UserProfile } from "@/components/profile/UserProfile";
import { TransportTab } from "@/components/transport/TransportTab";
import { DocumentScanner } from "@/components/tools/DocumentScanner";
import { JaenBot } from "@/components/tools/JaenBot";
import { DocumentVault } from "@/components/profile/DocumentVault";

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    progress, 
    updateProgress, 
    updateProfile,
    toggleProcedure, 
    toggleChecklist,
    toggleFirstStep,
    calculateCompletion,
    isLoaded
  } = useLocalStorage();

  const lang = (progress.language as Language) || 'es';
  const isRTL = lang === 'ar';
  const isEasy = progress.easyReading;
  const accMode = progress.accessibilityMode || 'standard';

  const t = translations[lang] || translations.es;

  useEffect(() => {
    if (isLoaded) {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-theme', progress.theme);
      document.documentElement.setAttribute('data-easy-reading', String(isEasy));
      document.documentElement.setAttribute('data-accessibility', accMode);
    }
  }, [lang, isRTL, progress.theme, isLoaded, isEasy, accMode]);

  if (!isLoaded) return null;

  const setLang = (newLang: Language) => updateProgress({ language: newLang });
  const setTheme = (newTheme: ThemeType) => updateProgress({ theme: newTheme });

  return (
    <SidebarProvider>
      <div 
        className={`flex min-h-screen bg-background w-full relative ${isEasy ? 'text-lg' : ''} ${accMode === 'accessible' ? 'animate-flash-visual' : ''}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <AppSidebar 
          lang={lang} 
          setLang={setLang} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          currentTheme={progress.theme}
          setTheme={setTheme}
          progress={progress}
          updateProgress={updateProgress}
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
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            progress={progress}
          />

          <main 
            className={`flex-1 pb-20 mx-auto w-full transition-all duration-500 ${isEasy ? 'p-6 max-w-4xl' : 'p-4 max-w-5xl'}`}
            aria-live="polite"
          >
            {activeTab === 'dashboard' && (
              <Dashboard 
                lang={lang} 
                setActiveTab={setActiveTab} 
                progress={progress} 
              />
            )}
            
            {activeTab === 'profile' && (
              <UserProfile 
                lang={lang} 
                progress={progress} 
                updateProfile={updateProfile} 
              />
            )}

            {activeTab === 'bot' && (
              <JaenBot lang={lang} progress={progress} />
            )}

            {activeTab === 'vault' && (
              <DocumentVault lang={lang} />
            )}

            {activeTab === 'scanner' && (
              <DocumentScanner lang={lang} />
            )}

            {activeTab === 'procedures' && (
              <div className="space-y-8 animate-in fade-in duration-700">
                {accMode !== 'auditory' && !isEasy && (
                  <DocumentChecklist 
                    lang={lang} 
                    progress={progress} 
                    toggleChecklist={toggleChecklist} 
                  />
                )}
                {accMode !== 'auditory' && !isEasy && <FormVisualGuide lang={lang} />}
                <ProcedureList 
                  lang={lang} 
                  toggleProcedure={toggleProcedure} 
                  completedProcedures={progress.procedures} 
                  progress={progress}
                />
              </div>
            )}

            {activeTab === 'andalucia_common' && (
              <CommonAndalucia lang={lang} />
            )}

            {activeTab === 'family' && (
              <FamilyResources lang={lang} />
            )}

            {activeTab === 'study' && (
              <StudyUJA lang={lang} progress={progress} />
            )}

            {activeTab === 'employment_portal' && (
              <EmploymentPortal lang={lang} progress={progress} />
            )}

            {activeTab === 'directory' && (
              <div className="space-y-8">
                {accMode === 'standard' && <WifiPoints lang={lang} />}
                <ResourceDirectory lang={lang} progress={progress} />
                {!isEasy && <TransportTab lang={lang} progress={progress} />}
              </div>
            )}

            {activeTab === 'emergency' && (
              <EmergencyTab lang={lang} />
            )}

            {!isEasy && accMode === 'standard' && (
              <section className="mt-12 mb-4 px-2 space-y-3 border-t pt-8">
                <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-6 flex gap-4 max-w-2xl mx-auto">
                  <AlertCircle className="h-6 w-6 text-primary/40 shrink-0" />
                  <p className="text-[11px] text-muted-foreground leading-normal font-medium italic">
                    {t.disclaimer || translations.es.disclaimer}
                  </p>
                </div>
              </section>
            )}
          </main>
        </SidebarInset>

        <EmergencyFAB lang={lang} />
      </div>
    </SidebarProvider>
  );
}
