"use client"

import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  CreditCard, 
  Stethoscope, 
  Briefcase, 
  ShieldCheck,
  ArrowRight,
  Info
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
            {t.privacyNotice}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-primary text-white overflow-hidden border-none shadow-lg active:scale-95 transition-transform">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{t.welcome}</h2>
                  <p className="text-white/80 text-sm max-w-[200px]">
                    Comienza tu proceso de regularización en España de forma segura.
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <Briefcase className="h-8 w-8" />
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('procedures')}
                className="mt-6 flex items-center gap-2 text-sm font-bold bg-white text-primary px-4 py-2 rounded-full"
              >
                Empezar ahora <ArrowRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
          {t.procedures} Destacados
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {quickLinks.map((link) => (
            <Card 
              key={link.id} 
              className="group hover:border-secondary transition-colors cursor-pointer"
              onClick={() => setActiveTab('procedures')}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-muted p-3 rounded-xl group-hover:bg-secondary/10 transition-colors">
                  <link.icon className="h-6 w-6 text-primary group-hover:text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm leading-tight">{link.title}</h4>
                    <Badge variant="outline" className="text-[10px] uppercase">
                      Paso a Paso
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
        <h3 className="font-bold text-secondary mb-2 flex items-center gap-2">
          <Info className="h-4 w-4" /> {t.tipsTitle}
        </h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {t.tipsDesc}
        </p>
      </section>
    </div>
  );
}