
"use client"

import { Home, ClipboardList, MapPin, ShieldAlert, Users, Briefcase, GraduationCap, Utensils, Bus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language, translations } from "@/lib/translations";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    { id: 'work', icon: Briefcase, label: t.work.title },
    { id: 'family', icon: Users, label: t.family },
    { id: 'study', icon: GraduationCap, label: t.study },
    { id: 'transport', icon: Bus, label: t.transport.title },
    { id: 'integration', icon: Utensils, label: t.integration.title },
    { id: 'directory', icon: MapPin, label: t.directory },
    { id: 'emergency', icon: ShieldAlert, label: t.emergency, color: 'text-destructive' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 px-1 pb-safe-area-inset-bottom">
      <ScrollArea className="w-full">
        <div className="flex items-center h-16 max-w-lg mx-auto min-w-max">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[70px] h-full transition-all gap-1 relative px-2",
                  isActive ? "text-primary scale-105" : "text-muted-foreground",
                  item.color
                )}
              >
                <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", isActive && "stroke-[2.5px]")} />
                <span className="text-[8px] sm:text-[9px] font-medium leading-none text-center px-0.5 whitespace-nowrap">{item.label}</span>
                {isActive && (
                  <div className="absolute top-0 w-8 h-1 bg-primary rounded-full transition-all" />
                )}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </nav>
  );
}
