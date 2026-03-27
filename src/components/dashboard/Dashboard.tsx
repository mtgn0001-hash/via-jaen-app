
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppointmentStatus } from "./AppointmentStatus";
import { UserProgress } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Briefcase, 
  GraduationCap,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  Scan,
  MessageSquare,
  Lock,
  Library,
  Heart,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
  progress: UserProgress;
};

export function Dashboard({ lang, setActiveTab, progress }: DashboardProps) {
  const langPack = translations[lang] || translations.es;
  const t = langPack;

  const cardClass = "border-none shadow-xl bg-white/80 backdrop-blur-xl transition-all hover:scale-[1.01] active:scale-[0.98] group overflow-hidden flex flex-col justify-between cursor-pointer";

  if (progress.easyReading) {
    return (
      <div className="space-y-6 pt-4 px-2 max-w-3xl mx-auto">
        <div className="bg-primary p-12 rounded-[50px] text-primary-foreground shadow-2xl flex flex-col items-center text-center gap-6">
          <Zap className="h-20 w-20 text-yellow-300 animate-bounce" />
          <h2 className="text-5xl font-black uppercase tracking-tight">MODO FÁCIL</h2>
        </div>
        <div className="grid gap-6">
          {[
            { id: 'bot', tab: 'bot', title: t.bot?.title || 'Bot', icon: MessageSquare, color: 'bg-purple-600' },
            { id: 'procedures', tab: 'procedures', title: t.procedures || 'Trámites', icon: Building2, color: 'bg-emerald-600' },
            { id: 'directory', tab: 'directory', title: t.directory || 'Ayuda', icon: MapPin, color: 'bg-blue-600' },
          ].map((item) => (
            <Button 
              key={item.id} 
              onClick={() => setActiveTab(item.tab)}
              className={cn("h-40 rounded-[45px] text-white shadow-xl flex items-center justify-between px-12", item.color)}
            >
              <div className="flex items-center gap-8">
                <item.icon className="h-16 w-16" />
                <span className="text-3xl font-black uppercase">{item.title}</span>
              </div>
              <ArrowRight className="h-12 w-12 opacity-50" />
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-2 pb-10 px-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* 1. INTELIGENCIA PROACTIVA (TOP SECTION) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className={cn(cardClass, "md:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white min-h-[200px]")}
          onClick={() => setActiveTab('bot')}
        >
          <CardContent className="p-8 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">IA ACTIVA</Badge>
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight mb-4 max-w-md">
                {lang === 'es' ? 'Hola, ¿en qué puedo ayudarte hoy en Jaén?' : t.bot?.welcome}
              </h2>
              <Button variant="secondary" size="lg" className="rounded-2xl font-black text-xs uppercase gap-3 bg-white text-purple-700 h-12">
                Hablar con Jaén-Bot <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={cn(cardClass, "bg-emerald-500 text-white")}
          onClick={() => setActiveTab('scanner')}
        >
          <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-6">
            <div className="bg-white/20 p-6 rounded-full backdrop-blur-md animate-pulse border-4 border-white/10">
              <Scan className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest mb-2">Escanear Carta</h3>
              <p className="text-[10px] opacity-80 font-bold uppercase tracking-tight">Análisis IA Offline</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. CUADRÍCULA PRINCIPAL (BENTO GRID) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Solicitud de Trámite (NEW) */}
        <Card 
          className={cn(cardClass, "bg-primary text-white border-none min-h-[180px]")}
          onClick={() => setActiveTab('form_submission')}
        >
          <CardContent className="p-8 flex flex-col justify-between items-center text-center h-full">
            <div className="bg-white/20 p-4 rounded-2xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase tracking-tighter">Pedir Documento</h4>
              <p className="text-[8px] opacity-60 font-black tracking-widest uppercase">Redirección Firestore</p>
            </div>
          </CardContent>
        </Card>

        {/* Empleo */}
        <Card 
          className={cn(cardClass, "bg-slate-900 text-white")}
          onClick={() => setActiveTab('employment_portal')}
        >
          <CardContent className="p-8 flex flex-col h-full justify-between items-center text-center">
            <div className="bg-white/10 p-4 rounded-2xl">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-xs uppercase tracking-tighter">Portal Empleo</h4>
              <p className="text-[8px] opacity-60 font-black tracking-widest uppercase">Ofertas Locales</p>
            </div>
          </CardContent>
        </Card>

        {/* Estudios */}
        <Card 
          className={cn(cardClass, "bg-white border-2 border-primary/5")}
          onClick={() => setActiveTab('study')}
        >
          <CardContent className="p-8 flex flex-col h-full justify-between items-center text-center">
            <div className="bg-primary/5 p-4 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-xs uppercase tracking-tighter text-slate-800">Estudiar UJA</h4>
              <p className="text-[8px] text-muted-foreground font-black tracking-widest uppercase">Universidad Jaén</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Trámites Críticos (Horizontal) */}
      <Card 
        className={cn(cardClass, "bg-white border-2 border-primary/5 min-h-[150px]")}
        onClick={() => setActiveTab('procedures')}
      >
        <CardContent className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-primary/10 p-4 rounded-2xl text-primary">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-black text-lg uppercase tracking-tighter text-slate-900">Trámites y Citas</h3>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Guía de Extranjería Jaén</p>
            </div>
          </div>
          <ArrowRight className="h-7 w-7 text-primary/20 group-hover:translate-x-2 transition-transform" />
        </CardContent>
      </Card>

      {/* Rest of components... */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card 
          className={cn(cardClass, "bg-orange-50/50 border-orange-100")}
          onClick={() => setActiveTab('family')}
        >
          <CardContent className="p-6 flex items-center gap-6">
            <div className="bg-orange-500 p-4 rounded-2xl text-white shadow-lg">
              <Heart className="h-7 w-7" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase text-orange-900 tracking-tight">Familias</h4>
              <p className="text-[9px] text-orange-800/60 font-bold uppercase tracking-wider">Colegios y Ayudas infantiles</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={cn(cardClass, "bg-blue-50/50 border-blue-100")}
          onClick={() => setActiveTab('andalucia_common')}
        >
          <CardContent className="p-6 flex items-center gap-6">
            <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg">
              <Library className="h-7 w-7" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase text-blue-900 tracking-tight">Ayudas Junta</h4>
              <p className="text-[9px] text-blue-800/60 font-bold uppercase tracking-wider">Andalucía Vive</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[3rem] flex gap-6 items-center shadow-inner">
        <ShieldCheck className="h-10 w-10 text-emerald-600 shrink-0" />
        <p className="text-xs text-emerald-900 font-bold uppercase leading-snug tracking-tight">
          Privacidad 100%: Tus datos no salen de este teléfono. Sin registros externos ni nube.
        </p>
      </div>

      <div className="flex justify-center pt-12 opacity-10 grayscale">
         <Zap className="h-16 w-16 text-primary" />
      </div>
    </div>
  );
}
