import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { AgentationDevTool } from "./agentation-dev-tool";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "mnx-dsgn-test",
  description: "Prototype flows workspace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans bg-background text-foreground antialiased">
        {children}
        <AgentationDevTool />
      </body>
    </html>
  );
}
