import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Libera Orders",
  description: "Orders overview"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={cn("bg-background text-foreground")}>{children}</body>
    </html>
  );
}
