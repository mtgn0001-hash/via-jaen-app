"use client"

import { useState } from "react";
import { Settings2, Bell, Accessibility, Zap } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/ui/AppLogo";
import { UserProgress } from "@/lib/store";
import { SettingsPanel } from "@/components/ui/SettingsPanel";
import { cn } from "@/lib/utils";

type HeaderProps = {
  lang: Language;
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  activeTab: string;
};

export function Header({ lang, progress, updateProgress, activeTab }: HeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const t = translations[lang] || translations.es;
  const isAccessible = progress.accessibilityMode === 'accessible';

  const toggleMasterAccessibility = () => {
    const nextMode = isAccessible ? 'standard' : 'accessible';
    if ('vibrate' in navigator) navigator.vibrate(nextMode === 'accessible' ? [100, 50, 100] : 50);
    
    updateProgress({ 
      accessibilityMode: nextMode,
      easyReading: nextMode === 'accessible'
    });

    if ('speechSynthesis' in window) {
      const msg = nextMode === 'accessible' 
        ? "Modo de accesibilidad activado. Navegación asistida lista." 
        : "Modo estándar activado.";
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'dashboard': return t.dashboard;
      case 'guides_hub': return t.backpack;
      case 'procedures': return t.procedures;
      case 'directory': return t.directory;
      case 'profile_hub': return 'Mi Perfil';
      case 'scanner': return 'Escáner IA';
      default: return 'Jaén Integra';
    }
  };

  return (
    <header className="sticky top-0 bg-background/60 backdrop-blur-xl z-40 px-6 py-4 border-b border-border/50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <AppLogo size={44} />
          <div className="flex flex-col">
            <h1 className="font-black text-lg text-primary uppercase tracking-tighter leading-none">
              {t.title}
            </h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
              {getBreadcrumb()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* BOTÓN MAESTRO DE ACCESIBILIDAD */}
          <Button
            onClick={toggleMasterAccessibility}
            variant={isAccessible ? "default" : "outline"}
            className={cn(
              "h-12 w-12 sm:w-auto px-0 sm:px-4 rounded-2xl gap-2 transition-all active:scale-95 border-2",
              isAccessible 
                ? "bg-yellow-400 text-black border-black animate-pulse shadow-[0_0_20px_rgba(250,204,21,0.4)]" 
                : "bg-primary/5 text-primary border-primary/10"
            )}
            aria-label="Botón Maestro de Accesibilidad: Activar navegación asistida y alto contraste"
          >
            {isAccessible ? <Zap className="h-6 w-6 fill-current" /> : <Accessibility className="h-6 w-6" />}
            <span className="hidden sm:inline font-black text-[10px] uppercase">Accesibilidad</span>
          </Button>

          {/* BOTÓN DE AJUSTES */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 rounded-2xl bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 transition-all active:scale-90"
            onClick={() => setSettingsOpen(true)}
            aria-label="Configuración de idioma y colores"
          >
            <Settings2 className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <SettingsPanel open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
}
