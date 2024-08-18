import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/Navigation/Navigation";
import Footer from "./_components/Footer/Footer";
import { ContextProviders } from "./ContextProviders";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Haven | Eco-friendly store",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col bg-gray-100"}>
        <React.StrictMode>
          <ContextProviders>
            <Navigation />
            <main className="w-full flex-1">
              <div className="mx-auto max-w-6xl px-2 *:min-h-[70vh]">
                {children}
              </div>
              <Footer />
            </main>
          </ContextProviders>
        </React.StrictMode>
      </body>
    </html>
  );
}
