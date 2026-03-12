
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
  Palette,
  Check,
  Share2,
  Library,
  UserCircle,
  Scan,
  Lock,
  Bot,
  Sparkles,
  BookOpen,
  Search
} from "lucide-react"
import { Language, translations } from "@/lib/translations"
import { ThemeType, useLocalStorage } from "@/lib/store"
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { QRCodeShare } from "@/components/ui/QRCodeShare"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppLogo } from "@/components/ui/AppLogo"

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
  const getSafeLabel = (path: string, defaultLabel: string) => {
    try {
      const parts = path.split('.');
      const currentPack = translations[lang] || translations.es;
      let current: any = currentPack;
      for (const part of parts) {
        if (current[part] === undefined) return defaultLabel;
        current = current[part];
      }
      return current;
    } catch {
      return defaultLabel;
    }
  };

  const t = translations[lang] || translations.es;
  const { progress, updateProgress } = useLocalStorage();
  const { setOpenMobile } = useSidebar();
  const [showQR, setShowQR] = React.useState(false);

  const handleNav = (tab: string) => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    setActiveTab(tab);
    setOpenMobile(false);
  };

  const categories = [
    { id: 'general', label: 'Principal', items: [
      { id: 'dashboard', icon: Home, label: t.dashboard || 'Inicio' },
      { id: 'profile', icon: UserCircle, label: 'Mis Datos' },
    ]},
    { id: 'tools', label: 'Inteligencia Proactiva', items: [
      { id: 'bot', icon: Bot, label: getSafeLabel('bot.title', 'Jaén-Bot') },
      { id: 'scanner', icon: Scan, label: getSafeLabel('scanner.title', 'Escáner') },
      { id: 'vault', icon: Lock, label: getSafeLabel('vault.title', 'Bóveda') },
    ]},
    { id: 'guides', label: 'Guías y Servicios', items: [
      { id: 'procedures', icon: Gavel, label: t.procedures || 'Trámites' },
      { id: 'employment_portal', icon: Briefcase, label: getSafeLabel('employment.title', 'Empleo') },
      { id: 'study', icon: GraduationCap, label: getSafeLabel('studyUJA.title', 'Estudios') },
      { id: 'directory', icon: MapPin, label: t.directory || 'Ayuda y Mapas' },
    ]},
    { id: 'social', label: 'Vida y Salud', items: [
      { id: 'family', icon: HeartPulse, label: getSafeLabel('familyResources.title', 'Familia') },
      { id: 'andalucia_common', icon: Library, label: 'Ayudas Junta' },
    ]},
    { id: 'emergency', label: 'Atención Inmediata', items: [
      { id: 'emergency', icon: ShieldAlert, label: t.emergency || 'S.O.S', className: 'text-destructive bg-destructive/5 hover:bg-destructive/10' },
    ]},
  ];

  const themes: { id: ThemeType, label: string, color: string }[] = [
    { id: 'purple', label: 'Morado', color: 'bg-[#7C3AED]' },
    { id: 'olive', label: 'Olivo', color: 'bg-[#3D5229]' },
    { id: 'red', label: 'Rojo', color: 'bg-[#E11D48]' },
    { id: 'night', label: 'Noche', color: 'bg-[#121212]' },
    { id: 'contrast', label: 'Contraste', color: 'bg-white border-2 border-black' },
    { id: 'ocean', label: 'Océano', color: 'bg-[#3B82F6]' },
  ];

  return (
    <>
      <Sidebar variant="floating" className="border-none shadow-none">
        <SidebarHeader className="p-6 pb-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 px-2">
              <AppLogo size={48} className="shadow-lg" />
              <div className="flex flex-col">
                <span className="font-headline font-black text-xl tracking-tight text-primary uppercase leading-none">
                  Vía Jaén
                </span>
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 opacity-60">
                  Edición Pro 2026
                </span>
              </div>
            </div>

            <div 
              className="group flex items-center gap-4 cursor-pointer bg-white/50 hover:bg-white/70 p-4 rounded-[2rem] transition-all border border-white/40 shadow-sm backdrop-blur-md"
              onClick={() => handleNav('profile')}
            >
              <Avatar className="h-12 w-12 border-2 border-white shadow-md transition-transform group-hover:scale-105">
                <AvatarImage src={progress.profile.photo} className="object-cover" />
                <AvatarFallback className="bg-primary text-white font-black text-lg">
                  {progress.profile.name?.charAt(0) || <User className="h-6 w-6" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden text-left">
                <h2 className="font-headline font-black text-sm tracking-tight text-primary uppercase truncate leading-tight">
                  {progress.profile.name || "Invitado"}
                </h2>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] uppercase font-black text-muted-foreground tracking-widest opacity-60">
                    {progress.profile.nie || 'Ver Perfil'}
                  </span>
                  <ChevronRight className="h-3 w-3 text-primary opacity-40 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 scrollbar-hide py-4">
          <div className="px-4 py-3 mb-6 bg-primary/10 backdrop-blur-xl rounded-[2rem] mx-2 border border-primary/20 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-xl">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="easy-reading" className="text-[10px] font-black uppercase text-primary tracking-tight">{t.easyReading || 'Modo Fácil'}</Label>
                <p className="text-[8px] text-muted-foreground font-black uppercase tracking-widest opacity-60">Lectura Pro</p>
              </div>
            </div>
            <Switch 
              id="easy-reading" 
              checked={progress.easyReading} 
              onCheckedChange={(val) => updateProgress({ easyReading: val })}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {categories.map((cat) => (
            <SidebarGroup key={cat.id} className="py-2">
              <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/40 px-5 mb-2 h-auto">
                {cat.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1.5">
                  {cat.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => handleNav(item.id)}
                        isActive={activeTab === item.id}
                        className={cn(
                          "h-12 px-5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                          activeTab === item.id 
                            ? "bg-primary text-white font-black shadow-lg shadow-primary/20" 
                            : "hover:bg-primary/5 hover:text-primary",
                          item.className
                        )}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 mr-3 transition-transform group-hover:scale-110 relative z-10",
                          activeTab === item.id ? "text-white" : "text-primary/60"
                        )} />
                        <span className="text-[13px] font-bold relative z-10 tracking-tight">{item.label}</span>
                        {activeTab === item.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
          
          <div className="px-4 py-6 mt-2">
            <Button 
              onClick={() => setShowQR(true)} 
              variant="outline" 
              className="w-full rounded-[2rem] gap-3 h-14 border-2 border-primary/10 hover:border-primary/30 hover:bg-white/50 transition-all font-black uppercase text-[11px] tracking-widest shadow-sm backdrop-blur-md"
            >
              <Share2 className="h-5 w-5 text-primary" /> Compartir App
            </Button>
          </div>
        </SidebarContent>

        <SidebarFooter className="p-5 border-t border-sidebar-border/10 gap-3 bg-white/30 backdrop-blur-3xl">
          <div className="grid grid-cols-2 gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-center gap-2 h-12 rounded-2xl hover:bg-white/50 border border-white/40 bg-white/20 shadow-sm transition-all">
                  <Palette className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Estilo</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" className="w-64 rounded-[2.5rem] shadow-2xl p-4 backdrop-blur-3xl bg-white/85 border border-white/30">
                <DropdownMenuLabel className="text-[10px] font-black uppercase text-primary tracking-[0.2em] px-1 py-2 text-center">
                  Color del Sistema
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/10" />
                <div className="grid grid-cols-3 gap-4 py-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={cn(
                        "h-12 w-12 rounded-full transition-all flex items-center justify-center relative hover:scale-115 active:scale-95 shadow-lg mx-auto",
                        theme.color,
                        currentTheme === theme.id ? "ring-4 ring-primary ring-offset-2 scale-110 z-10 shadow-primary/20" : "opacity-70 grayscale-[0.2]"
                      )}
                      title={theme.label}
                    >
                      {currentTheme === theme.id && <Check className={cn("h-6 w-6", theme.id === 'contrast' ? 'text-black' : 'text-white')} />}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-center gap-2 h-12 rounded-2xl hover:bg-white/50 border border-white/40 bg-white/20 shadow-sm transition-all">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Idioma</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-64 rounded-[2.5rem] shadow-2xl p-2 backdrop-blur-3xl bg-white/85 border border-white/30">
                <DropdownMenuLabel className="text-[10px] font-black uppercase text-primary tracking-[0.2em] px-4 py-4">
                  Seleccionar Idioma
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/10" />
                <div className="grid gap-1 p-1">
                  <DropdownMenuItem className="rounded-2xl font-black p-4 focus:bg-primary focus:text-white transition-all text-xs uppercase" onClick={() => setLang('es')}>Español</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-2xl font-black p-4 focus:bg-primary focus:text-white transition-all text-xs uppercase" onClick={() => setLang('en')}>English</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-2xl font-black p-4 focus:bg-primary focus:text-white transition-all text-xs uppercase" onClick={() => setLang('fr')}>Français</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-2xl font-black p-4 focus:bg-primary focus:text-white transition-all text-xs uppercase text-right" onClick={() => setLang('ar')}>العربية</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-2xl font-black p-4 focus:bg-primary focus:text-white transition-all text-xs uppercase" onClick={() => setLang('ro')}>Română</DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="text-[8px] text-center text-muted-foreground font-black uppercase tracking-[0.3em] mt-2 opacity-40">
            Jaén Integra &copy; 2026
          </p>
        </SidebarFooter>
      </Sidebar>
      <QRCodeShare open={showQR} onOpenChange={setShowQR} lang={lang} />
    </>
  )
}
