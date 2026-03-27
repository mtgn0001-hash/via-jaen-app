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
  const isAccessible = progress.accessibilityMode === 'accessible';
  const isEasy = progress.easyReading; // Modo Audio / Simplificado
  
  const bentoCardClass = "relative overflow-hidden border-none shadow-xl transition-all active:scale-[0.98] group cursor-pointer";

  // MODO AUDIO: Interfaz simplificada para navegación por voz y baja visión
  if (isEasy) {
    return (
      <div className="space-y-6 pb-32 animate-in fade-in duration-500" role="main">
        <h2 className="sr-only">Menú Principal Simplificado</h2>
        
        <Button 
          onClick={() => setActiveTab('bot')}
          className="w-full h-24 rounded-none bg-primary text-white text-2xl font-black uppercase border-4 border-white"
          aria-label="Botón: Hablar con Jaén-Bot para resolver dudas con voz"
        >
          <MessageSquare className="h-8 w-8 mr-4" /> JAÉN-BOT
        </Button>

        <Button 
          onClick={() => setActiveTab('procedures')}
          className="w-full h-24 rounded-none bg-white text-slate-900 text-2xl font-black uppercase border-4 border-primary"
          aria-label="Botón: Sección Trámites. Gestión de NIE, TIE y Citas en Plaza de las Batallas"
        >
          <Building2 className="h-8 w-8 mr-4" /> TRÁMITES
        </Button>

        <Button 
          onClick={() => setResourceSection('salud')}
          className="w-full h-24 rounded-none bg-red-600 text-white text-2xl font-black uppercase border-4 border-white"
          aria-label="Botón: Sección Salud. Citas médicas y Urgencias Hospitalarias"
        >
          <Stethoscope className="h-8 w-8 mr-4" /> SALUD
        </Button>

        <Button 
          onClick={() => setResourceSection('familias')}
          className="w-full h-24 rounded-none bg-emerald-700 text-white text-2xl font-black uppercase border-4 border-white"
          aria-label="Botón: Sección Familias. Colegios, Ayudas al alquiler y Bono Carestía"
        >
          <Users className="h-8 w-8 mr-4" /> FAMILIAS
        </Button>

        <Button 
          onClick={() => setResourceSection('uja')}
          className="w-full h-24 rounded-none bg-indigo-700 text-white text-2xl font-black uppercase border-4 border-white"
          aria-label="Botón: Sección Universidad UJA. Becas, Notas y Automatrícula"
        >
          <GraduationCap className="h-8 w-8 mr-4" /> UNIVERSIDAD
        </Button>

        <Button 
          onClick={() => setActiveTab('employment_portal')}
          className="w-full h-24 rounded-none bg-slate-900 text-white text-2xl font-black uppercase border-4 border-white"
          aria-label="Botón: Sección Empleo. Ofertas SAE y Derechos Laborales"
        >
          <Briefcase className="h-8 w-8 mr-4" /> EMPLEO
        </Button>

        <Button 
          onClick={() => window.open('tel:112', '_self')}
          className="w-full h-32 rounded-none bg-destructive text-white text-3xl font-black uppercase border-8 border-white animate-pulse"
          aria-label="BOTÓN DE EMERGENCIA: Llamar al 112 inmediatamente"
        >
          <ShieldAlert className="h-12 w-12 mr-4" /> S.O.S 112
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000" role="main">
      
      {/* 1. CABECERA INTELIGENTE: JAÉN-BOT */}
      <section aria-label="Asistente Virtual">
        <Card 
          className={cn(bentoCardClass, "bg-gradient-to-br from-primary to-indigo-600 text-white rounded-[2.5rem]")}
          onClick={() => setActiveTab('bot')}
          role="button"
          tabIndex={0}
          aria-label="Acceder a Jaén-Bot: Chat interactivo con inteligencia artificial"
        >
          <CardContent className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-white/25 p-4 rounded-3xl backdrop-blur-md shadow-inner">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter leading-none text-white text-shadow-sm">Hablar con Jaén-Bot</h2>
                <p className="text-[10px] font-bold text-white/90 uppercase tracking-widest">Resuelve tus dudas en tiempo real</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <Badge className="bg-white/25 text-white border-none text-[9px] font-black uppercase px-3 py-1 rounded-full hidden sm:flex">IA Activa</Badge>
               <ArrowRight className="h-6 w-6 text-white opacity-80 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. BENTO GRID PRINCIPAL */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Servicios Principales">
        
        {/* TRÁMITES CRÍTICOS (2x2) */}
        <Card 
          className={cn(bentoCardClass, "col-span-2 row-span-2 bg-white rounded-[3rem] border-2 border-primary/10 flex flex-col justify-between")}
          onClick={() => setActiveTab('procedures')}
          role="button"
          tabIndex={0}
          aria-label="Sección Trámites Prioritarios: Gestión de NIE y TIE en Plaza de las Batallas"
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
                {isAccessible && <div className="bg-primary p-2 rounded-full shadow-lg animate-bounce" aria-hidden="true"><Play className="h-3 w-3 text-white fill-current" /></div>}
                <Badge variant="outline" className="bg-amber-100 text-amber-900 border-amber-200 font-black text-[8px] uppercase">Prioridad 1</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-[#1A1A1B] tracking-tighter uppercase leading-tight">Trámites</h3>
              <p className="text-[10px] font-bold text-slate-800 uppercase leading-relaxed max-w-[180px]">
                Gestión exclusiva de TIE, Modelo EX-15 y Citas Plaza de las Batallas.
              </p>
              <Button className="h-12 rounded-xl font-black text-xs gap-2 shadow-lg w-fit" aria-label="Ver todos los trámites de extranjería">
                VER TRÁMITES <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SALUD JAÉN */}
        <Card 
          className={cn(bentoCardClass, "bg-red-50 border border-red-100 rounded-[2rem]")}
          onClick={() => setResourceSection('salud')}
          role="button"
          tabIndex={0}
          aria-label="Sección Salud: Citas y Urgencias en Jaén"
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-red-600 p-3 rounded-2xl text-white shadow-lg">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase text-red-950">Salud</h4>
              <p className="text-[8px] text-red-900 font-black uppercase">Citas / Urgencias</p>
            </div>
            {isAccessible && <Play className="h-3 w-3 text-red-600" aria-hidden="true" />}
          </CardContent>
        </Card>

        {/* PARA FAMILIAS */}
        <Card 
          className={cn(bentoCardClass, "bg-emerald-50 border border-emerald-100 rounded-[2rem]")}
          onClick={() => setResourceSection('familias')}
          role="button"
          tabIndex={0}
          aria-label="Sección Familias: Colegios y Ayudas de la Junta"
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-emerald-700 p-3 rounded-2xl text-white shadow-lg">
              <Users className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase text-emerald-950">Familias</h4>
              <p className="text-[8px] text-emerald-900 font-black uppercase">Colegios / Ayudas</p>
            </div>
            {isAccessible && <Play className="h-3 w-3 text-emerald-700" aria-hidden="true" />}
          </CardContent>
        </Card>

        {/* ESTUDIAR UJA */}
        <Card 
          className={cn(bentoCardClass, "bg-indigo-50 border border-indigo-100 rounded-[2rem]")}
          onClick={() => setResourceSection('uja')}
          role="button"
          tabIndex={0}
          aria-label="Sección Universidad: Becas y Servicios de la UJA"
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-indigo-700 p-3 rounded-2xl text-white shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase text-indigo-950">UJA</h4>
              <p className="text-[8px] text-indigo-900 font-black uppercase">Becas / Notas</p>
            </div>
            {isAccessible && <Play className="h-3 w-3 text-indigo-700" aria-hidden="true" />}
          </CardContent>
        </Card>

        {/* EMPLEO */}
        <Card 
          className={cn(bentoCardClass, "bg-slate-100 border border-slate-200 rounded-[2rem]")}
          onClick={() => setActiveTab('employment_portal')}
          role="button"
          tabIndex={0}
          aria-label="Sección Empleo: Ofertas SAE y derechos laborales"
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase text-slate-950">Empleo</h4>
              <p className="text-[8px] text-slate-900 font-black uppercase">SAE / Ofertas</p>
            </div>
          </CardContent>
        </Card>

      </section>

      {/* 3. VOCES QUE TE GUÍAN (REFERENTES) */}
      <section aria-label="Ecosistema de Apoyo Comunitario">
        <CommunityReferents lang={lang} />
      </section>

      {/* 4. BLOQUE DE EMERGENCIA S.O.S */}
      <section className="flex justify-center py-2" aria-label="Acciones de Emergencia">
         <Button 
            onClick={() => window.open('tel:112', '_self')}
            className="h-20 w-20 rounded-full bg-destructive shadow-2xl border-4 border-white animate-pulse flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-all text-white"
            aria-label="Llamar a Emergencias 112"
         >
            <ShieldAlert className="h-8 w-8 text-white" />
            <span className="text-[9px] font-black uppercase">S.O.S</span>
         </Button>
      </section>

      {/* 5. UTILIDADES DE SEGURIDAD */}
      <section aria-label="Seguridad de Datos">
        <Card className="border-none bg-emerald-50 border border-emerald-100 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-700">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-black text-xs uppercase text-emerald-950">Bóveda Segura Activa</h4>
              <p className="text-[10px] font-bold text-emerald-900 uppercase">Tus documentos están protegidos localmente.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="flex justify-center pt-8 opacity-5 scale-125" aria-hidden="true">
         <Zap className="h-16 w-16 text-primary" />
      </div>
    </div>
  );
}