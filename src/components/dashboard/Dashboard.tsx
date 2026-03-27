
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProgress } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Building2, 
  Heart, 
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

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
  setResourceSection: (section: string) => void;
  progress: UserProgress;
};

export function Dashboard({ lang, setActiveTab, setResourceSection, progress }: DashboardProps) {
  const isLSE = progress.accessibilityMode === 'accessible';
  
  const bentoCardClass = "relative overflow-hidden border-none shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer";

  return (
    <div className="space-y-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. CABECERA INTELIGENTE: JAÉN-BOT */}
      <section>
        <Card 
          className={cn(bentoCardClass, "bg-gradient-to-br from-primary to-indigo-600 text-white rounded-[2.5rem]")}
          onClick={() => setActiveTab('bot')}
        >
          <CardContent className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md shadow-inner">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Hablar con Jaén-Bot</h2>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Resuelve tus dudas en tiempo real</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <Badge className="bg-white/20 text-white border-none text-[9px] font-black uppercase px-3 py-1 rounded-full hidden sm:flex">IA Activa</Badge>
               <ArrowRight className="h-6 w-6 opacity-40 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. BENTO GRID PRINCIPAL */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* TRÁMITES CRÍTICOS (2x2) - EXCLUSIVO IDENTIDAD */}
        <Card 
          className={cn(bentoCardClass, "col-span-2 row-span-2 bg-white rounded-[3rem] border-2 border-primary/5 flex flex-col justify-between")}
          onClick={() => setActiveTab('procedures')}
        >
          <div className="absolute top-0 right-0 p-6 opacity-5">
             <Building2 className="h-32 w-32 text-primary" />
          </div>
          <CardContent className="p-8 flex flex-col h-full justify-between gap-6">
            <div className="flex justify-between items-start">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary shadow-sm">
                <Building2 className="h-8 w-8" />
              </div>
              <div className="flex items-center gap-2">
                {isLSE && <div className="bg-primary p-2 rounded-full shadow-lg animate-bounce"><Play className="h-3 w-3 text-white fill-current" /></div>}
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-100 font-black text-[8px] uppercase">Prioridad 1</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-tight">Trámites</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed max-w-[180px]">
                Gestión exclusiva de TIE, Modelo EX-15 y Citas Plaza de las Batallas.
              </p>
              <Button className="h-12 rounded-xl font-black text-xs gap-2 shadow-lg w-fit">
                VER TRÁMITES <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SALUD JAÉN (1x1) - EXCLUSIVO SANIDAD */}
        <Card 
          className={cn(bentoCardClass, "bg-red-50/50 border border-red-100 rounded-[2rem]")}
          onClick={() => setResourceSection('salud')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase text-red-900">Salud</h4>
              <p className="text-[8px] text-red-800/60 font-black uppercase">Citas / Urgencias</p>
            </div>
            {isLSE && <Play className="h-3 w-3 text-red-400" />}
          </CardContent>
        </Card>

        {/* PARA FAMILIAS (1x1) - EXCLUSIVO AYUDAS Y COLEGIOS */}
        <Card 
          className={cn(bentoCardClass, "bg-emerald-50/50 border border-emerald-100 rounded-[2rem]")}
          onClick={() => setResourceSection('familias')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg">
              <Users className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase text-emerald-900">Familias</h4>
              <p className="text-[8px] text-emerald-800/60 font-black uppercase">Colegios / Ayudas</p>
            </div>
            {isLSE && <Play className="h-3 w-3 text-emerald-400" />}
          </CardContent>
        </Card>

        {/* ESTUDIAR UJA (1x1) - EXCLUSIVO UNIVERSIDAD */}
        <Card 
          className={cn(bentoCardClass, "bg-indigo-50/50 border border-indigo-100 rounded-[2rem]")}
          onClick={() => setResourceSection('uja')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase text-indigo-900">UJA</h4>
              <p className="text-[8px] text-indigo-800/60 font-black uppercase">Becas / Notas</p>
            </div>
            {isLSE && <Play className="h-3 w-3 text-indigo-400" />}
          </CardContent>
        </Card>

        {/* EMPLEO (1x1) */}
        <Card 
          className={cn(bentoCardClass, "bg-slate-100/50 border border-slate-200 rounded-[2rem]")}
          onClick={() => setActiveTab('employment_portal')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-slate-800 p-3 rounded-2xl text-white shadow-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase text-slate-900">Empleo</h4>
              <p className="text-[8px] text-slate-800/60 font-black uppercase">SAE / Ofertas</p>
            </div>
          </CardContent>
        </Card>

      </section>

      {/* 3. BLOQUE DE EMERGENCIA S.O.S */}
      <section className="flex justify-center py-2">
         <Button 
            onClick={() => window.open('tel:112', '_self')}
            className="h-20 w-20 rounded-full bg-destructive shadow-2xl border-4 border-white animate-pulse flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-all"
         >
            <ShieldAlert className="h-8 w-8 text-white" />
            <span className="text-[9px] font-black uppercase">S.O.S</span>
         </Button>
      </section>

      {/* 4. UTILIDADES DE SEGURIDAD */}
      <section>
        <Card className="border-none bg-emerald-50/50 border border-emerald-100 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-black text-xs uppercase text-emerald-900">Bóveda Segura Activa</h4>
              <p className="text-[10px] font-bold text-emerald-800/60 uppercase">Tus documentos están protegidos localmente.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="flex justify-center pt-8 opacity-5 scale-125">
         <Zap className="h-16 w-16 text-primary" />
      </div>
    </div>
  );
}
