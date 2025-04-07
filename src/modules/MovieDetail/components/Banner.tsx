import { useMovieDetailContext } from '../MovieDetailContext';
import { Clapperboard, Star, Timer } from 'lucide-react';
import { TMDBImageBaseUrl, lgTMDBImageBaseUrl, mdTMDBImageBaseUrl } from '@/src/commons/utils';
import { useMobile } from '@/src/commons/utils';

const Banner = () => {
  const { data } = useMovieDetailContext();
  const isMobile = useMobile();

  if (!data) return null; 

  // render logic seperti di komponenmu tadi, tinggal ambil data langsung dari context
  return (
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
  );
};

export default Banner;
