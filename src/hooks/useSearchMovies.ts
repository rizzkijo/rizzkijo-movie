import { useQuery } from "@tanstack/react-query";

import { fetchSearchMovies } from "../requests/search";

export const useSearchMovies = (query: string, page:number = 1) => {
  return useQuery({
    queryKey: ['search', page],
    queryFn: () => fetchSearchMovies(query, page),
  });
};
