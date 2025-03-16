import React from "react";
import { useRouter  } from "next/router";
import { CloudAlert, Frown } from "lucide-react";
import { MoviesProps } from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";
import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
import useSearchMovies from "./api";

const SearchView = () => {
  const accessToken = process.env.NEXT_PUBLIC_TMDB_ACESS_TOKEN;
  const router = useRouter();
  const queryParam = Array.isArray(router.query?.query) 
  ? router.query.query[0] 
  : router.query?.query ?? '';

  const { data, isFetching, isPending, isError, error } = useSearchMovies(queryParam, [queryParam], {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (isPending || isFetching) {
    return (
      <div className="w-full max-w-container px-4 mx-auto">
        <h1 className="text-4xl font-bold mb-1">
          {`Search result(s) for "${queryParam}"`}
        </h1>
        <p className="text-neutral-500 font-[600] mb-8">{`${data?.total_results || 0} result(s).`}</p>
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
      <div className="w-full max-w-container px-4 pt-20 mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 flex flex-col items-center gap-4">
          <span className="text-red-600"><CloudAlert size={60} /></span>
          Oops!! Something went wrong!
        </h1>
        <p className="text-neutral-500 font-[500] mb-8">{error?.message || data?.status_message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full max-w-container px-4 mx-auto">
      <h1 className="text-xl md:text-4xl font-bold mb-1">
        {`Search result(s) for "${queryParam}"`}
      </h1>
      <p className="text-neutral-500 font-[600] mb-4 md:mb-8">{`${data?.total_results} result(s).`}</p>
      {!isPending && !isFetching && data?.results?.length > 0
        ? (
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data?.results?.map((item: MoviesProps) => <MovieCard key={item.id} data={item} />)}
          </div>
        )
        : (
          <div className="text-md text-gray-500 flex gap-3 a=items-center justify-center">
            <span className="self-center text-red-600"><Frown size={22} /></span>
            <span className="self-center">Oops!! The movie you are looking for is not available.</span>
          </div>
        )}
    </div>
  );
};

export default SearchView;
