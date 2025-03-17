import {
  mdTMDBImageBaseUrl,
  lgTMDBImageBaseUrl,
  TMDBImageBaseUrl
} from "@/src/commons/utils";
import { TopBannerMovieProps } from "@/src/commons/types";
import { Star, Dot } from "lucide-react";

const TopBanner = ({
  bannerImage, originalTitle, releaseDate, tagline, title, voteAverage, voteCount, data
}: TopBannerMovieProps) => {
  return (
    <div
      className="relative w-full max-w-container md:px-4 -mt-[24px] lg:mt-0 mx-auto"
    >
      <div className="flex flex-col sm:items-start w-full bg-cover bg-black">
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet={bannerImage
              ? `${TMDBImageBaseUrl}${bannerImage}`
              : '/assets/images/backdrop-placeholder.jpg'}
          />
          <source
            media="(min-width: 768px)"
            srcSet={bannerImage
              ? `${lgTMDBImageBaseUrl}${bannerImage}`
              : '/assets/images/backdrop-placeholder.jpg'}
          />
          <source
            media="(min-width: 280px)"
            srcSet={bannerImage
              ? `${mdTMDBImageBaseUrl}${bannerImage}`
              : '/assets/images/backdrop-placeholder.jpg'}
          />
          <img
            src={bannerImage
              ? `${mdTMDBImageBaseUrl}${bannerImage}`
              : '/assets/images/backdrop-placeholder.jpg'}
            alt={title}
            className="object-cover object-center opacity-50 aspect-[1/1.2] md:aspect-[3] w-full"
          />
        </picture>
        <div
          className="absolute bottom-0 w-full
          flex px-4 gap-2 items-end justify-start"
        >
          <div className="pb-[12px] flex flex-col gap-1">
            <h3 className="font-bold text-2xl text-white leading-[1.3] flex items-baseline gap-2">
              {title === originalTitle ? title : `${title} - ${originalTitle}`}
              {releaseDate && (
                <span className="text-lg font-[500] text-white/80">
                  {`(${releaseDate && new Date(releaseDate).getFullYear()})`}
                </span>
              )}
            </h3>
            
            <div className="flex items-center text-sm font-medium text-white my-1">
              <span className="flex items-center gap-1">
                <Star size={14} className="inline-block text-yellow-400 -mt-[2px]" />
                {`${voteAverage} (${voteCount})`}
              </span>
              <Dot className="text-white" />
              {data?.genres?.length > 0 && (
                <span>
                  {data.genres.map((genre: string) => genre.name)}
                </span>
              )}
            </div>

            {tagline && <p className="text-sm line-clamp-2 text-white/90">{`"${tagline}"`}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
