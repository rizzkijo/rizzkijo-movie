import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import {
  TMDBImageBaseUrl,
  // lgTMDBImageBaseUrl,
  // mdTMDBImageBaseUrl,
} from '@/src/commons/utils';
import type { BigPosterProps } from "@/src/commons/types";

const HeroPoster = ({ data, transitionDuration }: BigPosterProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % data?.length);
        setFade(true);
      }, 150);
    }, transitionDuration);

    return () => clearInterval(interval);
  }, [data, transitionDuration]);

  return (
    <div className="relative w-full overflow-hidden aspect-[11/16] md:aspect-[16/7]">
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
          <Image
            src={item?.backdrop_path
              ? `${TMDBImageBaseUrl}${item?.backdrop_path}`
              : '/assets/images/backdrop-placeholder.jpg'}
            alt={item.title}
            width={1920}
            height={640}
            priority={index === 0 ? true : false}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />

          <section className={cn(
            "absolute top-0 left-0 w-full h-full z-1 flex items-center py-[40px]",
            "bg-gradient-to-b from-background/90 to-background via-background/30"
          )}>
            <div className="container mx-auto">
              <div className="w-[700px] max-w-full">
                <h2 className="font-bold text-2xl md:text-7xl">
                  {item?.original_title === item?.title
                    ? item?.original_title : `${item?.original_title} - ${item?.title}`}
                </h2>
                {item.overview && <p className="mt-4 text-lg md:text-xl">{item.overview}</p>}
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default HeroPoster;
