import React from "react";
import { useQuery } from "@tanstack/react-query";
import { moviesProps } from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";

const Home = () => {
  const accessToken = process.env.NEXT_PUBLIC_TMDB_ACESS_TOKEN;
  const fetchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
  const { data, isFetching, isPending, isError, error } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', fetchOptions);
      
      return res.json();
    },
  });

  if (isPending || isFetching) {
    return (
      <div className="flex flex-col items-center w-full max-w-container px-4 mx-auto">
        <h2 className="text-md font-medium text-black/50">Loading ...</h2>
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
    <div className="flex flex-col items-center sm:items-start w-full max-w-container px-4 mx-auto">
      <h1 className="text-4xl font-bold mb-8">Popular Movies</h1>
      <div className="grid grid-cols-5 gap-4">
        {data?.results?.map((item: moviesProps) => <MovieCard key={item.id} data={item} />)}
      </div>
    </div>
  );
};

export default Home;
