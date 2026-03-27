"use client"

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Scan, 
  Loader2, 
  CheckCircle2, 
  X, 
  Volume2, 
  ExternalLink,
  ShieldCheck,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { analyzeDocument } from "@/ai/flows/analyze-doc-flow";
import { useLocalStorage } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ScannerSection() {
  const { progress } = useLocalStorage();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [result, setResult] = useState<{
    docType: string;
    summary: string;
    actionLabel: string;
    actionUrl: string;
  } | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const isAccessible = progress.accessibilityMode === 'accessible';
  const lang = progress.language;

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de Cámara",
        description: "Permite el acceso a la cámara para escanear tus papeles.",
      });
      setShowCamera(false);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current) return;
    
    setIsAnalyzing(true);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    const photoDataUri = canvas.toDataURL("image/jpeg");

    // Stop camera
    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    setShowCamera(false);

    try {
      if ('vibrate' in navigator) navigator.vibrate(100);
      const aiResult = await analyzeDocument({ photoDataUri, language: lang });
      setResult(aiResult);
      
      if (isAccessible && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Análisis completado. " + aiResult.summary);
        utterance.lang = lang === 'ar' ? 'ar-SA' : 'es-ES';
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No se pudo leer el documento. Intenta con mejor luz.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const speakResult = () => {
    if (result && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(result.summary);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* TRIGGER BUTTON */}
      <section className="px-2">
        <Button 
          onClick={startCamera}
          className={cn(
            "w-full h-24 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl border-4 border-white flex items-center justify-between px-8 group active:scale-95 transition-all animate-emergency-pulse",
            isAccessible && "h-32 rounded-none border-8"
          )}
          style={{ "--pulse-color": "79, 70, 229" } as any}
        >
          <div className="flex items-center gap-4">
            <Camera className={cn("h-8 w-8", isAccessible && "h-12 w-12")} />
            <div className="text-left">
              <span className={cn("block text-xl font-black uppercase tracking-tight", isAccessible && "text-3xl")}>Escanear Papel</span>
              <span className={cn("block text-[10px] font-bold uppercase opacity-80", isAccessible && "text-lg")}>IA Jaén: Lectura Fácil</span>
            </div>
          </div>
          <Scan className="h-6 w-6 opacity-40 group-hover:rotate-90 transition-transform" />
        </Button>
      </section>

      {/* CAMERA OVERLAY */}
      <Dialog open={showCamera} onOpenChange={(val) => !val && closeCamera()}>
        <DialogContent className="sm:max-w-lg p-0 border-none bg-black rounded-[3rem] overflow-hidden outline-none h-[80vh]">
          <div className="relative h-full flex flex-col">
            <video ref={videoRef} autoPlay playsInline muted className="flex-1 object-cover" />
            
            {/* ENCUADRE OCR */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] aspect-[3/4] border-4 border-dashed border-white/40 rounded-3xl relative">
                <div className="absolute -top-2 -left-2 w-10 h-10 border-t-8 border-l-8 border-indigo-500 rounded-tl-xl" />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-8 border-r-8 border-indigo-500 rounded-br-xl" />
              </div>
            </div>

            <div className="p-8 bg-black/60 backdrop-blur-xl flex justify-center gap-6">
              <Button variant="outline" size="icon" onClick={closeCamera} className="h-16 w-16 rounded-full border-2 border-white/20 text-white">
                <X className="h-8 w-8" />
              </Button>
              <Button onClick={captureAndAnalyze} className="h-20 w-20 rounded-full bg-white text-indigo-600 shadow-2xl border-4 border-indigo-500 active:scale-90 transition-transform">
                <Camera className="h-10 w-10" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ANALYSIS MODAL */}
      <Dialog open={isAnalyzing || !!result} onOpenChange={() => !isAnalyzing && setResult(null)}>
        <DialogContent className="sm:max-w-md rounded-[3rem] bg-white p-0 border-none shadow-2xl overflow-hidden outline-none">
          {isAnalyzing ? (
            <div className="p-12 flex flex-col items-center text-center gap-6">
              <div className="relative">
                <Loader2 className="h-20 w-20 text-indigo-600 animate-spin" />
                <Scan className="absolute inset-0 m-auto h-8 w-8 text-indigo-400 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-indigo-900 uppercase">Analizando...</h3>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Jaén-Bot está leyendo el papel</p>
              </div>
            </div>
          ) : result && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="p-8 bg-indigo-600 text-white flex flex-col items-center text-center gap-4">
                <div className="bg-white/20 p-4 rounded-[2rem] backdrop-blur-md">
                  <FileText className="h-12 w-12 text-white" />
                </div>
                <div className="space-y-1">
                  <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-white">Resumen IA</DialogTitle>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{result.docType}</p>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100 relative group">
                  <p className={cn(
                    "text-xl font-bold leading-relaxed text-[#1A1A1B]",
                    isAccessible && "text-3xl font-black"
                  )}>
                    "{result.summary}"
                  </p>
                  <Button 
                    size="icon" 
                    onClick={speakResult}
                    className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-white shadow-xl border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50"
                  >
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </div>

                <div className="bg-emerald-50 p-5 rounded-2xl flex gap-4 items-center border border-emerald-100">
                  <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
                  <p className="text-[11px] text-emerald-900 font-black leading-tight uppercase">
                    Análisis de privacidad: Los datos no se han guardado. Solo tú ves esta información.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    className="h-16 rounded-2xl bg-indigo-600 text-white font-black text-lg gap-3 shadow-xl active:scale-95 transition-all"
                    onClick={() => window.open(result.actionUrl, '_blank')}
                  >
                    {result.actionLabel.toUpperCase()} <ExternalLink className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setResult(null)} 
                    className="rounded-xl font-black text-slate-400 text-xs uppercase"
                  >
                    Cerrar y Borrar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
