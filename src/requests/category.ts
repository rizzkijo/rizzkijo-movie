export const fetchCategoryMovies = async (category: string, page: number = 1, slice: number = 0) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categoryMovies?category=${category}&page=${page}`);
  const data = await res.json();
  return {
    ...data,
    results: slice ? data.results.slice(0, slice) : data.results,
  };
}; 