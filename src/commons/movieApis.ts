import { useQuery } from "@tanstack/react-query";

const usePopularMovies = (
  queryKey: string[],
  slice?: number | undefined,
  page: number = 1,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/popularMovies?page=${page}`);
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
  slice?: number | undefined,
  page: number = 1,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/nowPlayingMovies?page=${page}`);
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
  slice?: number | undefined,
  page: number = 1,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/topRatedMovies?page=${page}`);
      return res.json();
    },
    select: (data) => ({
      ...data,
      results: slice ? data.results.slice(0, slice) : data.results,
    }),
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
