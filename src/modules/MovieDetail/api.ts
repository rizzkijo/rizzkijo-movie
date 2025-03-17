import { useQuery } from "@tanstack/react-query";
import { FetchOptionsProps } from "@/src/commons/types";

const useMovieDetail = (
  queryKey: string[],
  id: string,
  fetchOptions: FetchOptionsProps,
) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, fetchOptions);
      return res.json();
    },
  });
};

export default useMovieDetail;
