"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LegalTimeline } from "@/components/procedures/LegalTimeline";
import { AppointmentStatus } from "./AppointmentStatus";
import { AppointmentBanner } from "./AppointmentBanner";
import { CurrencyConverter } from "@/components/economy/CurrencyConverter";
import { useLocalStorage } from "@/lib/store";
import { 
  Building2, 
  CreditCard, 
  Briefcase, 
  GraduationCap,
  Baby,
  MapPin,
  Bus,
  Heart,
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
    { id: 'procedures', tab: 'procedures', title: t.procedures, desc: 'NIE, Padrón, Arraigo', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'work', tab: 'work', title: t.work.title, desc: t.work.oliveCampaign, icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'study', tab: 'study', title: 'Estudios UJA', desc: 'Universidad e Idiomas', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'family', tab: 'family', title: t.familyResources.title, desc: 'Colegios y Ayudas', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-50' },
    { id: 'help', tab: 'directory', title: t.directory, desc: 'ONGs y Comedores', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'transport', tab: 'directory', title: t.transport.title, desc: 'Buses y Horarios', icon: Bus, color: 'text-slate-600', bg: 'bg-slate-50' },
    { id: 'integration', tab: 'community', title: 'Integración', desc: 'Tapas y Glosario', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'emergency', tab: 'emergency', title: 'S.O.S', desc: 'Derechos y Ayuda', icon: ShieldAlert, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  if (progress.easyReading) {
    return (
      <div className="space-y-6 pt-4">
        <div className="bg-primary p-6 rounded-[32px] text-white shadow-xl shadow-primary/20 flex flex-col items-center text-center gap-4">
          <Zap className="h-12 w-12 text-yellow-300 animate-pulse" />
          <h2 className="text-3xl font-black uppercase tracking-tight">MODO FÁCIL</h2>
          <p className="text-sm font-bold opacity-80">Pulsa los botones grandes para obtener ayuda.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mainCategories.map((cat) => (
             <Button 
               key={cat.id} 
               onClick={() => setActiveTab(cat.tab)}
               className="h-24 rounded-[32px] bg-white border-4 border-primary/20 text-primary shadow-lg flex items-center justify-between px-8 group active:scale-95 transition-all"
             >
               <div className="flex items-center gap-4">
                 <cat.icon className="h-10 w-10" />
                 <span className="text-xl font-black uppercase tracking-tight">{cat.title}</span>
               </div>
               <ArrowRight className="h-8 w-8 opacity-20" />
             </Button>
          ))}
        </div>

        <section className="bg-slate-900 text-white p-6 rounded-[32px] space-y-4">
           <div className="flex items-center gap-3">
             <ShieldCheck className="h-6 w-6 text-green-400" />
             <h3 className="text-lg font-black uppercase">Privacidad Total</h3>
           </div>
           <p className="text-xs font-medium opacity-70 leading-relaxed">
             {t.privacyBanner}
           </p>
        </section>
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
        
        <Card className="bg-primary text-white overflow-hidden border-none shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">Vía Jaén</h2>
                <p className="text-white/80 text-xs max-w-[200px] leading-relaxed">
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
      <section className="bg-emerald-50 border border-emerald-100 p-4 rounded-3xl flex gap-4 items-center">
         <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
         <p className="text-[10px] text-emerald-800 font-bold leading-tight">
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
              className="border-none shadow-sm cursor-pointer active:scale-95 transition-transform bg-white overflow-hidden"
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
              className="group hover:border-primary transition-colors cursor-pointer border-none shadow-sm rounded-2xl bg-white"
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

function Button({ children, className, onClick }: any) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
