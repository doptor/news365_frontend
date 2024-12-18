import { useTheme } from "next-themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const CategoryPageSkeleton = () => {
  const color = {
    baseColor: "#f0f0f0",
    highlightColor: "#e0e0e0",
  };

  const { baseColor, highlightColor } = color;

  return (
    <div className="px-4 bg-white dark:bg-[#202327] mx-auto container min-h-screen">
      <div className=" mt-16 ">
        <Skeleton
          height={22}
          width={100}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Skeleton
              height={300}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />

            <div>
              <Skeleton
                height={30}
                width={220}
                className="mt-2"
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
              <Skeleton
                height={30}
                count={2}
                className="mt-2 "
                baseColor={baseColor}
                highlightColor={highlightColor}
              />

              <Skeleton
                height={16}
                count={2}
                className="mt-2 mb-1"
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
              <Skeleton
                height={16}
                count={3}
                className="mt-5"
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </div>
          </div>

          {/* <div className="mt-4">
            <Skeleton height={24} width={200} />
            <Skeleton height={16} width={150} className="mt-2" />
            <Skeleton height={16} count={3} className="mt-2" />
          </div> */}
        </div>
        <div>
          <Skeleton
            height={280}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <Skeleton
            height={24}
            width={150}
            className="mt-4"
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          {/* <Skeleton
            height={16}
            width={100}
            className="mt-2"
            baseColor={baseColor}
            highlightColor={highlightColor}
          /> */}
        </div>
      </div>
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
              height={150}
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
              height={150}
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
        {/* <div>
          <Skeleton
            height={16}
            count={5}
            className="my-2"
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div> */}
      </div>
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
              height={150}
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
              height={150}
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
        {/* <div>
          <Skeleton
            height={16}
            count={5}
            className="my-2"
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div> */}
      </div>
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
              height={150}
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
              height={150}
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
        {/* <div>
          <Skeleton
            height={16}
            count={5}
            className="my-2"
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div> */}
      </div>
    </div>
  );
};

export default CategoryPageSkeleton;
