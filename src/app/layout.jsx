import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Kybr Admin - E-Commerce Dashboard",
  description: "Dubai-based E-Commerce Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50 text-neutral-900">
        <StoreProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#171717",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "14px",
              },
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
