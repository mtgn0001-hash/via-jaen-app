
"use client"

import { Accessibility, Bell } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/ui/AppLogo";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetTrigger 
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UserProgress } from "@/lib/store";

type HeaderProps = {
  lang: Language;
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  activeTab: string;
};

export function Header({ lang, progress, updateProgress, activeTab }: HeaderProps) {
  const t = translations[lang] || translations.es;

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'dashboard': return 'Resumen Inteligente';
      case 'guides_hub': return 'Recursos';
      case 'procedures': return 'Guías / Trámites';
      case 'employment_portal': return 'Guías / Empleo';
      case 'directory': return 'Ayuda Local';
      case 'profile_hub': return 'Mi Espacio';
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
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-2xl bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10"
              >
                <Accessibility className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[3rem] p-8 bg-white/90 backdrop-blur-3xl border-t-4 border-primary/20">
              <SheetHeader className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-3 rounded-2xl">
                    <Accessibility className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <SheetTitle className="text-2xl font-black text-primary uppercase tracking-tighter">Panel de Accesibilidad</SheetTitle>
                    <SheetDescription className="font-medium">Configura ayudas visuales y auditivas para Jaén.</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                  <div className="space-y-1">
                    <Label className="text-lg font-black text-primary uppercase">Modo LSE (Sordos)</Label>
                    <p className="text-xs text-muted-foreground font-medium">Activa videos signados e iconos gestuales.</p>
                  </div>
                  <Switch 
                    checked={progress.accessibilityMode === 'accessible'} 
                    onCheckedChange={(val) => updateProgress({ accessibilityMode: val ? 'accessible' : 'standard' })} 
                  />
                </div>

                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                  <div className="space-y-1">
                    <Label className="text-lg font-black text-primary uppercase">Modo Audio (Ciegos)</Label>
                    <p className="text-xs text-muted-foreground font-medium">Lectura de pantalla automática y alto contraste.</p>
                  </div>
                  <Switch 
                    checked={progress.easyReading} 
                    onCheckedChange={(val) => updateProgress({ easyReading: val })} 
                  />
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t flex justify-center">
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Jaén Integra Accesibilidad 2026</p>
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 border">
            <Bell className="h-5 w-5 text-slate-400" />
          </Button>
        </div>
      </div>
    </header>
  );
}
