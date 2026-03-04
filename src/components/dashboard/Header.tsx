"use client"

import { Globe, User } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

type HeaderProps = {
  lang: Language;
  setLang: (lang: Language) => void;
  completion: number;
};

export function Header({ lang, setLang, completion }: HeaderProps) {
  const t = translations[lang];

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-3 border-b border-border">
      <div className="flex justify-between items-center max-w-lg mx-auto mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-headline font-bold text-xl tracking-tight text-primary">
            {t.title}
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLang('es')}>Español</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('fr')}>Français</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('ar')}>العربية</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-end mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>{t.progress}</span>
          <span>{completion}%</span>
        </div>
        <Progress value={completion} className="h-2" />
      </div>
    </header>
  );
}