"use client"

import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Phone, Gavel, HeartHandshake, ShieldAlert, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type EmergencyTabProps = {
  lang: Language;
};

export function EmergencyTab({ lang }: EmergencyTabProps) {
  const t = translations[lang];

  const contacts = [
    { title: 'Emergencias 112', number: '112', icon: ShieldAlert, color: 'bg-destructive' },
    { title: 'Cruz Roja Española', number: '900 221 122', icon: HeartHandshake, color: 'bg-red-500' },
    { title: 'Asistencia Legal CEAR', number: '915 980 535', icon: Gavel, color: 'bg-primary' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center space-y-2 py-4">
        <div className="bg-destructive/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
          <ShieldAlert className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-3xl font-black text-destructive tracking-tight">{t.emergency}</h2>
        <p className="text-muted-foreground font-medium px-4">{t.emergencyDesc}</p>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact) => (
          <Button 
            key={contact.number}
            asChild
            variant="outline"
            className="h-auto p-4 flex justify-between items-center rounded-2xl border-2 hover:bg-muted"
          >
            <a href={`tel:${contact.number.replace(/\s/g, '')}`}>
              <div className="flex items-center gap-4">
                <div className={`${contact.color} p-3 rounded-xl shadow-lg`}>
                  <contact.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg leading-none">{contact.title}</p>
                  <p className="text-sm font-mono text-muted-foreground mt-1">{contact.number}</p>
                </div>
              </div>
              <Phone className="h-6 w-6 text-muted-foreground" />
            </a>
          </Button>
        ))}
      </div>

      <section className="bg-primary/5 p-6 rounded-3xl border border-primary/20 space-y-4">
        <h3 className="font-bold text-xl flex items-center gap-2 text-primary">
          <Gavel className="h-6 w-6" /> {t.legalHelp}
        </h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Si necesitas ayuda legal gratuita y eres inmigrante, el SOJ (Servicio de Orientación Jurídica) de los Colegios de Abogados es tu primer paso.
        </p>
        <Button variant="link" asChild className="p-0 h-auto text-primary font-bold">
          <a href="https://www.abogacia.es/servicios-a-la-ciudadania/asistencia-juridica-gratuita/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            Saber más sobre Justicia Gratuita <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </section>

      <Card className="border-none bg-slate-100">
        <CardContent className="p-4 text-center">
          <p className="text-xs text-slate-500 font-medium italic">
            "En caso de peligro inmediato, siempre llame al 112. No tenga miedo de su estatus migratorio, su salud y seguridad son lo primero."
          </p>
        </CardContent>
      </Card>
    </div>
  );
}