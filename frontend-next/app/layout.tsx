import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders",
  description: "Order management form migrated to Next.js"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={cn("min-h-screen bg-background text-foreground")}>{children}</body>
    </html>
  );
}
