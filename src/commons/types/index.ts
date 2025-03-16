export type moviesProps = {
  adult: boolean;
  id: number;
  original_title: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export type detailMovieProps = {
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

export type SearchComponentProps = {
  className?: string;
  placeholder?: string; 
  searchValue?: string;
}