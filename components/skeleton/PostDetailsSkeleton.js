import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const PostDetailsSkeleton = () => {
  const color = {
    baseColor: "#f0f0f0",
    highlightColor: "#e0e0e0",
  };

  const { baseColor, highlightColor } = color;

  return (
    <div className="relative bg-white dark:bg-[#202327] px-4 container mx-auto mt-20">
      {/* Title */}
      <div className="mb-2 w-full md:w-[50%]">
        <Skeleton
          height={40}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
      {/* Subtitle with icon and date */}
      <div className="flex items-center mb-4">
        <Skeleton
          circle={true}
          height={40}
          width={40}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <div className="ml-2">
          <Skeleton
            height={20}
            width={100}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <Skeleton
            height={20}
            width={150}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>
      </div>
      {/* Main image area */}
      <div className="mb-4 w-full md:w-[80%]">
        <Skeleton
          height={600}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
      {/* Sidebar Advertisement */}
      <div className="w-full md:w-1/4 mb-4">
        <Skeleton
          height={200}
          width="100%"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>

      {/* Sidebar Links */}
      <div>
        <Skeleton
          height={20}
          width="70%"
          className="mb-2"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={20}
          width="70%"
          className="mb-2"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={20}
          width="70%"
          className="mb-2"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={20}
          width="70%"
          className="mb-2"
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
    </div>
  );
};

export default PostDetailsSkeleton;
