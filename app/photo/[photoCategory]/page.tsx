"use client";

import AddCard from "@/components/common/addCard/AddCard";
import { Post } from "@/interface/photo";
import CameraIcon from "@/public/icons/CameraIcon";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

interface ResponseData {
  posts: Post[];
  categories: {
    category_name: string;
    slug: string;
  }[];
  ads: {
    news_view_31: string;
    news_view_32: string;
  };
}

export default function PhotoCategoryPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageData, setPageData] = useState<any[]>([]);
  const [isPageDataLoading, setIsPageDataLoading] = useState(false);

  const param = useParams();

  const {
    data,
    error,
    isLoading,
  }: { data: ResponseData; error: any; isLoading: boolean } = useSWR(
    `/photo-post?category=${param.photoCategory}`,
    fetcher
  );

  if (error) return <div>There was an Error!</div>;

  if (isLoading)
    return <ThreeDotsLoader clss={"h-[300px] sm:h-[600px]"} color="51c27c" />;

  const { ads, categories, posts } = data;

  return (
    <section className="py-[60px]">
      <div className="container px-4 mx-auto">
        <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3">
          <div className="mb-0">
            <Link
              className="block w-fit"
              href={`/photo/${data.posts[0]?.category}`}
            >
              <h1 className="text-[var(--primary)] text-xl md:text-2xl dark:text-white">
                {data.posts[0]?.category_name}
              </h1>
            </Link>
          </div>
          <div className="mb-3 bg-[var(--bg)] p-3">
            {categories.map((category, i: number) => {
              const { category_name, slug } = category;
              return (
                <Link
                  key={i}
                  className='text-[var(--dark)] text-lg mr-3 last:mr-0 relative after:text-[var(--dark)] after:content-["-"] after:ml-3 last:after:hidden dark:text-[var(--dark)] dark:after:text-[var(--gray-3)]'
                  href={`/photo/${slug}`}
                >
                  {category_name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:right-0 md:after:[&>*]:w-[1px] md:after:[&>*]:h-full md:after:[&>*]:top-0 md:after:[&>*]:-right-3 md:after:[&>*:nth-child(even)]:w-0  md:before:[&>*]:absolute md:before:[&>*]:bg-[var(--border-color)] md:before:[&>*]:w-full md:before:[&>*]:h-[1px] md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 dark:after:[&>*]:bg-[var(--border-dark)] dark:before:[&>*]:bg-[var(--border-dark)]">
              {posts.slice(0, 2).map((itm) => {
                const {
                  category,
                  category_name,
                  id,
                  photos,
                  post_by_id,
                  post_by_image,
                  post_by_name,
                  timestamp,
                  title,
                } = itm;
                const {
                  large_photo,
                  phot_title,
                  photo_reference,
                  thumb_photo,
                } = photos
                  ? photos[0]
                  : {
                      large_photo: "",
                      phot_title: "",
                      photo_reference: "",
                      thumb_photo: "",
                    };
                return (
                  <div
                    key={id}
                    className="group col-span-12 md:col-span-6 relative"
                  >
                    <Link href={`/photo/${category}/${id}`}>
                      <div className="mb-2 xl:mb-0 overflow-hidden relative">
                        <div>
                          <Image
                            alt={phot_title}
                            width={560}
                            height={315}
                            decoding="async"
                            className="w-full h-auto object-cover group-hover:scale-105 duration-700 ease-out"
                            src={large_photo}
                            loading="lazy"
                          />
                        </div>
                        <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                          <CameraIcon />
                        </div>
                        <div className="w-full absolute bottom-0 left-0 bg-gray-800/70 p-2">
                          <h2 className="text-lg    dark:text-white   ">
                            {title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="lg:sticky lg:top-[4rem]">
              <div className="w-full flex items-center justify-center">
                <div className="h-[250px]">
                  <AddCard imgPath={ads.news_view_32} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="grid grid-cols-12 gap-6 mb-6 after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:right-0 md:after:[&>*]:w-[1px] md:after:[&>*]:h-full md:after:[&>*]:top-0 md:after:[&>*]:-right-3 md:after:[&>*:nth-child(even)]:w-0  md:before:[&>*]:absolute md:before:[&>*]:bg-[var(--border-color)] md:before:[&>*]:w-full md:before:[&>*]:h-[1px] md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 dark:after:[&>*]:bg-[var(--border-dark)] dark:before:[&>*]:bg-[var(--border-dark)]">
              {posts.slice(0, 2).map((itm) => {
                const {
                  category,
                  category_name,
                  id,
                  photos,
                  post_by_id,
                  post_by_image,
                  post_by_name,
                  timestamp,
                  title,
                } = itm;
                const {
                  large_photo,
                  phot_title,
                  photo_reference,
                  thumb_photo,
                } = photos
                  ? photos[0]
                  : {
                      large_photo: "",
                      phot_title: "",
                      photo_reference: "",
                      thumb_photo: "",
                    };
                return (
                  <div
                    key={id}
                    className="group col-span-6 md:col-span-4 relative"
                  >
                    <Link href={`/photo/${category}/${id}`}>
                      <div className="mb-2 xl:mb-0 overflow-hidden relative">
                        <div>
                          <Image
                            alt={phot_title}
                            width={330}
                            height={186}
                            decoding="async"
                            className="w-full h-auto md:w-[290px] md:h-[180px] lg:w-[200px] lg:h-[120px] xl:w-[290px] xl:h-[220px] object-cover group-hover:scale-105 duration-700 ease-out"
                            src={thumb_photo}
                            loading="lazy"
                          />
                        </div>

                        <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                          <CameraIcon />
                        </div>
                      </div>
                      <h2 className="text-lg text-[var(--dark)]    dark:text-white   ">
                        {title}
                      </h2>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center"></div>
          </div>

          <div className="col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="-mt-3">
              <div>
                <div className="mt-3 mb-3 border-[var(--border-color)] border-t-2 dark:border-[var(--dark)]"></div>
              </div>
            </div>
            <div className="mt-3 lg:sticky lg:top-[4rem]">
              <div className="w-full flex items-center justify-center">
                <div className="h-[250px]">
                  <AddCard imgPath={ads.news_view_32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
