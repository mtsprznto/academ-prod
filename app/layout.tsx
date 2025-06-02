import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { AppSidebar } from "./(routes)/(root)/components";
import { Navbar, Footer } from "@/components/Shared";
import { Toaster } from "@/components/ui/sonner"


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academ.",
  description: "Academia desc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${spaceGrotesk.className} antialiased`}>
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full bg-stone-100 flex flex-col min-h-screen">
              <Navbar></Navbar>
              <main className="flex-1">{children}</main>
              <Toaster />
              <Footer></Footer>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
