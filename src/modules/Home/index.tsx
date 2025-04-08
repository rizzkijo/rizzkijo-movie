import React from "react";
import { MoviesProps, TopBannerMovieProps } from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";
import { usePopularMovies, useTopRatedMovies, useNowPlayingMovies } from "@/src/commons/movieApis";
import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
import CustomCarousel from "@/src/commons/CustomCarousel";
import MainBanner from "./components/MainBanner";

const Home = () => {
  // Get Popular Movies list, slice 5
  const {
    data: dataPop,
    isFetching: isFetchingPop,
    isPending: isPendingPop,
    isError: isErrorPop,
    error: errorPop,
  } = usePopularMovies(['popular'], 5);

  // Get Top Rated Movies list, slice 8
  const {
    data: dataTop,
    isFetching: isFetchingTop,
    isPending: isPendingTop,
    isError: isErrorTop,
    error: errorTop,
  } = useTopRatedMovies(['toprated'], 8);

  // Get Now Playing Movies list, slice 8
  const {
    data: dataNow,
    isFetching: isFetchingNow,
    isPending: isPendingNow,
    isError: isErrorNow,
    error: errorNow,
  } = useNowPlayingMovies(['nowplaying'], 8);

  return (
    <div className="flex flex-col gap-6 md:gap-10 items-start w-full max-w-container px-4 mx-auto">
      <div className="w-full">
        {dataPop && (
          <CustomCarousel
            key={dataPop?.results?.length}
            numRows={1}
            tabletRows={1}
            mobileRows={1}
            gap={0}
            infinite
            isError={isErrorPop || dataPop?.results?.success === false}
            errorMessage={errorPop?.message || dataPop?.results?.status_message}
          >
            {(isPendingPop || isFetchingPop)
              ? <MovieCardSkeleton />
              : (
                dataPop?.results?.map((item: TopBannerMovieProps) => <MainBanner key={item.title} data={item} />)
              )}
          </CustomCarousel>
        )}
      </div>

      {dataNow && (
        <CustomCarousel
          key={dataNow?.results?.length}
          title="Now Playing"
          gap={16}
          isError={isErrorNow || dataNow?.results?.success === false}
          errorMessage={errorNow?.message || dataNow?.results?.status_message}
          viewAllLink="/movie/nowplaying"
        >
          {(isPendingNow || isFetchingNow)
            ? (
              Array.from({ length: 5 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            ) : (
              dataNow?.results?.map((item: MoviesProps, index: number) => <MovieCard key={item.id} priority={index === 0 || index === 1} data={item} />)
            )}
        </CustomCarousel>
      )}

      {dataTop && (
        <CustomCarousel
          key={dataTop?.results?.length}
          title="Top Rated"
          gap={16}
          isError={isErrorTop || dataTop?.results?.success === false}
          errorMessage={errorTop?.message || dataTop?.results?.status_message}
          viewAllLink="/movie/toprated"
          autoPlay
        >
          {(isPendingTop || isFetchingTop)
            ? (
              Array.from({ length: 5 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            ) : (
              dataTop?.results?.map((item: MoviesProps, index: number) => <MovieCard key={item.id} priority={index === 0 || index === 1} data={item} />)
            )}
        </CustomCarousel>
      )}
    </div>
  );
};

export default Home;
