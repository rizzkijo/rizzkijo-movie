import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { MoviesProps } from "@/src/commons/types";
import Link from "next/link";

type MovieCardProps = {
  data: MoviesProps;
}

const MovieCard = ({ data }: MovieCardProps) => {
  // TMDB image base url from .env
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_SMALL_IMAGE_BASEURL;

  const [isImageSrcError, setIsImageSrcError] = React.useState<boolean>(false);

  return (
    <Link
      href={`/movie/${data?.id}`}
      className="inline-block group relative drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
      transition-all duration-[0.25s] ease-[ease-in-out]
      bg-white border border-white rounded-xl overflow-hidden
      hover:drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
    >
      <div
          className="flex items-center justify-end
          absolute top-4 right-4 z-1"
        >
          {data.adult && (
            <p
              className="w-[35px] h-[35px] flex items-center justify-center
              rounded-full bg-white font-bold text-sm text-red-500 drop-shadow-lg"
            >
              18+
            </p>
          )}
          <p
            className="w-[35px] h-[35px] flex items-center justify-center
            rounded-full bg-white font-bold text-sm text-black drop-shadow-lg"
          >
            {data.original_language.toUpperCase()}
          </p>
      </div>

      {/* Show 18+ label if adult movie */}
      {data.adult && (
        <div
          className="w-[50px] h-[50px] rounded-full bg-white
          flex items-center justify-center
          absolute top-4 left-4 drop-shadow-lg"
        >
          <p className="font-bold text-xl text-red-500">18+</p>
        </div>
      )}

      <div className={`w-full aspect-[2_/_3] ${isImageSrcError ? 'bg-gray-400': 'bg-black/70'} flex justify-center items-center`}>
        
        {/* Show image place holder if image from api fails to load */}
        {isImageSrcError
          ? (
            <Image
              src={'/assets/images/image-placeholder.svg'}
              alt={`image-${data.id}`}
              width={150}
              height={150}
              className="mt-11 self-start opacity-40 invert w-[100px] h-[100px]
              lg:w-[150px] lg:h-[150px]"
            />
          )
          : (
            <Image
              src={`${imageBaseUrl}${data.poster_path}`}
              alt={`image-${data.id}`}
              width={270}
              height={390}
              className="w-full object-cover aspect-[2_/_3]
              bg-gray-100 transition-all duration-[0.25s] ease-[ease-in-out]
              group-hover:scale-[1.2] opacity-90"
              onError={() => setIsImageSrcError(true)} // handling if image fails to load
            />
          )}
      </div>
      <div
        className="absolute right-0 bottom-0 left-0 min-h-[50%] p-4 pt-6 text-white
        flex flex-col items-start justify-end
        bg-linear-to-t from-black/90 via-black-80 via-black-10 to-black/0"
      >
        <h3 className="font-medium md:font-bold md:text-lg line-clamp-3">
          {data.original_title ? data.original_title : data.title}
          {' '}
          {data.release_date && (
            <span className="text-white/80 text-sm">{`(${new Date(data.release_date).getFullYear()})`}</span>
          )}
        </h3>
        {data?.vote_average !== 0 && (
          <p className="flex items-center gap-2 text-white font-bold">
            <Star size={18} className="inline-block text-yellow-400 -mt-[2px]" />
            {data.vote_average}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
