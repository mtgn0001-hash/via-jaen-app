
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
  Sparkles,
  Library,
  Heart
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

  const cardClass = "border-none shadow-xl bg-white/80 backdrop-blur-xl transition-all active:scale-[0.98] group overflow-hidden flex flex-col justify-between";

  if (progress.easyReading) {
    return (
      <div className="space-y-6 pt-4 px-2">
        <div className="bg-primary p-8 rounded-[40px] text-primary-foreground shadow-xl flex flex-col items-center text-center gap-4">
          <Zap className="h-16 w-16 text-yellow-300 animate-bounce" />
          <h2 className="text-4xl font-black uppercase tracking-tight">MODO FÁCIL</h2>
        </div>
        <div className="grid gap-4">
          {[
            { id: 'bot', tab: 'bot', title: t.bot?.title || 'Bot', icon: MessageSquare, color: 'bg-purple-600' },
            { id: 'procedures', tab: 'procedures', title: t.procedures || 'Trámites', icon: Building2, color: 'bg-emerald-600' },
            { id: 'directory', tab: 'directory', title: t.directory || 'Ayuda', icon: MapPin, color: 'bg-blue-600' },
          ].map((item) => (
            <Button 
              key={item.id} 
              onClick={() => setActiveTab(item.tab)}
              className={cn("h-32 rounded-[35px] text-white shadow-xl flex items-center justify-between px-8", item.color)}
            >
              <div className="flex items-center gap-6">
                <item.icon className="h-12 w-12" />
                <span className="text-2xl font-black uppercase">{item.title}</span>
              </div>
              <ArrowRight className="h-10 w-10 opacity-50" />
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-2 pb-10 px-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* 1. INTELIGENCIA PROACTIVA (TOP SECTION) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={cn(cardClass, "md:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white min-h-[160px]")}
          onClick={() => setActiveTab('bot')}
        >
          <CardContent className="p-6 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-[8px] font-black uppercase tracking-widest">IA ACTIVA</Badge>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">
                {lang === 'es' ? 'Hola, ¿en qué puedo ayudarte hoy en Jaén?' : t.bot?.welcome}
              </h2>
              <Button variant="secondary" size="sm" className="rounded-xl font-black text-[10px] uppercase gap-2 bg-white text-purple-700 h-9">
                Hablar con Jaén-Bot <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={cn(cardClass, "bg-emerald-500 text-white")}
          onClick={() => setActiveTab('scanner')}
        >
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md animate-pulse">
              <Scan className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-black text-xs uppercase tracking-widest mb-1">Escanear Carta</h3>
              <p className="text-[9px] opacity-80 font-bold uppercase">Análisis IA Offline</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. CUADRÍCULA PRINCIPAL (BENTO GRID) */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Trámites (2x2) */}
        <Card 
          className={cn(cardClass, "col-span-2 row-span-2 bg-white border-2 border-primary/5")}
          onClick={() => setActiveTab('procedures')}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="font-black text-sm uppercase tracking-tighter">Trámites Críticos</h3>
              </div>
              <ArrowRight className="h-4 w-4 text-primary/40 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <div className="space-y-4">
              <AppointmentStatus lang={lang} />
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3">
                 <Zap className="h-5 w-5 text-amber-500 shrink-0" />
                 <p className="text-[10px] text-amber-900 font-bold leading-tight">
                    Citas NIE: Prueba los viernes a las 9:00 AM en Plaza Batallas.
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empleo (1x1) */}
        <Card 
          className={cn(cardClass, "bg-slate-900 text-white")}
          onClick={() => setActiveTab('employment_portal')}
        >
          <CardContent className="p-6 flex flex-col h-full justify-between items-center text-center">
            <div className="bg-white/10 p-3 rounded-2xl">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-[10px] uppercase tracking-tighter">Portal Empleo</h4>
              <p className="text-[7px] opacity-60 font-black tracking-widest uppercase">Ofertas Locales</p>
            </div>
          </CardContent>
        </Card>

        {/* Estudios (1x1) */}
        <Card 
          className={cn(cardClass, "bg-white border-2 border-primary/5")}
          onClick={() => setActiveTab('study')}
        >
          <CardContent className="p-6 flex flex-col h-full justify-between items-center text-center">
            <div className="bg-primary/5 p-3 rounded-2xl">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-[10px] uppercase tracking-tighter text-slate-800">Estudiar UJA</h4>
              <p className="text-[7px] text-muted-foreground font-black tracking-widest uppercase">Universidad Jaén</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. VIDA Y AYUDAS (HORIZONTAL) */}
      <section className="grid grid-cols-2 gap-4">
        <Card 
          className={cn(cardClass, "bg-orange-50/50 border-orange-100")}
          onClick={() => setActiveTab('family')}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-orange-500 p-2.5 rounded-xl text-white">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase text-orange-900">Familias</h4>
              <p className="text-[8px] text-orange-800/60 font-bold uppercase">Colegios y Ayudas</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={cn(cardClass, "bg-blue-50/50 border-blue-100")}
          onClick={() => setActiveTab('andalucia_common')}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white">
              <Library className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase text-blue-900">Ayudas Junta</h4>
              <p className="text-[8px] text-blue-800/60 font-bold uppercase">Andalucía Vive</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. AYUDA LOCAL (ONGS / DIRECTORIO) */}
      <Card 
        className={cn(cardClass, "bg-white border-2 border-primary/5 min-h-[100px]")}
        onClick={() => setActiveTab('directory')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-red-50 p-3 rounded-2xl text-red-600">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-tighter text-slate-900">Ayuda Local y ONGs</h3>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Recursos Gratuitos en Jaén</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-red-200" />
        </CardContent>
      </Card>

      {/* 5. UTILIDADES Y SEGURIDAD */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={cn(cardClass, "bg-slate-50 border-slate-200/50")}
          onClick={() => setActiveTab('vault')}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase text-slate-800">Bóveda Segura</h4>
              <p className="text-[8px] text-muted-foreground font-bold uppercase">Documentos protegidos localmente</p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-[2.5rem] flex gap-4 items-center">
          <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
          <p className="text-[9px] text-emerald-900 font-bold uppercase leading-tight">
            Privacidad 100%: Tus datos no salen de este teléfono.
          </p>
        </div>
      </section>

      {/* LOGO SUTIL DE CIERRE */}
      <div className="flex justify-center pt-4 opacity-10">
         <Zap className="h-10 w-10 text-primary" />
      </div>
    </div>
  );
}
