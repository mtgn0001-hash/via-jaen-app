"use client"

import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { HealthHub } from "@/features/salud/HealthHub";
import { FamilyHub } from "@/features/familias/FamilyHub";
import { UjaHub } from "@/features/uja/UjaHub";
import { 
  HeartPulse, 
  Users, 
  GraduationCap,
  Activity,
  Home,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ResourcesHub({ lang }: { lang: string }) {
  const [activeItem, setActiveItem] = useState<string>("salud");

  const sections = [
    { 
      id: "salud", 
      title: "Recursos Salud", 
      subtitle: "Citas Médicas y Urgencias",
      icon: HeartPulse, 
      content: <HealthHub lang={lang} />,
      color: "text-red-500",
      bg: "bg-red-50/50"
    },
    { 
      id: "familias", 
      title: "Ayudas Familias", 
      subtitle: "Colegios y Subvenciones",
      icon: Users, 
      content: <FamilyHub lang={lang} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50/50"
    },
    { 
      id: "uja", 
      title: "Universidad UJA", 
      subtitle: "Becas y Gestión Académica",
      icon: GraduationCap, 
      content: <UjaHub lang={lang} />,
      color: "text-indigo-600",
      bg: "bg-indigo-50/50"
    },
  ];

  return (
    <div className="space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1 px-2">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Guía de Recursos</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Servicios Públicos y Vida en Jaén</p>
      </div>

      <Accordion 
        type="single" 
        collapsible 
        defaultValue="salud"
        onValueChange={(val) => setActiveItem(val)}
        className="space-y-4"
      >
        {sections.map((section) => (
          <AccordionItem 
            key={section.id} 
            value={section.id}
            className="border-none"
          >
            <AccordionTrigger className={cn(
              "p-6 rounded-[2.5rem] border-2 transition-all hover:no-underline shadow-sm",
              activeItem === section.id 
                ? "bg-white border-primary/20 shadow-xl" 
                : "bg-white/40 backdrop-blur-xl border-transparent"
            )}>
              <div className="flex items-center gap-5 text-left">
                <div className={cn(
                  "p-4 rounded-2xl shadow-inner transition-all",
                  activeItem === section.id ? section.bg : "bg-slate-100"
                )}>
                  <section.icon className={cn("h-7 w-7", activeItem === section.id ? section.color : "text-slate-400")} />
                </div>
                <div>
                  <h3 className={cn(
                    "text-xl font-black uppercase tracking-tighter leading-none",
                    activeItem === section.id ? "text-slate-900" : "text-slate-500"
                  )}>{section.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{section.subtitle}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-6 px-2 pb-2">
              <div className="bg-white/20 backdrop-blur-2xl rounded-[3rem] p-6 border border-white/40 shadow-inner">
                {section.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-primary/5 p-8 rounded-[3rem] border border-primary/10 text-center space-y-2">
         <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Información Actualizada 2026</p>
         <p className="text-xs font-bold text-slate-600 leading-relaxed max-w-xs mx-auto">
           Vía Jaén utiliza fuentes oficiales de la Junta de Andalucía, Ayuntamiento y Universidad de Jaén.
         </p>
      </div>
    </div>
  );
}
