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
  FileText,
  Eye,
  ChevronRight,
  ChevronLeft,
  Info,
  ShieldAlert
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { analyzeDocument } from "@/ai/flows/analyze-doc-flow";
import { useLocalStorage } from "@/lib/store";
import { cn } from "@/lib/utils";
import { SpeechButton } from "@/components/ui/SpeechButton";

export function ScannerSection() {
  const { progress } = useLocalStorage();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<{
    docType: string;
    summary: string;
    explanation: string;
    steps: { title: string; instruction: string }[];
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
        description: "Permite el acceso a la cámara para que el bot pueda ver tu papel.",
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
      setCurrentStep(0);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No he podido leer el papel. Intenta que haya más luz.",
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

  return (
    <div className="space-y-6">
      <section className="px-2">
        <Button 
          onClick={startCamera}
          className={cn(
            "w-full h-28 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl border-4 border-white flex items-center justify-between px-8 group active:scale-95 transition-all animate-emergency-pulse",
            isAccessible && "h-36 rounded-none border-8"
          )}
          style={{ "--pulse-color": "79, 70, 229" } as any}
        >
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
              <Eye className={cn("h-10 w-10 text-white", isAccessible && "h-14 w-14")} />
            </div>
            <div className="text-left">
              <span className={cn("block text-2xl font-black uppercase tracking-tighter", isAccessible && "text-4xl")}>Ayúdame con este papel</span>
              <span className={cn("block text-[11px] font-bold uppercase opacity-80 tracking-widest", isAccessible && "text-xl")}>Asistente Visual IA</span>
            </div>
          </div>
          <Camera className="h-8 w-8 opacity-40 group-hover:scale-110 transition-transform" />
        </Button>
      </section>

      <Dialog open={showCamera} onOpenChange={(val) => !val && closeCamera()}>
        <DialogContent className="sm:max-w-xl p-0 border-none bg-black rounded-[3rem] overflow-hidden outline-none h-[85vh]">
          <div className="relative h-full flex flex-col">
            <video ref={videoRef} autoPlay playsInline muted className="flex-1 object-cover" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] aspect-[3/4] border-4 border-dashed border-white/30 rounded-3xl relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-[12px] border-l-12 border-indigo-500 rounded-tl-2xl" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-[12px] border-r-12 border-indigo-500 rounded-br-2xl" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-500/30 animate-pulse" />
              </div>
            </div>

            <div className="p-8 bg-black/80 backdrop-blur-2xl flex flex-col items-center gap-6">
              <p className="text-white font-black text-xs uppercase tracking-[0.2em] animate-pulse">Encuadra el papel dentro del marco</p>
              
              <div className="flex justify-center gap-8 w-full">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={closeCamera} 
                  className="h-16 w-16 rounded-full border-4 border-white/10 text-white bg-white/5 hover:bg-white/20"
                >
                  <X className="h-8 w-8" />
                </Button>
                <Button 
                  onClick={captureAndAnalyze} 
                  className="h-24 w-24 rounded-full bg-white text-indigo-600 shadow-[0_0_50px_rgba(255,255,255,0.3)] border-8 border-indigo-500 active:scale-90 transition-transform"
                >
                  <Camera className="h-12 w-12" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAnalyzing || !!result} onOpenChange={() => !isAnalyzing && setResult(null)}>
        <DialogContent className="sm:max-w-lg rounded-[3rem] bg-white p-0 border-none shadow-2xl overflow-hidden outline-none max-h-[90vh] flex flex-col">
          {isAnalyzing ? (
            <div className="p-20 flex flex-col items-center text-center gap-8">
              <div className="relative">
                <div className="h-32 w-32 border-8 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <Eye className="absolute inset-0 m-auto h-12 w-12 text-indigo-600 animate-pulse" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-indigo-900 uppercase tracking-tighter">Jaén-Bot está mirando...</h3>
                <p className="text-md font-bold text-slate-500 uppercase tracking-widest">Analizando tu documento ahora mismo</p>
              </div>
            </div>
          ) : result && (
            <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
              <div className="p-8 bg-indigo-600 text-white flex flex-col items-center text-center gap-4 sticky top-0 z-10 shadow-lg">
                <div className="bg-white/20 p-4 rounded-[2rem] backdrop-blur-md">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-1">
                  <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-white">Guía de tu Documento</DialogTitle>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="bg-yellow-400 text-black font-black text-[10px] px-3 py-1 rounded-full uppercase">{result.docType}</div>
                    <SpeechButton text={`${result.docType}. ${result.summary}`} language={lang} variant="white" className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8 pb-32">
                <div className="bg-slate-50 p-6 rounded-[2.5rem] border-2 border-slate-100 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Resumen de Lectura Fácil</h4>
                    <Info className="h-4 w-4 text-indigo-300" />
                  </div>
                  <p className={cn(
                    "text-2xl font-bold leading-relaxed text-slate-900",
                    isAccessible && "text-3xl font-black"
                  )}>
                    "{result.summary}"
                  </p>
                </div>

                <div className="bg-amber-50 p-6 rounded-[2.5rem] border-2 border-amber-100 space-y-3">
                  <h4 className="text-[10px] font-black uppercase text-amber-700 tracking-widest flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" /> ¿Qué significa esto?
                  </h4>
                  <p className="text-lg font-bold text-amber-900 leading-tight">
                    {result.explanation}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center px-2">
                    <h4 className="text-[12px] font-black uppercase text-slate-400 tracking-[0.2em]">Paso a Paso</h4>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
                      {currentStep + 1} de {result.steps.length}
                    </span>
                  </div>

                  <Card className="border-4 border-indigo-600 bg-white rounded-[2.5rem] shadow-xl overflow-hidden animate-in slide-in-from-right-4 duration-500">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                        <h5 className="text-xl font-black text-indigo-600 uppercase tracking-tight">
                          {result.steps[currentStep].title}
                        </h5>
                        <p className={cn(
                          "text-2xl font-bold text-slate-800 leading-snug",
                          isAccessible && "text-3xl font-black"
                        )}>
                          {result.steps[currentStep].instruction}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <SpeechButton 
                          text={`${result.steps[currentStep].title}. ${result.steps[currentStep].instruction}`} 
                          language={lang} 
                          variant="secondary"
                          className="h-14 w-14"
                        />
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            disabled={currentStep === 0}
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className="h-14 w-14 rounded-2xl border-2"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </Button>
                          <Button 
                            disabled={currentStep === result.steps.length - 1}
                            onClick={() => setCurrentStep(prev => prev + 1)}
                            className="h-14 w-24 rounded-2xl font-black uppercase text-xs gap-2"
                          >
                            Sig. <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-emerald-50 p-6 rounded-3xl flex gap-4 items-center border border-emerald-100">
                  <ShieldCheck className="h-10 w-10 text-emerald-600 shrink-0" />
                  <p className="text-[11px] text-emerald-900 font-bold uppercase leading-tight">
                    Tus datos están seguros. Esta foto no se ha guardado en internet, solo se ha usado para ayudarte en este momento.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                  <Button 
                    className="h-20 rounded-[1.75rem] bg-indigo-600 text-white font-black text-xl gap-3 shadow-xl active:scale-95 transition-all uppercase tracking-tighter"
                    onClick={() => window.open(result.actionUrl, '_blank')}
                  >
                    {result.actionLabel} <ExternalLink className="h-6 w-6" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setResult(null)} 
                    className="h-14 rounded-2xl font-black text-slate-400 text-sm uppercase tracking-widest"
                  >
                    Cerrar Asistencia
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
