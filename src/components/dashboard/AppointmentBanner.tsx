
"use client"

import { useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ExternalLink, Bell } from "lucide-react";

type AppointmentBannerProps = {
  lang: Language;
};

export function AppointmentBanner({ lang }: AppointmentBannerProps) {
  const t = translations[lang];
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const day = now.getDay(); // 5 is Friday
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTimeInMinutes = hours * 60 + minutes;

      // Friday between 8:30 AM (510 min) and 10:00 AM (600 min)
      const isFriday = day === 5;
      const isMorningSlot = currentTimeInMinutes >= 510 && currentTimeInMinutes <= 600;

      setIsCritical(isFriday && isMorningSlot);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isCritical) return null;

  return (
    <Card className="border-none bg-destructive text-destructive-foreground shadow-lg animate-pulse mb-6 overflow-hidden">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="bg-white/20 p-2 rounded-full">
          <Bell className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-sm uppercase tracking-tight">¡Momento Crítico!</h4>
          <p className="text-[10px] opacity-90 font-bold leading-tight">
            Están liberando citas en Jaén ahora mismo. ¡Inténtalo ya!
          </p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          className="rounded-xl font-bold h-9 gap-2 shadow-sm"
          asChild
        >
          <a href="https://icp.administracionelectronica.gob.es/icpco/index.html" target="_blank">
            Ir <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
