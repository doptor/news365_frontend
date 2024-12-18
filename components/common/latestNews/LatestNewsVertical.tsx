"use client";

import { NewsItem } from "@/interface/post";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const LatestNewsVertical = ({
  end_point = "/latest-post",
}: {
  end_point?: string;
}) => {
  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(end_point, fetcher);

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col last:[&>*]:mb-0 after:last:[&>*]:h-0">
      {data?.slice(0, 5).map((item: NewsItem) => {
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
          <Link
            key={news_id}
            className="group mb-6 relative after:border-[var(--border-color)] dark:border-[var(--border-dark)]  after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]"
            href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
          >
            <div className="ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative">
              <div>
                <Image
                  alt={image_alt || "image_alt"}
                  width={330}
                  height={186}
                  decoding="async"
                  className="w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out"
                  src={image_thumb}
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className="text-lg text-[var(--dark)]    dark:text-white    md:leading-[1.62rem]">
              {post_title}
            </h3>
          </Link>
        );
      })}
    </div>
  );
};

export default LatestNewsVertical;
