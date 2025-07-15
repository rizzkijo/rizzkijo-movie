import Head from "next/head";
import { useRouter } from "next/router";
import { MovieDetailProvider } from "./MovieDetailContext";
import { useMovieDetailContext } from "./MovieDetailContext";
import BannerSkeleton from "./components/BannerSkeleton";
import DetailInfoSkeleton from "./components/DetailInfoSkeleton";
import Banner from "./components/Banner";
import DetailInfo from "./components/DetailInfo";
import { useAppStore } from "@/src/stores/themeStore";
import Custom404 from "../Custom404";

const MovieDetailPage = () => {
  const router = useRouter();
  const id = Array.isArray(router?.query?.id)
    ? router.query.id[0]
    : router.query?.id ?? '';

  if (!id) return null;

  return (
    <MovieDetailProvider id={id.split('_')[0]}>
      <MovieDetail />
    </MovieDetailProvider>
  );
};

const MovieDetail = () => {
  const { appName } = useAppStore();
  const { data, isFetching, isPending, isError } = useMovieDetailContext();
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_SMALL_IMAGE_BASEURL;

  if (isError || data?.success === false) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
          <title>{`${data?.original_title || data?.title} (${new Date(data?.release_date || '0').getFullYear()}) | ${appName}`}</title>

          <meta name="description" content={data?.overview} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="UTF-8" />

          <meta property="og:title" content={`${data?.original_title || data?.title} (${new Date(data?.release_date || '0').getFullYear()}) | ${appName}`} />
          <meta property="og:description" content={data?.overview} />
          <meta property="og:image" content={data?.poster_path ? `${imageBaseUrl}/data?.poster_path` : '/assets/images/backdrop-placeholder.jpg'} />
          <meta property="og:type" content="website" />
        </Head>
      { (isFetching || isPending) ? <BannerSkeleton /> : <Banner /> }
      { (isFetching || isPending) ? <DetailInfoSkeleton /> : <DetailInfo /> }
    </>
  );
};

export default MovieDetailPage;
