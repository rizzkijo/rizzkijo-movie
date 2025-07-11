import { useQuery } from "@tanstack/react-query";

import { fetchTrending } from "../requests/trending";

export const useTrendingMovies = (time: 'day' | 'week', slice: number = 0) => {
  return useQuery({
    queryKey: ['trending', time, slice],
    queryFn: () => fetchTrending(time, slice),
  });
};
