"use client";

import PhotoSlider from "@/components/slider/PhotoSlider";
import { Post } from "@/interface/photo";
import CameraIcon from "@/public/icons/CameraIcon";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface Ads {
  news_view_31: string;
  news_view_32: string;
}

interface ResponseData {
  posts: Post[];
  ads: Ads;
}

const PhotoGallery = () => {
  const {
    data,
    error,
    isLoading,
  }: { data: ResponseData; error: any; isLoading: boolean } = useSWR(
    "/photo-post",
    fetcher
  );

  if (error) return <div>There was an Error!</div>;
  // if (isLoading) return <ThreeDotsLoader />;

  // destructure the data
  const { ads, posts } = data || {};

  return (
    <>
      {posts?.length > 0 ? (
        <>
          <section className="mt-[60px] bg-[#f7f7f7] dark:bg-[#191c20] py-10">
            <div className="container px-4 mx-auto">
              <div className="border-[var(--border-color)] dark:border-[var(--border-dark)]  border-b-[2px] mb-3 pb-1">
                <div className="flex items-center justify-between">
                  <Link href="/photo">
                    <h2 className="category-text">Picture</h2>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]">
                <div className="col-span-12 md:col-span-12 lg:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
                  {posts?.slice(0, 1)?.map((item) => {
                    const { category, category_name, id, photos, title } =
                      item || {};

                    return (
                      <div key={id} className="-mx-4 md:px-4">
                        <div className="group flex flex-col gap-0">
                          <div className="overflow-hidden w-full relative">
                            {/* photo slider */}
                            <PhotoSlider
                              sliderData={{ category, id, photos }}
                            />
                          </div>
                          <div className="w-full">
                            <Link
                              href={`/photo/${category}/${id}`}
                              className="text-2xl left-9 mx-4 md:mx-0 mt-2 md:mt-0 "
                            >
                              {title}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
                  <div className="flex flex-col">
                    {posts?.slice(1, 3)?.map((item) => {
                      const {
                        category_name,
                        id,
                        photos,
                        post_by_id,
                        title,
                        category,
                      } = item || {};
                      const { large_photo, phot_title, thumb_photo } = photos
                        ? photos[0]
                        : { large_photo: "", phot_title: "", thumb_photo: "" };

                      return (
                        <div
                          key={id}
                          className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]"
                        >
                          <Link
                            className="group mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0"
                            href={`/photo/${category}/${id}`}
                          >
                            <div className="overflow-hidden relative">
                              <div>
                                <Image
                                  alt={phot_title}
                                  width={350}
                                  height={186}
                                  decoding="async"
                                  className="w-full h-auto lg:w-[220px] lg:h-[150px] xl:w-[320px] xl:h-[200px] object-cover group-hover:scale-105 duration-700 ease-out"
                                  src={large_photo || ""}
                                  loading="lazy"
                                />
                              </div>
                              <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                                <CameraIcon />
                              </div>
                            </div>
                            <h3 className="mt-1 text-lg text-[var(--dark)]    dark:text-white   ">
                              {title}
                            </h3>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
                  <div className="flex flex-col">
                    {posts?.slice(3, 5)?.map((item) => {
                      const {
                        category_name,
                        id,
                        photos,
                        post_by_id,
                        title,
                        category,
                      } = item || {};
                      const { large_photo, phot_title, thumb_photo } = photos
                        ? photos[0]
                        : { large_photo: "", phot_title: "", thumb_photo: "" };

                      return (
                        <div
                          key={id}
                          className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]"
                        >
                          <Link
                            className="group mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0"
                            href={`/photo/${category}/${id}`}
                          >
                            <div className="overflow-hidden relative">
                              <div>
                                <Image
                                  alt={phot_title}
                                  width={350}
                                  height={186}
                                  decoding="async"
                                  className="w-full h-auto lg:w-[220px] lg:h-[150px] xl:w-[320px] xl:h-[200px] object-cover group-hover:scale-105 duration-700 ease-out"
                                  src={large_photo || ""}
                                  loading="lazy"
                                />
                              </div>
                              <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                                <CameraIcon />
                              </div>
                            </div>

                            <h3 className="mt-1 text-lg text-[var(--dark)] group-hover  dark:text-white ">
                              {title}
                            </h3>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PhotoGallery;
