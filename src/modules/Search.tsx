import React from "react";
import { useRouter  } from "next/router";
import { CloudAlert, Frown } from "lucide-react";
import { MoviesProps } from "@/src/commons/types";
import MovieCard from "@/src/commons/MovieCard";
import MovieCardSkeleton from "@/src/commons/MovieCardSkeleton";
import { useSearchMovies } from "@/src/commons/movieApis";
import Pagination from "@/src/commons/Pagination";

const SearchView = () => {
  const router = useRouter();

  const queryParam = Array.isArray(router?.query?.query) 
  ? router.query.query[0] 
  : router.query?.query ?? '';

  const page = Array.isArray(router?.query?.page) 
  ? router.query.page[0] 
  : router.query?.page ?? 1;

  const { data, isFetching, isPending, isError, error } = useSearchMovies(queryParam, Number(page), [queryParam, String(page)]);

  const goToPage = (page: number) => {
    router.push({
      pathname: "/search",
      query: { ...router.query, page },
    });
  };

  if (isPending || isFetching) {
    return (
      <div className="w-full max-w-container px-4 mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-1">
          {`Search result(s) for "${queryParam}"`}
        </h1>
        <p className="text-neutral-500 font-[600] mb-8">{`${data?.total_results || 0} result(s).`}</p>
        <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || data?.success === false) {
    return (
      <div className="w-full max-w-container px-4 pt-20 mx-auto text-center">
        <h1 className="text-xl lg:text-2xl xl:text-4xl font-bold mb-2 lg:mb-4 xl:mb-6 flex flex-col items-center gap-4">
          <span className="text-red-600"><CloudAlert size={60} /></span>
          Oops!! Something went wrong!
        </h1>
        <p className="text-neutral-500 text-sm lg:text-base font-[500]">{error?.message || data?.status_message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-start w-full max-w-container px-4 mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-1">
          {`Search result(s) for "${queryParam}"`}
        </h1>
        <p className="text-neutral-500 font-[600] mb-4 md:mb-8">{`${data?.total_results} result(s).`}</p>
        {!isPending && !isFetching && data?.results?.length > 0
          ? (
            <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {data?.results?.map((item: MoviesProps, index: number) => <MovieCard key={item.id} priority={index === 0} data={item} />)}
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

export default SearchView;
