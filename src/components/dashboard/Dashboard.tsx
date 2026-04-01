
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProgress } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Building2, 
  Users,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Stethoscope,
  Search,
  Bell,
  Volume2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommunityReferents } from "@/features/extranjeria/comunidad/CommunityReferents";
import { SpeechButton } from "@/components/ui/SpeechButton";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
  setResourceSection: (section: string) => void;
  progress: UserProgress;
};

export function Dashboard({ lang, setActiveTab, setResourceSection, progress }: DashboardProps) {
  const t = translations[lang];
  const isAccessible = progress.accessibilityMode === 'accessible';
  const isLite = progress.liteMode;
  
  const [searchQuery, setSearchQuery] = useState("");

  const bentoCardClass = "relative overflow-hidden border-none shadow-xl transition-all active:scale-[0.98] group cursor-pointer";

  // Lógica del Smart Scheduler (Asistente de Cita Única)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    if (query.includes('nie') || query.includes('tie') || query.includes('papel')) {
      setActiveTab('procedures');
    } else if (query.includes('medico') || query.includes('salud') || query.includes('cita')) {
      setResourceSection('salud');
    } else if (query.includes('beca') || query.includes('universidad') || query.includes('estudio')) {
      setResourceSection('uja');
    } else if (query.includes('familia') || query.includes('cole')) {
      setResourceSection('familias');
    }
  };

  return (
    <div className="space-y-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000" role="main">
      
      {/* 1. CITY ALERTS BANNER */}
      <section className="px-2" aria-label={t.cityAlerts}>
        <div className="bg-indigo-600 text-white p-4 rounded-[2rem] shadow-xl flex items-center justify-between border-4 border-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 pointer-events-none group-hover:translate-x-full transition-transform duration-1000" />
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-white/20 p-2.5 rounded-2xl">
              <Bell className="h-5 w-5 text-white animate-bounce" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80">{t.cityAlerts}</h4>
              <p className="text-sm font-bold leading-tight">Plazo Beca UJA abierto • Ola de calor Jaén</p>
            </div>
          </div>
          <SpeechButton text="Alertas de Jaén. Plazo de Becas de la Universidad abierto. Aviso de ola de calor en la ciudad." language={lang} variant="white" className="h-10 w-10" />
        </div>
      </section>

      {/* 2. SMART SCHEDULER (BUSCADOR DE CITAS) */}
      <section className="px-2" aria-label={t.schedulerTitle}>
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <Search className="h-6 w-6 text-primary group-focus-within:scale-110 transition-transform" />
          </div>
          <Input 
            placeholder={t.schedulerPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-20 rounded-[2.5rem] bg-white border-4 border-primary/10 pl-14 pr-6 text-lg font-black shadow-2xl focus:border-primary transition-all placeholder:text-slate-300"
          />
          <Button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-14 rounded-[1.75rem] px-6 font-black uppercase tracking-tighter active:scale-90"
          >
            {t.schedulerTitle.split(' ')[0]}
          </Button>
        </form>
      </section>

      {/* 3. JAÉN-BOT HERO */}
      <section aria-label={t.botTitle}>
        <Card 
          className={cn(
            bentoCardClass, 
            "bg-gradient-to-br from-primary to-indigo-600 text-white rounded-[2.5rem]",
            isLite && "bg-primary"
          )}
          onClick={() => setActiveTab('bot')}
        >
          <CardContent className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-white/25 p-4 rounded-3xl backdrop-blur-md shadow-inner">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter leading-none text-white text-shadow-sm">{t.botTitle}</h2>
                <p className="text-[10px] font-bold text-white/90 uppercase tracking-widest">{t.botSubtitle}</p>
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-white opacity-80 group-hover:translate-x-1 transition-transform" />
          </CardContent>
        </Card>
      </section>

      {/* 4. BENTO GRID */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label={t.dashboard}>
        {/* TRÁMITES */}
        <Card 
          className={cn(bentoCardClass, "col-span-2 row-span-2 bg-card rounded-[3rem] border-2 border-primary/10 flex flex-col justify-between")}
          onClick={() => setActiveTab('procedures')}
        >
          <div className="absolute top-0 right-0 p-6 opacity-5">
             <Building2 className="h-32 w-32 text-primary" />
          </div>
          <CardContent className="p-8 flex flex-col h-full justify-between gap-6">
            <div className="bg-primary/10 p-4 rounded-2xl text-primary shadow-sm w-fit">
              <Building2 className="h-8 w-8" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase leading-tight">{t.procedures}</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed max-w-[180px]">{t.tieNie}</p>
              <Button className="h-12 rounded-xl font-black text-xs gap-2 shadow-lg w-fit">
                {t.procedures.toUpperCase()} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SALUD */}
        <Card 
          className={cn(bentoCardClass, "bg-red-50 border border-red-100 rounded-[2rem]")}
          onClick={() => setResourceSection('salud')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-red-600 p-3 rounded-2xl text-white shadow-lg">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h4 className="font-black text-xs uppercase text-red-950">{t.health}</h4>
          </CardContent>
        </Card>

        {/* FAMILIAS */}
        <Card 
          className={cn(bentoCardClass, "bg-emerald-50 border border-emerald-100 rounded-[2rem]")}
          onClick={() => setResourceSection('familias')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-emerald-700 p-3 rounded-2xl text-white shadow-lg">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="font-black text-xs uppercase text-emerald-950">{t.families}</h4>
          </CardContent>
        </Card>

        {/* UJA */}
        <Card 
          className={cn(bentoCardClass, "bg-indigo-50 border border-indigo-100 rounded-[2rem]")}
          onClick={() => setResourceSection('uja')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-indigo-700 p-3 rounded-2xl text-white shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h4 className="font-black text-xs uppercase text-indigo-950">{t.uja}</h4>
          </CardContent>
        </Card>

        {/* EMPLEO */}
        <Card 
          className={cn(bentoCardClass, "bg-slate-100 border border-slate-200 rounded-[2rem]")}
          onClick={() => setActiveTab('employment_portal')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <h4 className="font-black text-xs uppercase text-slate-950">Empleo</h4>
          </CardContent>
        </Card>
      </section>

      {/* 5. SOS */}
      <section className="flex justify-center py-2">
         <Button 
            onClick={() => window.open('tel:112', '_self')}
            className={cn(
              "h-24 w-24 rounded-full bg-destructive shadow-2xl border-4 border-white flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-all text-white animate-emergency-pulse",
              isLite && "animate-none"
            )}
         >
            <ShieldAlert className="h-10 w-10 text-white" />
            <span className="text-[10px] font-black uppercase">S.O.S</span>
         </Button>
      </section>
    </div>
  );
}
