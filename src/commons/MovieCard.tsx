import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { moviesProps } from "@/src/commons/types";
import Link from "next/link";

interface MovieCardProps {
  data: moviesProps;
}

const MovieCard = ({ data }: MovieCardProps) => {
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_SMALL_IMAGE_BASEURL;
  const [isImageSrcError, setIsImageSrcError] = React.useState<boolean>(false);

  return (
    <Link
      href={`/movie/${data?.id}`}
      className="group relative drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
      transition-all duration-[0.25s] ease-[ease-in-out]
      bg-white border border-white rounded-xl overflow-hidden
      hover:drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
    >
      {data.adult && (
        <div
          className="w-[50px] h-[50px] rounded-full bg-white
          flex items-center justify-center
          absolute top-4 right-4 drop-shadow-lg"
        >
          <p className="font-bold text-xl text-red-500">18+</p>
        </div>
      )}
      <div className="w-full aspect-[2_/_3] bg-gray-200 flex justify-center items-center">
        {isImageSrcError
          ? (
            <Image
              src={'/assets/images/image-placeholder.svg'}
              alt={`image-${data.id}`}
              width={150}
              height={150}
              className="mt-11 self-start opacity-20"
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
              group-hover:scale-[1.2]"
              onError={() => setIsImageSrcError(true)}
            />
          )}
      </div>
      <div
        className="absolute right-0 bottom-0 left-0 h-[50%] p-4 pt-10 text-white
        flex flex-col items-start justify-end
        bg-linear-to-t from-black/80 via-black-40 to-black/0"
      >
        <h3 className="font-bold line-clamp-2">{data.original_title === data.title ? data.original_title : `${data.original_title} (${data.title})`}</h3>
        <p className="mt-1 flex items-center gap-2">
          <span className="text-yellow-400 self-center"><Star size={20} /></span>
          <span className="leading-[20px] mt-[3px]">{`${data.vote_average} (${data.vote_count})`}</span>
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
