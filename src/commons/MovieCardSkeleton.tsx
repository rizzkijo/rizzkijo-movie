import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type classNameProps = {
  className?: string;
}

const MovieCardSkeleton = ({ className = '' }: classNameProps) => <Skeleton className={`aspect-[2_/_3] ${className}`} />;

export default MovieCardSkeleton;
