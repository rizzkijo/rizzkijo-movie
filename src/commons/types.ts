export type MoviesProps = {
  adult: boolean;
  id: number;
  original_title: string;
  original_language: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type MovieCardProps = {
  priority?: boolean;
  data: MoviesProps;
}

export type DetailMovieProps = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type TopBannerMovieProps = {
  bannerImage: string;
  originalTitle?: string;
  releaseDate?: string;
  tagline?: string;
  title: string;
  voteAverage: number;
  voteCount: number;
};

export type SearchComponentProps = {
  className?: string;
  placeholder?: string; 
  searchValue?: string;
  isMobile?: boolean;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}

export type FetchOptionsProps = {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  }
}

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
