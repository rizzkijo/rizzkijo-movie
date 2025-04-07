import { useRouter } from "next/router";
import Head from "next/head";
import { Clapperboard, CloudAlert, Star, Timer } from "lucide-react";
import { useMovieDetail } from "@/src/commons/movieApis";
import {
  mdTMDBImageBaseUrl,
  lgTMDBImageBaseUrl,
  TMDBImageBaseUrl
} from "@/src/commons/utils";
import MovieDetailSkeleton from "./components/MovieDetailSkeleton";
import { useMobile } from "@/src/commons/utils";

const MovieDetail = () => {
  const isMobile = useMobile();

  const router = useRouter();
  const id = Array.isArray(router?.query?.id)
  ? router.query.id[0] 
  : router.query?.id ?? '';

  const { data, isFetching, isPending, isError, error } = useMovieDetail([id], id);
  
  // Show default string if data is null / undefined / ''
  const notAvailable = () => <span className="italic text-neutral-400">Not available</span>;

  // Currency format (USD) function
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (isFetching || isPending) {
    return <MovieDetailSkeleton />
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
      <Head>
        <title>{`${data?.original_title || data?.title} (${new Date(data?.release_date || '0').getFullYear()})`}</title>
      </Head>
      <div
        className="relative w-full max-w-container md:px-4 -mt-[24px] md:mt-0 mx-auto"
      >
        <div
          className="relative flex flex-col sm:items-start w-full bg-cover bg-black min-h-[80vw]
          lg:min-h-[400px] md:rounded-xl overflow-hidden"
        >
          <picture>
            <source
              media="(min-width: 1280px)"
              srcSet={data?.backdrop_path
                ? `${TMDBImageBaseUrl}${data.backdrop_path}`
                : '/assets/images/backdrop-placeholder.jpg'}
            />
            <source
              media="(min-width: 768px)"
              srcSet={data?.backdrop_path
                ? `${lgTMDBImageBaseUrl}${data.backdrop_path}`
                : '/assets/images/backdrop-placeholder.jpg'}
            />
            <source
              media="(min-width: 280px)"
              srcSet={data?.backdrop_path
                ? `${mdTMDBImageBaseUrl}${data.backdrop_path}`
                : '/assets/images/backdrop-placeholder.jpg'}
            />
            <img
              src={data?.backdrop_path
                ? `${mdTMDBImageBaseUrl}${data.backdrop_path}`
                : '/assets/images/backdrop-placeholder.jpg'}
              alt={data?.title}
              className="absolute object-cover object-center opacity-40 w-full h-full z-1"
            />
          </picture>
          <div
            className="mt-auto w-full flex p-4 pt-20 md:p-8 gap-2 items-end justify-start z-2"
          >
            {data?.original_language && (
              <div
                className="absolute top-4 right-4 md:top-8 md:right-8
                w-[35px] h-[35px] flex items-center justify-center
                rounded-full bg-white font-bold text-sm text-black drop-shadow-lg z-1"
              >
                {data.original_language.toUpperCase()}
              </div>
            )}
            {!isMobile && (
              <picture
                className="min-w-[25vw] max-w-[25vw] mr-4 float-left
                md:min-w-[200px] md:max-w-[200px]
                lg:min-w-[200px] lg:max-w-[300px]"
              >
                <source
                  media="(min-width: 1280px)"
                  srcSet={data?.poster_path
                    ? `${TMDBImageBaseUrl}${data.poster_path}`
                    : '/assets/images/backdrop-placeholder.jpg'}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={data?.poster_path
                    ? `${lgTMDBImageBaseUrl}${data.poster_path}`
                    : '/assets/images/backdrop-placeholder.jpg'}
                />
                <source
                  media="(min-width: 280px)"
                  srcSet={data?.poster_path
                    ? `${mdTMDBImageBaseUrl}${data.poster_path}`
                    : '/assets/images/backdrop-placeholder.jpg'}
                />
                <img
                  src={data?.backdrop_path
                    ? `${mdTMDBImageBaseUrl}${data.backdrop_path}`
                    : '/assets/images/backdrop-placeholder.jpg'}
                  alt={data?.title}
                  className="object-cover object-center aspect-2/3 w-full rounded-lg"
                />
              </picture>
            )}

            <div className="flex flex-col text-white">
              <h3 className="font-bold text-2xl text-white leading-[1.3]">
                {data?.original_title === data?.title ? data.original_title : `${data.original_title} - ${data.title}`}
                {' '}
                {data?.release_date && (
                  <span className="text-lg font-[500] text-white/90">
                    {`(${data.release_date && new Date(data.release_date).getFullYear()})`}
                  </span>
                )}
              </h3>

              {data?.tagline && <p className="line-clamp-2 text-white/90 italic">{`"${data.tagline}"`}</p>}
              
              <div className="flex flex-col gap-2 max-w-full items-start font-medium text-white mt-4">
                {(data?.vote_average !== 0 || data?.vote_count !== 0) && (
                  <span className="flex items-start gap-3">
                    <Star size={20} className="min-w-[20px]  text-yellow-400" />
                    {data.vote_average}
                    {' '}
                    {`(${data.vote_count} vote${data?.vote_count > 1 ? 's': ''})`}
                  </span>
                )}

                {data?.genres?.length > 0 && (
                  <>
                    <span className="flex items-start gap-3">
                      <Clapperboard size={20} className="min-w-[20px]" />
                      {data.genres.map((genre: { name: string }) => genre.name).join(', ')}
                    </span>
                  </>
                )}

                {data?.runtime > 0 && (
                  <>
                    <span className="flex items-start gap-3">
                      <Timer size={20} className="min-w-[20px]" />
                      {`${data.runtime}m`}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-container p-4 mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-1 float-left">
          <p className="text-xs lg:text-sm font-medium">Overview</p>
          <p className="text-neutral-600">{data.overview || notAvailable()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs lg:text-sm font-medium">Status</p>
              <p className="text-neutral-600">
                  {data?.status || notAvailable()}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs lg:text-sm font-medium">Production Companies</p>
              <p className="text-neutral-600">
                {data.production_companies.map((company: {
                  name: string;
                  origin_country: string;
                }) => `${company.name}${company.origin_country
                  ? ` (${company.origin_country})`
                  : ''}`).join(', ') || notAvailable()}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs lg:text-sm font-medium">Production Countries</p>
              <p className="text-neutral-600">
                {data.production_countries.map((country: {
                  name: string;
                }) => country.name).join(', ') || notAvailable()}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs lg:text-sm font-medium">Budget</p>
              <p className="text-neutral-600">
                  {data?.budget !== 0 ? USDollar.format(data?.budget) : notAvailable()}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs lg:text-sm font-medium">Revenue</p>
              <p className="text-neutral-600">
                  {data?.revenue !== 0 ? USDollar.format(data?.revenue) : notAvailable()}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs lg:text-sm font-medium">Spoken Languages</p>
              <p className="text-neutral-600">
                {data.spoken_languages.map((lang: {
                  english_name: string;
                  name: string;
                }) => lang.english_name
                  ? lang.english_name
                  : lang.name).join(', ') || notAvailable()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
