
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
  Bot
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
  // Safe labels helper to avoid crashing if a translation key is missing
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
    { id: 'general', label: 'Inicio', items: [
      { id: 'dashboard', icon: Home, label: t.dashboard || 'Inicio' },
      { id: 'profile', icon: UserCircle, label: 'Mis Datos' },
    ]},
    { id: 'tools', label: 'Herramientas Inteligentes', items: [
      { id: 'bot', icon: Bot, label: getSafeLabel('bot.title', 'Jaén-Bot') },
      { id: 'scanner', icon: Scan, label: getSafeLabel('scanner.title', 'Escáner') },
      { id: 'vault', icon: Lock, label: getSafeLabel('vault.title', 'Bóveda') },
    ]},
    { id: 'legal', label: 'Trámites Legales', items: [
      { id: 'procedures', icon: Gavel, label: t.procedures || 'Trámites' },
    ]},
    { id: 'employment', label: 'Trabajo y Empleo', items: [
      { id: 'employment_portal', icon: Briefcase, label: getSafeLabel('employment.title', 'Empleo') },
    ]},
    { id: 'social', label: 'Salud y Familia', items: [
      { id: 'family', icon: HeartPulse, label: getSafeLabel('familyResources.title', 'Familia') },
      { id: 'andalucia_common', icon: Library, label: 'Ayudas Junta de Andalucía' },
    ]},
    { id: 'education', label: 'Universidad', items: [
      { id: 'study', icon: GraduationCap, label: getSafeLabel('studyUJA.title', 'Estudios') },
    ]},
    { id: 'culture', label: 'Integración', items: [
      { id: 'community', icon: Languages, label: t.community || 'Cultura' },
    ]},
    { id: 'help', label: 'Directorio', items: [
      { id: 'directory', icon: MapPin, label: t.directory || 'Directorio' },
    ]},
    { id: 'emergency', label: 'Urgencias', items: [
      { id: 'emergency', icon: ShieldAlert, label: t.emergency || 'S.O.S', className: 'text-destructive hover:text-destructive' },
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
        <SidebarHeader className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2">
              <AppLogo size={44} />
              <div className="flex flex-col">
                <span className="font-headline font-black text-lg tracking-tight text-primary uppercase leading-none">
                  Vía Jaén
                </span>
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                  Comunidad Segura
                </span>
              </div>
            </div>

            <div 
              className="flex items-center gap-3 cursor-pointer bg-primary/5 hover:bg-primary/10 p-3 rounded-3xl transition-all border border-primary/5"
              onClick={() => handleNav('profile')}
            >
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={progress.profile.photo} className="object-cover" />
                <AvatarFallback className="bg-primary text-white font-black">
                  {progress.profile.name?.charAt(0) || <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden text-left">
                <h2 className="font-headline font-black text-xs tracking-tight text-primary uppercase truncate">
                  {progress.profile.name || "Invitado"}
                </h2>
                <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">
                  {progress.profile.nie || 'Ver Perfil'}
                </span>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 scrollbar-hide">
          <div className="px-4 py-2 mb-4 bg-primary/10 backdrop-blur-md rounded-2xl mx-2 border border-primary/20 flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="easy-reading" className="text-[10px] font-black uppercase text-primary">{t.easyReading || 'Modo Fácil'}</Label>
              <p className="text-[8px] text-muted-foreground font-bold leading-none">Lectura Facilitada</p>
            </div>
            <Switch 
              id="easy-reading" 
              checked={progress.easyReading} 
              onCheckedChange={(val) => updateProgress({ easyReading: val })}
            />
          </div>

          {categories.map((cat) => (
            <SidebarGroup key={cat.id} className="py-1">
              <SidebarGroupLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 px-4 mb-1">
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
                          "h-11 px-4 rounded-xl transition-all duration-300 group",
                          activeTab === item.id 
                            ? "bg-primary/20 text-primary font-bold shadow-sm backdrop-blur-md" 
                            : "hover:bg-primary/10 hover:text-primary",
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
          
          <div className="px-4 py-4">
            <Button 
              onClick={() => setShowQR(true)} 
              variant="outline" 
              className="w-full rounded-2xl gap-3 h-12 border-2 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all font-bold backdrop-blur-md"
            >
              <Share2 className="h-5 w-5" /> Compartir App
            </Button>
          </div>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-sidebar-border/20 gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 h-14 rounded-2xl hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 backdrop-blur-md bg-white/5">
                <Palette className="h-5 w-5 text-primary" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-bold text-primary">Apariencia</span>
                  <span className="text-[9px] text-muted-foreground uppercase font-black tracking-tight">
                    {themes.find(t => t.id === currentTheme)?.label || 'Personalizar'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-64 rounded-[2.5rem] shadow-2xl p-4 backdrop-blur-2xl bg-white/40 border border-white/20">
              <DropdownMenuLabel className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] px-1 py-2 text-center">
                Seleccionar Color
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/20" />
              <div className="grid grid-cols-3 gap-4 py-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    className={cn(
                      "h-12 w-12 rounded-full transition-all flex items-center justify-center relative hover:scale-110 active:scale-95 shadow-lg mx-auto",
                      theme.color,
                      currentTheme === theme.id ? "ring-2 ring-primary ring-offset-2 scale-110 z-10" : "opacity-80 grayscale-[0.3]"
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
              <Button variant="ghost" className="w-full justify-start gap-3 h-14 rounded-2xl hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 backdrop-blur-md bg-white/5">
                <Globe className="h-5 w-5 text-primary" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-bold text-primary">Idioma</span>
                  <span className="text-[9px] text-muted-foreground uppercase font-black tracking-tight">
                    {lang === 'es' ? 'Español' : 
                     lang === 'en' ? 'English' : 
                     lang === 'fr' ? 'Français' : 
                     lang === 'ar' ? 'العربية' : 'Română'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-64 rounded-3xl shadow-2xl p-2 backdrop-blur-2xl bg-white/40 border border-white/20">
              <DropdownMenuLabel className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] px-3 py-3">
                Seleccionar Idioma
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem className="rounded-2xl font-bold p-4 focus:bg-primary/20 focus:text-primary transition-all" onClick={() => setLang('es')}>Español</DropdownMenuItem>
              <DropdownMenuItem className="rounded-2xl font-bold p-4 focus:bg-primary/20 focus:text-primary transition-all" onClick={() => setLang('en')}>English</DropdownMenuItem>
              <DropdownMenuItem className="rounded-2xl font-bold p-4 focus:bg-primary/20 focus:text-primary transition-all" onClick={() => setLang('fr')}>Français</DropdownMenuItem>
              <DropdownMenuItem className="rounded-2xl font-bold p-4 focus:bg-primary/20 focus:text-primary transition-all text-right" onClick={() => setLang('ar')}>العربية</DropdownMenuItem>
              <DropdownMenuItem className="rounded-2xl font-bold p-4 focus:bg-primary/20 focus:text-primary transition-all" onClick={() => setLang('ro')}>Română</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <QRCodeShare open={showQR} onOpenChange={setShowQR} lang={lang} />
    </>
  )
}
