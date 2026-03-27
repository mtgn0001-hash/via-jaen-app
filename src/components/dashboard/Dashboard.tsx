"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProgress } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Building2, 
  Users,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  ShieldAlert,
  Play,
  ArrowRight,
  Zap,
  Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommunityReferents } from "@/features/extranjeria/comunidad/CommunityReferents";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
  setResourceSection: (section: string) => void;
  progress: UserProgress;
};

export function Dashboard({ lang, setActiveTab, setResourceSection, progress }: DashboardProps) {
  const t = translations[lang];
  const isAccessible = progress.accessibilityMode === 'accessible';
  const isEasy = progress.easyReading; 
  
  const bentoCardClass = "relative overflow-hidden border-none shadow-xl transition-all active:scale-[0.98] group cursor-pointer";

  if (isEasy) {
    return (
      <div className="space-y-6 pb-32 animate-in fade-in duration-500" role="main">
        <h2 className="sr-only">Menú Principal Simplificado</h2>
        
        <Button 
          onClick={() => setActiveTab('bot')}
          className="w-full h-24 rounded-none bg-primary text-white text-2xl font-black uppercase border-4 border-white"
          aria-label={`${t.botTitle}: ${t.botSubtitle}`}
        >
          <MessageSquare className="h-8 w-8 mr-4" /> {t.botTitle.toUpperCase()}
        </Button>

        <Button 
          onClick={() => setActiveTab('procedures')}
          className="w-full h-24 rounded-none bg-card text-foreground text-2xl font-black uppercase border-4 border-primary"
          aria-label={t.procedures}
        >
          <Building2 className="h-8 w-8 mr-4" /> {t.procedures.toUpperCase()}
        </Button>

        <Button 
          onClick={() => setResourceSection('salud')}
          className="w-full h-24 rounded-none bg-red-600 text-white text-2xl font-black uppercase border-4 border-white"
          aria-label={t.health}
        >
          <Stethoscope className="h-8 w-8 mr-4" /> {t.health.toUpperCase()}
        </Button>

        <Button 
          onClick={() => setResourceSection('familias')}
          className="w-full h-24 rounded-none bg-emerald-700 text-white text-2xl font-black uppercase border-4 border-white"
          aria-label={t.families}
        >
          <Users className="h-8 w-8 mr-4" /> {t.families.toUpperCase()}
        </Button>

        <Button 
          onClick={() => window.open('tel:112', '_self')}
          className="w-full h-32 rounded-none bg-destructive text-white text-3xl font-black uppercase border-8 border-white animate-pulse"
          aria-label={t.sosTitle}
        >
          <ShieldAlert className="h-12 w-12 mr-4" /> S.O.S 112
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000" role="main">
      
      {/* 1. JAÉN-BOT */}
      <section aria-label={t.botTitle}>
        <Card 
          className={cn(bentoCardClass, "bg-gradient-to-br from-primary to-indigo-600 text-white rounded-[2.5rem]")}
          onClick={() => setActiveTab('bot')}
          role="button"
          tabIndex={0}
          aria-label={t.botWelcome}
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

      {/* 2. BENTO GRID */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label={t.dashboard}>
        
        {/* TRÁMITES */}
        <Card 
          className={cn(bentoCardClass, "col-span-2 row-span-2 bg-card rounded-[3rem] border-2 border-primary/10 flex flex-col justify-between")}
          onClick={() => setActiveTab('procedures')}
          role="button"
          tabIndex={0}
          aria-label={t.procedures}
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
              <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed max-w-[180px]">
                {t.tieNie}
              </p>
              <Button className="h-12 rounded-xl font-black text-xs gap-2 shadow-lg w-fit">
                {t.procedures.toUpperCase()} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SALUD */}
        <Card 
          className={cn(bentoCardClass, "bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-[2rem]")}
          onClick={() => setResourceSection('salud')}
          role="button"
          tabIndex={0}
          aria-label={t.health}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-red-600 p-3 rounded-2xl text-white shadow-lg">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h4 className="font-black text-xs uppercase text-red-950 dark:text-red-200">{t.health}</h4>
          </CardContent>
        </Card>

        {/* FAMILIAS */}
        <Card 
          className={cn(bentoCardClass, "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-[2rem]")}
          onClick={() => setResourceSection('familias')}
          role="button"
          tabIndex={0}
          aria-label={t.families}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-emerald-700 p-3 rounded-2xl text-white shadow-lg">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="font-black text-xs uppercase text-emerald-950 dark:text-emerald-200">{t.families}</h4>
          </CardContent>
        </Card>

        {/* UJA */}
        <Card 
          className={cn(bentoCardClass, "bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-[2rem]")}
          onClick={() => setResourceSection('uja')}
          role="button"
          tabIndex={0}
          aria-label={t.uja}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-indigo-700 p-3 rounded-2xl text-white shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h4 className="font-black text-xs uppercase text-indigo-950 dark:text-indigo-200">{t.uja}</h4>
          </CardContent>
        </Card>

        {/* EMPLEO */}
        <Card 
          className={cn(bentoCardClass, "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem]")}
          onClick={() => setActiveTab('employment_portal')}
          role="button"
          tabIndex={0}
          aria-label="Empleo"
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-slate-900 dark:bg-slate-700 p-3 rounded-2xl text-white shadow-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <h4 className="font-black text-xs uppercase text-slate-950 dark:text-slate-200">Empleo</h4>
          </CardContent>
        </Card>

      </section>

      {/* 3. REFERENTES */}
      <section aria-label={t.referents}>
        <CommunityReferents lang={lang} />
      </section>

      {/* 4. SOS */}
      <section className="flex justify-center py-2" aria-label={t.sosTitle}>
         <Button 
            onClick={() => window.open('tel:112', '_self')}
            className="h-20 w-20 rounded-full bg-destructive shadow-2xl border-4 border-white animate-pulse flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-all text-white"
         >
            <ShieldAlert className="h-8 w-8 text-white" />
            <span className="text-[9px] font-black uppercase">S.O.S</span>
         </Button>
      </section>
    </div>
  );
}