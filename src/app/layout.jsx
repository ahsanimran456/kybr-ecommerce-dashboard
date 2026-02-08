import "./globals.css";

export const metadata = {
  title: "Kybr Admin - E-Commerce Dashboard",
  description: "Dubai-based E-Commerce Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
