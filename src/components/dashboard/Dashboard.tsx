
"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArraigoCalculator } from "@/components/procedures/ArraigoCalculator";
import { AppointmentStatus } from "./AppointmentStatus";
import { CurrencyConverter } from "@/components/economy/CurrencyConverter";
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
  LayoutGrid
} from "lucide-react";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
};

export function Dashboard({ lang, setActiveTab }: DashboardProps) {
  const t = translations[lang];

  const mainCategories = [
    { id: 'procedures', tab: 'procedures', title: t.procedures, desc: 'NIE, Padrón, Arraigo', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'work', tab: 'community', title: t.work.title, desc: t.work.oliveCampaign, icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'study', tab: 'community', title: 'Estudios UJA', desc: 'Universidad e Idiomas', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'family', tab: 'directory', title: t.familyResources.title, desc: 'Colegios y Ayudas', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-50' },
    { id: 'help', tab: 'directory', title: t.directory, desc: 'ONGs y Comedores', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'transport', tab: 'directory', title: t.transport.title, desc: 'Buses y Horarios', icon: Bus, color: 'text-slate-600', bg: 'bg-slate-50' },
    { id: 'integration', tab: 'community', title: 'Integración', desc: 'Tapas y Glosario', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'emergency', tab: 'emergency', title: 'S.O.S', desc: 'Derechos y Ayuda', icon: ShieldAlert, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

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

      {/* Appointment Traffic Light Widget */}
      <AppointmentStatus lang={lang} />

      {/* Arraigo Calculator */}
      <ArraigoCalculator lang={lang} />

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
