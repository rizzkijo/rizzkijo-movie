// src/contexts/MovieDetailContext.tsx
import {
  createContext,
  // useContext, --> just use 'use' hook start from React 19, like below
  use,
} from 'react';
import { DetailMovieProps, TopBannerMovieProps, DetailInfoMovieProps } from '@/src/commons/types';
import { useMovieDetail } from '@/src/hooks/movieHooks';

type MovieDetailContextType = {
  data: DetailMovieProps | null;
  isFetching: boolean;
  isPending: boolean;
  isError: boolean;
  isLoading: boolean;
  error: null | {
    message?: null | string;
  };
};

const MovieDetailContext = createContext<MovieDetailContextType | undefined>(undefined);
export const useMovieDetailContext = () => {
  const context = use(MovieDetailContext);
  if (!context) throw new Error('useMovieDetailContext must be used within a MovieDetailProvider');
  return context;
};

const TopBannerContext = createContext<TopBannerMovieProps | undefined>(undefined);
export const useTopBanner = () => {
  const context = use(TopBannerContext);
  if (!context) throw new Error('useTopBanner must be used within a TopBannerProvider');
  return context;
};

const DetailInfoContext = createContext<DetailInfoMovieProps | undefined>(undefined);
export const useDetailInfo = () => {
  const context = use(DetailInfoContext);
  if (!context) throw new Error('useDetailInfo must be used within a DetailInfoProvider');
  return context;
};

export const MovieDetailProvider = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { data, isFetching, isPending, isError, error } = useMovieDetail(id);

  const topBannerData: TopBannerMovieProps | undefined = data
    ? {
        backdrop_path: data.backdrop_path,
        genres: data.genres,
        original_title: data.original_title,
        original_language: data.original_language,
        overview: data.overview,
        poster_path: data.poster_path,
        release_date: data.release_date,
        runtime: data.runtime,
        tagline: data.tagline,
        title: data.title,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
      }
    : undefined;

  const DetailInfoData: DetailInfoMovieProps | undefined = data
    ? {
        budget: data.budget,
        overview: data.overview,
        production_companies: data.production_companies,
        production_countries: data.production_countries,
        revenue: data.revenue,
        spoken_languages: data.spoken_languages,
        status: data.status,
      }
    : undefined;

  return (
    <MovieDetailContext.Provider
      value={{
        data,
        isFetching,
        isPending,
        isLoading: isFetching || isPending,
        isError,
        error,
      }}
    >
      <TopBannerContext.Provider value={topBannerData}>
        <DetailInfoContext.Provider value={DetailInfoData}>
          {children}
        </DetailInfoContext.Provider>
      </TopBannerContext.Provider>
    </MovieDetailContext.Provider>
  );
};
