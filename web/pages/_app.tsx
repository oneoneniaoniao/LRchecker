// pages/_app.tsx
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${inter.className} bg-white text-gray-900 flex flex-col min-h-screen`}
    >
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
