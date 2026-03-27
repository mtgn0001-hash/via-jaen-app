"use client"

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ResourceDirectory } from "@/components/directory/ResourceDirectory";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { UserProfile } from "@/components/profile/UserProfile";
import { FirebaseClientProvider } from "@/firebase";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackFAB } from "@/components/layout/BackFAB";
import { EmergencyFAB } from "@/components/layout/EmergencyFAB";

// Módulos de Features Reorganizados
import { ManagementTIENIE } from "@/features/extranjeria/ManagementTIENIE";
import { OtherAppointments } from "@/features/citas/OtherAppointments";
import { JaenBot } from "@/features/ia/JaenBot";
import { DocumentScanner } from "@/features/ia/DocumentScanner";
import { DocumentVault } from "@/features/seguridad/DocumentVault";
import { ResourcesHub } from "@/components/recursos/ResourcesHub";

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    progress, 
    updateProgress, 
    isLoaded 
  } = useLocalStorage();

  const lang = progress.language as any || 'es';

  useEffect(() => {
    if (isLoaded) {
      document.documentElement.setAttribute('data-theme', progress.theme);
      document.documentElement.setAttribute('data-accessibility', progress.accessibilityMode);
    }
  }, [progress.theme, isLoaded, progress.accessibilityMode]);

  if (!isLoaded) return null;

  return (
    <FirebaseClientProvider>
      <div className="min-h-screen bg-background relative overflow-x-hidden font-body">
        {!progress.onboardingCompleted && (
          <Onboarding 
            lang={lang} 
            onComplete={() => updateProgress({ onboardingCompleted: true })} 
          />
        )}

        <Header 
          lang={lang} 
          progress={progress} 
          updateProgress={updateProgress}
          activeTab={activeTab}
        />

        <main className="max-w-5xl mx-auto p-6 pt-8 min-h-screen">
          <div className="transition-all duration-500 ease-in-out">
            {activeTab === 'dashboard' && <Dashboard lang={lang} setActiveTab={setActiveTab} progress={progress} />}
            
            {/* Secciones de Recursos Combinadas */}
            {activeTab === 'guides_hub' && <ResourcesHub lang={lang} />}
            
            {/* Trámites Reorganizados */}
            {activeTab === 'procedures' && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-24">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Trámites</h2>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Gestión de Residencia y Citas Oficiales</p>
                </div>
                <ManagementTIENIE />
                <OtherAppointments />
              </div>
            )}

            {activeTab === 'directory' && <div className="animate-in slide-in-from-right-4 duration-500"><ResourceDirectory lang={lang} /></div>}
            
            {/* Otras Features */}
            {activeTab === 'profile_hub' && <div className="animate-in slide-in-from-right-4 duration-500"><UserProfile lang={lang} /></div>}
            {activeTab === 'vault' && <div className="animate-in slide-in-from-right-4 duration-500"><DocumentVault lang={lang} /></div>}
            {activeTab === 'scanner' && <div className="animate-in slide-in-from-right-4 duration-500"><DocumentScanner lang={lang} /></div>}
            {activeTab === 'bot' && <div className="animate-in slide-in-from-right-4 duration-500"><JaenBot lang={lang} /></div>}
          </div>
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <BackFAB activeTab={activeTab} setActiveTab={setActiveTab} />
        <EmergencyFAB lang={lang} />
      </div>
    </FirebaseClientProvider>
  );
}
