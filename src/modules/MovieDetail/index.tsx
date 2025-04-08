import Head from "next/head";
import { useRouter } from "next/router";
import { CloudAlert } from "lucide-react";
import { MovieDetailProvider } from "./MovieDetailContext";
import { useMovieDetailContext } from "./MovieDetailContext";
import BannerSkeleton from "./components/BannerSkeleton";
import DetailInfoSkeleton from "./components/DetailInfoSkeleton";
import Banner from "./components/Banner";
import DetailInfo from "./components/DetailInfo";

const MovieDetailPage = () => {
  const router = useRouter();
  const id = Array.isArray(router?.query?.id)
    ? router.query.id[0]
    : router.query?.id ?? '';

  if (!id) return null;

  return (
    <MovieDetailProvider id={id}>
      <MovieDetail />
    </MovieDetailProvider>
  );
};

const MovieDetail = () => {
  const { data, isFetching, isPending, isError, error } = useMovieDetailContext();

  if (isError || data?.success === false) {
    return (
      <div className="w-full max-w-container px-4 pt-20 mx-auto text-center">
        <h1 className="text-xl lg:text-2xl xl:text-4xl font-bold mb-2 lg:mb-4 xl:mb-6 flex flex-col items-center gap-4">
          <span className="text-red-600"><CloudAlert size={60} /></span>
          Oops!! Something went wrong!
        </h1>
        <p className="text-neutral-500 text-sm lg:text-base font-[500]">{error?.message || data?.message}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${data?.original_title || data?.title} (${new Date(data?.release_date || '0').getFullYear()})`}</title>
      </Head>
      { (isFetching || isPending) ? <BannerSkeleton /> : <Banner /> }
      { (isFetching || isPending) ? <DetailInfoSkeleton /> : <DetailInfo /> }
    </>
  );
};

export default MovieDetailPage;
