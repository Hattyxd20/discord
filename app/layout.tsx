import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord",
  description: "Create your custom servers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
           <body className={inter.className}>
             <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               enableSystem={false}
               storageKey="discod-theme"
             >
               <SocketProvider>
                  <ModalProvider/>
                  <QueryProvider>
                     {children}
                  </QueryProvider>
               </SocketProvider>
             </ThemeProvider>
           </body>
        </html>
     </ClerkProvider>
  );
}