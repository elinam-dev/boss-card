import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Ing. Godwin Asamoah | Technical Director, Flowitec",
  description:
    "Connect with Ing. Godwin Asamoah, Technical Director at Flowitec. Pumps, valves, electric motors, actuators, controls and spares across Africa. Solving rotating and static engineering problems to reduce downtime.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A1530",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className={`${inter.className} ${sora.variable} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
