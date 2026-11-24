import type { Metadata } from "next";
import { Footer, Header } from "@/components/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "IT Self-Service | Regent College London", template: "%s | Regent College London IT" },
  description: "Regent College London IT support, software and password management.",
  icons: {
    icon: [
      { url: "/favicon/rcl-favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/rcl-favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicon/rcl-favicon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body className="flex min-h-dvh flex-col">
    <Header />
    <main id="main" className="grow">{children}</main>
    <Footer />
  </body></html>;
}
