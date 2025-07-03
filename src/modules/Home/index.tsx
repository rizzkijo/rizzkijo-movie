import React from "react";
import {
  MoviesProps,
  // TopBannerMovieProps,
} from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";
import {
  // usePopularMovies,
  useTrendingMovies,
  useTopRatedMovies,
  useNowPlayingMovies,
} from "@/src/hooks/movieHooks";
import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
import CustomCarousel from "@/src/commons/CustomCarousel";
// import MainBanner from "./components/MainBanner";
// import MainBannerSkeleton from "./components/MainBannerSkeleton";
import HeroPoster from "./components/HeroPoster";

const Home = () => {
  // const [loadingTrending, setLoadingTrending] = useState<boolean>(true);
  // const [loadingPop, setLoadingPop] = useState<boolean>(true);
  // const [loadingTop, setLoadingTop] = useState<boolean>(true);
  // const [loadingNow, setLoadingNow] = useState<boolean>(true);

  // Get Trending Movies list, slice 5
  const {
    data: dataTrending,
    // isFetching: isFetchingTrending,
    // isPending: isPendingTrending,
    // isError: isErrorTrending,
    // error: errorTrending,
  } = useTrendingMovies('week', 5);
  
  // Get Popular Movies list, slice 5
  // const {
  //   data: dataPop,
  //   isFetching: isFetchingPop,
  //   isPending: isPendingPop,
  //   isError: isErrorPop,
  //   error: errorPop,
  // } = usePopularMovies(1, 5);

  // Get Top Rated Movies list, slice 8
  const {
    data: dataTop,
    isFetching: isFetchingTop,
    isPending: isPendingTop,
    isError: isErrorTop,
    error: errorTop,
  } = useTopRatedMovies(1, 8);

  // Get Now Playing Movies list, slice 8
  const {
    data: dataNow,
    isFetching: isFetchingNow,
    isPending: isPendingNow,
    isError: isErrorNow,
    error: errorNow,
  } = useNowPlayingMovies(1, 8);

  return (
    <div className="flex flex-col gap-6 md:gap-10 items-start w-full">
      {/* <CustomCarousel<TopBannerMovieProps>
        key={dataPop?.results?.length}
        autoPlay
        data={dataPop?.results}
        numRows={1}
        tabletRows={1}
        mobileRows={1}
        gap={0}
        infinite
        isError={isErrorPop || dataPop?.results?.success === false}
        loading={isFetchingPop || isPendingPop}
        errorMessage={errorPop?.message || dataPop?.results?.status_message}
        renderItem={({ item }) => (
          <MainBanner data={item} />
        )}
        skeleton={<MainBannerSkeleton />}
      /> */}

      <HeroPoster
        data={dataTrending?.results}
        transitionDuration={5000}
      />

      <div className="container mx-auto -mt-[10%] relative z-1">
        <CustomCarousel<MoviesProps>
          key={dataNow?.results?.length}
          data={dataNow?.results}
          title="Now Playing"
          gap={16}
          isError={isErrorNow || dataNow?.results?.success === false}
          loading={isFetchingNow || isPendingNow}
          errorMessage={errorNow?.message || dataNow?.results?.status_message}
          viewAllLink="/movie/nowplaying"
          renderItem={({ item }) => <MovieCard data={item} />}
          skeleton={<MovieCardSkeleton />}
        />
      </div>

      <div className="container mx-auto">
        <CustomCarousel<MoviesProps>
          key={dataTop?.results?.length}
          data={dataTop?.results}
          title="Top Rated"
          gap={16}
          isError={isErrorTop || dataTop?.results?.success === false}
          loading={isFetchingTop || isPendingTop}
          errorMessage={errorTop?.message || dataTop?.results?.status_message}
          viewAllLink="/movie/toprated"
          autoPlay
          renderItem={({ item }) => <MovieCard data={item} />}
          skeleton={<MovieCardSkeleton />}
        />
      </div>
    </div>
  );
};

export default Home;
