"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ResourceLauncher } from "@/features/citas/ResourceLauncher";
import { 
  GraduationCap, 
  Bus, 
  Zap,
  Globe,
  Award,
  BookOpen,
  Home,
  Utensils,
  Smartphone,
  Users,
  MapPin,
  Stethoscope,
  Info,
  ShieldCheck,
  FileCheck
} from "lucide-react";
import { OFFICIAL_LINKS } from "@/services/links-service";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { ScannerSection } from "@/features/tramites/ScannerSection";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/store";
import { cn } from "@/lib/utils";

export function UjaHub({ lang }: { lang: string }) {
  const { progress } = useLocalStorage();
  const isAccessible = progress.accessibilityMode === 'accessible';

  return (
    <div className={cn("space-y-10 animate-in slide-in-from-bottom-2 duration-500 pb-20", isAccessible && "space-y-16")}>
      {/* HEADER DINÁMICO */}
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h3 className={cn("text-3xl font-black text-indigo-800 uppercase tracking-tighter", isAccessible && "text-5xl")}>Vida UJA</h3>
          <p className="text-[12px] text-muted-foreground font-black uppercase tracking-widest">Portal del Estudiante • Las Lagunillas</p>
        </div>
        <SpeechButton 
          text="Portal del Estudiante Vida UJA. Aquí encontrarás todo lo necesario para tu día a día en la Universidad de Jaén. Desde automatrícula y becas hasta servicios específicos para estudiantes internacionales, Erasmus, comedores y transporte." 
          language={lang} 
          size={isAccessible ? "lg" : "icon"}
        />
      </div>

      {/* 1. TRÁMITES ACADÉMICOS (DÍA A DÍA) */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h4 className={cn("text-[14px] font-black uppercase text-indigo-800 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
            <BookOpen className="h-5 w-5" /> Trámites Académicos
          </h4>
          <SpeechButton text="Trámites académicos. Aquí puedes acceder a la automatrícula, consultar tus notas y gestionar las becas MEC o de la propia universidad." language={lang} />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card className={cn("border-none bg-indigo-600 shadow-xl rounded-[2.5rem] overflow-hidden relative", isAccessible && "rounded-none border-4 border-indigo-800")}>
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <GraduationCap className="h-24 w-24 text-white" />
            </div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="space-y-1">
                <h5 className="text-white text-2xl font-black uppercase tracking-tighter">Automatrícula y Grados</h5>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Acceso Oficial UJA</p>
              </div>
              <ResourceLauncher 
                title="Automatrícula"
                description="Portal oficial para grados y másteres. Consulta los plazos de inscripción según tu curso."
                url={OFFICIAL_LINKS.uja.matricula}
                triggerLabel="ACCEDER A MATRÍCULA"
                variant="white"
                lang={lang}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-white border-2 border-indigo-100 rounded-[2rem] shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-black text-sm uppercase text-slate-900">Becas y Ayudas</h5>
                  <Award className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="grid gap-2">
                  <ResourceLauncher 
                    title="Beca MEC / Junta"
                    description="Ayudas generales del Ministerio y la Junta de Andalucía (incluida la bonificación del 99%)."
                    url={OFFICIAL_LINKS.uja.becas}
                    triggerLabel="VER BECAS"
                    variant="primary"
                    lang={lang}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-white border-2 border-indigo-100 rounded-[2rem] shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-black text-sm uppercase text-slate-900">Carné Digital</h5>
                  <Smartphone className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-tight">Descarga la App de la UJA para tener tu carné universitario en el móvil.</p>
                <Button className="w-full h-12 rounded-xl text-xs font-black" onClick={() => window.open('https://www.ujaen.es/servicios/tic/servicios/app-uja', '_blank')}>
                  CONSEGUIR APP UJA
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. BLOQUE ERASMUS E INTERNACIONAL */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h4 className={cn("text-[14px] font-black uppercase text-indigo-800 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
            <Globe className="h-5 w-5" /> Erasmus e Internacional
          </h4>
          <SpeechButton text="Sección internacional. Información para estudiantes extranjeros: Buddy Program, oficina de relaciones internacionales en el Edificio C2 y cursos de español." language={lang} />
        </div>

        <Card className={cn("border-none bg-slate-900 shadow-xl rounded-[2.5rem] overflow-hidden relative", isAccessible && "rounded-none border-4 border-black")}>
          <CardContent className="p-8 space-y-8">
            <div className="flex gap-5 items-start">
              <div className="bg-indigo-600 p-4 rounded-3xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <h5 className="text-white text-xl font-black uppercase tracking-tighter">Buddy Program</h5>
                <p className="text-white/60 text-[11px] font-medium leading-relaxed">¿Eres nuevo en Jaén? Conecta con un estudiante local para que te ayude con el idioma y la vida en la ciudad.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResourceLauncher 
                title=" Buddy Program"
                description="Inscríbete para que te asignen un compañero que te oriente en tus primeras semanas."
                url={OFFICIAL_LINKS.uja.buddyProgram}
                triggerLabel="QUIERO UN BUDDY"
                variant="white"
                lang={lang}
              />
              <ResourceLauncher 
                title="Cursos de Español"
                description="Centro de Estudios Avanzados en Lenguas Modernas (CEALM). Clases para todos los niveles."
                url={OFFICIAL_LINKS.uja.cealm}
                triggerLabel="CURSOS CEALM"
                variant="white"
                lang={lang}
              />
            </div>

            <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
               <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                  <span className="text-white font-black text-xs uppercase tracking-widest">Edificio C2 - Campus Las Lagunillas</span>
               </div>
               <p className="text-white/80 text-[11px] font-bold uppercase">Oficina de Relaciones Internacionales: Tu punto de referencia físico en el campus para cualquier duda legal o de movilidad.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. IA ASISTENTE: ESCÁNER DE MATRÍCULA */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h4 className={cn("text-[14px] font-black uppercase text-indigo-800 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
            <Zap className="h-5 w-5 text-yellow-500" /> Asistente de Matrícula IA
          </h4>
          <SpeechButton text="Usa el asistente visual para leer tu resguardo de matrícula. La IA extraerá automáticamente tus fechas de exámenes y plazos de pago." language={lang} />
        </div>
        <Card className="border-4 border-dashed border-indigo-200 bg-indigo-50/50 rounded-[3rem] p-2">
           <ScannerSection />
        </Card>
      </section>

      {/* 4. SERVICIOS Y VIDA SOCIAL */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h4 className={cn("text-[14px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2", isAccessible && "text-2xl")}>
            <Utensils className="h-5 w-5 text-primary" /> Servicios de Campus
          </h4>
          <SpeechButton text="Servicios del campus. Consulta el menú del día en los comedores, reserva pistas de deporte en el SAFYD o mira los horarios de los autobuses." language={lang} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-none bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="bg-emerald-50 p-4 rounded-2xl inline-block">
                <Utensils className="h-8 w-8 text-emerald-600" />
              </div>
              <h5 className="font-black text-xs uppercase text-slate-900">Menú Comedores</h5>
              <Button variant="outline" className="w-full rounded-xl h-10 text-[10px] font-black border-2" onClick={() => window.open(OFFICIAL_LINKS.uja.comedores, '_blank')}>
                VER MENÚ HOY
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="bg-orange-50 p-4 rounded-2xl inline-block">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h5 className="font-black text-xs uppercase text-slate-900">Deportes SAFYD</h5>
              <Button variant="outline" className="w-full rounded-xl h-10 text-[10px] font-black border-2" onClick={() => window.open(OFFICIAL_LINKS.uja.safyd, '_blank')}>
                RESERVAR PISTA
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-2xl inline-block">
                <Bus className="h-8 w-8 text-blue-600" />
              </div>
              <h5 className="font-black text-xs uppercase text-slate-900">Buses Campus</h5>
              <Button variant="outline" className="w-full rounded-xl h-10 text-[10px] font-black border-2" onClick={() => window.open(OFFICIAL_LINKS.transporte.horariosUja, '_blank')}>
                HORARIOS LÍNEAS
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. ALOJAMIENTO Y SALUD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
        <section className="space-y-3">
          <h4 className="text-[12px] font-black uppercase text-indigo-800 tracking-widest flex items-center gap-2">
            <Home className="h-4 w-4" /> ¿Buscas Piso?
          </h4>
          <Card className="border-none bg-indigo-50/50 rounded-3xl border border-indigo-100">
            <CardContent className="p-6 space-y-4">
              <p className="text-[11px] font-bold text-indigo-900/70 uppercase">Residencias universitarias y portales de alquiler verificados en Jaén.</p>
              <ResourceLauncher 
                title="Alojamiento UJA"
                description="Bolsa de alojamiento oficial y residencias Domingo Savio y Rector Estepa."
                url={OFFICIAL_LINKS.uja.alojamiento}
                triggerLabel="VER OPCIONES"
                variant="primary"
                lang={lang}
              />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h4 className="text-[12px] font-black uppercase text-red-800 tracking-widest flex items-center gap-2">
            <Stethoscope className="h-4 w-4" /> Salud en Campus
          </h4>
          <Card className="border-none bg-red-50/50 rounded-3xl border border-red-100">
            <CardContent className="p-6 space-y-4">
              <p className="text-[11px] font-bold text-red-900/70 uppercase">El Centro de Salud más cercano es "Las Lagunillas". Recuerda traer tu tarjeta sanitaria.</p>
              <Button className="w-full h-14 rounded-xl bg-red-600 text-white font-black text-xs gap-2" onClick={() => window.open('tel:955545060')}>
                SALUD RESPONDE: CITAS
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* FOOTER DE APOYO */}
      <div className="bg-indigo-50 p-8 rounded-[3rem] border-2 border-indigo-100 flex gap-4 items-center shadow-inner mx-2">
        <Info className="h-10 w-10 text-indigo-600 shrink-0" />
        <div className="space-y-1">
          <p className="text-[12px] text-indigo-900 font-black leading-tight uppercase">
            CONSEJO UJA: No dejes la beca para el último día.
          </p>
          <p className="text-[10px] text-indigo-800/70 font-bold uppercase">
            Si tienes dudas con tu matrícula internacional, el Edificio C2 atiende de 9:00 a 14:00.
          </p>
        </div>
      </div>
    </div>
  );
}
