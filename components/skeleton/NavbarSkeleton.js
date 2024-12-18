import { useTheme } from "next-themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const NavbarSkeleton = ({ theme }) => {
  const color = {
    baseColor: "#f0f0f0",
    highlightColor: "#e0e0e0",
  };

  const { baseColor, highlightColor } = color;

  return (
    <div>
      <div className="hidden md:flex items-center gap-5 mb-4 ">
        <Skeleton
          height={24}
          width={80}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={24}
          width={80}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={24}
          width={80}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />

        <Skeleton
          height={24}
          width={80}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          height={24}
          width={80}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
    </div>
  );
};

export default NavbarSkeleton;
