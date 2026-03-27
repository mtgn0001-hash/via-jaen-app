
"use client"

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/lib/store";
import { Header } from "@/components/dashboard/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProcedureList } from "@/components/procedures/ProcedureList";
import { ResourceDirectory } from "@/components/directory/ResourceDirectory";
import { FamilyResources } from "@/components/family/FamilyResources";
import { StudyUJA } from "@/components/study/StudyUJA";
import { EmploymentPortal } from "@/components/work/EmploymentPortal";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { CommonAndalucia } from "@/components/regional/CommonAndalucia";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProfile } from "@/components/profile/UserProfile";
import { DocumentScanner } from "@/components/tools/DocumentScanner";
import { JaenBot } from "@/components/tools/JaenBot";
import { DocumentVault } from "@/components/profile/DocumentVault";
import { ContactForm } from "@/components/forms/ContactForm";
import { FirebaseClientProvider } from "@/firebase";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackFAB } from "@/components/layout/BackFAB";
import { EmergencyFAB } from "@/components/layout/EmergencyFAB";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Briefcase, GraduationCap, Library, ArrowRight, ChevronRight } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    progress, 
    updateProgress, 
    updateProfile,
    toggleProcedure, 
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

  const renderGuidesHub = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-24">
      <div className="space-y-1 mb-8">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Centro de Guías</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Información oficial paso a paso</p>
      </div>
      
      <div className="grid gap-4">
        {[
          { id: 'procedures', title: 'Trámites y NIE', icon: Building2, desc: 'Padrón, TIE y Citas' },
          { id: 'employment_portal', title: 'Empleo y Derechos', icon: Briefcase, desc: 'SAE y Campaña Olivar' },
          { id: 'study', title: 'Estudios UJA', icon: GraduationCap, desc: 'Grados y Homologación' },
          { id: 'andalucia_common', title: 'Ayudas Junta', icon: Library, desc: 'Carpeta Ciudadana' },
        ].map((guide) => (
          <Card 
            key={guide.id} 
            className="border-none bg-white/40 backdrop-blur-xl shadow-xl rounded-[2.5rem] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
            onClick={() => setActiveTab(guide.id)}
          >
            <CardContent className="p-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-primary/10 p-4 rounded-3xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <guide.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-slate-900 uppercase tracking-tighter">{guide.title}</h3>
                  <p className="text-xs text-muted-foreground font-bold">{guide.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-primary/20 group-hover:text-primary transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfileHub = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-24">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Mi Espacio</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Privacidad 100% garantizada</p>
      </div>
      
      <div className="grid gap-6">
        <Card 
          className="border-none bg-primary text-white rounded-[3rem] shadow-2xl p-2 cursor-pointer"
          onClick={() => setActiveTab('profile')}
        >
          <CardContent className="p-8 flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Mis Datos</h3>
              <p className="text-xs opacity-80 font-bold">Edita tu perfil personal</p>
            </div>
            <ArrowRight className="h-8 w-8" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="border-none bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-xl p-4 text-center cursor-pointer hover:bg-primary/5 transition-all"
            onClick={() => setActiveTab('vault')}
          >
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h4 className="font-black text-sm uppercase tracking-tighter">Bóveda</h4>
            </CardContent>
          </Card>

          <Card 
            className="border-none bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-xl p-4 text-center cursor-pointer hover:bg-primary/5 transition-all"
            onClick={() => setActiveTab('scanner')}
          >
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <div className="bg-purple-100 p-4 rounded-2xl text-purple-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="font-black text-sm uppercase tracking-tighter">Escanear</h4>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

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
            
            {activeTab === 'guides_hub' && renderGuidesHub()}
            {activeTab === 'profile_hub' && renderProfileHub()}

            {activeTab === 'procedures' && <div className="animate-in slide-in-from-right-4 duration-500"><ProcedureList lang={lang} toggleProcedure={toggleProcedure} completedProcedures={progress.procedures} /></div>}
            {activeTab === 'employment_portal' && <div className="animate-in slide-in-from-right-4 duration-500"><EmploymentPortal lang={lang} /></div>}
            {activeTab === 'study' && <div className="animate-in slide-in-from-right-4 duration-500"><StudyUJA lang={lang} /></div>}
            {activeTab === 'andalucia_common' && <div className="animate-in slide-in-from-right-4 duration-500"><CommonAndalucia lang={lang} /></div>}
            
            {activeTab === 'directory' && <div className="animate-in slide-in-from-right-4 duration-500"><ResourceDirectory lang={lang} /></div>}
            
            {activeTab === 'profile' && <div className="animate-in slide-in-from-right-4 duration-500"><UserProfile lang={lang} /></div>}
            {activeTab === 'vault' && <div className="animate-in slide-in-from-right-4 duration-500"><DocumentVault lang={lang} /></div>}
            {activeTab === 'scanner' && <div className="animate-in slide-in-from-right-4 duration-500"><DocumentScanner lang={lang} /></div>}
            {activeTab === 'bot' && <div className="animate-in slide-in-from-right-4 duration-500"><JaenBot lang={lang} /></div>}
            {activeTab === 'form_submission' && <div className="animate-in slide-in-from-right-4 duration-500"><ContactForm /></div>}
          </div>
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <BackFAB activeTab={activeTab} setActiveTab={setActiveTab} />
        <EmergencyFAB lang={lang} />
      </div>
    </FirebaseClientProvider>
  );
}
