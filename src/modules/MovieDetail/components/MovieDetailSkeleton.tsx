import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const MovieDetailSkeleton = () => (
  <>
    <Head>
      <title>Movie Details</title>
    </Head>
    <div
      className="relative w-full max-w-container md:px-4 -mt-[24px] lg:mt-0 mx-auto"
    >
      <Skeleton className="w-full min-h-[80vw] lg:min-h-[400px]" />
    </div>
    <div className="w-full max-w-container p-4 mx-auto flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-[12px] md:h-[16px] !w-full md:!w-[350px] lg:!w-[500px]" />
        <Skeleton className="h-[18px] md:h-[24px] !w-full md:!w-[350px] lg:!w-[500px]" />
      </div>
    </div>
  </>
);

export default MovieDetailSkeleton;
