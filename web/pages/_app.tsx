import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${inter.className} bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 flex flex-col min-h-screen`}
    >
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
