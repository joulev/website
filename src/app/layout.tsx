import { Hanken_Grotesk as HankenGrotesk } from "next/font/google";

import { cn } from "~/lib/cn";

import "./globals.css";

const font = HankenGrotesk({ subsets: ["latin"], variable: "--font" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(font.variable, "bg-[#123456] font-sans text-text-primary")}
        // style={{
        //   backgroundImage:
        //     "url('https://images.unsplash.com/photo-1682685797736-dabb341dc7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')",
        // }}
      >
        {children}
      </body>
    </html>
  );
}
