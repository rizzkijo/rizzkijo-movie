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
  showDetails?: boolean;
  indexNo?: undefined | number;
  boxShadow?: boolean;
}

export type GenresProps = {
  id: number;
  name: string;
}

export type ProductionCompaniesProps = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export type ProductionCountriesProps = {
  iso_3166_1: string;
  name: string;
}

export type SpokenLanguagesProps = {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type DetailMovieProps = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: GenresProps[];
  id: number;
  message?: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  production_companies: ProductionCompaniesProps[];
  production_countries: ProductionCountriesProps[]; 
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesProps[];
  status: string;
  status_message?: string;
  success?: boolean;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type TopBannerMovieProps = {
  backdrop_path: string;
  genres: GenresProps[];
  original_title?: string;
  original_language?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  runtime: number;
  tagline?: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type MainBannerProps = {
  data: TopBannerMovieProps;
}

export type DetailInfoMovieProps = {
  budget: number;
  overview: string;
  production_companies: ProductionCompaniesProps[];
  production_countries: ProductionCountriesProps[];
  revenue: number;
  spoken_languages: SpokenLanguagesProps[];
  status: string;
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
  delta?: number;
  onPageChange: (page: number) => void;
}

export type CustomCarouselProps<T> = {
  autoPlay?: boolean;
  data: T[];
  errorMessage: string;
  gap?: number;
  infinite?: boolean;
  isError: boolean;
  loading?: boolean;
  mobileRows?: number;
  numRows?: number;
  renderItem: (params: { item: T; index: number }) => React.ReactNode;
  skeleton?: React.ReactNode;
  tabletRows?: number;
  title?: string;
  viewAllLink?: string;
}

export type BigPosterProps = {
  data: TopBannerMovieProps[];
  transitionDuration: number;
}
