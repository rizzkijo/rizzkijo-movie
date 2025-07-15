import { useState } from "react";
import { useRouter } from "next/router";
import { Poppins, Monoton, Rubik_Wet_Paint } from "next/font/google";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";

import Header from "@/src/components/Header";
import { cn } from "@/lib/utils";

import type { AppProps } from "next/app";

import "@/styles/globals.css";
import Footer from "@/src/components/Footer";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const monoton = Monoton({
  variable: "--font-monoton",
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const rubik = Rubik_Wet_Paint({
  variable: "--font-rubik",
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const searchValue = Array.isArray(router?.query?.query)
    ? router?.query?.query[0]
    : router?.query?.query || "";

  // const queryClient = new QueryClient();
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 120_000,
        },
      },
    }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <main className={cn(
          isHome ? "pt-0" : "pt-[70px] md:pt-[104]",
          `${poppins.className} ${monoton.variable} ${rubik.variable} flex flex-col min-h-svh`
        )}>
          <Header searchValue={searchValue} />
          <Component {...pageProps} />
          <Footer />
        </main>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
