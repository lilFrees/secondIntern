import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_shared/templates/Footer";
import { ContextProviders } from "./ContextProviders";
import React from "react";
import Navigation from "./_shared/templates/Navigation";
import { Partytown } from "@builder.io/partytown/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Haven | Eco-friendly store",
  description:
    "Green Haven is an eco-friendly store that offers a wide range of products that are good for you and the planet. Shop now and make a difference!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Partytown debug={true} forward={["dataLayer.push"]} />
        <link
          rel="preconnect"
          href="https://rfxujkcyzpaqbojdznsb.supabase.co"
        />
        <link
          rel="dns-prefetch"
          href="https://rfxujkcyzpaqbojdznsb.supabase.co"
        />
      </head>
      <body className={inter.className + " flex flex-col bg-gray-100"}>
        <React.StrictMode>
          <ContextProviders>
            <Navigation />
            <main className="w-full grow pt-16 md:p-0">
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
