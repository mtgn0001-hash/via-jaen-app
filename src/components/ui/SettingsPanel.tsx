"use client"

import { Language, translations } from "@/lib/translations";
import { ThemeType, useLocalStorage } from "@/lib/store";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Globe, Palette, ShieldAlert, Check, Pipette } from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const { progress, updateProgress } = useLocalStorage();
  const lang = (progress.language as Language) || 'es';
  const t = translations[lang];

  const languages: { id: Language; flag: string; label: string }[] = [
    { id: 'es', flag: '🇪🇸', label: t.languages.es },
    { id: 'en', flag: '🇬🇧', label: t.languages.en },
    { id: 'fr', flag: '🇫🇷', label: t.languages.fr },
    { id: 'ar', flag: '🇸🇦', label: t.languages.ar },
    { id: 'uk', flag: '🇺🇦', label: t.languages.uk },
  ];

  const colorThemes: { id: ThemeType; color: string; label: string }[] = [
    { id: 'purple', color: '#8B5CF6', label: t.themes.purple },
    { id: 'red', color: '#EF4444', label: t.themes.red },
    { id: 'green', color: '#22C55E', label: t.themes.green },
    { id: 'blue', color: '#3B82F6', label: t.themes.blue },
  ];

  const visualModes: { id: ThemeType; label: string; icon: any }[] = [
    { id: 'light', label: t.themes.light, icon: Palette },
    { id: 'dark', label: t.themes.dark, icon: Palette },
    { id: 'contrast', label: t.themes.contrast, icon: Palette },
  ];

  const handleLanguageChange = (newLang: Language) => {
    updateProgress({ language: newLang });
    if ('speechSynthesis' in window) {
      const msg = newLang === 'es' ? 'Idioma cambiado a español' : 
                  newLang === 'en' ? 'Language changed to English' : 
                  'Language changed';
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = newLang === 'ar' ? 'ar-SA' : newLang === 'uk' ? 'uk-UA' : 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleColorChange = (newTheme: ThemeType) => {
    updateProgress({ theme: newTheme });
    if ('speechSynthesis' in window) {
      const colorLabel = t.themes[newTheme as keyof typeof t.themes] || newTheme;
      const utterance = new SpeechSynthesisUtterance(`Color de la aplicación cambiado a ${colorLabel}`);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-[3rem] p-8 bg-background/95 backdrop-blur-3xl border-t-4 border-primary/20 max-h-[90vh] overflow-y-auto">
        <SheetHeader className="mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-3 rounded-2xl shadow-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <SheetTitle className="text-2xl font-black text-primary uppercase tracking-tighter">{t.settings}</SheetTitle>
              <SheetDescription className="font-medium">{t.disclaimer}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-8 max-w-md mx-auto pb-10">
          {/* SECCIÓN: IDIOMA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
              <Globe className="h-4 w-4" /> {t.language}
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <Button
                  key={l.id}
                  variant={lang === l.id ? "default" : "outline"}
                  onClick={() => handleLanguageChange(l.id)}
                  className={cn(
                    "flex-1 min-w-[100px] h-14 rounded-2xl gap-2 font-black text-sm",
                    lang === l.id ? "shadow-xl shadow-primary/20" : "bg-card"
                  )}
                  aria-label={`${t.language}: ${l.label}`}
                >
                  <span className="text-xl" aria-hidden="true">{l.flag}</span>
                  {l.id.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* SECCIÓN: COLORES PRINCIPALES */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
              <Pipette className="h-4 w-4" /> {t.colorPrimary}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {colorThemes.map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => handleColorChange(ct.id)}
                  className={cn(
                    "h-16 w-full rounded-2xl border-4 transition-all flex items-center justify-center relative overflow-hidden active:scale-90",
                    progress.theme === ct.id ? "border-primary scale-105 shadow-lg" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                  style={{ backgroundColor: ct.color }}
                  aria-label={`Color: ${ct.label}`}
                >
                  {progress.theme === ct.id && (
                    <div className="bg-white/30 backdrop-blur-sm p-1 rounded-full">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* SECCIÓN: MODOS VISUALES */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
              <Palette className="h-4 w-4" /> Visualización
            </div>
            <div className="grid grid-cols-1 gap-3">
              {visualModes.map((vm) => (
                <Button
                  key={vm.id}
                  variant="outline"
                  onClick={() => handleColorChange(vm.id)}
                  className={cn(
                    "h-16 rounded-2xl justify-between px-6 border-2 font-black uppercase text-xs tracking-widest",
                    progress.theme === vm.id ? "border-primary bg-primary/5" : "bg-card"
                  )}
                  aria-label={`Modo: ${vm.label}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-8 w-8 rounded-full shadow-inner",
                      vm.id === 'light' ? 'bg-white border' : 
                      vm.id === 'dark' ? 'bg-slate-900' : 
                      'bg-black border-2 border-yellow-400'
                    )} />
                    {vm.label}
                  </div>
                  {progress.theme === vm.id && <Check className="h-5 w-5 text-primary" />}
                </Button>
              ))}
            </div>
          </div>

          {/* BOTÓN SOS PERMANENTE */}
          <Button 
            onClick={() => window.open('tel:112', '_self')}
            className="w-full h-20 rounded-3xl bg-destructive text-white text-xl font-black uppercase border-4 border-white shadow-2xl animate-pulse"
            aria-label={t.sosTitle}
          >
            <ShieldAlert className="h-8 w-8 mr-3" /> {t.sosTitle}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
