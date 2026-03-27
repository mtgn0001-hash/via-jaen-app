"use client"

import { useState } from "react";
import { Accessibility, Settings2, Bell } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/ui/AppLogo";
import { UserProgress, useLocalStorage } from "@/lib/store";
import { SettingsPanel } from "@/components/ui/SettingsPanel";

type HeaderProps = {
  lang: Language;
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  activeTab: string;
};

export function Header({ lang, progress, updateProgress, activeTab }: HeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const t = translations[lang] || translations.es;

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'dashboard': return t.dashboard;
      case 'guides_hub': return t.backpack;
      case 'procedures': return t.procedures;
      case 'directory': return t.directory;
      case 'profile_hub': return 'Mi Perfil';
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 rounded-2xl bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10"
            onClick={() => setSettingsOpen(true)}
            aria-label={t.settings}
          >
            <Settings2 className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 border hidden sm:flex">
            <Bell className="h-5 w-5 text-slate-400" />
          </Button>
        </div>
      </div>

      <SettingsPanel open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
}