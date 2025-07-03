import { useQuery } from "@tanstack/react-query";
import {
  fetchTrendingMovie,
  fetchPopular,
  fetchTopRated,
  fetchNowPlaying,
  fetchSearchMovies,
  fetchDetailMovie,
} from "../requests/movieRequests";

const useTrendingMovies = (time: 'day' | 'week', slice: number = 0) => {
  return useQuery({
    queryKey: ['trending', time, slice],
    queryFn: () => fetchTrendingMovie(time, slice),
  });
};

const usePopularMovies = (page:number = 1, slice: number = 0) => {
  return useQuery({
    queryKey: ['popular', page, slice],
    queryFn: () => fetchPopular(page, slice),
  });
};

const useNowPlayingMovies = (page:number  = 1, slice: number = 0) => {
  return useQuery({
    queryKey: ['nowplaying', page, slice],
    queryFn: () => fetchNowPlaying(page, slice),
  });
};

const useTopRatedMovies = (page:number  = 1, slice: number = 0) => {
  return useQuery({
    queryKey: ['toprated', page, slice],
    queryFn: () => fetchTopRated(page, slice),
  });
};

const useSearchMovies = (query: string, page:number = 1) => {
  return useQuery({
    queryKey: ['search', page],
    queryFn: () => fetchSearchMovies(query, page),
  });
};

const useMovieDetail = (id: string) => {
  return useQuery({
    queryKey: ['detail', id],
    queryFn: () => fetchDetailMovie(id),
  });
};

export {
  useTrendingMovies,
  usePopularMovies,
  useNowPlayingMovies,
  useTopRatedMovies,
  useSearchMovies,
  useMovieDetail,
};
