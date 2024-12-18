"use client"; // Mark this component as a Client Component

import { useEffect } from "react";
import instance from "@/utils/instance";

const DynamicFavicon = () => {
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const { data } = await instance.get("/metadata");
        const favicon = data?.data?.favicon;

        if (favicon) {
          const link: HTMLLinkElement =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");
          link.type = "image/x-icon";
          link.rel = "shortcut icon";
          link.href = `${favicon}?v=${new Date().getTime()}`; // Cache buster
          document.getElementsByTagName("head")[0].appendChild(link);
        }
      } catch (error) {
        console.error("Error updating favicon:", error);
      }
    };

    updateFavicon();
  }, []);

  return null; // This component doesn't render anything visible
};

export default DynamicFavicon;
