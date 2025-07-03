import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSkeleton = () => (
  <div
    className="relative w-full container md:px-4 -mt-[24px] lg:mt-0 mx-auto"
  >
    <Skeleton className="w-full aspect-[2.43/1]" />
  </div>
);

export default BannerSkeleton;
