
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
import { ShieldCheck, Download, Sparkles, X } from "lucide-react";

type OnboardingProps = {
  lang: Language;
  onComplete: () => void;
};

export function Onboarding({ lang, onComplete }: OnboardingProps) {
  const t = translations[lang].onboarding;
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: t.title1,
      desc: t.desc1,
      icon: <Sparkles className="h-16 w-16 text-primary" />,
    },
    {
      title: t.title2,
      desc: t.desc2,
      icon: <Download className="h-16 w-16 text-primary" />,
    },
    {
      title: t.title3,
      desc: t.desc3,
      icon: <ShieldCheck className="h-16 w-16 text-primary" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      <button 
        onClick={onComplete}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted"
      >
        <X className="h-6 w-6 text-muted-foreground" />
      </button>

      <Carousel className="w-full max-w-sm mb-12">
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="flex flex-col items-center gap-6">
              <div className="bg-primary/5 p-8 rounded-[40px] mb-4">
                {slide.icon}
              </div>
              <h2 className="text-3xl font-black text-primary tracking-tight">{slide.title}</h2>
              <p className="text-muted-foreground text-lg px-4 leading-relaxed">{slide.desc}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 mt-8">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>

      <Button 
        onClick={onComplete}
        className="w-full max-w-xs h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
      >
        {t.getStarted}
      </Button>
      
      <p className="mt-8 text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-50">
        Jaén Integra 2026 • Versión 1.0
      </p>
    </div>
  );
}
