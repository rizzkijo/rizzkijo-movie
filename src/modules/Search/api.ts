import { useQuery } from "@tanstack/react-query";
import { FetchOptionsProps } from "@/src/commons/types";

const useSearchMovies = (
  query: string,
  queryKey: string[],
  fetchOptions: FetchOptionsProps,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&page=1`, fetchOptions);
      return res.json();
    },
  });
};

export default useSearchMovies;
