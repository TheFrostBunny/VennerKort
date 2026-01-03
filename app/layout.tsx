import type { Metadata } from "next";
import { Figtree, Dancing_Script, Pacifico, Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from '@/lib/i18n/i18n-context';
import PWARegistration from "@/components/pwa-registration";

const fontSans = Figtree({ subsets: ['latin'], variable: '--font-sans' });
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing-script' });
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico' });
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' });

export const metadata: Metadata = {
  title: "HappySend",
  description: "Send personlige digitale hilsener med 3D-konvolutter!",
  generator: 'HappySend',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HappySend',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport = {
  themeColor: '#ec4899',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="no" 
      className={cn(
        fontSans.variable, 
        dancingScript.variable, 
        pacifico.variable, 
        quicksand.variable
      )} 
      suppressHydrationWarning
    >
      <body
        className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <PWARegistration />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
