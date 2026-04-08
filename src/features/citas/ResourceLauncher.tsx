
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
import { ExternalLink, Loader2, ShieldAlert } from "lucide-react";
import { SpeechButton } from "@/components/ui/SpeechButton";
import { useLocalStorage } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ResourceLauncherProps = {
  title: string;
  description: string;
  url: string;
  triggerLabel?: string;
  variant?: "primary" | "secondary" | "outline" | "white";
  lang: string;
  className?: string;
};

export function ResourceLauncher({ 
  title, 
  description, 
  url, 
  triggerLabel = "Solicitar", 
  variant = "primary",
  lang,
  className
}: ResourceLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { progress } = useLocalStorage();
  const { toast } = useToast();
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

    // Retraso de seguridad para que el usuario procese el aviso
    setTimeout(() => {
      try {
        const win = window.open(url, '_blank', 'noopener,noreferrer');
        if (win) {
          setIsOpen(false);
        } else {
          toast({
            variant: "destructive",
            title: "Enlace Bloqueado",
            description: "Por favor, permite las ventanas emergentes para acceder al sitio oficial.",
          });
        }
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo abrir el enlace oficial.",
        });
      } finally {
        setIsRedirecting(false);
      }
    }, isAccessible ? 1500 : 500);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white border-none shadow-lg font-black";
      case "white":
        return "bg-white text-primary border-primary/10 shadow-xl font-black";
      case "secondary":
        return "bg-slate-900 text-white border-none shadow-md font-black";
      case "outline":
        return "border-2 border-primary text-primary hover:bg-primary/5 font-black";
      default:
        return "bg-primary text-white font-black";
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className={cn(
          "w-full h-16 rounded-2xl uppercase tracking-tight transition-all active:scale-95 flex justify-between px-6",
          getVariantStyles(),
          className
        )}
        aria-label={`${triggerLabel} para ${title}. Abre ventana de confirmación segura.`}
      >
        <span className="text-sm font-black">{triggerLabel}</span>
        <ExternalLink className="h-5 w-5" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                Vas a ser redirigido a servidores oficiales externos. No compartas tus claves privadas.
              </p>
            </div>
          </div>

          <DialogFooter className="p-6 bg-slate-50 flex gap-3 border-t">
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-black text-slate-500 uppercase text-xs">Cerrar</Button>
            <Button 
              onClick={handleLaunch} 
              disabled={isRedirecting}
              className="flex-1 rounded-xl h-14 bg-primary text-white font-black uppercase text-sm gap-2 shadow-lg"
            >
              {isRedirecting ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Cargando...</>
              ) : (
                <><ExternalLink className="h-5 w-5" /> Abrir en Navegador</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
