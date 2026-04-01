
"use client"

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Bot, ArrowLeft, ShieldAlert } from "lucide-react";
import { useLocalStorage } from "@/lib/store";
import { AppLogo } from "@/components/ui/AppLogo";

export default function NotFound() {
  const { progress } = useLocalStorage();
  const isAccessible = progress.accessibilityMode === 'accessible';

  useEffect(() => {
    if (isAccessible && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Lo siento, esta página no está disponible en Jaén. Te devuelvo al menú principal.");
      utterance.lang = 'es-ES';
      utterance.rate = progress.speechRate || 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, [isAccessible, progress.speechRate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white/80 backdrop-blur-xl">
        <div className="bg-primary/10 p-12 flex flex-col items-center gap-6 border-b border-primary/5">
          <div className="relative">
            <AppLogo size={120} className="animate-bounce" />
            <div className="absolute -bottom-2 -right-2 bg-destructive text-white p-2 rounded-full shadow-lg">
              <ShieldAlert className="h-6 w-6" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">¿Te has perdido?</h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Página No Encontrada</p>
          </div>
        </div>

        <CardContent className="p-8 space-y-8 text-center">
          <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100 text-left">
            <div className="bg-primary p-2 rounded-xl mt-1">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <p className="text-lg font-black text-slate-800 leading-tight">
              No te preocupes, el Jaén-Bot te guía de vuelta. Pulsa el botón de abajo para ir al inicio seguro.
            </p>
          </div>

          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full h-20 rounded-[1.75rem] bg-primary text-white font-black text-xl gap-3 shadow-xl animate-emergency-pulse uppercase tracking-tighter"
          >
            <Home className="h-7 w-7" /> Ir al Dashboard
          </Button>

          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">
            Vía Jaén 2026 • Navegación Segura
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
