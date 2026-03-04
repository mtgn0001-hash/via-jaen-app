"use client"

import * as React from "react"
import { 
  Home, 
  Gavel, 
  HeartPulse, 
  GraduationCap, 
  Briefcase, 
  Languages, 
  MapPin, 
  ShieldAlert,
  Globe,
  User,
  ChevronRight,
  FileText,
  Palette,
  Check
} from "lucide-react"
import { Language, translations } from "@/lib/translations"
import { ThemeType } from "@/lib/store"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AppSidebarProps = {
  lang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

export function AppSidebar({ 
  lang, 
  setLang, 
  activeTab, 
  setActiveTab, 
  currentTheme, 
  setTheme 
}: AppSidebarProps) {
  const t = translations[lang];
  const { setOpenMobile } = useSidebar();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setOpenMobile(false);
  };

  const navItems = [
    { id: 'dashboard', icon: Home, label: t.dashboard, category: 'general' },
    { id: 'procedures', icon: Gavel, label: t.procedures, category: 'legal' },
    { id: 'family', icon: HeartPulse, label: t.familyResources.title, category: 'social' },
    { id: 'study', icon: GraduationCap, label: t.studyUJA.title, category: 'education' },
    { id: 'employment_portal', icon: FileText, label: t.employment.title, category: 'economy' },
    { id: 'work', icon: Briefcase, label: t.work.title, category: 'economy' },
    { id: 'community', icon: Languages, label: t.community, category: 'culture' },
    { id: 'directory', icon: MapPin, label: t.directory, category: 'help' },
    { id: 'emergency', icon: ShieldAlert, label: t.emergency, category: 'emergency', className: 'text-destructive hover:text-destructive' },
  ];

  const categories = [
    { id: 'general', label: 'Inicio', items: navItems.filter(i => i.category === 'general') },
    { id: 'legal', label: 'Trámites Legales', items: navItems.filter(i => i.category === 'legal') },
    { id: 'social', label: 'Salud y Familia', items: navItems.filter(i => i.category === 'social') },
    { id: 'education', label: 'Universidad (UJA)', items: navItems.filter(i => i.category === 'education') },
    { id: 'economy', label: 'Trabajo y Empleo', items: navItems.filter(i => i.category === 'economy') },
    { id: 'culture', label: 'Integración', items: navItems.filter(i => i.category === 'culture') },
    { id: 'help', label: 'Directorio', items: navItems.filter(i => i.category === 'help') },
    { id: 'emergency', label: 'Urgencias', items: navItems.filter(i => i.category === 'emergency') },
  ];

  const themes: { id: ThemeType, label: string, color: string }[] = [
    { id: 'purple', label: 'Morado', color: 'bg-[#7C3AED]' },
    { id: 'olive', label: 'Olivo', color: 'bg-[#3D5229]' },
    { id: 'red', label: 'Rojo', color: 'bg-[#E11D48]' },
    { id: 'night', label: 'Noche', color: 'bg-[#121212]' },
    { id: 'contrast', label: 'Alto Contraste', color: 'bg-white border-2 border-black' },
    { id: 'ocean', label: 'Océano', color: 'bg-[#3B82F6]' },
  ];

  return (
    <Sidebar variant="floating" className="border-none shadow-none">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl shadow-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline font-black text-lg tracking-tight text-primary">
              Jaén Integra
            </h2>
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
              Guía Comunitaria
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {categories.map((cat) => (
          <SidebarGroup key={cat.id}>
            <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-4 mb-1">
              {cat.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {cat.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => handleNav(item.id)}
                      isActive={activeTab === item.id}
                      className={cn(
                        "h-11 px-4 rounded-xl transition-all duration-200 group",
                        activeTab === item.id 
                          ? "bg-primary/20 text-primary font-bold shadow-sm" 
                          : "hover:bg-primary/5 hover:text-primary",
                        item.className
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 mr-3 transition-transform group-hover:scale-110",
                        activeTab === item.id ? "text-primary stroke-[2.5px]" : "text-primary/60"
                      )} />
                      <span className="text-sm">{item.label}</span>
                      {activeTab === item.id && (
                        <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border/30 gap-2">
        <div className="flex flex-col gap-1 px-2">
          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1 flex items-center gap-2">
            <Palette className="h-3 w-3" /> Personalización
          </p>
          <div className="flex items-center gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={cn(
                  "h-6 w-6 rounded-full transition-all flex items-center justify-center relative hover:scale-110 active:scale-95",
                  theme.color,
                  currentTheme === theme.id ? "ring-2 ring-primary ring-offset-2" : "opacity-70"
                )}
                title={theme.label}
              >
                {currentTheme === theme.id && <Check className={cn("h-3 w-3", theme.id === 'contrast' ? 'text-black' : 'text-white')} />}
              </button>
            ))}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl hover:bg-primary/10 transition-colors">
              <Globe className="h-5 w-5 text-primary" />
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-bold text-primary">Idioma</span>
                <span className="text-[10px] text-muted-foreground uppercase font-black">
                  {lang === 'es' ? 'Español' : 
                   lang === 'en' ? 'English' : 
                   lang === 'fr' ? 'Français' : 
                   lang === 'ar' ? 'العربية' : 'Română'}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className="w-56 rounded-2xl shadow-xl p-1 backdrop-blur-md bg-white/90">
            <DropdownMenuLabel className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-3 py-2">
              Seleccionar Idioma
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg font-medium p-3" onClick={() => setLang('es')}>Español</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg font-medium p-3" onClick={() => setLang('en')}>English</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg font-medium p-3" onClick={() => setLang('fr')}>Français</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg font-medium p-3 text-right" onClick={() => setLang('ar')}>العربية</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg font-medium p-3" onClick={() => setLang('ro')}>Română</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}