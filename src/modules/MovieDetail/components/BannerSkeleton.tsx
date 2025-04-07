import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSkeleton = () => (
  <div
    className="relative w-full max-w-container md:px-4 -mt-[24px] lg:mt-0 mx-auto"
  >
    <Skeleton className="w-full min-h-[80vw] lg:min-h-[400px]" />
  </div>
);

export default BannerSkeleton;
