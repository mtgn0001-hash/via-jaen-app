"use client"

import { Home, ClipboardList, FileText, MapPin, ShieldAlert } from "lucide-react";
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
    { id: 'forms', icon: FileText, label: t.forms },
    { id: 'directory', icon: MapPin, label: t.directory },
    { id: 'emergency', icon: ShieldAlert, label: t.emergency, color: 'text-destructive' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 px-2 pb-safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-all gap-1",
                isActive ? "text-primary scale-105" : "text-muted-foreground",
                item.color
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-primary rounded-full transition-all" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}