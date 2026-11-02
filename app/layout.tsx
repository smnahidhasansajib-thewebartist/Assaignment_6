import type { Metadata } from "next";
import "./globals.css";
import { PlanProvider } from "@/components/plan-provider";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "A dark, no-nonsense gym companion. Pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </PlanProvider>
      </body>
    </html>
  );
}
