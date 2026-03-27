
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProgress } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Scan, 
  Building2, 
  Heart, 
  Baby,
  ArrowRight,
  ShieldAlert,
  Zap,
  Clock,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
  progress: UserProgress;
};

export function Dashboard({ lang, setActiveTab, progress }: DashboardProps) {
  const cardClass = "border-none shadow-xl bg-white/40 backdrop-blur-2xl transition-all hover:scale-[1.01] active:scale-[0.98] group overflow-hidden flex flex-col justify-between cursor-pointer border border-white/40";

  return (
    <div className="space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 1. BLOQUE IA (SUPERIOR) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={cn(cardClass, "bg-gradient-to-br from-primary to-indigo-600 text-white min-h-[220px] rounded-[3rem]")}
          onClick={() => setActiveTab('bot')}
        >
          <CardContent className="p-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-none text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">IA Activa</Badge>
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">Hablar con Jaén-Bot</h2>
              <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Resuelve tus dudas en tiempo real</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={cn(cardClass, "bg-emerald-500 text-white rounded-[3rem]")}
          onClick={() => setActiveTab('scanner')}
        >
          <CardContent className="p-10 flex flex-col items-center justify-center text-center gap-6">
            <div className="bg-white/20 p-6 rounded-full backdrop-blur-md animate-pulse border-4 border-white/10">
              <Scan className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-xl uppercase tracking-tighter">Escanear Carta</h3>
              <p className="text-[10px] opacity-80 font-black uppercase tracking-widest">Lectura inteligente de documentos</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. BLOQUE TRÁMITES (CENTRAL IZQUIERDA) Y VIDA (CENTRAL DERECHA) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tarjeta Grande Trámites */}
        <Card 
          className={cn(cardClass, "lg:col-span-2 bg-white/60 rounded-[3.5rem] border-2 border-primary/10")}
          onClick={() => setActiveTab('procedures')}
        >
          <CardContent className="p-10 flex flex-col h-full justify-between">
            <div className="flex items-start justify-between">
              <div className="bg-primary/10 p-5 rounded-[2rem] text-primary">
                <Building2 className="h-10 w-10" />
              </div>
              <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-2xl flex items-center gap-2 font-black text-[10px] uppercase">
                <Clock className="h-4 w-4" /> Citas: Plaza Batallas
              </div>
            </div>
            <div className="mt-12 space-y-4">
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Gestión NIE/TIE</h3>
              <p className="text-sm font-bold text-muted-foreground max-w-md">Consulta el estado de las citas en Comisaría y rellena los formularios oficiales EX-15 y EX-17.</p>
              <Button className="rounded-2xl h-14 px-8 font-black gap-3 mt-4 text-lg">
                Ver Guía Completa <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bloque Vida (Vertical Grid) */}
        <div className="grid grid-cols-1 gap-6">
          <Card 
            className={cn(cardClass, "bg-orange-50/50 border-orange-100 rounded-[2.5rem]")}
            onClick={() => setActiveTab('guides_hub')}
          >
            <CardContent className="p-8 flex items-center gap-6">
              <div className="bg-orange-500 p-4 rounded-2xl text-white shadow-lg">
                <Heart className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-black text-lg uppercase text-orange-900 tracking-tighter leading-none">Salud</h4>
                <p className="text-[10px] text-orange-800/60 font-black uppercase mt-1">Citas SAS</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={cn(cardClass, "bg-blue-50/50 border-blue-100 rounded-[2.5rem]")}
            onClick={() => setActiveTab('guides_hub')}
          >
            <CardContent className="p-8 flex items-center gap-6">
              <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg">
                <Baby className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-black text-lg uppercase text-blue-900 tracking-tighter leading-none">Familias</h4>
                <p className="text-[10px] text-blue-800/60 font-black uppercase mt-1">Colegios Jaén</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. AVISO DE PRIVACIDAD Y SEGURIDAD */}
      <div className="bg-emerald-50/50 border border-emerald-100 p-10 rounded-[4rem] flex flex-col md:flex-row gap-8 items-center text-center md:text-left shadow-inner">
        <div className="bg-emerald-100 p-6 rounded-full text-emerald-600">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h4 className="text-2xl font-black text-emerald-900 uppercase tracking-tighter">Privacidad 100% Local</h4>
          <p className="text-sm font-bold text-emerald-800/70 max-w-2xl leading-relaxed">
            Vía Jaén no recopila tus datos en ningún servidor externo. Todo lo que escaneas o escribes se queda en tu teléfono de forma cifrada. Sin cuentas, sin rastreo.
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-12 opacity-5 scale-150">
         <Zap className="h-20 w-20 text-primary" />
      </div>
    </div>
  );
}
