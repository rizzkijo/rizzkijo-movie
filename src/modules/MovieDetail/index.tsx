import { useRouter } from "next/router";
import Head from "next/head";
import { CloudAlert, Star } from "lucide-react";
import useMovieDetail from "./api";
import {
  mdTMDBImageBaseUrl,
  lgTMDBImageBaseUrl,
  TMDBImageBaseUrl
} from "@/src/commons/utils";

const MovieDetail = () => {
  const accessToken = process.env.NEXT_PUBLIC_TMDB_ACESS_TOKEN;
  const router = useRouter();
  const id = Array.isArray(router?.query?.id) 
  ? router.query.id[0] 
  : router.query?.id ?? '';

  const { data, isFetching, isPending, isError, error } = useMovieDetail([id], id, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
  console.log('jotest data', data);
  console.log('jotest isFetching', isFetching);
  console.log('jotest isPending', isPending);
  console.log('jotest isError', isError);
  console.log('jotest error', error);

  if (isFetching || isPending) {
    return (
      <div className="flex flex-col sm:items-start w-full max-w-container px-4 mx-auto">
        <h1>Loading...</h1>
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
      <Head>
        <title>{`${data?.original_title || data?.title} (${new Date(data?.release_date || '0').getFullYear()})`}</title>
      </Head>
      <div
        className="relative w-full max-w-container md:px-4 -mt-[24px] lg:mt-0 mx-auto"
      >
        <div className="relative flex flex-col sm:items-start w-full bg-cover bg-black min-h-[80vw] lg:min-h-[400px] lg:rounded-xl overflow-hidden">
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
            className="relative mt-auto w-full flex p-4 pt-20 md:p-8 gap-2 items-end justify-start z-2"
          >
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

              {(data?.vote_average !== 0 || data?.vote_count !== 0) && (
                <p className="mt-4 flex items-center gap-2 text-white font-bold">
                  <Star size={18} className="inline-block text-yellow-400 -mt-[2px]" />
                  {data.vote_average}
                  <span className="text-sm font-[400]">{`(${data.vote_count} vote${data?.vote_count > 1 ? 's': null})`}</span>
                </p>
              )}
              
              <div className="disc-wrapper flex flex-wrap max-w-full items-center font-medium text-white my-1">
                {data?.original_language && <span>{data.original_language.toUpperCase()}</span>}
                {data?.genres?.length > 0 && (
                  <>
                    <span>
                      {data.genres.map((genre: { name: string }) => genre.name).join(', ')}
                    </span>
                  </>
                )}
                {data?.runtime > 0 && (
                  <>
                    <span>{`${data.runtime}m`}</span>
                  </>
                )}
              </div>

              {data?.overview && (
                <div className="mt-4 flex flex-col gap-1">
                  <p className="font-medium opacity-80">Overview</p>
                  <p>{data.overview}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-container p-4 mx-auto flex flex-col gap-4">
        {data?.production_companies?.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-neutral-500">Production Companies</p>
            <p className="">
              {data.production_companies.map((company: {
                name: string;
                origin_country: string;
              }) => `${company.name}${company.origin_country ? ` (${company.origin_country})` : ''}`).join(', ')}
            </p>
          </div>
        )}

        {data?.spoken_languages?.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-neutral-500">Spoken Languages</p>
            <p className="">
              {data.spoken_languages.map((lang: {
                english_name: string;
                name: string;
              }) => lang.english_name ? lang.english_name : lang.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetail;
