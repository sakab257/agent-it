import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AgentProvider } from "@/lib/agent-context";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opti'Match - Recommandations d'équipements IT intelligentes",
  description: "Votre assistant IA pour trouver les équipements IT parfaitement adaptés à vos besoins professionnels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script src="https://js.puter.com/v2/" async defer></script>
        <ThemeProvider>
          <AgentProvider>
            {children}
          </AgentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
