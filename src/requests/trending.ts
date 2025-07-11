export const fetchTrending = async (time: 'day' | 'week', slice: number = 0) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trendingMovies?time=${time}`);
  const data = await res.json();
  return {
    ...data,
    results: slice ? data.results.slice(0, slice) : data.results,
  };
};
