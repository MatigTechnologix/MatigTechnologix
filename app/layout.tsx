import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "MATIG Technologix | B2B Growth Partners", template: "%s | MATIG Technologix" },
  description: "Precision outreach, research and digital services for ambitious B2B teams.",
  keywords: ["B2B lead generation", "LinkedIn outreach", "prospect research", "digital marketing"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
