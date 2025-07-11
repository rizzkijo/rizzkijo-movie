import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSkeleton = () => (
  <div
    className="relative w-full container md:px-4 -mt-[24px] lg:mt-0 mx-auto"
  >
    <SkeletonTheme baseColor="#333333" highlightColor="#444444">
      <Skeleton className="w-full aspect-[2.43/1]" />
    </SkeletonTheme>
  </div>
);

export default BannerSkeleton;
