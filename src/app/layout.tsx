
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guía España - Ayuda Inmigración',
  description: 'Gestión de recursos y trámites legales para inmigrantes en España. PWA móvil, segura y offline.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Guía España',
  },
  formatDetection: {
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="theme-color" content="#4B5320" />
      </head>
      <body className="font-body antialiased bg-white selection:bg-secondary selection:text-white">
        {children}
      </body>
    </html>
  );
}
