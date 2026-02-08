import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kybr Admin - E-Commerce Dashboard",
  description: "Dubai-based E-Commerce Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
