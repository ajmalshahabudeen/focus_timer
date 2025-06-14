import type { Metadata } from "next";
import { Poppins, Electrolize } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const electrolize = Electrolize({
  subsets: ['latin'],
  weight: '400', // Electrolize only supports 400, not 900
  display: 'swap', // Ensures fallback font is used until Electrolize loads
  variable: '--font-electrolize',
});

export const metadata: Metadata = {
  title: "Focus Timer",
  description: "Just focus on the stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${electrolize.variable} antialiased`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
