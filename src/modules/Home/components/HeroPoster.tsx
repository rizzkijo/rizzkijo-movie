import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveImage from "@/src/components/ResponsiveImage";
import {
  TMDBImageBaseUrl,
  lgTMDBImageBaseUrl,
  mdTMDBImageBaseUrl,
} from '@/lib/utils';
import { type BigPosterProps } from "@/src/types";

const HeroPoster = ({ data, transitionDuration }: BigPosterProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % data?.length);
        setFade(true);
      }, 50);
    }, transitionDuration);

    return () => clearInterval(interval);
  }, [data, transitionDuration]);

  return (
    <div className="relative w-full overflow-hidden aspect-[11/15] md:aspect-[10/6] lg:aspect[16/9] xl:aspect-[16/7]">
      {data?.map((item, index) => (
        <div
          key={index}
          className={cn(
            "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500",
            {
              "opacity-0": index !== currentIndex || !fade,
              "opacity-100": index === currentIndex && fade,
            }
          )}
        >
          <ResponsiveImage
            srcMobile={`${mdTMDBImageBaseUrl}${item.poster_path}`}
            srcTablet={`${lgTMDBImageBaseUrl}${item.backdrop_path}`}
            srcDesktop={`${TMDBImageBaseUrl}${item.backdrop_path}`}
            fallbackSrc="/assets/images/backdrop-placeholder.jpg"
            alt={item.title}
            index={index}
            className="opacity-85 absolute object-cover object-top w-full h-full z-1"
          />

          <section className={cn(
            "absolute top-0 left-0 w-full h-full z-1 flex items-end pt-[80px] pb-[100px] md:pb-[180px]",
            "bg-gradient-to-b from-background/40 to-background via-transparent"
          )}>
            <div className="container mx-auto">
              <div className="w-full md:w-[50%] lg:w-[60%]">
                <h2 className="font-bold text-2xl md:text-5xl lg:text-7xl">
                  {item?.original_title === item?.title
                    ? item?.original_title : `${item?.original_title} - ${item?.title}`}
                </h2>
                {item.overview && <p className="mt-4 text-base md:text-lg line-clamp-2">{item.overview}</p>}
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default HeroPoster;
