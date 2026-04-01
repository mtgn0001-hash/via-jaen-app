
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Globe, Palette, ShieldAlert, Check, Pipette, Volume2, Turtle, Rabbit, BatteryMedium, Zap } from "lucide-react";
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

  const handleLanguageChange = (newLang: Language) => {
    updateProgress({ language: newLang });
    if ('speechSynthesis' in window) {
      const msg = newLang === 'es' ? 'Idioma cambiado a español' : 
                  newLang === 'en' ? 'Language changed to English' : 
                  'Language changed';
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = newLang === 'ar' ? 'ar-SA' : newLang === 'uk' ? 'uk-UA' : 'es-ES';
      utterance.rate = progress.speechRate || 0.9;
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
              <SheetDescription className="font-bold text-sm text-[#1A1A1B]">{t.disclaimer}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-8 max-w-md mx-auto pb-10">
          {/* MODO AHORRO (Lite Mode) */}
          <div className="p-6 bg-slate-900 text-white rounded-[2rem] border-4 border-white/10 shadow-2xl flex items-center justify-between group">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BatteryMedium className="h-5 w-5 text-emerald-400 group-hover:animate-bounce" />
                <Label className="text-lg font-black uppercase tracking-tight">{t.liteMode}</Label>
              </div>
              <p className="text-[10px] font-bold text-white/60 uppercase">{t.liteModeDesc}</p>
            </div>
            <Switch 
              checked={progress.liteMode} 
              onCheckedChange={(val) => updateProgress({ liteMode: val })}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

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
                >
                  <span className="text-xl">{l.flag}</span>
                  {l.id.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* SECCIÓN: VELOCIDAD DE VOZ */}
          <div className="space-y-4 p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
                <Volume2 className="h-4 w-4" /> Velocidad de Voz
              </div>
              <span className="text-[10px] font-black text-primary bg-white px-2 py-1 rounded-lg">
                {progress.speechRate?.toFixed(1)}x
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Turtle className="h-5 w-5 text-slate-400" />
              <Slider 
                value={[progress.speechRate || 0.9]} 
                min={0.5} 
                max={1.5} 
                step={0.1} 
                onValueChange={(val) => updateProgress({ speechRate: val[0] })}
                className="flex-1"
              />
              <Rabbit className="h-5 w-5 text-slate-400" />
            </div>
          </div>

          {/* BOTÓN SOS PERMANENTE */}
          <Button 
            onClick={() => window.open('tel:112', '_self')}
            className="w-full h-20 rounded-3xl bg-destructive text-white text-xl font-black uppercase border-4 border-white shadow-2xl animate-pulse"
          >
            <ShieldAlert className="h-8 w-8 mr-3" /> {t.sosTitle}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
