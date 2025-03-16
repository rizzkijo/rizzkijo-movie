import { useQuery } from "@tanstack/react-query";
import { FetchOptionsProps } from "@/src/commons/types";

const usePopularMovies = (
  queryKey: string[],
  fetchOptions: FetchOptionsProps,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', fetchOptions);
      return res.json();
    },
  });
};

export default usePopularMovies;
