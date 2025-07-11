import Link from "next/link";
import { MoveRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

const CustomCarousel = <T,>({
  data,
  title,
  viewAllLink,
  // spacing,
  hideArrow = false,
  // className = "",
  renderItem,
  autoPlay,
  autoPlayDelay = 5000,
}: {
  data: T[],
  title?: string,
  viewAllLink?: string,
  // spacing: "sm" | "md" | "lg" | "xl",
  hideArrow?: boolean,
  // className?: string,
  renderItem: (params: { item: T; index: number }) => React.ReactNode,
  autoPlay?: boolean,
  autoPlayDelay?: number,
}) => {
  return (
    <>
      {title && (
        <div className="flex gap-6 items-baseline justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="flex items-center justify-end gap-2"
              aria-label={`See more ${title.toLowerCase()} movies`}
            >
              See more
              <MoveRight size={20} />
            </Link>
          )}
        </div>
      )}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full group/carousel"
        {...(autoPlay
          ? {
              plugins: [
                Autoplay({
                  delay: autoPlayDelay,
                }),
              ],
            }
          : {})
        }
      >
        <CarouselContent className="-ml-6">
          {data?.map((item, index) => (
            <CarouselItem key={index} className="pl-6 basis-1/2 md:basis-1/5">
              {renderItem({ item, index })}
            </CarouselItem>
          ))}
        </CarouselContent>
        {!hideArrow && (
          <>
            <CarouselPrevious
              className={cn(
                "opacity-100 left-2",
                "md:opacity-0 md:hover:opacity-100 md:left-0",
                "md:group-hover/carousel:opacity-80 md:group-hover/carousel:left-4",
                "md:disabled:opacity-0 md:group-hover/carousel:disabled:opacity-50",
                "lg:size-10",
              )}
            />
            <CarouselNext
              className={cn(
                "opacity-100 right-2",
                "md:opacity-0 md:hover:opacity-100 md:right-0",
                "md:group-hover/carousel:opacity-80 md:group-hover/carousel:right-4",
                "md:disabled:opacity-0 md:group-hover/carousel:disabled:opacity-50",
                "lg:size-10",
              )}
            />
          </>
        )}
      </Carousel>
    </>
  );
};

export default CustomCarousel;
