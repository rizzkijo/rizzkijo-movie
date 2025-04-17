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
