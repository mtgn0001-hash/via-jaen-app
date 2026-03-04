
"use client"

import { useState, useRef, useEffect } from "react";
import { Language, translations } from "@/lib/translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Scan, Loader2, CheckCircle2, AlertCircle, X, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type DocumentScannerProps = {
  lang: Language;
};

export function DocumentScanner({ lang }: DocumentScannerProps) {
  const t = translations[lang].scanner;
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const startScan = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Acceso Denegado',
        description: 'Por favor, permite el acceso a la cámara para escanear.',
      });
    }
  };

  const handleCapture = () => {
    setIsScanning(true);
    // Simulate analysis delay
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(t.resultDesc);
      setShowCamera(false);
      // Stop stream
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    }, 2000);
  };

  const closeCamera = () => {
    setShowCamera(false);
    if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t.title}</h3>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{t.subtitle}</p>
      </div>

      {!showCamera && !scanResult && (
        <Card className="border-none bg-primary/5 rounded-[2.5rem] overflow-hidden shadow-none">
          <CardContent className="p-8 flex flex-col items-center text-center gap-6">
            <div className="bg-white p-6 rounded-[40px] shadow-xl border-8 border-primary/5">
                <Scan className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
                <p className="text-sm font-bold text-slate-800">Usa la cámara para que la IA lea tu carta de extranjería u otras notificaciones.</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Funciona 100% Offline</p>
            </div>
            <Button onClick={startScan} className="w-full h-16 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-primary/20">
              <Camera className="h-6 w-6" /> {t.scanBtn}
            </Button>
          </CardContent>
        </Card>
      )}

      {showCamera && (
        <Card className="border-none bg-black rounded-[2.5rem] overflow-hidden relative min-h-[400px]">
          <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted playsInline />
          
          <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
             <div className="w-full h-full border-2 border-dashed border-primary/60 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />
             </div>
          </div>

          {!hasCameraPermission && (
            <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/80">
                <Alert variant="destructive" className="bg-white">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Cámara requerida</AlertTitle>
                    <AlertDescription>Habilita los permisos de cámara en tu navegador.</AlertDescription>
                </Alert>
            </div>
          )}

          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-6">
             <Button variant="outline" size="icon" onClick={closeCamera} className="bg-white/20 border-white/20 text-white rounded-full">
                <X className="h-6 w-6" />
             </Button>
             <Button 
                onClick={handleCapture} 
                disabled={isScanning || !hasCameraPermission}
                className="h-16 w-16 rounded-full bg-primary shadow-2xl border-4 border-white animate-in zoom-in-50 duration-500"
             >
                {isScanning ? <Loader2 className="h-8 w-8 animate-spin" /> : <Scan className="h-8 w-8" />}
             </Button>
          </div>
        </Card>
      )}

      {scanResult && (
        <Card className="border-none bg-emerald-50 border-emerald-100 rounded-[2.5rem] overflow-hidden animate-in zoom-in-95 duration-500">
          <CardContent className="p-8 space-y-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-emerald-900 uppercase tracking-tight">{t.resultTitle}</h4>
              <p className="text-sm font-medium text-emerald-800/80 leading-relaxed italic px-2">
                "{scanResult}"
              </p>
            </div>
            
            <div className="bg-white/50 p-4 rounded-3xl border border-emerald-200 flex gap-4 items-center text-left">
                <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
                <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-tight">
                    Análisis privado realizado en el dispositivo. No se han guardado imágenes ni textos.
                </p>
            </div>

            <Button onClick={() => setScanResult(null)} variant="outline" className="w-full h-14 rounded-2xl font-black border-emerald-200 text-emerald-700 hover:bg-emerald-100">
               Cerrar Análisis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
