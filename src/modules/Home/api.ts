import { useQuery } from "@tanstack/react-query";
import { FetchOptionsProps } from "@/src/commons/types";

const usePopularMovies = (
  queryKey: string[],
  fetchOptions: FetchOptionsProps,
  slice?: number | undefined,
  page: number = 1,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, fetchOptions);
      return res.json();
    },
    select: (data) => ({
      ...data,
      results: slice ? data.results.slice(0, slice) : data.results,
    }),
  });
};

const useNowPlayingMovies = (
  queryKey: string[],
  fetchOptions: FetchOptionsProps,
  slice?: number | undefined,
  page: number = 1,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${page}`, fetchOptions);
      return res.json();
    },
    select: (data) => ({
      ...data,
      results: slice ? data.results.slice(0, slice) : data.results,
    }),
  });
};

const useTopRatedMovies = (
  queryKey: string[],
  fetchOptions: FetchOptionsProps,
  slice?: number | undefined,
  page: number = 1,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`, fetchOptions);
      return res.json();
    },
    select: (data) => ({
      ...data,
      results: slice ? data.results.slice(0, slice) : data.results,
    }),
  });
};

export {
  usePopularMovies,
  useNowPlayingMovies,
  useTopRatedMovies,
};
