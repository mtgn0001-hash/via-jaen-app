
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle, Megaphone } from "lucide-react";

type AppointmentStatusProps = {
  lang: Language;
};

export function AppointmentStatus({ lang }: AppointmentStatusProps) {
  const langPack = translations[lang] || translations.es;
  const t = langPack.appointmentLight || translations.es.appointmentLight;
  
  const [reported, setReported] = useState(false);
  const [status, setStatus] = useState<'green' | 'yellow' | 'red'>('yellow');

  const handleReport = () => {
    setReported(true);
    setTimeout(() => setReported(false), 5000);
  };

  const StatusIcon = {
    green: CheckCircle2,
    yellow: AlertTriangle,
    red: XCircle
  }[status];

  const StatusColor = {
    green: "text-green-600 bg-green-50 border-green-200",
    yellow: "text-amber-600 bg-amber-50 border-amber-200",
    red: "text-destructive bg-destructive/10 border-destructive/20"
  }[status];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.2em]">Situación Citas</p>
          <p className="text-[7px] text-muted-foreground uppercase font-bold opacity-60">Actualizado hace 5 min</p>
        </div>
        <Badge variant="outline" className={`rounded-xl px-3 py-1 border-2 flex items-center gap-1.5 ${StatusColor}`}>
          <StatusIcon className="h-3 w-3" />
          <span className="font-black text-[9px] uppercase">{t[status]}</span>
        </Badge>
      </div>

      <Button 
        variant="secondary" 
        size="sm" 
        disabled={reported}
        onClick={(e) => {
          e.stopPropagation();
          handleReport();
        }}
        className="w-full h-10 rounded-xl font-black text-[9px] gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-100"
      >
        {reported ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          <Megaphone className="h-3.5 w-3.5" />
        )}
        {reported ? t.thanks : t.report}
      </Button>
    </div>
  );
}
