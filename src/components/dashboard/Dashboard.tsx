
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
  Stethoscope, 
  ShieldCheck,
  ArrowRight,
  Info,
  Users
} from "lucide-react";

type DashboardProps = {
  lang: Language;
  setActiveTab: (tab: string) => void;
};

export function Dashboard({ lang, setActiveTab }: DashboardProps) {
  const t = translations[lang];

  const quickLinks = [
    { id: 'empadronamiento', icon: Building2, title: 'Empadronamiento', desc: 'Registro en el Ayuntamiento', status: 'critical' },
    { id: 'nie', icon: CreditCard, title: 'NIE / TIE', desc: 'Identificación oficial', status: 'standard' },
    { id: 'seguridad-social', icon: ShieldCheck, title: 'Seguridad Social', desc: 'Derecho al trabajo', status: 'important' },
    { id: 'salud', icon: Stethoscope, title: 'Tarjeta Sanitaria', desc: 'Acceso médico SAS', status: 'standard' },
  ];

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-secondary" />
          <p className="text-sm font-medium text-muted-foreground">
            {t.welcome}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-primary text-white overflow-hidden border-none shadow-lg active:scale-95 transition-transform">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Jaén Integra</h2>
                  <p className="text-white/80 text-sm max-w-[200px]">
                    Tu guía segura para vivir y trabajar en Jaén.
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <ShieldCheck className="h-8 w-8" />
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('procedures')}
                className="mt-6 flex items-center gap-2 text-sm font-bold bg-white text-primary px-4 py-2 rounded-full shadow-md"
              >
                Trámites <ArrowRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Appointment Traffic Light Widget */}
      <AppointmentStatus lang={lang} />

      {/* Arraigo Calculator */}
      <ArraigoCalculator lang={lang} />

      {/* Currency Converter Utility */}
      <CurrencyConverter lang={lang} />

      <section className="grid grid-cols-1 gap-3">
        <Card 
          className="bg-secondary/10 border-2 border-secondary/30 cursor-pointer hover:bg-secondary/20 transition-all rounded-3xl"
          onClick={() => setActiveTab('community')}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-secondary p-3 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-secondary-foreground">Cultura y Comunidad</h4>
              <p className="text-xs text-muted-foreground mt-1">Glosario, tapas y vida en Jaén.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-secondary" />
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2 px-1">
          Guías Destacadas
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {quickLinks.map((link) => (
            <Card 
              key={link.id} 
              className="group hover:border-secondary transition-colors cursor-pointer border-none shadow-sm rounded-2xl bg-white"
              onClick={() => setActiveTab('procedures')}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-muted p-3 rounded-xl group-hover:bg-secondary/10 transition-colors">
                  <link.icon className="h-6 w-6 text-primary group-hover:text-secondary" />
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
