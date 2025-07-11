// import React, { useEffect, useState } from "react";
import Head from 'next/head'
import { useRouter  } from "next/router";
import { CloudAlert, Frown } from "lucide-react";
import { type MoviesProps } from "../types";
import MovieCard from "../components/movieCard";
// import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
import { useSearchMovies } from "../hooks/useSearchMovies";
import Pagination from "../components/Pagination";

const SearchView = () => {
  const router = useRouter();

  const queryParam = Array.isArray(router?.query?.query) 
  ? router.query.query[0] 
  : router.query?.query ?? '';

  const page = Array.isArray(router?.query?.page) 
  ? router.query.page[0] 
  : router.query?.page ?? 1;

  // const [loading, setLoading] = useState<boolean>(true);

  const {
    data,
    isFetching,
    isPending,
    isError,
    error,
  } = useSearchMovies(queryParam, Number(page));

  const goToPage = (page: number) => {
    router.push({
      pathname: "/search",
      query: { ...router.query, page },
    });
  };

  // useEffect(() => {
  //   setLoading(true);
  //   let timeout: NodeJS.Timeout;
  
  //   if (data?.results) {
  //     timeout = setTimeout(() => setLoading(false), 500);
  //   }
  
  //   return () => clearTimeout(timeout);
  // }, [data, page]);

  // if (loading || isPending || isFetching) {
  //   return (
  //     <div className="w-full container px-4 mx-auto">
  //       <h1 className="text-xl md:text-4xl font-bold mb-1">
  //         {`Search result(s) for "${queryParam}"`}
  //       </h1>
  //       <p className="text-foreground/65 font-[600] mb-8">{`${data?.total_results || 0} result(s).`}</p>
  //       <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  //         <h1>Loading...</h1>
  //         {/* {Array.from({ length: 20 }).map((_, index) => (
  //           <MovieCardSkeleton key={index} />
  //         ))} */}
  //       </div>
  //     </div>
  //   );
  // }

  if (isError || data?.success === false) {
    return (
      <>
        <Head>
          <meta name="description" content="Temukan berbagai film terbaru, terpopuler, dan top rating dari seluruh dunia. Website ini menampilkan daftar film yang diambil langsung dari The Movie Database (TMDB) lengkap dengan poster, sinopsis, dan rating penonton." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="UTF-8" />

          <meta property="og:description" content="Temukan berbagai film terbaru, terpopuler, dan top rating dari seluruh dunia. Website ini menampilkan daftar film yang diambil langsung dari The Movie Database (TMDB) lengkap dengan poster, sinopsis, dan rating penonton." />
          <meta property="og:image" content="/assets/images/logo.svg" />
          <meta property="og:type" content="website" />
        </Head>
        <div className="w-full container px-4 pt-20 mx-auto text-center">
          <h1 className="text-xl lg:text-2xl xl:text-4xl font-bold mb-2 lg:mb-4 xl:mb-6 flex flex-col items-center gap-4">
            <span className="text-red-600"><CloudAlert size={60} /></span>
            Oops!! Something went wrong!
          </h1>
          <p className="text-foreground/65 text-sm lg:text-base font-[500]">{error?.message || data?.status_message}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="description" content="Cari film favoritmu berdasarkan judul, genre, atau popularitas. Temukan informasi lengkap mulai dari poster, sinopsis, rating, hingga tahun rilis – semua diambil langsung dari The Movie Database (TMDB)." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        <meta property="og:description" content="Cari film favoritmu berdasarkan judul, genre, atau popularitas. Temukan informasi lengkap mulai dari poster, sinopsis, rating, hingga tahun rilis – semua diambil langsung dari The Movie Database (TMDB)." />
        <meta property="og:image" content="/assets/images/logo.svg" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="flex flex-col items-start w-full container px-4 mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-3">
          {`Search result(s) for "${queryParam}"`}
        </h1>
        <p className="text-foreground/65 mb-4 md:mb-8">{`${data?.total_results} result(s). Page ${page} of ${data?.total_pages}`}</p>
        {!isPending && !isFetching && data?.results?.length > 0
          ? (
            <div className="w-full grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {data?.results?.map((item: MoviesProps, index: number) => (
                <MovieCard
                  key={item.id}
                  showDetails
                  boxShadow
                  priority={index <= 10}
                  data={item}
                />
              ))}
            </div>
          )
          : (
            <div className="text-base text-gray-500 flex gap-3 a=items-center justify-center">
              <span className="self-center text-red-600"><Frown size={22} /></span>
              <span className="self-center">Oops!! The movie you are looking for is not available.</span>
            </div>
          )}
      </div>
      <div className="mt-8">
        <Pagination currentPage={Number(page)} totalPages={data?.total_pages} delta={2} onPageChange={goToPage} />
      </div>
    </>
  );
};

export default SearchView;
