import React from "react";
import Skeleton from "react-loading-skeleton";

const SearchPageSkeleton = () => {
  const color = {
    baseColor: "#f0f0f0",
    highlightColor: "#e0e0e0",
  };

  const { baseColor, highlightColor } = color;

  return (
    <div className="px-5 md:px-[150px] bg-white dark:bg-[#202327] mx-auto container min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 mt-20 ">
        <div className="w-full col-span-2">
          <h2 className="text-lg font-bold mb-4">
            <Skeleton
              width={200}
              height={24}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </h2>
          <div className="space-y-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex">
                <div className="flex-grow">
                  <h3 className="text-md font-medium mb-1">
                    <Skeleton
                      width="100%"
                      height={20}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                  </h3>
                  <p className="text-sm mb-2">
                    <Skeleton
                      width="80%"
                      height={16}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                  </p>
                  <p className="text-xs text-gray-500">
                    <Skeleton
                      width={150}
                      height={12}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="ml-4 ">
          <Skeleton
            width={300}
            height={300}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div> */}
      </div>
    </div>
  );
};

export default SearchPageSkeleton;
