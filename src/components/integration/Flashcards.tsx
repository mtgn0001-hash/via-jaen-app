
"use client"

import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages, ChevronRight, RotateCcw } from "lucide-react";

type FlashcardsProps = {
  lang: Language;
};

export function Flashcards({ lang }: FlashcardsProps) {
  const t = translations[lang].learn;
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = [
    { es: "Busco trabajo", meaning: "I'm looking for work / Je cherche du travail" },
    { es: "Me duele aquí", meaning: "It hurts here / J'ai mal ici" },
    { es: "Tengo cita hoy", meaning: "I have an appointment today / J'ai rendez-vous aujourd'hui" },
    { es: "Muchas gracias", meaning: "Thank you very much / Merci beaucoup" },
    { es: "Bonico", meaning: "Cosas lindas o personas amables (Jaén Style)" },
    { es: "Ea", meaning: "Expresión multiusos (Jaén Style)" }
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  return (
    <section className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Languages className="h-5 w-5 text-secondary" /> {t.flashcards}
        </h3>
        <Button variant="ghost" size="icon" onClick={() => setIndex(0)}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div 
        className="relative perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Card className={`h-40 flex items-center justify-center p-6 text-center rounded-3xl transition-all duration-500 transform ${isFlipped ? 'rotate-y-180 bg-secondary/10' : 'bg-white shadow-md'}`}>
          <CardContent className="p-0 flex flex-col items-center">
            {isFlipped ? (
              <p className="text-sm font-bold text-secondary-foreground leading-relaxed">
                {cards[index].meaning}
              </p>
            ) : (
              <h4 className="text-2xl font-black text-primary">
                {cards[index].es}
              </h4>
            )}
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-4">
              {isFlipped ? "Traducción" : t.flip}
            </p>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={handleNext} 
        className="w-full rounded-2xl h-12 gap-2 font-bold"
        variant="secondary"
      >
        {t.next} <ChevronRight className="h-5 w-5" />
      </Button>
    </section>
  );
}
