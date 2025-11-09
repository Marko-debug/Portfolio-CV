// frontend/app/layout.tsx

"use client";

// import type { Metadata } from "next";
import "./globals.css";
import "./../i18n"; 
import { AuthProvider } from "@/context/AuthContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
            <head>
        <link rel="icon" href="/favicon3.png" type="image/png" />
      </head>
      <body className="bg-gray-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
