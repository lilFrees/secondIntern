import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/Navigation/Navigation";
import { ContextProviders } from "./ContextProviders";
import Footer from "./_components/Footer/Footer";

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
        <ContextProviders>
          <Navigation />
          <main className="mx-auto w-full max-w-6xl flex-1 px-2 *:min-h-[70vh]">
            {children}
          </main>
          <Footer />
        </ContextProviders>
        <script
          async
          src="https://unpkg.com/react-yandex-maps/dist/production/react-yandex-maps.umd.js"
        ></script>
      </body>
    </html>
  );
}
