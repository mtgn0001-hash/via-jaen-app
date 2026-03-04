"use client"

import { Share2, Info } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QRCodeShare } from "@/components/ui/QRCodeShare";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

type HeaderProps = {
  lang: Language;
  completion: number;
};

export function Header({ lang, completion }: HeaderProps) {
  const t = translations[lang];
  const [showQR, setShowQR] = useState(false);

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-4 py-3 border-b border-border shadow-sm">
      <div className="flex justify-between items-center max-w-lg mx-auto mb-3">
        <div className="flex items-center gap-1">
          <SidebarTrigger className="mr-2 h-10 w-10 text-primary hover:bg-primary/10 rounded-xl" />
          <h1 className="font-headline font-black text-xl tracking-tight text-primary">
            {t.title}
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-primary/10"
            onClick={() => setShowQR(true)}
            aria-label="Share application"
          >
            <Share2 className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
      
      <div className="max-w-lg mx-auto space-y-3">
        <div className="bg-secondary/10 px-3 py-1.5 rounded-full flex items-center gap-2 border border-secondary/20">
          <Info className="h-3 w-3 text-secondary-foreground" />
          <p className="text-[9px] font-bold text-secondary-foreground leading-none">
            {t.tipsDesc}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-end mb-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            <span>{t.progress}</span>
            <span>{completion}%</span>
          </div>
          <Progress value={completion} className="h-1.5 rounded-full bg-primary/10" />
        </div>
      </div>

      <QRCodeShare open={showQR} onOpenChange={setShowQR} lang={lang} />
    </header>
  );
}
