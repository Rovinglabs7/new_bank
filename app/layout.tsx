import type { Metadata } from "next";
import { site } from "@/config/site";
import { AmbientMusicToggle } from "@/components/site/AmbientMusicToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AmbientMusicToggle />
      </body>
    </html>
  );
}
