import React from "react";
// import { useQuery } from "@tanstack/react-query";
import { MoviesProps } from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";
import usePopularMovies from "./api";
import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";

const Home = () => {
  const accessToken = process.env.NEXT_PUBLIC_TMDB_ACESS_TOKEN;
  const { data, isFetching, isPending, isError, error } = usePopularMovies(['movies'], {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (isPending || isFetching) {
    return (
      <div className="flex flex-col items-start w-full max-w-container px-4 mx-auto">
        <h1 className="text-2xl font-bold mb-4 md:text-4xl md:mb-8">Popular Movies</h1>
        <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || data?.success === false) {
    return (
      <div className="flex flex-col items-center w-full max-w-container px-4 mx-auto">
        <h2 className="text-md font-medium text-black/50">{error?.message || data?.status_message}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full max-w-container px-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4 md:text-4xl md:mb-8">Popular Movies</h1>
      <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.results?.map((item: MoviesProps) => <MovieCard key={item.id} data={item} />)}
      </div>
    </div>
  );
};

export default Home;
