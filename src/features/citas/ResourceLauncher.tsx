
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
    setTimeout(() => {
      window.open(url, '_blank');
      setIsOpen(false);
      setIsRedirecting(false);
    }, 1500);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white hover:bg-primary/90";
      case "secondary":
        return "bg-slate-100 text-slate-700 hover:bg-slate-200";
      case "outline":
        return "border-2 border-primary/20 text-primary hover:bg-primary/5";
      case "white":
        return "bg-white text-primary hover:bg-white/90 shadow-xl";
      default:
        return "bg-primary text-white hover:bg-primary/90";
    }
  };

  return (
    <>
      <div className="flex gap-2 w-full">
        <Button 
          onClick={() => setIsOpen(true)}
          className={`flex-1 h-12 rounded-xl font-black text-xs uppercase tracking-tight shadow-sm transition-all active:scale-95 ${getVariantStyles()}`}
        >
          {triggerLabel}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className={`h-12 w-12 rounded-xl ${variant === 'white' ? 'bg-white/20 border-white/20 text-white' : 'border-slate-200 text-slate-400 hover:text-primary'}`}
          onClick={() => setIsOpen(true)}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] bg-white p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-8 bg-slate-50 border-b">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tighter">{title}</DialogTitle>
                <DialogDescription className="font-medium text-slate-500">Sede Electrónica Oficial</DialogDescription>
              </div>
              <SpeechButton text={`${title}. ${description}`} language={lang} />
            </div>
          </DialogHeader>

          <div className="p-8 space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {description}
            </p>

            {lseInstructions && (
              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                    <Play className="h-3 w-3" /> Vídeo Instrucciones LSE
                  </h4>
                  <SpeechButton text="Ver instrucciones en lengua de signos" language={lang} />
                </div>
                <p className="text-[10px] text-slate-500 font-bold leading-tight">
                  {lseInstructions}
                </p>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
              <Info className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-[10px] text-amber-800 font-bold leading-tight">
                Redirigiendo a la Sede Electrónica oficial. Asegúrate de tener tu Certificado Digital o Clave PIN si es necesario.
              </p>
            </div>
          </div>

          <DialogFooter className="p-6 bg-slate-50 flex gap-3">
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-bold">Cancelar</Button>
            <Button 
              onClick={handleLaunch} 
              disabled={isRedirecting}
              className="flex-1 rounded-xl h-12 bg-primary text-white font-black uppercase text-xs gap-2"
            >
              {isRedirecting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Conectando...</>
              ) : (
                <><ExternalLink className="h-4 w-4" /> Continuar al Trámite</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
