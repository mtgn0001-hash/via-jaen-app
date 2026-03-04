
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle, Megaphone } from "lucide-react";

type AppointmentStatusProps = {
  lang: Language;
};

export function AppointmentStatus({ lang }: AppointmentStatusProps) {
  const t = translations[lang].appointmentLight;
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
    green: "text-green-500 bg-green-50 border-green-200",
    yellow: "text-amber-500 bg-amber-50 border-amber-200",
    red: "text-destructive bg-destructive/10 border-destructive/20"
  }[status];

  return (
    <Card className="border-none shadow-sm overflow-hidden bg-white mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-sm leading-none">{t.title}</h3>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">{t.updated}</p>
          </div>
          <Badge variant="outline" className={`rounded-full px-3 py-1 border flex items-center gap-1.5 ${StatusColor}`}>
            <StatusIcon className="h-3 w-3" />
            <span className="font-black text-[10px] uppercase">{t[status]}</span>
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          {t.desc}
        </p>

        <Button 
          variant="secondary" 
          size="sm" 
          disabled={reported}
          onClick={handleReport}
          className="w-full h-10 rounded-xl font-bold text-xs gap-2"
        >
          {reported ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Megaphone className="h-4 w-4" />
          )}
          {reported ? t.thanks : t.report}
        </Button>
      </CardContent>
    </Card>
  );
}
