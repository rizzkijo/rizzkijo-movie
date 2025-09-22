import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge";
import { type MovieCardProps } from "@/src/types";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const MovieCard = ({ priority = false, data, showDetails = false, indexNo, boxShadow = false }: MovieCardProps) => {
  // TMDB image base url from .env
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_SMALL_IMAGE_BASEURL;

  const [isImageSrcError, setIsImageSrcError] = React.useState<boolean>(false);

  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Delete characters other than letters, numbers, dan spaces
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with '-'

  return (
    <div className={cn("relative")}>
      {indexNo != null && (
        <h3
          className={cn(
            "absolute -left-2 -top-2 text-6xl z-1",
            "font-monoton text-shadow-lg text-shadow-black/15 text-white",
            "md:-top-4 md:text-8xl md:-left-3",
          )}
        >{indexNo + 1}</h3>
      )}
      <Link
        href={`/${data?.id}_${slug}`}
        className="h-full block group transition-all duration-[0.25s] ease-[ease-in-out]"
        title={data?.title}
        role="link"
        aria-label={data.title}
      >
        <Card className={cn(
          "h-full p-0 group/movieCard relative overflow-hidden bg-card text-card-foreground rounded-2xl",
          boxShadow ? "shadow-lg" : "shadow-none",
        )}>
          <CardContent className="p-0">
            <div className={`w-full aspect-[2_/_3] flex justify-center items-center overflow-hidden`}>
              {/* Show image place holder if image from api fails to load */}
              {isImageSrcError
                ? (
                  <Image
                    src={'/assets/images/backdrop-placeholder.jpg'}
                    alt={data.title}
                    width={270}
                    height={390}
                    className="w-full object-cover aspect-[2_/_3] scale-[1.05]
                    bg-card transition-all duration-[0.25s] ease-[ease-in-out]
                    group-hover:scale-[1.1] opacity-90"
                    priority={priority}
                  />
                )
                : (
                  <Image
                    src={`${imageBaseUrl}${data.poster_path}`}
                    alt={data.title}
                    width={270}
                    height={390}
                    className="w-full object-cover aspect-[2_/_3] scale-[1.05]
                    bg-card transition-all duration-[0.25s] ease-[ease-in-out]
                    group-hover:scale-[1.1] opacity-90"
                    onError={() => setIsImageSrcError(true)} // handling if image fails to load
                    priority={priority}
                  />
                )}
            </div>
            {showDetails && (
              <div
                className={cn(
                  "bg-card p-3",
                  "flex flex-col items-start justify-end",
                )}
              >
                <h3
                  className={cn(
                    "font-medium md:font-bold md:text-lg line-clamp-1",
                    !data.release_date && !data.vote_average && !data.adult && "line-clamp-2",
                  )}
                  role="heading"
                >
                  {data.original_title === data.title ? data.original_title : `${data.original_title} (${data.title})`}
                </h3>
                {(data.release_date || data.vote_average || data.adult) && (
                  <div className="w-full flex items-center gap-2 mt-2">
                    {data.release_date && (
                      <Badge
                        variant="outline"
                      >
                        {`${new Date(data.release_date).getFullYear()}`}
                      </Badge>
                    )}
                    {data?.vote_average !== 0 && (
                      <Badge
                        variant="outline"
                        className="h-5 min-w-5 text-primary tabular-nums"
                      >
                        <StarIcon />
                        {Number(data.vote_average.toFixed(1))}
                      </Badge>
                    )}
                    {/* Show 18+ label if adult movie */}
                    {data.adult && (
                      <Badge
                        variant="outline"
                        className="h-5 min-w-5 rounded-full tabular-nums border-foreground/50"
                      >
                        20+
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

      </Link>
    </div>
  );
};

export default MovieCard;
