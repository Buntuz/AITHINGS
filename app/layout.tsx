//https://www.youtube.com/watch?v=Ahwoks_dawU
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";  //
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
//Initialize and set weights and other
const IBM_Plex = IBM_Plex_Sans({ 
    subsets: ["latin"],
    weight: ['400', '500', '600', '700'],
    variable: '--font-ibm-plex'
  });

export const metadata: Metadata = {
  title: "Imagination",
  description: "AI-powered image generator",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    
    <html lang="en">
      <body className={cn("font-IBM_Plex antialiased", IBM_Plex.variable)}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
   
  );
}
