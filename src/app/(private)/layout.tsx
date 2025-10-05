import "@/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "System dla rezerwacji wizyt online - Book App",
  description: "Najlepszy system rezerwacji wizyt dla twojej firmy usługowej",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="relative flex-grow">{children}</main>;
}
