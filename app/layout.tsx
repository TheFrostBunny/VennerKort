import type { Metadata } from "next";
import { Figtree, Dancing_Script, Pacifico, Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from '@/lib/i18n/i18n-context';

const fontSans = Figtree({ subsets: ['latin'], variable: '--font-sans' });
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing-script' });
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico' });
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' });

export const metadata: Metadata = {
  title: "HappySend",
  description: "Send physical cards with ease.",
    generator: 'v0.app',
    icons: {
      icon: '/logo.png',
    },
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
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
