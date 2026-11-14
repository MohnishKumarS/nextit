import type { Metadata } from "next";
import { Footer, Header } from "@/components/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "IT Self-Service | Regent College London", template: "%s | Regent College London IT" },
  description: "Regent College London IT support, software and password management.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body className="flex min-h-dvh flex-col">
    <Header />
    <main id="main" className="grow">{children}</main>
    <Footer />
  </body></html>;
}
