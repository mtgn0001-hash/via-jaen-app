
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
  Baby,
  MapPin,
  ShieldAlert,
  ArrowRight,
  Info,
  LayoutGrid,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Scan,
  MessageSquare,
  Lock
} from "lucide-react";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
};

export function Dashboard({ lang, setActiveTab }: DashboardProps) {
  const t = translations[lang];
  const { progress } = useLocalStorage();

  const mainCategories = [
    { 
      id: 'bot', 
      tab: 'bot', 
      title: 'Jaén-Bot', 
      desc: 'Asistente IA', 
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    { 
      id: 'vault', 
      tab: 'vault', 
      title: 'Bóveda', 
      desc: 'Doc Seguros', 
      icon: Lock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    { 
      id: 'procedures', 
      tab: 'procedures', 
      title: t.procedures, 
      desc: 'Papeles y NIE', 
      icon: CreditCard,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    },
    { 
      id: 'employment', 
      tab: 'employment_portal', 
      title: 'Empleo', 
      desc: 'Trabajo y CV', 
      icon: Briefcase,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    { 
      id: 'study', 
      tab: 'study', 
      title: 'Estudios', 
      desc: 'Aprender', 
      icon: GraduationCap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    { 
      id: 'help', 
      tab: 'directory', 
      title: 'Ayuda', 
      desc: 'ONGs y Comida', 
      icon: MapPin,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
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
          {mainCategories.map((cat) => (
             <Button 
               key={cat.id} 
               onClick={() => setActiveTab(cat.tab)}
               className={`h-28 rounded-[35px] bg-card border-[6px] text-primary shadow-xl flex items-center justify-between px-8 group active:scale-90 transition-all border-primary/10`}
             >
               <div className="flex items-center gap-6">
                 <div className={`p-3 rounded-2xl ${cat.bgColor}`}>
                   <cat.icon className={`h-12 w-12 ${cat.color}`} />
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
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-primary/60" />
          <p className="text-sm font-medium text-muted-foreground">
            {t.welcome}
          </p>
        </div>
        
        <Card className="bg-primary text-primary-foreground overflow-hidden border-none shadow-lg mb-6 group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase">Vía Jaén</h2>
                <p className="text-primary-foreground/80 text-[10px] max-w-[200px] leading-relaxed font-bold uppercase tracking-wider">
                  Guía comunitaria segura • 2026 Edition
                </p>
              </div>
              <div className="bg-white/20 p-4 rounded-[2rem] animate-pulse">
                <ShieldCheck className="h-10 w-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Modern Traffic Light Widget */}
      <AppointmentStatus lang={lang} />

      {/* Gamification: First Steps */}
      <FirstStepsProgress lang={lang} setActiveTab={setActiveTab} />

      {/* Smart Appointment Banner (Time-based Proactive) */}
      <AppointmentBanner lang={lang} />

      {/* Quick Navigation Cards (iOS Style) */}
      <section>
        <h3 className="font-headline font-black text-xs mb-4 flex items-center gap-2 px-1 uppercase tracking-widest text-muted-foreground">
          Herramientas y Ayuda
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {mainCategories.map((cat) => (
            <Card 
              key={cat.id} 
              className="border-none shadow-lg cursor-pointer active:scale-95 transition-all bg-white overflow-hidden group hover:shadow-primary/10 rounded-[2.5rem]"
              onClick={() => {
                if ('vibrate' in navigator) navigator.vibrate(20);
                setActiveTab(cat.tab);
              }}
            >
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <div className={`p-4 rounded-3xl transition-transform group-hover:scale-110 group-hover:rotate-6 ${cat.bgColor}`}>
                  <cat.icon className={`h-8 w-8 ${cat.color}`} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-xs uppercase tracking-tighter">{cat.title}</h4>
                  <p className="text-[9px] text-muted-foreground line-clamp-1 font-bold uppercase tracking-widest">{cat.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Security Banner Premium */}
      <section className="bg-slate-900 text-white p-6 rounded-[3rem] flex gap-5 items-center shadow-xl">
         <div className="bg-white/10 p-3 rounded-2xl">
            <ShieldCheck className="h-8 w-8 text-primary" />
         </div>
         <p className="text-[11px] font-bold leading-snug tracking-tight">
            Tus datos están blindados. No usamos servidores externos para tus fotos ni documentos. Privacidad total por diseño.
         </p>
      </section>

      <LegalTimeline lang={lang} />
      <CurrencyConverter lang={lang} />

      <section className="pb-10">
        <h3 className="font-headline font-black text-xs mb-4 flex items-center gap-2 px-1 uppercase tracking-widest text-muted-foreground">
          Guías Destacadas
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: 'empadronamiento', title: 'Empadronamiento', desc: 'Registro en el Ayuntamiento', icon: Building2 },
            { id: 'nie', title: 'NIE / TIE', desc: 'Identificación oficial', icon: CreditCard },
          ].map((link) => (
            <Card 
              key={link.id} 
              className="group hover:border-primary transition-all cursor-pointer border-none shadow-md rounded-[2.5rem] bg-white active:scale-[0.98]"
              onClick={() => setActiveTab('procedures')}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">
                  <link.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-sm leading-tight uppercase tracking-tighter">{link.title}</h4>
                    <Badge variant="outline" className="text-[9px] uppercase font-black tracking-[0.2em] text-primary border-primary/20 bg-primary/5">
                      Pro
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase">{link.desc}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
