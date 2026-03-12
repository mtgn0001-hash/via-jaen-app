
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LegalTimeline } from "@/components/procedures/LegalTimeline";
import { AppointmentStatus } from "./AppointmentStatus";
import { AppointmentBanner } from "./AppointmentBanner";
import { CurrencyConverter } from "@/components/economy/CurrencyConverter";
import { useLocalStorage } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { FirstStepsProgress } from "./FirstStepsProgress";
import { 
  Building2, 
  CreditCard, 
  Briefcase, 
  GraduationCap,
  MapPin,
  ArrowRight,
  Info,
  ShieldCheck,
  Zap,
  Scan,
  MessageSquare,
  Lock,
  Sparkles
} from "lucide-react";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
};

export function Dashboard({ lang, setActiveTab }: DashboardProps) {
  const langPack = translations[lang] || translations.es;
  const t = langPack;
  const { progress } = useLocalStorage();

  const smartTools = [
    { 
      id: 'bot', 
      tab: 'bot', 
      title: langPack.bot?.title || 'Jaén-Bot', 
      desc: 'Asistente IA', 
      icon: MessageSquare,
      color: 'text-white',
      bgColor: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    },
    { 
      id: 'scanner', 
      tab: 'scanner', 
      title: langPack.scanner?.title || 'Escáner', 
      desc: 'Análisis IA', 
      icon: Scan,
      color: 'text-white',
      bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-600'
    },
    { 
      id: 'vault', 
      tab: 'vault', 
      title: langPack.vault?.title || 'Bóveda', 
      desc: 'Doc Seguros', 
      icon: Lock,
      color: 'text-white',
      bgColor: 'bg-gradient-to-br from-amber-500 to-orange-600'
    },
  ];

  if (progress.easyReading) {
    return (
      <div className="space-y-6 pt-4">
        <div className="bg-primary p-8 rounded-[40px] text-primary-foreground shadow-xl shadow-primary/20 flex flex-col items-center text-center gap-4">
          <Zap className="h-16 w-16 text-yellow-300 animate-bounce" />
          <div className="space-y-1">
            <h2 className="text-4xl font-black uppercase tracking-tight">MODO FÁCIL</h2>
            <p className="text-lg font-bold opacity-90">Pulsa lo que necesites</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {smartTools.map((cat) => (
             <Button 
               key={cat.id} 
               onClick={() => setActiveTab(cat.tab)}
               className={`h-28 rounded-[35px] bg-card border-[6px] text-primary shadow-xl flex items-center justify-between px-8 group active:scale-90 transition-all border-primary/10`}
             >
               <div className="flex items-center gap-6">
                 <div className={`p-3 rounded-2xl ${cat.bgColor} ${cat.color}`}>
                   <cat.icon className="h-12 w-12" />
                 </div>
                 <div className="text-left">
                   <span className="block text-2xl font-black uppercase tracking-tight leading-none">{cat.title}</span>
                   <span className="text-xs font-bold text-muted-foreground uppercase mt-1 block">{cat.desc}</span>
                 </div>
               </div>
               <ArrowRight className="h-10 w-10 opacity-20" />
             </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary/60 animate-pulse" />
          <p className="text-sm font-medium text-muted-foreground">
            {t.welcome || 'Bienvenido a tu guía segura'}
          </p>
        </div>
        
        <Card className="bg-primary text-primary-foreground overflow-hidden border-none shadow-2xl mb-6 group relative rounded-[3rem]">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/jaen/800/400')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary pointer-events-none" />
          <CardContent className="p-8 relative">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h2 className="text-4xl font-black mb-1 tracking-tighter uppercase leading-none">Vía Jaén</h2>
                <div className="flex items-center gap-2">
                   <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-[8px] font-black uppercase tracking-widest">EDICIÓN 2026</Badge>
                   <span className="text-white/60 text-[8px] font-bold uppercase tracking-widest">PROVINCIA SEGURA</span>
                </div>
              </div>
              <div className="bg-white/20 p-5 rounded-[2.5rem] backdrop-blur-md border border-white/10 shadow-xl">
                <ShieldCheck className="h-12 w-12 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Modern Traffic Light Widget */}
      <AppointmentStatus lang={lang} />

      {/* SMART TOOLS PANEL (New Visual Design) */}
      <section>
        <h3 className="font-black text-[10px] mb-4 flex items-center gap-2 px-1 uppercase tracking-[0.2em] text-primary/60">
          Herramientas Inteligentes
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {smartTools.map((tool) => (
            <Card 
              key={tool.id} 
              className="border-none shadow-xl cursor-pointer active:scale-95 transition-all bg-white overflow-hidden group rounded-[2rem]"
              onClick={() => {
                if ('vibrate' in navigator) navigator.vibrate(20);
                setActiveTab(tool.tab);
              }}
            >
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`w-full aspect-square rounded-[1.5rem] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${tool.bgColor}`}>
                  <tool.icon className="h-7 w-7 text-white" />
                </div>
                <div className="space-y-0.5 mt-1">
                  <h4 className="font-black text-[9px] uppercase tracking-tighter leading-none">{tool.title}</h4>
                  <p className="text-[7px] text-muted-foreground font-black uppercase tracking-widest opacity-60">{tool.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gamification: First Steps */}
      <FirstStepsProgress lang={lang} setActiveTab={setActiveTab} />

      {/* Smart Appointment Banner (Time-based Proactive) */}
      <AppointmentBanner lang={lang} />

      {/* Security Banner Premium */}
      <section className="bg-slate-900 text-white p-6 rounded-[3rem] flex gap-5 items-center shadow-2xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="bg-white/10 p-4 rounded-[2rem] shadow-inner backdrop-blur-md">
            <ShieldCheck className="h-8 w-8 text-primary" />
         </div>
         <p className="text-[11px] font-bold leading-snug tracking-tight relative z-10">
            Tus datos están blindados. No usamos servidores externos para tus fotos ni documentos. Privacidad total por diseño 2026.
         </p>
      </section>

      <LegalTimeline lang={lang} />
      <CurrencyConverter lang={lang} />

      <section className="pb-16">
        <h3 className="font-black text-[10px] mb-4 flex items-center gap-2 px-1 uppercase tracking-[0.2em] text-muted-foreground">
          Acceso Rápido a Guías
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: 'empadronamiento', title: 'Empadronamiento', desc: 'Registro en el Ayuntamiento', icon: Building2 },
            { id: 'nie', title: 'NIE / TIE', desc: 'Identificación oficial', icon: CreditCard },
          ].map((link) => (
            <Card 
              key={link.id} 
              className="group hover:border-primary/20 transition-all cursor-pointer border-2 border-transparent shadow-xl rounded-[2.5rem] bg-white active:scale-[0.98]"
              onClick={() => setActiveTab('procedures')}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-slate-50 p-4 rounded-3xl group-hover:bg-primary/5 transition-colors">
                  <link.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-sm leading-none uppercase tracking-tighter">{link.title}</h4>
                    <Badge variant="outline" className="text-[8px] uppercase font-black tracking-[0.2em] text-primary border-primary/20 bg-primary/5 px-2 py-0.5 rounded-lg">
                      CRÍTICO
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">{link.desc}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
