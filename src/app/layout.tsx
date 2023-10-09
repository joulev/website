import { Hanken_Grotesk as HankenGrotesk } from "next/font/google";

import { cn } from "~/lib/cn";

import bg from "./background.svg";
import "./globals.css";

const font = HankenGrotesk({ subsets: ["latin"], variable: "--font" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          font.variable,
          "min-h-screen bg-cover bg-no-repeat font-sans text-text-primary",
        )}
        style={{ backgroundImage: `url(${JSON.stringify((bg as { src: string }).src)})` }}
      >
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  themeColor: "#334155",
};
