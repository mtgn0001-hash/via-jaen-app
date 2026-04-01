
"use client"

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/store";

type BackFABProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function BackFAB({ activeTab, setActiveTab }: BackFABProps) {
  const { progress } = useLocalStorage();
  const isAccessible = progress.accessibilityMode === 'accessible';

  // Solo mostramos el botón si no estamos en el dashboard
  if (activeTab === 'dashboard') return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500 print:hidden">
      <Button
        onClick={() => setActiveTab('dashboard')}
        size="icon"
        className={cn(
          "h-16 w-16 rounded-[24px] shadow-2xl transition-all duration-500 border-4 border-white",
          "bg-white/40 backdrop-blur-xl text-primary hover:bg-white/60 active:scale-90",
          "shadow-primary/10 border-primary/5 animate-emergency-pulse",
          isAccessible && "rounded-none bg-black text-yellow-400 border-yellow-400"
        )}
        style={{ "--pulse-color": isAccessible ? "250, 204, 21" : "124, 58, 237" } as any}
        aria-label="Volver al inicio seguro"
      >
        <ArrowLeft className="h-8 w-8" />
      </Button>
    </div>
  );
}
