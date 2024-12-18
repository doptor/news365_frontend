"use client";

import { NewsItem } from "@/interface/post";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const LatestNewsHorizontal = () => {
  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    "/latest-post",
    fetcher
  );

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:after:[&>*:nth-last-child(-n+2)]:h-0 lg:after:[&>*:nth-last-child(-n+2)]:h-full lg:after:[&>*:nth-child(3)]:w-0 lg:after:[&>*]:w-[1px] after:[&>*:last-child]:w-0 after:[&>*]:h-[1px] lg:after:[&>*]:h-full print:hidden dark:after:[&>*]:bg-[var(--border-color)]">
      {data?.slice(0, 3).map((item: NewsItem) => {
        const {
          default_img,
          category_name,
          category,
          image_title,
          image_alt,
          news_id,
          post_by_image,
          post_by_name,
          post_by_id,
          post_date,
          post_title,
          encode_titl,
          stitle,
          video,
          image_check,
          image_thumb,
          image_large,
        } = item;

        return (
          <div
            key={news_id}
            className="col-span-12 md:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:right-0 after:-bottom-3 lg:after:top-0 lg:after:-right-3"
          >
            <Link
              className="group"
              href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
            >
              <div className="ml-2 lg:ml-0 mb-2 overflow-hidden float-right relative">
                <div>
                  <Image
                    alt={post_title}
                    width={330}
                    height={186}
                    decoding="async"
                    className="w-[124px] h-auto lg:w-full lg:h-auto object-cover group-hover:scale-105 duration-700 ease-out"
                    src={image_thumb}
                    loading="lazy"
                  />
                </div>
              </div>
              <h2 className="text-lg text-[var(--dark)]    dark:text-white">
                {post_title}
              </h2>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LatestNewsHorizontal;
