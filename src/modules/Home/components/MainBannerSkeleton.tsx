import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const MainBannerSkeleton = () => (
  <SkeletonTheme baseColor="#333333" highlightColor="#444444">
    <Skeleton
      className="w-full bg-cover bg-black aspect-square md:aspect-[3/1]
      rounded-xl overflow-hidden"
    />
  </SkeletonTheme>
);

export default MainBannerSkeleton;
