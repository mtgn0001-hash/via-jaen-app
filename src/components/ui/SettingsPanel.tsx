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
import { Label } from "@/components/ui/label";
import { Globe, Palette, ShieldAlert, Check } from "lucide-react";
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

  const themes: { id: ThemeType; color: string; label: string }[] = [
    { id: 'light', color: 'bg-white', label: t.themes.light },
    { id: 'dark', color: 'bg-slate-900', label: t.themes.dark },
    { id: 'contrast', color: 'bg-black border-2 border-yellow-400', label: t.themes.contrast },
  ];

  const handleLanguageChange = (newLang: Language) => {
    updateProgress({ language: newLang });
    
    // Feedback de audio si el modo audio está activo o para confirmar cambio
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translations[newLang].language + " changed");
      utterance.lang = newLang === 'ar' ? 'ar-SA' : newLang === 'uk' ? 'uk-UA' : 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleThemeChange = (newTheme: ThemeType) => {
    updateProgress({ theme: newTheme });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-[3rem] p-8 bg-background/95 backdrop-blur-3xl border-t-4 border-primary/20">
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

        <div className="space-y-8 max-w-md mx-auto">
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

          {/* SECCIÓN: TEMAS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
              <Palette className="h-4 w-4" /> {t.theme}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {themes.map((th) => (
                <Button
                  key={th.id}
                  variant="outline"
                  onClick={() => handleThemeChange(th.id)}
                  className={cn(
                    "h-16 rounded-2xl justify-between px-6 border-2 font-black uppercase text-xs tracking-widest",
                    progress.theme === th.id ? "border-primary bg-primary/5" : "bg-card"
                  )}
                  aria-label={`${t.theme}: ${th.label}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("h-8 w-8 rounded-full shadow-inner", th.color)} />
                    {th.label}
                  </div>
                  {progress.theme === th.id && <Check className="h-5 w-5 text-primary" />}
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