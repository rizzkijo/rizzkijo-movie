import { useQuery } from "@tanstack/react-query";

import { fetchDetailMovie } from "../requests/detail";

export const useDetailMovie = (id: string) => {
  return useQuery({
    queryKey: ['detail', id],
    queryFn: () => fetchDetailMovie(id),
  });
};
