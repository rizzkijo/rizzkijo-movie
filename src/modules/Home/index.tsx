import React from "react";
import { type MoviesProps } from "@/src/types";

import { useTrendingMovies } from "@/src/hooks/useTrendingMovies";
// import { useTopRatedMovies } from "@/src/hooks/useTopRatedMovies";
// import { useNowPlayingMovies } from "@/src/hooks/useNowPlayingMovies";
import { useCategoryMovies } from "@/src/hooks/useCategoryMovies";

import MovieCard from "@/src/components/movieCard";
// import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
// import CustomCarousel from "@/src/commons/CustomCarousel";
import HeroPoster from "./components/HeroPoster";
import CustomCarousel from "@/src/components/customCarousel";

const Home = () => {
  // const [loadingTrending, setLoadingTrending] = useState<boolean>(true);
  // const [loadingPop, setLoadingPop] = useState<boolean>(true);
  // const [loadingTop, setLoadingTop] = useState<boolean>(true);
  // const [loadingNow, setLoadingNow] = useState<boolean>(true);

  // Get Now Playing Movies list, slice 5
  const {
    data: dataNow,
    // isFetching: isFetchingNow,
    // isPending: isPendingNow,
    // isError: isErrorNow,
    // error: errorNow,
  } = useCategoryMovies('now_playing', 1, 5);

  // Get Trending Movies list, slice 10
  const {
    data: dataTrending,
    // isFetching: isFetchingTrending,
    // isPending: isPendingTrending,
    // isError: isErrorTrending,
    // error: errorTrending,
  } = useTrendingMovies('day', 10);

  // Get Top Rated Movies list, slice 10
  const {
    data: dataTop,
    // isFetching: isFetchingTop,
    // isPending: isPendingTop,
    // isError: isErrorTop,
    // error: errorTop,
  } = useCategoryMovies('top_rated', 1, 10);

  // Get Now Playing Movies list, slice 5
  const {
    data: dataUp,
    // isFetching: isFetchingUp,
    // isPending: isPendingUp,
    // isError: isErrorUp,
    // error: errorUp,
  } = useCategoryMovies('upcoming', 1, 5);

  return (
    <div className="flex flex-col items-start w-full">
      <HeroPoster
        data={dataNow?.results}
        transitionDuration={7000}
      />

      <section className="container mx-auto relative z-1 -mt-[60px]">
        <CustomCarousel<MoviesProps>
          title="Trending Now"
          data={dataTrending?.results}
          renderItem={({ item, index }) => <MovieCard data={item} indexNo={index} priority={index <= 4} />}
          autoPlay
        />
      </section>

      <section className="w-full relative mt-12 bg-foreground/5 pt-11 pb-12">
        <div className="container mx-auto">
          <CustomCarousel<MoviesProps>
            title="Top Rated"
            viewAllLink="/movie/top_rated"
            data={dataTop?.results}
            renderItem={({ item }) => <MovieCard data={item} showDetails />}
          />
        </div>
      </section>

      <section className="container mx-auto relative mt-12">
        <CustomCarousel<MoviesProps>
          title="Upcoming"
          viewAllLink="/movie/upcoming"
          data={dataUp?.results}
          renderItem={({ item }) => <MovieCard data={item} showDetails />}
        />
      </section>
    </div>
  );
};

export default Home;
