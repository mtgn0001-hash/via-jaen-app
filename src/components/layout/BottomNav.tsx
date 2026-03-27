
"use client"

import { Home, HeartPulse, MapPin, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type BottomNavProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Inicio' },
    { id: 'guides_hub', icon: HeartPulse, label: 'Recursos' },
    { id: 'directory', icon: MapPin, label: 'Mapa' },
    { id: 'profile_hub', icon: User, label: 'Mi Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4 pointer-events-none">
      <div className="max-w-md mx-auto h-20 bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] flex items-center justify-around px-4 pointer-events-auto ring-1 ring-black/5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id || (activeTab.startsWith(tab.id.split('_')[0]));
          return (
            <button
              key={tab.id}
              onClick={() => {
                if ('vibrate' in navigator) navigator.vibrate(10);
                setActiveTab(tab.id);
              }}
              className="relative flex flex-col items-center gap-1 group w-16"
            >
              <div className={cn(
                "p-3 rounded-2xl transition-all duration-500",
                isActive 
                  ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30 -translate-y-2" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}>
                <tab.icon className="h-6 w-6" />
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-all duration-500",
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
