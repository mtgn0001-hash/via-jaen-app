
"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookOpen, 
  FileCheck, 
  Bus, 
  ExternalLink, 
  Play, 
  Zap
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";

export function UjaHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const accMode = progress.accessibilityMode;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-indigo-600 uppercase tracking-tighter">Estudiar UJA</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Exclusivo: Universidad de Jaén</p>
        </div>
        <SpeechButton text="Estudiar en la UJA. Becas y servicios académicos exclusivos." language={lang} />
      </div>

      {/* GESTIÓN ACADÉMICA */}
      <div className="grid grid-cols-1 gap-2">
        <Button 
          asChild
          className="h-16 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-xl"
        >
          <a href={OFFICIAL_LINKS.uja.matricula} target="_blank">
            <span>Automatrícula UJA</span>
            <Zap className="h-5 w-5 text-yellow-400" />
          </a>
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            asChild
            variant="outline"
            className="h-14 rounded-2xl border-2 border-indigo-100 hover:bg-indigo-50 text-indigo-700 font-bold text-[10px] uppercase px-4 flex justify-between"
          >
            <a href={OFFICIAL_LINKS.uja.platea} target="_blank">
              <span>Campus Platea</span>
              <BookOpen className="h-4 w-4" />
            </a>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="h-14 rounded-2xl border-2 border-indigo-100 hover:bg-indigo-50 text-indigo-700 font-bold text-[10px] uppercase px-4 flex justify-between"
          >
            <a href={OFFICIAL_LINKS.uja.notas} target="_blank">
              <span>Consulta Notas</span>
              <FileCheck className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* BECAS */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-indigo-600/60 tracking-widest ml-2 flex items-center gap-2">
          <GraduationCap className="h-3 w-3" /> Ayudas al Estudio
        </h4>
        <Card className="border-none bg-indigo-50/50 rounded-3xl overflow-hidden border border-indigo-100">
          <CardContent className="p-6 space-y-3">
            <Button 
              asChild
              variant="secondary"
              className="w-full h-12 rounded-xl bg-white shadow-sm font-bold text-xs uppercase text-indigo-700"
            >
              <a href={OFFICIAL_LINKS.uja.becas} target="_blank">Becas Propias UJA</a>
            </Button>
            <Button 
              asChild
              variant="secondary"
              className="w-full h-12 rounded-xl bg-white shadow-sm font-bold text-xs uppercase text-indigo-700"
            >
              <a href={OFFICIAL_LINKS.juntaAndalucia.becasMec} target="_blank">Becas MEC (Gobierno)</a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* TRANSPORTE */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-indigo-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Bus className="h-3 w-3" /> Transporte al Campus
        </h4>
        <Card className="border-none bg-slate-50 rounded-3xl border border-slate-200">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-black text-xs text-indigo-900 uppercase">Buses Lagunillas</h5>
                <p className="text-[10px] text-indigo-800/60 font-bold uppercase">Líneas 4, 7, 12, 14, 17</p>
              </div>
            </div>
            <Button asChild size="sm" variant="ghost" className="text-indigo-700 hover:bg-indigo-100 font-black text-[10px]">
              <a href={OFFICIAL_LINKS.transporte.horariosUja} target="_blank">HORARIOS</a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ACCESIBILIDAD LSE */}
      {accMode === 'accessible' && (
        <section className="bg-indigo-50 p-6 rounded-[2.5rem] border-2 border-indigo-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-black text-xs uppercase text-indigo-900 flex items-center gap-2">
              <Play className="h-4 w-4" /> Universidad en LSE
            </h4>
            <SpeechButton text="Cómo navegar por la UJA y solicitar becas universitarias." language={lang} />
          </div>
          <p className="text-[10px] text-indigo-800 font-bold leading-normal">
            Este video explica exclusivamente cómo gestionar la Automatrícula y el acceso a Plate@ en la Universidad de Jaén.
          </p>
        </section>
      )}
    </div>
  );
}
