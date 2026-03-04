
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Download, Sparkles, X, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

type OnboardingProps = {
  lang: Language;
  onComplete: () => void;
};

export function Onboarding({ lang, onComplete }: OnboardingProps) {
  const t = translations[lang].onboarding;
  const [open, setOpen] = useState(true);

  const slides = [
    {
      title: t.title1,
      desc: t.desc1,
      icon: <Sparkles className="h-20 w-20 text-primary" />,
      bg: "bg-primary/5"
    },
    {
      title: t.title2,
      desc: t.desc2,
      icon: <Download className="h-20 w-20 text-secondary" />,
      bg: "bg-secondary/5"
    },
    {
      title: "Usa como App",
      desc: "Pulsa el botón 'Compartir' de tu navegador y selecciona 'Añadir a pantalla de inicio' para usarla sin internet. 📲",
      icon: <Smartphone className="h-20 w-20 text-orange-500" />,
      bg: "bg-orange-50"
    },
    {
      title: t.title3,
      desc: t.desc3,
      icon: <ShieldCheck className="h-20 w-20 text-green-500" />,
      bg: "bg-green-50"
    },
  ];

  const handleClose = () => {
    setOpen(false);
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 border-none bg-white rounded-[40px] overflow-hidden max-h-[95vh]">
        <div className="relative flex flex-col items-center p-8 text-center pt-12">
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-6 w-6 text-muted-foreground" />
          </button>

          <Carousel className="w-full max-w-sm mb-10">
            <CarouselContent>
              {slides.map((slide, i) => (
                <CarouselItem key={i} className="flex flex-col items-center gap-8 py-4">
                  <div className={`${slide.bg} p-12 rounded-[50px] shadow-inner transition-transform hover:scale-105 duration-500`}>
                    {slide.icon}
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">{slide.title}</h2>
                    <p className="text-muted-foreground text-lg px-2 leading-tight font-medium">{slide.desc}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-6 mt-10">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-2xl border-2" />
              <CarouselNext className="static translate-y-0 h-12 w-12 rounded-2xl border-2" />
            </div>
          </Carousel>

          <div className="w-full space-y-4 pt-4 border-t">
            <Button 
              onClick={handleClose}
              className="w-full h-16 rounded-[24px] text-xl font-black uppercase tracking-tight shadow-xl shadow-primary/20 animate-pulse hover:animate-none"
            >
              {t.getStarted}
            </Button>
            
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-40">
              Jaén Integra 2026 • Versión 1.2
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
