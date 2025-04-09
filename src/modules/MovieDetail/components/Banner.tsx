// import { useMovieDetailContext } from '../MovieDetailContext';
import { useTopBanner } from '../MovieDetailContext';
import { Clapperboard, Star, Timer } from 'lucide-react';
import { TMDBImageBaseUrl, lgTMDBImageBaseUrl, mdTMDBImageBaseUrl } from '@/src/commons/utils';
import { useMobile } from '@/src/commons/utils';

const Banner = () => {
  const banner = useTopBanner();
  const isMobile = useMobile();

  if (!banner) return null; 

  return (
    <div
      className="relative w-full max-w-container md:px-4 -mt-[24px] md:mt-0 mx-auto"
    >
      <div
        className="relative flex flex-col sm:items-start w-full bg-cover bg-black aspect-square
        md:aspect-[2.43/1] md:rounded-xl overflow-hidden"
      >
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet={banner?.backdrop_path
              ? `${TMDBImageBaseUrl}${banner?.backdrop_path}`
              : '/assets/images/backdrop-placeholder.jpg'}
          />
          <source
            media="(min-width: 768px)"
            srcSet={banner?.backdrop_path
              ? `${lgTMDBImageBaseUrl}${banner?.backdrop_path}`
              : '/assets/images/backdrop-placeholder.jpg'}
          />
          <source
            media="(min-width: 280px)"
            srcSet={banner?.backdrop_path
              ? `${mdTMDBImageBaseUrl}${banner?.backdrop_path}`
              : '/assets/images/backdrop-placeholder.jpg'}
          />
          <img
            src={banner?.backdrop_path
              ? `${mdTMDBImageBaseUrl}${banner?.backdrop_path}`
              : '/assets/images/backdrop-placeholder.jpg'}
            alt={banner?.title}
            className="absolute object-cover object-center opacity-40 w-full h-full z-1"
          />
        </picture>
        <div
          className="mt-auto w-full flex p-4 pt-20 md:p-8 gap-4 items-end justify-start z-2"
        >
          {banner?.original_language && (
            <div
              className="absolute top-4 right-4 md:top-8 md:right-8
              w-[35px] h-[35px] flex items-center justify-center
              rounded-full bg-white font-bold text-sm text-black drop-shadow-lg z-1"
            >
              {banner?.original_language.toUpperCase()}
            </div>
          )}
          {!isMobile && (
            <picture
              className="min-w-[25vw] max-w-[25vw]
              md:min-w-[200px] md:max-w-[200px]
              lg:min-w-[200px] lg:max-w-[300px]"
            >
              <source
                media="(min-width: 1280px)"
                srcSet={banner?.poster_path
                  ? `${TMDBImageBaseUrl}${banner?.poster_path}`
                  : '/assets/images/backdrop-placeholder.jpg'}
              />
              <source
                media="(min-width: 768px)"
                srcSet={banner?.poster_path
                  ? `${lgTMDBImageBaseUrl}${banner?.poster_path}`
                  : '/assets/images/backdrop-placeholder.jpg'}
              />
              <source
                media="(min-width: 280px)"
                srcSet={banner?.poster_path
                  ? `${mdTMDBImageBaseUrl}${banner?.poster_path}`
                  : '/assets/images/backdrop-placeholder.jpg'}
              />
              <img
                src={banner?.backdrop_path
                  ? `${mdTMDBImageBaseUrl}${banner?.backdrop_path}`
                  : '/assets/images/backdrop-placeholder.jpg'}
                alt={banner?.title}
                className="object-cover object-center aspect-2/3 w-full rounded-lg"
              />
            </picture>
          )}

          <div className="flex flex-col text-white">
            <h3 className="font-bold text-2xl text-white leading-[1.3]">
              {banner?.original_title === banner?.title ? banner?.original_title : `${banner?.original_title} - ${banner?.title}`}
              {' '}
              {banner?.release_date && (
                <span className="text-lg font-[500] text-white/90">
                  {`(${banner?.release_date && new Date(banner?.release_date).getFullYear()})`}
                </span>
              )}
            </h3>

            {banner?.tagline && <p className="line-clamp-2 text-white/90 italic">{`"${banner?.tagline}"`}</p>}
            
            <div className="flex flex-col gap-2 max-w-full items-start font-medium text-white mt-4">
              {(banner?.vote_average !== 0 || banner?.vote_count !== 0) && (
                <span className="flex items-start gap-3">
                  <Star size={20} className="min-w-[20px]  text-yellow-400" />
                  {banner?.vote_average}
                  {' '}
                  {`(${banner?.vote_count} vote${banner?.vote_count > 1 ? 's': ''})`}
                </span>
              )}

              {banner?.genres?.length > 0 && (
                <>
                  <span className="flex items-start gap-3">
                    <Clapperboard size={20} className="min-w-[20px]" />
                    {banner?.genres.map((genre: { name: string }) => genre.name).join(', ')}
                  </span>
                </>
              )}

              {banner?.runtime > 0 && (
                <>
                  <span className="flex items-start gap-3">
                    <Timer size={20} className="min-w-[20px]" />
                    {`${banner?.runtime}m`}
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
