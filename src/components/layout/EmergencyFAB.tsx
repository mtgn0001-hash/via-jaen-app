
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Phone, X, HeartHandshake, UserRoundCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type EmergencyFABProps = {
  lang: Language;
};

export function EmergencyFAB({ lang }: EmergencyFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const emergencyActions = [
    { label: '112 Emergencias', number: '112', icon: ShieldAlert, color: 'bg-destructive' },
    { label: '016 Violencia Género', number: '016', icon: UserRoundCheck, color: 'bg-purple-600' },
    { label: 'Salud Responde', number: '955 54 50 60', icon: HeartHandshake, color: 'bg-blue-600' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden">
      {isOpen && (
        <div className="flex flex-col items-end gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {emergencyActions.map((action, i) => (
            <div key={action.number} className="flex items-center gap-3">
              <span className="bg-white px-3 py-1.5 rounded-xl shadow-lg text-xs font-black uppercase tracking-tight border">
                {action.label}
              </span>
              <Button
                asChild
                size="icon"
                className={cn("h-12 w-12 rounded-2xl shadow-xl", action.color)}
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
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-3xl shadow-2xl transition-all duration-500",
          isOpen ? "bg-slate-800 rotate-90" : "bg-destructive hover:bg-destructive/90 scale-110"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <ShieldAlert className="h-7 w-7" />}
      </Button>
    </div>
  );
}
