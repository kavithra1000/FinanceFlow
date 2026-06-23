import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata : Metadata = {
  title: "Bank Statement to Excel Converter | FinanceFlow",
  description:
    "Convert PDF bank statements into clean Excel or CSV files instantly. Supports multiple banks. Secure and fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className="font-sans antialiased scroll-smooth"
        >
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
