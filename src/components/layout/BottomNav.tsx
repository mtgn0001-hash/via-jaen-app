
"use client"

import { Home, HeartPulse, Navigation, User, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/store";

type BottomNavProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const { progress } = useLocalStorage();
  const isAccessible = progress.accessibilityMode === 'accessible';

  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Inicio' },
    { id: 'guides_hub', icon: HeartPulse, label: 'Recursos' },
    { id: 'scanner', icon: Eye, label: 'Escáner' },
    { id: 'directory', icon: Navigation, label: 'Ayuda Local' },
    { id: 'profile_hub', icon: User, label: 'Mi Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8 pt-4 pointer-events-none">
      <div className={cn(
        "max-w-md mx-auto h-20 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] flex items-center justify-around px-2 pointer-events-auto ring-1 ring-black/5",
        isAccessible && "rounded-none border-t-4 border-primary bg-black"
      )}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id || (activeTab.startsWith(tab.id.split('_')[0]));
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center gap-1 group w-14"
              aria-label={`Ir a ${tab.label}`}
            >
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-500",
                isActive 
                  ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30 -translate-y-2 border-2 border-white/20" 
                  : cn(isAccessible ? "text-yellow-400" : "text-muted-foreground hover:bg-primary/5 hover:text-primary")
              )}>
                <tab.icon className={cn("h-6 w-6", isActive && "scale-110")} />
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest transition-all duration-500",
                isActive ? "opacity-100 scale-100" : "opacity-100 scale-100", // Etiquetas siempre visibles
                isAccessible ? "text-yellow-400" : "text-slate-600"
              )}>
                {tab.label}
              </span>
              {isActive && !isAccessible && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
