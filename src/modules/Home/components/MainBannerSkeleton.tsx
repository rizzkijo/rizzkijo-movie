import Skeleton from "react-loading-skeleton";

const MainBannerSkeleton = () => (
  <Skeleton
    className="relative flex flex-col sm:items-start w-full bg-cover bg-black aspect-square md:aspect-[3/1]
    rounded-xl overflow-hidden"
  />
);

export default MainBannerSkeleton;
