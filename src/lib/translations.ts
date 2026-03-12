
export const translations = {
  es: {
    title: 'Vía Jaén',
    dashboard: 'Inicio',
    procedures: 'Trámites',
    backpack: 'Mochila',
    backpackDesc: 'Tus documentos listos.',
    community: 'Cultura',
    directory: 'Ayuda Local',
    emergency: 'S.O.S',
    progress: 'Tu Progreso',
    welcome: 'Hola, bienvenido',
    easyReading: 'Lectura Fácil',
    accessibility: {
      title: 'Accesibilidad',
      standard: 'Modo Estándar',
      visual: 'Modo Visual (Sordos/LSE)',
      auditory: 'Modo Auditivo (Ciegos)',
      lseBtn: 'Ver en LSE',
      desc: 'Personaliza tu experiencia universal.'
    },
    bot: {
      title: 'Jaén-Bot',
      subtitle: 'Asistente IA',
      welcome: '¡Hola! Soy tu asistente. ¿En qué te ayudo?'
    },
    scanner: {
      title: 'Escáner',
      subtitle: 'Análisis IA Offline'
    },
    vault: {
      title: 'Bóveda',
      subtitle: 'Documentos Seguros'
    },
    disclaimer: 'Guía comunitaria no oficial. Privacidad 100% local.'
  },
  en: {
    title: 'Vía Jaén',
    dashboard: 'Home',
    procedures: 'Steps',
    backpack: 'Backpack',
    backpackDesc: 'Documents ready.',
    community: 'Culture',
    directory: 'Local Help',
    emergency: 'S.O.S',
    progress: 'Your Progress',
    welcome: 'Hello, welcome',
    easyReading: 'Easy Reading',
    accessibility: {
      title: 'Accessibility',
      standard: 'Standard Mode',
      visual: 'Visual Mode (Deaf)',
      auditory: 'Auditory Mode (Blind)',
      lseBtn: 'Watch in LSE',
      desc: 'Customize your universal experience.'
    },
    bot: {
      title: 'Jaén-Bot',
      subtitle: 'AI Assistant',
      welcome: 'Hello! How can I help you today?'
    },
    scanner: {
      title: 'Scanner',
      subtitle: 'Offline AI Analysis'
    },
    vault: {
      title: 'Vault',
      subtitle: 'Secure Documents'
    },
    disclaimer: 'Unofficial guide. 100% local privacy.'
  },
  fr: {
    title: 'Vía Jaén',
    dashboard: 'Accueil',
    procedures: 'Démarches',
    backpack: 'Sac à dos',
    backpackDesc: 'Documents prêts.',
    community: 'Culture',
    directory: 'Aide Locale',
    emergency: 'S.O.S',
    progress: 'Votre progrès',
    welcome: 'Bonjour, bienvenue',
    easyReading: 'Lecture Facile',
    accessibility: {
      title: 'Accessibilité',
      standard: 'Mode Standard',
      visual: 'Mode Visuel (Sourd)',
      auditory: 'Mode Auditif (Aveugle)',
      lseBtn: 'Voir en LSE',
      desc: 'Personnalisez votre expérience.'
    },
    bot: { title: 'Jaén-Bot', subtitle: 'Assistant IA', welcome: 'Bonjour!' },
    scanner: { title: 'Scanner', subtitle: 'Analyse IA' },
    vault: { title: 'Coffre', subtitle: 'Sécurisé' },
    disclaimer: 'Guide non officiel. Privée.'
  },
  ar: {
    title: 'Vía Jaén',
    dashboard: 'الرئيسية',
    procedures: 'الإجراءات',
    backpack: 'حقيبة الأوراق',
    backpackDesc: 'أوراقك جاهزة.',
    community: 'الثقافة',
    directory: 'المساعدة المحلية',
    emergency: 'الطوارئ',
    progress: 'تقدمك',
    welcome: 'أهلاً بك',
    easyReading: 'قراءة سهلة',
    accessibility: {
      title: 'إمكانية الوصول',
      standard: 'الوضع القياسي',
      visual: 'الوضع البصري (الصم)',
      auditory: 'الوضع السمعي (المكفوفين)',
      lseBtn: 'شاهد بلغة الإشارة',
      desc: 'خصص تجربتك الشاملة.'
    },
    bot: { title: 'روبوت جيان', subtitle: 'مساعد ذكي', welcome: 'مرحباً!' },
    scanner: { title: 'ماسح ضوئي', subtitle: 'تحليل ذكي' },
    vault: { title: 'الخزنة', subtitle: 'أوراق محمية' },
    disclaimer: 'دليل غير رسمي. خصوصية تامة.'
  },
  ro: {
    title: 'Vía Jaén',
    dashboard: 'Acasă',
    procedures: 'Demersuri',
    backpack: 'Rucsac',
    backpackDesc: 'Documente gata.',
    community: 'Cultură',
    directory: 'Ajutor Local',
    emergency: 'S.O.S',
    progress: 'Progresul tău',
    welcome: 'Bună, bine ai venit',
    easyReading: 'Lectură Ușoară',
    accessibility: {
      title: 'Accesibilitate',
      standard: 'Mod Standard',
      visual: 'Mod Vizual (Surzi)',
      auditory: 'Mod Auditiv (Nevăzători)',
      lseBtn: 'Vezi în LSE',
      desc: 'Personalizează-ți experiența.'
    },
    bot: { title: 'Jaén-Bot', subtitle: 'Asistent IA', welcome: 'Bună!' },
    scanner: { title: 'Scaner', subtitle: 'Analiză IA' },
    vault: { title: 'Seif', subtitle: 'Documente' },
    disclaimer: 'Ghid neoficial. Privată.'
  }
};

export type Language = keyof typeof translations;
