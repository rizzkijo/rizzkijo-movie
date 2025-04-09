import React from "react";
import { MoviesProps, TopBannerMovieProps } from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";
import { usePopularMovies, useTopRatedMovies, useNowPlayingMovies } from "@/src/commons/movieApis";
import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
import CustomCarousel from "@/src/commons/CustomCarousel";
import MainBanner from "./components/MainBanner";
import MainBannerSkeleton from "./components/MainBannerSkeleton";

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
      <CustomCarousel<TopBannerMovieProps>
        key={dataPop?.results?.length}
        autoPlay
        data={dataPop?.results}
        numRows={1}
        tabletRows={1}
        mobileRows={1}
        gap={0}
        infinite
        isError={isErrorPop || dataPop?.results?.success === false}
        loading={isPendingPop || isFetchingPop}
        errorMessage={errorPop?.message || dataPop?.results?.status_message}
        renderItem={({ item }) => (
          <MainBanner data={item} />
        )}
        skeleton={<MainBannerSkeleton />}
      />

      <CustomCarousel<MoviesProps>
        key={dataNow?.results?.length}
        data={dataNow?.results}
        title="Now Playing"
        gap={16}
        isError={isErrorNow || dataNow?.results?.success === false}
        loading={isPendingNow || isFetchingNow}
        errorMessage={errorNow?.message || dataNow?.results?.status_message}
        viewAllLink="/movie/nowplaying"
        renderItem={({ item }) => <MovieCard data={item} />}
        skeleton={<MovieCardSkeleton />}
      />

      <CustomCarousel<MoviesProps>
        key={dataTop?.results?.length}
        data={dataTop?.results}
        title="Top Rated"
        gap={16}
        isError={isErrorTop || dataTop?.results?.success === false}
        loading={isPendingTop || isFetchingTop}
        errorMessage={errorTop?.message || dataTop?.results?.status_message}
        viewAllLink="/movie/toprated"
        autoPlay
        renderItem={({ item }) => <MovieCard data={item} />}
        skeleton={<MovieCardSkeleton />}
      />
    </div>
  );
};

export default Home;
