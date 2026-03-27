
"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  School, 
  Baby, 
  Wallet, 
  ExternalLink, 
  Play, 
  MapPin,
  Heart,
  Utensils,
  Users
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";

export function FamilyHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const accMode = progress.accessibilityMode;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-emerald-600 uppercase tracking-tighter">Familias y Colegios</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Exclusivo: Educación y Ayudas</p>
        </div>
        <SpeechButton text="Portal para familias. Recursos de educación y ayudas sociales." language={lang} />
      </div>

      {/* EDUCACIÓN */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-emerald-600/60 tracking-widest ml-2 flex items-center gap-2">
          <School className="h-3 w-3" /> Centros Educativos Jaén
        </h4>
        <Card className="border-none bg-white/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-emerald-100">
          <CardContent className="p-6 space-y-4">
            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              Buscador de colegios e institutos públicos y concertados en la capital.
            </p>
            <Button 
              asChild
              className="w-full h-14 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 font-black text-sm uppercase tracking-tight flex justify-between px-6 shadow-lg shadow-emerald-200"
            >
              <a href={OFFICIAL_LINKS.juntaAndalucia.escolarizacion} target="_blank">
                <span>Buscar Colegio / Matrícula</span>
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* AYUDAS ECONÓMICAS */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-emerald-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Wallet className="h-3 w-3" /> Ayudas y Subvenciones
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <Button 
            asChild
            variant="outline"
            className="h-14 rounded-2xl border-2 border-emerald-100 hover:bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-tight flex justify-between px-6"
          >
            <a href={OFFICIAL_LINKS.juntaAndalucia.ayudaAlquiler} target="_blank">
              <span>Ayuda al Alquiler (Plan Vive)</span>
              <Heart className="h-4 w-4" />
            </a>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="h-14 rounded-2xl border-2 border-emerald-100 hover:bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-tight flex justify-between px-6"
          >
            <a href={OFFICIAL_LINKS.juntaAndalucia.bonoCarestia} target="_blank">
              <span>Bono Carestía / Comedor</span>
              <Utensils className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* CONCILIACIÓN */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-black uppercase text-emerald-600/60 tracking-widest ml-2 flex items-center gap-2">
          <Baby className="h-3 w-3" /> Conciliación Local
        </h4>
        <Card className="border-none bg-orange-50/50 rounded-3xl border border-orange-100">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="bg-orange-500 p-3 rounded-2xl text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-black text-xs text-orange-900 uppercase">Ludotecas Municipales</h5>
                <p className="text-[10px] text-orange-800/60 font-bold uppercase">Ayuntamiento de Jaén</p>
              </div>
            </div>
            <Button asChild size="sm" variant="ghost" className="text-orange-700 hover:bg-orange-100 font-black text-[10px]">
              <a href={OFFICIAL_LINKS.ayuntamiento.ludotecas} target="_blank">INFO</a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ACCESIBILIDAD LSE */}
      {accMode === 'accessible' && (
        <section className="bg-emerald-50 p-6 rounded-[2.5rem] border-2 border-emerald-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-black text-xs uppercase text-emerald-900 flex items-center gap-2">
              <Play className="h-4 w-4" /> Familias en LSE
            </h4>
            <SpeechButton text="Cómo matricular a un niño en el colegio y solicitar ayudas en Jaén." language={lang} />
          </div>
          <p className="text-[10px] text-emerald-800 font-bold leading-normal">
            Este video se centra exclusivamente en el calendario escolar de marzo y la documentación para becas de comedor y ayudas al alquiler.
          </p>
        </section>
      )}
    </div>
  );
}
