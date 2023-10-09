import { Hanken_Grotesk as HankenGrotesk } from "next/font/google";

import { cn } from "~/lib/cn";

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
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='1985' height='1313' viewBox='0 0 1985 1313' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_110_133)'%3E%3Crect width='1985' height='1313' fill='%23334155' /%3E%3Cellipse cx='1698.33' cy='1162.83' rx='1374.33' ry='1129.9' transform='rotate(99.7506 1698.33 1162.83)' fill='url(%23paint0_radial_110_133)' fill-opacity='0.5' /%3E%3Cellipse cx='164.491' cy='316.27' rx='1232.31' ry='1037.78' transform='rotate(99.7506 164.491 316.27)' fill='url(%23paint1_radial_110_133)' fill-opacity='0.3' /%3E%3Cellipse cx='725.436' cy='1105' rx='1146.86' ry='1102.89' transform='rotate(-170.864 725.436 1105)' fill='url(%23paint2_radial_110_133)' fill-opacity='0.4' /%3E%3Cellipse cx='1431.97' cy='340.131' rx='1146.86' ry='997.549' transform='rotate(-147.816 1431.97 340.131)' fill='url(%23paint3_radial_110_133)' fill-opacity='0.5' /%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_110_133' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(1698.33 1162.83) rotate(90) scale(1129.9 1374.33)'%3E%3Cstop stop-color='%239F1239' /%3E%3Cstop offset='1' stop-color='%239F1239' stop-opacity='0' /%3E%3C/radialGradient%3E%3CradialGradient id='paint1_radial_110_133' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(164.491 316.27) rotate(90) scale(1037.78 1232.31)'%3E%3Cstop stop-color='%2392400E' /%3E%3Cstop offset='1' stop-color='%2392400E' stop-opacity='0' /%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_110_133' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(725.436 1105) rotate(90) scale(1102.89 1146.86)'%3E%3Cstop stop-color='%235B21B6' /%3E%3Cstop offset='1' stop-color='%235B21B6' stop-opacity='0' /%3E%3C/radialGradient%3E%3CradialGradient id='paint3_radial_110_133' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(1431.97 340.131) rotate(90) scale(997.549 1146.86)'%3E%3Cstop stop-color='%231E40AF' /%3E%3Cstop offset='1' stop-color='%231E40AF' stop-opacity='0' /%3E%3C/radialGradient%3E%3CclipPath id='clip0_110_133'%3E%3Crect width='1985' height='1313' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A\")",
        }}
      >
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  themeColor: "#334155",
};
