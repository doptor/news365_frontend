"use client";

import PhotoSectionFour from "@/components/photo/photoSectionFour/PhotoSectionFour";
import PhotoSectionOne from "@/components/photo/photoSectionOne/PhotoSectionOne";
import PhotoSectionThree from "@/components/photo/photoSectionThree/PhotoSectionThree";
import PhotoSectionTwo from "@/components/photo/photoSectionTwo/PhotoSectionTwo";
import { Category, Post } from "@/interface/photo";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

interface ResponseData {
  category: Category[];
  categories: {
    category_name: string;
    slug: string;
  }[];
  ads: {
    news_view_31: string;
    news_view_32: string;
  };
  mix_post: {
    posts: Post[];
  };
}

export default function PhotoPage() {
  const {
    data,
    error,
    isLoading,
  }: { data: ResponseData; error: any; isLoading: boolean } = useSWR(
    "/photo-home",
    fetcher
  );

  if (error) return <div>There was an Error!</div>;

  if (isLoading)
    return <ThreeDotsLoader clss={"h-[600px] sm:h-[900px]"} color="51c27c" />;

  // destructure the data
  const { category, ads, categories, mix_post } = data;

  return (
    <>
      {/* news By position 4  */}
      <PhotoSectionOne data={category[0]} ads={ads.news_view_31} />

      {/* news By position 4  */}
      {category[1] ? (
        <>
          <PhotoSectionThree data={category[1]} />{" "}
          <PhotoSectionTwo data={category[1]} ads={ads.news_view_32} />
        </>
      ) : (
        ""
      )}

      {/* news By position 2 */}

      {/* news By position 7 */}
      <PhotoSectionFour data={mix_post} />
    </>
  );
}
