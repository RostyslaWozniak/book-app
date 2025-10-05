import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/shadcn-ui/sonner";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "System dla rezerwacji wizyt online - Book App",
  description: "Najlepszy system rezerwacji wizyt dla twojej firmy usługowej",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen w-screen flex-col overflow-x-hidden pb-20 md:pb-0">
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
