// frontend/app/layout.tsx

"use client";

// import type { Metadata } from "next";
import "./globals.css";
import "./../i18n"; 
import { AuthProvider } from "@/context/AuthContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
