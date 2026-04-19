"use client"

import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProcedureList } from "@/components/procedures/ProcedureList";
import { EmploymentPortal } from "@/components/work/EmploymentPortal";
import { ResourceDirectory } from "@/components/directory/ResourceDirectory";
import { ResourcesHub } from "@/components/recursos/ResourcesHub";
import { UserProfile } from "@/components/profile/UserProfile";
import { DocumentScanner } from "@/features/ia/DocumentScanner";
import { DocumentVault } from "@/features/seguridad/DocumentVault";
import { JaenBot } from "@/features/ia/JaenBot";
import { EmergencyTab } from "@/components/emergency/EmergencyTab";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackFAB } from "@/components/layout/BackFAB";
import { EmergencyFAB } from "@/components/layout/EmergencyFAB";
import { useLocalStorage } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Home() {
  const { progress, updateProgress, isLoaded } = useLocalStorage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [resourceSection, setResourceSection] = useState('salud');

  // Aplicar tema y accesibilidad al cargar
  useEffect(() => {
    if (isLoaded) {
      document.documentElement.setAttribute('data-theme', progress.theme);
      document.documentElement.setAttribute('data-accessibility', progress.accessibilityMode);
      document.documentElement.setAttribute('data-lite-mode', progress.liteMode ? 'true' : 'false');
    }
  }, [progress.theme, progress.accessibilityMode, progress.liteMode, isLoaded]);

  if (!isLoaded) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            lang={progress.language as any} 
            setActiveTab={setActiveTab} 
            setResourceSection={(sec) => {
              setResourceSection(sec);
              setActiveTab('guides_hub');
            }}
            progress={progress}
          />
        );
      case 'procedures':
        return <ProcedureList lang={progress.language as any} />;
      case 'employment_portal':
        return <EmploymentPortal lang={progress.language as any} />;
      case 'directory':
        return <ResourceDirectory lang={progress.language as any} />;
      case 'guides_hub':
        return (
          <ResourcesHub 
            lang={progress.language} 
            activeSection={resourceSection}
            onSectionChange={setResourceSection}
          />
        );
      case 'profile':
      case 'profile_hub':
        return <UserProfile lang={progress.language as any} />;
      case 'scanner':
        return <DocumentScanner lang={progress.language} />;
      case 'vault':
        return <DocumentVault lang={progress.language} />;
      case 'bot':
        return <JaenBot lang={progress.language as any} />;
      case 'emergency':
        return <EmergencyTab lang={progress.language as any} />;
      default:
        return <Dashboard lang={progress.language as any} setActiveTab={setActiveTab} setResourceSection={setResourceSection} progress={progress} />;
    }
  };

  return (
    <SidebarProvider>
      {!progress.onboardingCompleted && (
        <Onboarding 
          lang={progress.language as any} 
          onComplete={() => updateProgress({ onboardingCompleted: true })} 
        />
      )}
      
      <div className="flex min-h-screen w-full bg-background transition-colors duration-500">
        <AppSidebar 
          lang={progress.language as any}
          setLang={(l) => updateProgress({ language: l })}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentTheme={progress.theme}
          setTheme={(t) => updateProgress({ theme: t })}
          progress={progress}
          updateProgress={updateProgress}
        />
        
        <main className="flex-1 flex flex-col min-w-0 relative">
          <Header 
            lang={progress.language as any} 
            progress={progress} 
            updateProgress={updateProgress}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-5xl mx-auto w-full">
            {renderContent()}
          </div>

          <BackFAB activeTab={activeTab} setActiveTab={setActiveTab} />
          <EmergencyFAB lang={progress.language as any} />
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
      </div>
    </SidebarProvider>
  );
}
