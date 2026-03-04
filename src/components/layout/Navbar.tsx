
"use client"

import { Home, ClipboardList, MapPin, Heart, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language, translations } from "@/lib/translations";

type NavbarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
};

export function Navbar({ activeTab, setActiveTab, lang }: NavbarProps) {
  const t = translations[lang];

  const items = [
    { id: 'dashboard', icon: Home, label: t.dashboard },
    { id: 'procedures', icon: ClipboardList, label: t.procedures },
    { id: 'community', icon: Heart, label: t.community },
    { id: 'directory', icon: MapPin, label: t.directory },
    { id: 'emergency', icon: ShieldAlert, label: t.emergency, color: 'text-destructive' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border z-50 pb-safe-area-inset-bottom">
      <div className="flex items-center h-16 max-w-lg mx-auto justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all gap-1.5 relative",
                isActive ? "text-primary" : "text-muted-foreground",
                item.color
              )}
            >
              <div className={cn(
                "p-1 rounded-xl transition-all",
                isActive && "bg-primary/10 scale-110"
              )}>
                <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
              </div>
              <span className="text-[10px] font-bold tracking-tight leading-none text-center">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
