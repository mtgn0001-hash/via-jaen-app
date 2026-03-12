"use client"

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackFABProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function BackFAB({ activeTab, setActiveTab }: BackFABProps) {
  // Solo mostramos el botón si no estamos en el dashboard
  if (activeTab === 'dashboard') return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500 print:hidden">
      <Button
        onClick={() => {
          if ('vibrate' in navigator) navigator.vibrate(50);
          setActiveTab('dashboard');
        }}
        size="icon"
        className={cn(
          "h-16 w-16 rounded-[24px] shadow-2xl transition-all duration-500 border-4 border-white",
          "bg-white/40 backdrop-blur-xl text-primary hover:bg-white/60 active:scale-90",
          "shadow-primary/10 border-primary/5"
        )}
        aria-label="Volver al inicio"
      >
        <ArrowLeft className="h-8 w-8" />
      </Button>
    </div>
  );
}
