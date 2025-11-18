import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AgentProvider } from "@/lib/agent-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent IT - Recommandations d'équipements intelligentes",
  description: "Agent intelligent pour recommander des équipements IT adaptés à vos besoins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script src="https://js.puter.com/v2/" async defer></script>
        <AgentProvider>
          {children}
        </AgentProvider>
      </body>
    </html>
  );
}
