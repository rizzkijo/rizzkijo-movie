import { useQuery } from "@tanstack/react-query";
import { fetchPopular, fetchTopRated, fetchNowPlaying } from "../requests/movieRequests";

const usePopularMovies = (page:number = 1, slice: number = 0) => {
  return useQuery({
    queryKey: ['popular', page, slice],
    queryFn: () => fetchPopular(page, slice),
  });
};

const useNowPlayingMovies = (page = 1, slice: number = 0) => {
  return useQuery({
    queryKey: ['nowplaying', page, slice],
    queryFn: () => fetchNowPlaying(page, slice),
  });
};

const useTopRatedMovies = (page = 1, slice: number = 0) => {
  return useQuery({
    queryKey: ['toprated', page, slice],
    queryFn: () => fetchTopRated(page, slice),
  });
};

const useSearchMovies = (
  query: string,
  page: number | string = 1,
  queryKey: string[],
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/searchMovies?query=${query}&include_adult=false&page=${page}`);
      return res.json();
    },
    select: (data) => ({
      ...data,
      results: data.results,
    }),
  });
};

const useMovieDetail = (
  queryKey: string[],
  id: string,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/detailMovie/${id}`);
      return res.json();
    },
  });
};

export {
  usePopularMovies,
  useNowPlayingMovies,
  useTopRatedMovies,
  useSearchMovies,
  useMovieDetail,
};
