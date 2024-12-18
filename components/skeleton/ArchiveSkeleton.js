import React from "react";
import Skeleton from "react-loading-skeleton";

const ArchiveSkeleton = () => {
  const color = {
    baseColor: "#f0f0f0",
    highlightColor: "#e0e0e0",
  };

  const { baseColor, highlightColor } = color;

  return (
    <div className="px-4 bg-white dark:bg-[#202327] mx-auto container min-h-screen">
      {/* <div className=" w-[60%] mx-auto mt-2">
        <Skeleton
          height={120}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div> */}

      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <Skeleton
                    height={16}
                    count={4}
                    className="my-2"
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                  <Skeleton
                    height={120}
                    className=""
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <Skeleton
                    height={16}
                    count={4}
                    className="my-2"
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                  <Skeleton
                    height={120}
                    className=""
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <Skeleton
                    height={16}
                    count={4}
                    className="my-2"
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                  <Skeleton
                    height={120}
                    className=""
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveSkeleton;
