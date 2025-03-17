import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import Header from "@/src/commons/Header";
import Footer from "@/src/commons/Footer";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const searchValue = Array.isArray(router?.query?.query)
    ? router?.query?.query[0]
    : router?.query?.query || "";
    
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${poppins.className} flex flex-col pt-[84px] min-h-svh`}>
        <Header searchValue={searchValue} />
        <div className="pb-[32px]">
          <Component {...pageProps} />
        </div>
        <Footer />
      </main>
    </QueryClientProvider>
  );
};
