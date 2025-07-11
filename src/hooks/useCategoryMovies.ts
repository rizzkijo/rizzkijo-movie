import { useQuery } from "@tanstack/react-query";
import { fetchCategoryMovies } from "../requests/category";

export const useCategoryMovies = (category: string, page: number = 1, slice: number = 0) => {
  return useQuery({
    queryKey: [category, page, slice],
    queryFn: () => fetchCategoryMovies(category, page, slice),
    enabled: Boolean(category),
  });
}; 