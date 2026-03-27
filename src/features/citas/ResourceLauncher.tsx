"use client"

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, Loader2, Info } from "lucide-react";
import { SpeechButton } from "@/components/ui/SpeechButton";

type ResourceLauncherProps = {
  title: string;
  description: string;
  url: string;
  lseInstructions?: string;
  triggerLabel?: string;
  variant?: "primary" | "secondary" | "outline" | "white";
  lang: string;
};

export function ResourceLauncher({ 
  title, 
  description, 
  url, 
  lseInstructions, 
  triggerLabel = "Solicitar", 
  variant = "primary",
  lang 
}: ResourceLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleLaunch = () => {
    setIsRedirecting(true);
    
    // Anuncio para lectores de pantalla antes de redirigir
    const announcement = `Abriendo sitio web externo oficial en una ventana nueva. Redirigiendo a ${url}`;
    const utterance = new SpeechSynthesisUtterance(announcement);
    utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
    window.speechSynthesis.speak(utterance);

    setTimeout(() => {
      window.open(url, '_blank');
      setIsOpen(false);
      setIsRedirecting(false);
    }, 1500);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white hover:bg-primary/90 text-[15px]";
      case "secondary":
        return "bg-slate-100 text-slate-900 hover:bg-slate-200 text-[15px]";
      case "outline":
        return "border-2 border-primary/20 text-primary hover:bg-primary/5 text-[15px]";
      case "white":
        return "bg-white text-primary hover:bg-white/90 shadow-xl text-[16px]";
      default:
        return "bg-primary text-white hover:bg-primary/90 text-[15px]";
    }
  };

  return (
    <>
      <div className="flex gap-2 w-full">
        <Button 
          onClick={() => setIsOpen(true)}
          className={`flex-1 h-14 rounded-xl font-black uppercase tracking-tight shadow-md transition-all active:scale-95 ${getVariantStyles()}`}
          aria-label={`Botón: ${triggerLabel} para ${title}. Abre ventana de confirmación.`}
        >
          {triggerLabel}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className={`h-14 w-14 rounded-xl ${variant === 'white' ? 'bg-white/30 border-white/40 text-white' : 'border-slate-300 text-slate-900 hover:text-primary'}`}
          onClick={() => setIsOpen(true)}
          aria-label={`Más información sobre ${title}`}
        >
          <Info className="h-6 w-6" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] bg-white p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-8 bg-slate-50 border-b">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{title}</DialogTitle>
                <DialogDescription className="font-black text-xs uppercase tracking-widest text-slate-500">Sede Electrónica Oficial</DialogDescription>
              </div>
              <SpeechButton text={`${title}. ${description}`} language={lang} />
            </div>
          </DialogHeader>

          <div className="p-8 space-y-6">
            <p className="text-md text-slate-900 leading-relaxed font-bold">
              {description}
            </p>

            {lseInstructions && (
              <div className="bg-primary/5 p-5 rounded-2xl border-2 border-primary/10 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[11px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                    <Play className="h-4 w-4" /> Vídeo Instrucciones LSE
                  </h4>
                  <SpeechButton text="Ver instrucciones en lengua de signos" language={lang} />
                </div>
                <p className="text-[11px] text-slate-700 font-black leading-tight uppercase">
                  {lseInstructions}
                </p>
              </div>
            )}

            <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-200 flex gap-3">
              <Info className="h-6 w-6 text-amber-600 shrink-0" />
              <p className="text-[11px] text-amber-900 font-black leading-tight uppercase">
                Redirigiendo a la Sede Electrónica oficial. Asegúrate de tener tu Certificado Digital o Clave PIN si es necesario.
              </p>
            </div>
          </div>

          <DialogFooter className="p-6 bg-slate-50 flex gap-3 border-t">
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-black text-slate-600">Cancelar</Button>
            <Button 
              onClick={handleLaunch} 
              disabled={isRedirecting}
              className="flex-1 rounded-xl h-14 bg-primary text-white font-black uppercase text-sm gap-2"
              aria-live="polite"
            >
              {isRedirecting ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Conectando...</>
              ) : (
                <><ExternalLink className="h-5 w-5" /> Continuar al Trámite</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
