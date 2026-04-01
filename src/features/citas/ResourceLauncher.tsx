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
import { ExternalLink, Play, Loader2, Info, ShieldAlert, AlertTriangle } from "lucide-react";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";
import { cn } from "@/lib/utils";

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
  const [hasError, setHasError] = useState(false);
  const { progress } = useLocalStorage();
  const isAccessible = progress.accessibilityMode === 'accessible';

  const handleLaunch = () => {
    setIsRedirecting(true);
    
    // Narración del Jaén-Bot antes de redirigir (solo en modo accesible)
    if (isAccessible && 'speechSynthesis' in window) {
      const announcement = lang === 'es' 
        ? `Te estoy redirigiendo a la web oficial de ${title} para completar tu trámite.`
        : `I am redirecting you to the official ${title} website to complete your procedure.`;
      
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(announcement);
      utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
      utterance.rate = progress.speechRate || 0.9;
      window.speechSynthesis.speak(utterance);
    }

    // Simulamos validación de enlace
    setTimeout(() => {
      try {
        window.open(url, '_blank');
        setIsOpen(false);
        setIsRedirecting(false);
      } catch (e) {
        setHasError(true);
        setIsRedirecting(false);
      }
    }, isAccessible ? 2000 : 800);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white border-none shadow-lg";
      case "white":
        return "bg-white text-primary border-primary/10 shadow-xl";
      case "secondary":
        return "bg-slate-900 text-white border-none shadow-md";
      case "outline":
        return "border-2 border-primary text-primary hover:bg-primary/5";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <>
      <div className="flex gap-2 w-full">
        <Button 
          onClick={() => setIsOpen(true)}
          className={cn(
            "flex-1 h-16 rounded-2xl font-black uppercase tracking-tight transition-all active:scale-95 flex justify-between px-6",
            getVariantStyles()
          )}
          aria-label={`${triggerLabel} para ${title}. Abre ventana de confirmación segura.`}
        >
          <span>{triggerLabel}</span>
          <ExternalLink className="h-5 w-5 opacity-100" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={(val) => {
        setIsOpen(val);
        if (!val) setHasError(false);
      }}>
        <DialogContent className="sm:max-w-md rounded-[3rem] bg-white p-0 overflow-hidden border-none shadow-2xl outline-none">
          <DialogHeader className="p-8 bg-slate-50 border-b">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Acceso Seguro</DialogTitle>
                <DialogDescription className="font-black text-[10px] uppercase tracking-widest text-slate-500">Sede Electrónica Oficial</DialogDescription>
              </div>
              <SpeechButton text={`${title}. ${description}`} language={lang} />
            </div>
          </DialogHeader>

          <div className="p-8 space-y-6">
            {!hasError ? (
              <>
                <div className="space-y-2">
                  <h4 className="font-black text-lg text-slate-900 leading-tight uppercase">{title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-bold">
                    {description}
                  </p>
                </div>

                <div className="bg-primary/5 p-5 rounded-2xl border-2 border-primary/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" /> Seguridad Vía Jaén
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-700 font-bold leading-tight uppercase">
                    Vas a ser redirigido a servidores oficiales. No compartas tus claves con nadie.
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-destructive/5 p-6 rounded-3xl border-2 border-destructive/20 flex flex-col items-center text-center gap-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
                <div className="space-y-1">
                  <h4 className="font-black text-lg text-destructive uppercase">Sitio no disponible</h4>
                  <p className="text-xs font-bold text-slate-700">
                    El sitio oficial está en mantenimiento. Inténtalo de nuevo en unos minutos o contacta por teléfono si es urgente.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="p-6 bg-slate-50 flex gap-3 border-t">
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-black text-slate-500 uppercase text-xs">Cerrar</Button>
            {!hasError && (
              <Button 
                onClick={handleLaunch} 
                disabled={isRedirecting}
                className="flex-1 rounded-xl h-14 bg-primary text-white font-black uppercase text-sm gap-2 shadow-lg"
              >
                {isRedirecting ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Conectando...</>
                ) : (
                  <><ExternalLink className="h-5 w-5" /> Ir a la Sede Oficial</>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
