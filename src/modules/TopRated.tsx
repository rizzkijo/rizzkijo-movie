import React, { useEffect, useState } from "react";
import { useRouter  } from "next/router";
import { CloudAlert, Frown } from "lucide-react";
import { MoviesProps } from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";
import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
import { useTopRatedMovies } from "@/src/hooks/movieHooks";
import Pagination from "@/src/commons/Pagination";

const TopRatedPage = () => {
  const router = useRouter();

  const page = Array.isArray(router?.query?.page) 
  ? router.query.page[0] 
  : router.query?.page ?? 1;

  const [loading, setLoading] = useState<boolean>(true);

  const {
    data,
    isFetching,
    isPending,
    isError,
    error,
  } = useTopRatedMovies(Number(page));

  const goToPage = (page: number) => {
    router.push({
      pathname: "/movie/toprated",
      query: { ...router.query, page },
    });
  };

  useEffect(() => {
    setLoading(true);
    let timeout: NodeJS.Timeout;
  
    if (data?.results) {
      timeout = setTimeout(() => setLoading(false), 500);
    }
  
    return () => clearTimeout(timeout);
  }, [data, page]);

  if (loading || isPending || isFetching) {
    return (
      <div className="w-full max-w-container px-4 mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-4 md:mb-8">
          Now Playing Movies
        </h1>
        <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || data?.results?.success === false) {
    return (
      <div className="w-full max-w-container px-4 pt-20 mx-auto text-center">
        <h1 className="text-xl lg:text-2xl xl:text-4xl font-bold mb-2 lg:mb-4 xl:mb-6 flex flex-col items-center gap-4">
          <span className="text-red-600"><CloudAlert size={60} /></span>
          Oops!! Something went wrong!
        </h1>
        <p className="text-neutral-500 text-sm lg:text-base font-[500]">{error?.message || data?.results?.status_message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-start w-full max-w-container px-4 mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-4 md:mb-8">
          Now Playing Movies
        </h1>
        {!isPending && !isFetching && data?.results?.length > 0
          ? (
            <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {data?.results?.map((item: MoviesProps) => <MovieCard key={item.id} data={item} />)}
            </div>
          )
          : (
            <div className="text-base text-gray-500 flex gap-3 a=items-center justify-center">
              <span className="self-center text-red-600"><Frown size={22} /></span>
              <span className="self-center">Oops!! The movie you are looking for is not available.</span>
            </div>
          )}
      </div>
      <div className="mt-8">
        <Pagination currentPage={Number(page)} totalPages={data?.total_pages} delta={2} onPageChange={goToPage} />
      </div>
    </>
  );
};

export default TopRatedPage;
