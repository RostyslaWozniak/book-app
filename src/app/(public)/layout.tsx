import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/shadcn-ui/sonner";
import { PublicHeader } from "@/components/header/public-header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";

export const metadata: Metadata = {
  title: {
    default: "System dla rezerwacji wizyt online - Book App",
    template: "%s | Book App",
  },
  description: "Najlepszy system rezerwacji wizyt dla twojej firmy usługowej",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${geist.variable}`}>
      <body className="dark flex min-h-screen flex-col">
        <Providers>
          <PublicHeader />
          <main className="flex-grow">
            {" "}
            <SectionWrapper paddingBlock="none" className="mt-4">
              <MaxWidthWrapper>
                <Breadcrumb />
              </MaxWidthWrapper>
            </SectionWrapper>
            {children}
          </main>
          <Footer />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
