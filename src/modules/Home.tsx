import React from "react";
import { MoviesProps } from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";
import { useTopRatedMovies, useNowPlayingMovies } from "@/src/commons/movieApis";
import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Home = () => {
  // Get Top Rated Movies list, slice 5
  const {
    data: dataTop,
    isFetching: isFetchingTop,
    isPending: isPendingTop,
    isError: isErrorTop,
    error: errorTop,
  } = useTopRatedMovies(['popular'], 5);

  // Get Now Playing Movies list, slice 5
  const {
    data: dataNow,
    isFetching: isFetchingNow,
    isPending: isPendingNow,
    isError: isErrorNow,
    error: errorNow,
  } = useNowPlayingMovies(['nowplaying'], 5);

  return (
    <div className="flex flex-col gap-6 md:gap-10 items-start w-full max-w-container px-4 mx-auto">
      <div className="w-full">
        <div className="flex items-baseline justify-between gap-4 mb-2 md:mb-4">
          <h1 className="text-2xl font-bold md:text-3xl">Now Playing</h1>
          <Link href="/movie/nowplaying" className="flex items-center gap-2">
            <span>View All</span>
            <ChevronRight size={18} />
          </Link>
        </div>
        <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(isPendingNow || isFetchingNow)
            ? (
              Array.from({ length: 5 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            ) : (
              dataNow?.results?.map((item: MoviesProps, index: number) => <MovieCard key={item.id} priority={index === 0 || index === 1} data={item} />)
            )}
          
          {(isErrorNow || dataNow?.results?.success === false) && <p className="text-base font-medium text-black/50">{errorNow?.message || dataNow?.results?.status_message}</p>}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-baseline justify-between gap-4 mb-2 md:mb-4">
          <h1 className="text-2xl font-bold md:text-3xl">Top Rated</h1>
          <Link href="/movie/toprated" className="flex items-center gap-2">
            <span>View All</span>
            <ChevronRight size={18} />
          </Link>
        </div>
        <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(isPendingTop || isFetchingTop)
            ? (
              Array.from({ length: 5 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            ) : (
              dataTop?.results?.map((item: MoviesProps) => <MovieCard key={item.id} data={item} />)
            )}

          {(isErrorTop || dataTop?.results?.success === false) && <p className="text-base font-medium text-black/50">{errorTop?.message || dataTop?.results?.status_message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
