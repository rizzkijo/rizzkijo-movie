import Image from "next/image";
import { useMobile, useTablet, useDesktop } from "@/lib/utils";

type ResponsiveImageProps = {
  srcMobile?: string;
  srcTablet?: string;
  srcDesktop?: string;
  fallbackSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  index?: number;
  className?: string;
};

const ResponsiveImage = ({
  srcMobile,
  srcTablet,
  srcDesktop,
  fallbackSrc = "/assets/images/placeholder.jpg",
  alt = "Image",
  width = 1280,
  height = 400,
  index = 0,
  className = "",
}: ResponsiveImageProps) => {
  const isMobile = useMobile();
  const isTablet = useTablet();
  const isDesktop = useDesktop();

  let src = fallbackSrc;
  let imgWidth = width;
  let imgHeight = height;

  if (isMobile && srcMobile) {
    src = srcMobile;
    imgWidth = 768;
    imgHeight = 600;
  } else if (isTablet && srcTablet) {
    src = srcTablet;
    imgWidth = 1024;
    imgHeight = 345;
  } else if (isDesktop && srcDesktop) {
    src = srcDesktop;
    imgWidth = 1200;
    imgHeight = 400;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      sizes="100vw"
      priority={index === 0}
      className={className}
    />
  );
};

export default ResponsiveImage;