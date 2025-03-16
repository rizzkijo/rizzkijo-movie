import { useQuery } from "@tanstack/react-query";
import { FetchOptionsProps } from "@/src/commons/types";

const useSearchMovies = (
  query: string,
  page: number,
  queryKey: (string | number)[],
  fetchOptions: FetchOptionsProps,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&page=${page}`, fetchOptions);
      return res.json();
    },
  });
};

export default useSearchMovies;
