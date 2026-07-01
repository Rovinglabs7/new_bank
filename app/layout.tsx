import type { Metadata } from "next";
import { site } from "@/config/site";
import { AmbientMusicToggle } from "@/components/site/AmbientMusicToggle";
import { MockModeBanner } from "@/components/site/MockModeBanner";
import { CookieBanner } from "@/components/site/CookieBanner";
import { RAMP_STYLESHEETS } from "@/lib/ramp-sections.manifest";
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
      <head>
        {RAMP_STYLESHEETS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        />
      </head>
      <body>
        {children}
        <AmbientMusicToggle />
        <MockModeBanner />
        <CookieBanner />
      </body>
    </html>
  );
}
