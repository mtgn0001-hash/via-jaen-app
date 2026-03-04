
"use client"

import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Phone, Gavel, HeartHandshake, ShieldAlert, ExternalLink, ShieldCheck, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeechButton } from "@/components/ui/SpeechButton";

type EmergencyTabProps = {
  lang: Language;
};

export function EmergencyTab({ lang }: EmergencyTabProps) {
  const t = translations[lang];
  const l = t.legalRights;

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
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-3xl font-black text-destructive tracking-tight">{t.emergency}</h2>
          <SpeechButton text={`${t.emergency}. ${t.emergencyDesc}`} language={lang} />
        </div>
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

      <Card className="border-2 border-primary/20 bg-primary/5 rounded-3xl overflow-hidden shadow-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <Scale className="h-5 w-5" /> {l.title}
            </CardTitle>
            <SpeechButton text={`${l.title}. ${l.whatToDoTitle}. ${l.whatToDoDesc}`} language={lang} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border space-y-2">
            <h4 className="font-bold text-sm flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-600" /> {l.whatToDoTitle}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {l.whatToDoDesc}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-2xl border space-y-2">
            <h4 className="font-bold text-sm flex items-center gap-2">
              <Gavel className="h-4 w-4 text-primary" /> {l.lawyerTitle}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {l.lawyerDesc}
            </p>
            <Button variant="link" asChild className="p-0 h-auto text-primary font-bold text-xs">
              <a href="https://www.icajaen.es/" target="_blank" rel="noopener noreferrer">
                Web Colegio de Abogados Jaén <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

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
