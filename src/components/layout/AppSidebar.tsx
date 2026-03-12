
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
  Accessibility,
  Eye,
  Ear,
  EyeOff
} from "lucide-react"
import { Language, translations } from "@/lib/translations"
import { ThemeType, AccessibilityMode, useLocalStorage } from "@/lib/store"
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
  SidebarSeparator,
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
  const t = translations[lang] || translations.es;
  const { progress, updateProgress } = useLocalStorage();
  const { setOpenMobile } = useSidebar();
  const [showQR, setShowQR] = React.useState(false);

  const handleNav = (tab: string) => {
    if ('vibrate' in navigator) navigator.vibrate(50);
    setActiveTab(tab);
    setOpenMobile(false);
  };

  const categories = [
    { id: 'general', label: 'Principal', items: [
      { id: 'dashboard', icon: Home, label: t.dashboard || 'Inicio' },
      { id: 'profile', icon: UserCircle, label: 'Mis Datos' },
    ]},
    { id: 'tools', label: 'Inteligencia Proactiva', items: [
      { id: 'bot', icon: Bot, label: t.bot?.title || 'Jaén-Bot' },
      { id: 'scanner', icon: Scan, label: t.scanner?.title || 'Escáner' },
      { id: 'vault', icon: Lock, label: t.vault?.title || 'Bóveda' },
    ]},
    { id: 'guides', label: 'Guías y Servicios', items: [
      { id: 'procedures', icon: Gavel, label: t.procedures || 'Trámites' },
      { id: 'employment_portal', icon: Briefcase, label: 'Portal Empleo' },
      { id: 'study', icon: GraduationCap, label: 'Estudiar UJA' },
      { id: 'directory', icon: MapPin, label: t.directory || 'Ayuda Local' },
    ]},
    { id: 'social', label: 'Vida y Salud', items: [
      { id: 'family', icon: HeartPulse, label: 'Para Familias' },
      { id: 'andalucia_common', icon: Library, label: 'Ayudas Junta' },
    ]},
    { id: 'emergency', label: 'Atención Inmediata', items: [
      { id: 'emergency', icon: ShieldAlert, label: t.emergency || 'S.O.S', className: 'text-destructive bg-destructive/5 hover:bg-destructive/10' },
    ]},
  ];

  const accessibilityModes: { id: AccessibilityMode, label: string, icon: any }[] = [
    { id: 'standard', label: t.accessibility?.standard || 'Estándar', icon: Sparkles },
    { id: 'visual', label: t.accessibility?.visual || 'Modo Visual', icon: Ear },
    { id: 'auditory', label: t.accessibility?.auditory || 'Modo Auditivo', icon: EyeOff },
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
                  Universal 2026
                </span>
              </div>
            </div>

            <div 
              className="group flex items-center gap-4 cursor-pointer bg-white/50 hover:bg-white/70 p-4 rounded-[2rem] transition-all border border-white/40 shadow-sm backdrop-blur-md"
              onClick={() => handleNav('profile')}
              aria-label="Ir a mi perfil"
            >
              <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                <AvatarImage src={progress.profile.photo} />
                <AvatarFallback className="bg-primary text-white font-black">
                  {progress.profile.name?.charAt(0) || <User className="h-6 w-6" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden text-left">
                <h2 className="font-headline font-black text-sm tracking-tight text-primary uppercase truncate">
                  {progress.profile.name || "Invitado"}
                </h2>
                <span className="text-[9px] uppercase font-black text-muted-foreground opacity-60">Ver Perfil</span>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 scrollbar-hide">
          {/* CONTROL DE ACCESIBILIDAD */}
          <div className="px-2 mb-6 space-y-3">
             <Label className="text-[10px] font-black uppercase text-primary/40 px-3 tracking-widest">{t.accessibility?.title || 'Accesibilidad'}</Label>
             <div className="grid gap-1.5">
                {accessibilityModes.map((mode) => (
                  <Button
                    key={mode.id}
                    variant={progress.accessibilityMode === mode.id ? 'default' : 'ghost'}
                    onClick={() => {
                      if ('vibrate' in navigator) navigator.vibrate(mode.id === 'standard' ? 10 : 100);
                      updateProgress({ accessibilityMode: mode.id });
                    }}
                    className={cn(
                      "justify-start h-12 rounded-2xl gap-3 px-5 transition-all",
                      progress.accessibilityMode === mode.id ? "shadow-lg shadow-primary/20" : "hover:bg-primary/5"
                    )}
                    aria-label={`Activar ${mode.label}`}
                  >
                    <mode.icon className="h-4 w-4" />
                    <span className="text-[11px] font-bold tracking-tight uppercase">{mode.label}</span>
                  </Button>
                ))}
             </div>
          </div>

          <SidebarSeparator className="mb-4" />

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
                          "h-12 px-5 rounded-2xl transition-all",
                          activeTab === item.id ? "bg-primary text-white font-black shadow-lg" : "hover:bg-primary/5",
                          item.className
                        )}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="p-5 border-t border-sidebar-border/10 bg-white/30 backdrop-blur-3xl gap-3">
          <div className="grid grid-cols-2 gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-12 rounded-2xl bg-white/20 border border-white/40 shadow-sm">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase">Idioma</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" className="rounded-[2rem] w-56">
                <DropdownMenuItem onClick={() => setLang('es')}>Español</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('fr')}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ar')}>العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ro')}>Română</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => setShowQR(true)} variant="ghost" className="h-12 rounded-2xl bg-white/20 border border-white/40 shadow-sm">
              <Share2 className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black uppercase">App</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <QRCodeShare open={showQR} onOpenChange={setShowQR} lang={lang} />
    </>
  )
}
