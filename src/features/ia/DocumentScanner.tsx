"use client"

import { ScannerSection } from "@/features/tramites/ScannerSection";
import { useLocalStorage } from "@/lib/store";
import { translations } from "@/lib/translations";

export function DocumentScanner({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const t = translations[lang as keyof typeof translations] || translations.es;

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-700">
      <div className="space-y-1 px-2">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Asistente Visual</h2>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
          IA para explicar tus documentos paso a paso
        </p>
      </div>

      <ScannerSection />

      <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[3rem] space-y-4">
        <h4 className="text-sm font-black text-indigo-900 uppercase">¿Cómo funciona?</h4>
        <ul className="space-y-3">
          {[
            "Haz una foto nítida a tu carta o formulario.",
            "Jaén-Bot identificará de qué trámite se trata.",
            "Te explicará conceptos difíciles paso a paso.",
            "Escucha las instrucciones en tu idioma."
          ].map((text, i) => (
            <li key={i} className="flex gap-3 text-xs font-bold text-indigo-800/80">
              <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0">{i+1}</div>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
