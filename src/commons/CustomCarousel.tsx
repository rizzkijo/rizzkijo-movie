import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CustomCarouselProps } from "./types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CustomCarousel = ({
  title,
  gap = 20,
  numRows = 5,
  tabletRows = 3,
  mobileRows = 2,
  infinite = false,
  viewAllLink,
  isError = false,
  errorMessage = "Opps..something error :(",
  autoPlay = false,
  children,
}: CustomCarouselProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1181 },
      items: numRows,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1180, min: 768 },
      items: tabletRows,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: mobileRows,
      partialVisibilityGutter: 20,
    }
  };

  if (isError) {
    return (
      <p className="text-base font-medium text-black/50">
        {errorMessage}
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-4 mb-2 md:mb-4">
        {title && <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>}
        {viewAllLink && (
          <Link href={viewAllLink} className="flex items-center gap-2">
            <span>View All</span>
            <ChevronRight size={18} />
          </Link>
        )}
      </div>

      <div style={{ marginInline: `calc(${gap}px / -2)` }}>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay={autoPlay}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots pb-[30px]"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={infinite}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          partialVisible={false}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} style={{ paddingInline: `calc(${gap}px / 2)` }}>
              {child}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CustomCarousel;
