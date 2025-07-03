import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const DetailInfoSkeleton = () => (
  <div className="w-full container px-4 mt-4 mx-auto flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <Skeleton className="h-[12px] md:h-[16px] !w-full md:!w-[350px] lg:!w-[500px]" />
      <Skeleton className="h-[18px] md:h-[24px] !w-full md:!w-[350px] lg:!w-[500px]" />
    </div>
  </div>
);

export default DetailInfoSkeleton;
