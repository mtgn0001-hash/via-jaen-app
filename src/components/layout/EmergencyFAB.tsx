
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Phone, X, HeartHandshake, UserRoundCheck, Siren } from "lucide-react";
import { cn } from "@/lib/utils";

type EmergencyFABProps = {
  lang: Language;
};

export function EmergencyFAB({ lang }: EmergencyFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang] || translations.es;

  const emergencyActions = [
    { label: '112 Emergencias', number: '112', icon: Siren, color: 'bg-destructive' },
    { label: '016 Violencia', number: '016', icon: UserRoundCheck, color: 'bg-purple-600' },
    { label: 'Salud Responde', number: '955 54 50 60', icon: HeartHandshake, color: 'bg-blue-600' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden">
      {isOpen && (
        <div className="flex flex-col items-end gap-3 animate-in slide-in-from-bottom-6 fade-in duration-500">
          {emergencyActions.map((action, i) => (
            <div 
              key={action.number} 
              className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl text-[10px] font-black uppercase tracking-tight border text-foreground">
                {action.label}
              </span>
              <Button
                asChild
                size="icon"
                className={cn("h-14 w-14 rounded-[20px] shadow-2xl border-4 border-white active:scale-90 transition-transform", action.color)}
              >
                <a href={`tel:${action.number.replace(/\s/g, '')}`}>
                  <action.icon className="h-6 w-6 text-white" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={() => {
          if ('vibrate' in navigator) navigator.vibrate(50);
          setIsOpen(!isOpen);
        }}
        size="icon"
        className={cn(
          "h-16 w-16 rounded-[24px] shadow-2xl transition-all duration-500 border-4 border-white relative overflow-hidden",
          isOpen ? "bg-slate-900 rotate-90 text-white" : "bg-primary hover:bg-primary/90 scale-110"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        {isOpen ? <X className="h-7 w-7" /> : (
          <div className="flex flex-col items-center">
             <ShieldAlert className="h-8 w-8" />
             <span className="text-[8px] font-black uppercase tracking-tighter">S.O.S</span>
          </div>
        )}
      </Button>
    </div>
  );
}
