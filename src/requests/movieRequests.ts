export const fetchTrendingMovie = async (time: 'day' | 'week', slice: number = 0) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trendingMovies?time=${time}`);
  const data = await res.json();
  return {
    ...data,
    results: slice ? data.results.slice(0, slice) : data.results,
  };
};

export const fetchPopular = async (page: number = 1, slice: number = 0) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/popularMovies?page=${page}`);
  const data = await res.json();
  return {
    ...data,
    results: slice ? data.results.slice(0, slice) : data.results,
  };
};

export const fetchTopRated = async (page: number = 1, slice: number = 0) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topRatedMovies?page=${page}`);
  const data = await res.json();
  return {
    ...data,
    results: slice ? data.results.slice(0, slice) : data.results,
  };
};

export const fetchNowPlaying = async (page: number = 1, slice: number = 0) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nowPlayingMovies?page=${page}`);
  const data = await res.json();
  return {
    ...data,
    results: slice ? data.results.slice(0, slice) : data.results,
  };
};

export const fetchSearchMovies = async (query: string, page: number = 1) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/searchMovies?query=${query}&page=${page}`);
  const data = await res.json();
  return data;
};

export const fetchDetailMovie = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/detailMovie?id=${id}`);
  const data = await res.json();
  return data;
};
