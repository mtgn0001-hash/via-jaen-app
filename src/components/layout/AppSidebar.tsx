
"use client"

import * as React from "react"
import { 
  Home, 
  Gavel, 
  HeartPulse, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  ShieldAlert,
  Globe,
  User,
  UserCircle,
  Scan,
  Lock,
  Bot,
  Zap,
  Accessibility,
  Library,
  Share2
} from "lucide-react"
import { Language, translations } from "@/lib/translations"
import { ThemeType, UserProgress } from "@/lib/store"
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
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
};

export function AppSidebar({ 
  lang, 
  setLang, 
  activeTab, 
  setActiveTab, 
  progress,
  updateProgress,
  setTheme
}: AppSidebarProps) {
  const t = translations[lang] || translations.es;
  const { setOpenMobile } = useSidebar();
  const [showQR, setShowQR] = React.useState(false);

  const handleNav = (tab: string) => {
    if ('vibrate' in navigator) navigator.vibrate(50);
    setActiveTab(tab);
    setOpenMobile(false);
  };

  const isAccessible = progress.accessibilityMode === 'accessible';

  const categories = [
    { id: 'general', label: 'Principal', items: [
      { id: 'dashboard', icon: Home, label: t.dashboard || 'Inicio' },
      { id: 'profile', icon: UserCircle, label: 'Mis Datos' },
    ]},
    { id: 'tools', label: 'IA Jaén', items: [
      { id: 'bot', icon: Bot, label: t.bot?.title || 'Jaén-Bot' },
      { id: 'scanner', icon: Scan, label: t.scanner?.title || 'Escáner' },
      { id: 'vault', icon: Lock, label: t.vault?.title || 'Bóveda' },
    ]},
    { id: 'guides', label: 'Servicios', items: [
      { id: 'procedures', icon: Gavel, label: t.procedures || 'Trámites' },
      { id: 'employment_portal', icon: Briefcase, label: t.employment?.title || 'Empleo' },
      { id: 'study', icon: GraduationCap, label: t.studyUJA?.title || 'Estudios' },
      { id: 'directory', icon: MapPin, label: t.directory || 'Ayuda Local' },
    ]},
    { id: 'social', label: 'Vida', items: [
      { id: 'family', icon: HeartPulse, label: t.familyResources?.title || 'Familias' },
      { id: 'andalucia_common', icon: Library, label: 'Ayudas Junta' },
    ]},
    { id: 'emergency', label: 'Urgencias', items: [
      { id: 'emergency', icon: ShieldAlert, label: t.emergency || 'S.O.S', className: 'text-white bg-destructive hover:bg-destructive/90 border-destructive/20 shadow-lg shadow-destructive/20' },
    ]},
  ];

  const toggleAccessibility = () => {
    const nextMode = isAccessible ? 'standard' : 'accessible';
    if ('vibrate' in navigator) navigator.vibrate(nextMode === 'accessible' ? 100 : 10);
    updateProgress({ accessibilityMode: nextMode });
  };

  const themes: { id: ThemeType; color: string; label: string }[] = [
    { id: 'purple', color: '#7C3AED', label: t.themes?.purple || 'Morado' },
    { id: 'olive', color: '#3D5229', label: t.themes?.olive || 'Oliva' },
    { id: 'ocean', color: '#3B82F6', label: 'Océano' }, 
    { id: 'red', color: '#EF4444', label: t.themes?.red || 'Rojo' },
    { id: 'night', color: '#1E1B4B', label: t.themes?.night || 'Noche' },
    { id: 'contrast', color: '#000000', label: t.themes?.contrast || 'Contraste' },
  ];

  return (
    <>
      <Sidebar variant="floating" className="border-none shadow-none bg-transparent m-3">
        {/* Header con Perfil */}
        <SidebarHeader className="p-6 pb-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 px-2">
              <AppLogo size={48} className="shadow-2xl ring-2 ring-white/10" />
              <div className="flex flex-col">
                <span className="font-headline font-black text-xl tracking-tight text-white uppercase leading-none">
                  Vía Jaén
                </span>
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mt-1">
                  Guía Comunitaria
                </span>
              </div>
            </div>

            <div 
              className="group flex items-center gap-4 cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-[2rem] transition-all duration-500 border border-white/10 backdrop-blur-md shadow-xl"
              onClick={() => handleNav('profile')}
            >
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src={progress.profile.photo} />
                <AvatarFallback className="bg-primary text-white font-black">
                  {progress.profile.name?.charAt(0) || <User className="h-6 w-6" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <h2 className="font-headline font-black text-xs tracking-tight text-white uppercase truncate">
                  {progress.profile.name || "Invitado"}
                </h2>
                <span className="text-[8px] uppercase font-black text-white/30">Mi Perfil</span>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 py-2 scrollbar-hide">
          {/* Accesibilidad */}
          <div className="px-2 mb-4 space-y-3">
             <Label className="text-[9px] font-black uppercase text-white/30 px-3 tracking-widest">Accesibilidad</Label>
             <Button
                variant={isAccessible ? 'default' : 'outline'}
                onClick={toggleAccessibility}
                className={cn(
                  "w-full h-12 rounded-[1.5rem] gap-3 px-5 transition-all duration-500 border-2",
                  isAccessible 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30" 
                    : "bg-white/5 hover:bg-white/10 text-white border-white/10"
                )}
              >
                {isAccessible ? <Zap className="h-4 w-4 fill-current" /> : <Accessibility className="h-4 w-4" />}
                <span className="text-xs font-black uppercase">
                  {isAccessible ? 'Modo Estándar' : 'Hacer Accesible'}
                </span>
              </Button>
          </div>

          {/* Temas Dinámicos */}
          <div className="px-2 mb-6 space-y-3">
             <Label className="text-[9px] font-black uppercase text-white/30 px-3 tracking-widest">Personalizar</Label>
             <div className="flex justify-between px-4 py-3 bg-white/5 rounded-[1.5rem] border border-white/10">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-125",
                      progress.theme === theme.id ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    style={{ backgroundColor: theme.color }}
                  />
                ))}
             </div>
          </div>

          <SidebarSeparator className="mx-2 bg-white/10 mb-4" />

          {/* Navegación por Categorías */}
          {categories.map((cat) => (
            <SidebarGroup key={cat.id} className="py-1">
              <SidebarGroupLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 px-4 mb-2">
                {cat.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {cat.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => handleNav(item.id)}
                        isActive={activeTab === item.id}
                        className={cn(
                          "h-11 px-4 rounded-2xl transition-all duration-300 border border-transparent",
                          activeTab === item.id 
                            ? "bg-primary text-white font-black shadow-lg shadow-primary/20 border-white/5" 
                            : "text-white/70 hover:bg-white/5 hover:text-white",
                          item.className
                        )}
                      >
                        <item.icon className={cn("h-4 w-4 mr-3", activeTab === item.id && "scale-110")} />
                        <span className="text-[12px] font-bold">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Footer Adaptativo */}
        <SidebarFooter className="p-4 border-t border-white/5 mt-2">
          <div className="grid grid-cols-2 gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10">
                  <Globe className="h-4 w-4 text-white/60" />
                  <span className="text-[10px] font-black text-white">{lang.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="top" className="rounded-[1.5rem] bg-slate-900/90 backdrop-blur-xl border-white/10">
                <DropdownMenuItem onClick={() => setLang('es')} className="text-white">Español</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('en')} className="text-white">English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('fr')} className="text-white">Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ar')} className="text-white">العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ro')} className="text-white">Română</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => setShowQR(true)} variant="ghost" className="h-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10">
              <Share2 className="h-4 w-4 text-white/60" />
              <span className="text-[10px] font-black text-white">QR</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <QRCodeShare open={showQR} onOpenChange={setShowQR} lang={lang} />
    </>
  )
}
