// src/contexts/MovieDetailContext.tsx
import { createContext, useContext } from 'react';
import { DetailMovieProps } from '@/src/commons/types';
import { useMovieDetail } from '@/src/commons/movieApis';

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
  const context = useContext(MovieDetailContext);
  if (!context) throw new Error('useMovieDetailContext must be used within a MovieDetailProvider');
  return context;
};

export const MovieDetailProvider = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { data, isFetching, isPending, isError, error } = useMovieDetail([id], id);

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
      {children}
    </MovieDetailContext.Provider>
  );
};
