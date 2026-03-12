
"use client"

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2, Printer, MessageCircle, X } from "lucide-react";

type QRCodeShareProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: Language;
};

export function QRCodeShare({ open, onOpenChange, lang }: QRCodeShareProps) {
  const [url, setUrl] = useState("");
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const t = translations[lang] || translations.es;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      // Capturamos la URL completa actual
      setUrl(window.location.origin);
    }
  }, []);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`¡Hola! Te comparto Vía Jaén, una guía segura y privada para trámites en Jaén: ${url || "https://viajaen.es"}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  // Evitamos errores de hidratación
  if (!mounted) return null;

  const qrValue = url || "https://viajaen.es";

  if (showPoster) {
    return (
      <Dialog open={open} onOpenChange={(val) => {
        if (!val) setShowPoster(false);
        onOpenChange(val);
      }}>
        <DialogContent className="sm:max-w-[800px] h-[90vh] overflow-y-auto p-0 border-none bg-white">
          <div className="p-8 flex flex-col items-center text-center space-y-8 print:p-0">
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-primary tracking-tighter uppercase">Vía Jaén</h1>
              <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Guía Comunitaria Segura</p>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-2xl border-[12px] border-primary/5">
              <QRCodeSVG value={qrValue} size={300} level="H" fgColor="#7c3aed" />
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-2xl w-full">
              <div className="space-y-1 text-left">
                <p className="font-black text-primary text-sm uppercase">Español</p>
                <p className="text-xs font-medium">Escanea para ayuda con NIE, trabajo y salud.</p>
              </div>
              <div className="space-y-1 text-left">
                <p className="font-black text-primary text-sm uppercase">English</p>
                <p className="text-xs font-medium">Scan for help with NIE, work, and health.</p>
              </div>
              <div className="space-y-1 text-right" dir="rtl">
                <p className="font-black text-primary text-sm uppercase">العربية</p>
                <p className="text-xs font-medium">امسح الرمز للحصول على مساعدة في الأوراق والعمل.</p>
              </div>
              <div className="space-y-1 text-left">
                <p className="font-black text-primary text-sm uppercase">Français</p>
                <p className="text-xs font-medium">Scannez pour obtenir de l'aide sur le NIE et le travail.</p>
              </div>
            </div>

            <div className="pt-8 border-t w-full flex justify-center gap-4 print:hidden">
              <Button onClick={() => setShowPoster(false)} variant="outline" className="rounded-xl">Volver</Button>
              <Button onClick={handlePrint} className="rounded-xl gap-2 h-12 px-8 font-bold">
                <Printer className="h-5 w-5" /> Imprimir Cartel (A4)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[32px] p-8 bg-white/90 backdrop-blur-xl border-none outline-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-black text-primary uppercase tracking-tight">Compartir App</DialogTitle>
          <DialogDescription className="text-center text-base font-medium">
            Lleva la guía en tu móvil o ayúdanos a difundirla en Jaén.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center space-y-8 py-4">
          <div className="bg-white p-6 rounded-[40px] shadow-xl border-8 border-primary/5">
            <QRCodeSVG 
              value={qrValue} 
              size={220} 
              level="H"
              fgColor="#7c3aed"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button onClick={handleWhatsApp} variant="secondary" className="h-14 rounded-2xl gap-2 font-bold bg-green-50 text-green-700 hover:bg-green-100 border-green-200 border">
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </Button>
            <Button onClick={() => setShowPoster(true)} variant="secondary" className="h-14 rounded-2xl gap-2 font-bold bg-primary/5 text-primary border-primary/10 border">
              <Printer className="h-5 w-5" /> Modo Cartel
            </Button>
          </div>

          <div className="flex w-full items-center space-x-2 bg-muted/50 p-3 rounded-2xl border">
            <input
              className="flex-1 bg-transparent border-none text-[10px] font-mono outline-none px-2 overflow-hidden text-ellipsis text-muted-foreground"
              value={url || "Cargando..."}
              readOnly
            />
            <Button size="sm" onClick={handleCopy} className="rounded-xl h-10 w-10 p-0">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
