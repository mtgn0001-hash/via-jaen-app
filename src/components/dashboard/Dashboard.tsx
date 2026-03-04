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
  Zap
} from "lucide-react";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
};

export function Dashboard({ lang, setActiveTab }: DashboardProps) {
  const t = translations[lang];
  const { progress } = useLocalStorage();

  const mainCategories = [
    { id: 'procedures', tab: 'procedures', title: t.procedures, desc: 'Papeles y NIE', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'employment', tab: 'employment_portal', title: t.employment.title, desc: 'Trabajo y CV', icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'study', tab: 'study', title: 'Estudios', desc: 'Aprender', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'family', tab: 'family', title: 'Familia', desc: 'Niños y Ayudas', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-100' },
    { id: 'help', tab: 'directory', title: 'Ayuda', desc: 'ONGs y Comida', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: 'emergency', tab: 'emergency', title: 'S.O.S', desc: 'Urgencias', icon: ShieldAlert, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  // VISTA DE LECTURA FÁCIL (Simplificada al máximo)
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
               className="h-28 rounded-[35px] bg-card border-[6px] border-primary/10 text-primary shadow-xl flex items-center justify-between px-8 group active:scale-90 transition-all"
             >
               <div className="flex items-center gap-6">
                 <div className="p-3 bg-primary/5 rounded-2xl">
                   <cat.icon className="h-12 w-12" />
                 </div>
                 <div className="text-left">
                   <span className="block text-2xl font-black uppercase tracking-tight leading-none">{cat.title}</span>
                   <span className="text-xs font-bold text-muted-foreground uppercase mt-1 block">{cat.desc}</span>
                 </div>
               </div>
               <ArrowRight className="h-10 w-10 text-primary/20" />
             </Button>
          ))}
        </div>

        <section className="bg-foreground text-background p-8 rounded-[40px] space-y-4">
           <div className="flex items-center gap-4">
             <ShieldCheck className="h-10 w-10 text-green-400" />
             <h3 className="text-xl font-black uppercase">Seguro y Privado</h3>
           </div>
           <p className="text-sm font-medium opacity-70 leading-relaxed">
             Tus datos se quedan en este móvil. Nadie puede ver tus papeles.
           </p>
        </section>
      </div>
    );
  }

  // VISTA ESTÁNDAR (Versión "Pro")
  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-primary/60" />
          <p className="text-sm font-medium text-muted-foreground">
            {t.welcome}
          </p>
        </div>
        
        <Card className="bg-primary text-primary-foreground overflow-hidden border-none shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">Vía Jaén</h2>
                <p className="text-primary-foreground/80 text-xs max-w-[200px] leading-relaxed">
                  Tu guía segura y privada para la vida en Jaén. Todo funciona sin internet.
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl">
                <LayoutGrid className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Security Banner */}
      <section className="bg-secondary border border-primary/10 p-4 rounded-3xl flex gap-4 items-center">
         <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
         <p className="text-[10px] text-foreground font-bold leading-tight">
            {t.privacyBanner}
         </p>
      </section>

      {/* Smart Appointment Banner */}
      <AppointmentBanner lang={lang} />

      {/* Main Navigation Grid */}
      <section>
        <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2 px-1">
          Categorías
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {mainCategories.map((cat) => (
            <Card 
              key={cat.id} 
              className="border-none shadow-sm cursor-pointer active:scale-95 transition-transform bg-card overflow-hidden"
              onClick={() => setActiveTab(cat.tab)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`${cat.bg} p-3 rounded-2xl`}>
                  <cat.icon className={`h-6 w-6 ${cat.color}`} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs">{cat.title}</h4>
                  <p className="text-[9px] text-muted-foreground line-clamp-1">{cat.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Legal Timeline Calculator */}
      <LegalTimeline lang={lang} />

      {/* Appointment Traffic Light Widget */}
      <AppointmentStatus lang={lang} />

      {/* Currency Converter Utility */}
      <CurrencyConverter lang={lang} />

      <section className="pb-10">
        <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2 px-1">
          Guías Destacadas
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: 'empadronamiento', title: 'Empadronamiento', desc: 'Registro en el Ayuntamiento', icon: Building2 },
            { id: 'nie', title: 'NIE / TIE', desc: 'Identificación oficial', icon: CreditCard },
          ].map((link) => (
            <Card 
              key={link.id} 
              className="group hover:border-primary transition-colors cursor-pointer border-none shadow-sm rounded-2xl bg-card"
              onClick={() => setActiveTab('procedures')}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-muted p-3 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <link.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm leading-tight">{link.title}</h4>
                    <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                      Guía
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-30" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}