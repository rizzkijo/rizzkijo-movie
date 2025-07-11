export const fetchSearchMovies = async (query: string, page: number = 1) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/searchMovies?query=${query}&page=${page}`);
  const data = await res.json();
  return data;
};
