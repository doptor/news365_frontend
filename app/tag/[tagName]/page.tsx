"use client";

import LatestNewsVertical from "@/components/common/latestNews/LatestNewsVertical";
import { NewsItem } from "@/interface/post";
import TimeBefore from "@/ui/TimeBefore";
import NotFoundBody from "@/ui/notFoundBody/NotFoundBody";
import Spin from "@/ui/spin/Spin";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import instance from "@/utils/instance";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import notFoundImg from "@/public/images/not-found.png";

interface TopicType {
  topic_name: string;
  slug: string;
}

export default function TagPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);
  const [moreData, setMoreData] = useState<any[]>([]);

  const param = useParams();

  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    `/tag-posts/${param.tagName}`,
    fetcher
  );

  useEffect(() => {
    if (pageNumber > 0) {
      (async () => {
        setIsLoadingMoreData(true);
        try {
          const { data } = await instance.get(
            `/tag-posts/${param.tagName}?page_number=${pageNumber}`
          );

          setMoreData((prev) => [...prev, ...data.data]);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingMoreData(false);
        }
      })();
    }
  }, [pageNumber, param.tagName]);

  // decide what to render
  //@TODO: When the error occurred
  if (error)
    return <NotFoundBody title={`  ${error.message}`} img={notFoundImg} />;

  //@TODO: When the loading
  if (isLoading)
    return <ThreeDotsLoader clss={"h-[300px] sm:h-[600px]"} color="51c27c" />;

  //@TODO: When No data found
  if (!data.length)
    return (
      <NotFoundBody title="">
        <h2 className="text-7xl">404</h2>
        <h3 className="text-2xl my-1 ">Not found anything</h3>
        <p className="">
          What you are looking for was not found. Maybe you&apos;re looking for it
          wrong.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="text-lg text-white  py-2 px-4 bg-[var(--primary)]  rounded-md"
          >
            Back to Home
          </Link>
        </div>
      </NotFoundBody>
    );

  // decoded tag name
  const encodedTagName = param.tagName.toString();
  const decodedTagName = decodeURIComponent(encodedTagName);

  return (
    <section className="py-[60px]">
      <div className="container px-4 mx-auto">
        <div className="border-[var(--border-color)] border-b-[2px] mb-3">
          {/* <div className="mb-3"> */}
          <div className="mb-0">
            <Link className="block w-fit" href={`/${param.tagName}`}>
              <h1 className="text-[var(--primary)] text-xl md:text-2xl dark:text-white">
                {decodedTagName}
              </h1>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 dark:after:bg-[var(--border-dark)]">
          {data.slice(0, 1).map((itm: NewsItem) => {
            const {
              category,
              news_id,
              post_date,
              post_title,
              encode_titl,
              stitle,
              image_large,
            } = itm;
            return (
              <div
                key={news_id}
                className="col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]"
              >
                <Link
                  className="flex flex-col md:flex-row gap-2 md:gap-3 group"
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  <div className="w-auto md:w-1/2 lg:w-2/5 xl:w-[52.5%] order-2">
                    <h2 className="text-2xl leading-9 text-[var(--dark)]    dark:text-white    mb-0 lg:mb-3 font-semibold">
                      {post_title}
                    </h2>
                    <p className="hidden xl:block text-lg text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                      {stitle}
                    </p>

                    <TimeBefore
                      title={post_date}
                      clss="xl:absolute bottom-0 right-4"
                    />
                  </div>
                  <div className="w-full md:w-1/2 lg:w-3/5 xl:w-[47.5%] overflow-hidden order-1 relative">
                    <div>
                      <Image
                        alt={post_title}
                        width={560}
                        height={315}
                        decoding="async"
                        className="w-full h-auto object-cover group-hover:scale-105 duration-700 ease-out"
                        src={image_large}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}

          <div className="col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="w-full flex items-center justify-center">
              <div className="h-[250px]">ads here</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:right-0 md:after:[&>*]:w-[1px] md:after:[&>*]:h-full md:after:[&>*]:top-0 md:after:[&>*]:-right-3 md:after:[&>*:nth-child(even)]:w-0  md:before:[&>*]:absolute md:before:[&>*]:bg-[var(--border-color)] md:before:[&>*]:w-full md:before:[&>*]:h-[1px] md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 dark:after:[&>*]:bg-[var(--border-dark)] dark:before:[&>*]:bg-[var(--border-dark)]">
              {data.slice(1).map((itm: NewsItem) => {
                const {
                  category,
                  news_id,
                  post_date,
                  post_title,
                  encode_titl,
                  image_thumb,
                } = itm;
                return (
                  <div
                    key={news_id}
                    className="col-span-12 md:col-span-6 relative"
                  >
                    <Link
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="ml-3 mb-2 xl:mb-0 overflow-hidden float-right relative">
                        <div>
                          <Image
                            alt={post_title}
                            width={330}
                            height={186}
                            decoding="async"
                            className="w-[124px] h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out"
                            src={image_thumb}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <h2 className="text-lg text-[var(--dark)]    dark:text-white   ">
                        {post_title}
                      </h2>

                      <TimeBefore title={post_date} />
                    </Link>
                  </div>
                );
              })}

              {moreData.map((itm: NewsItem) => {
                const {
                  category,
                  news_id,
                  post_date,
                  post_title,
                  encode_titl,
                  image_thumb,
                } = itm;
                return (
                  <div
                    key={news_id}
                    className="col-span-12 md:col-span-6 relative"
                  >
                    <Link
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="ml-3 mb-2 xl:mb-0 overflow-hidden float-right relative">
                        <div>
                          <Image
                            alt={post_title}
                            width={330}
                            height={186}
                            decoding="async"
                            className="w-[124px] h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out"
                            src={image_thumb}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <h2 className="text-lg text-[var(--dark)]    dark:text-white   ">
                        {post_title}
                      </h2>

                      <TimeBefore title={post_date} />
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                className="flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm"
                disabled={isLoadingMoreData}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                See more
                {isLoadingMoreData && <Spin />}
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="-mt-3">
              <div>
                <div className="mt-3 mb-3 border-[var(--border-color)] border-t-2 border-b-[2px] dark:border-[var(--border-dark)]">
                  <h4 className="text-[var(--primary)] text-xl md:text-2xl dark:text-white">
                    Latest news
                  </h4>
                </div>

                {/* lates news vertical */}
                <LatestNewsVertical />
              </div>
            </div>
            <div className="mt-3 lg:sticky lg:top-[4rem]">
              <div className="w-full flex items-center justify-center">
                <div className="h-[250px]">ads here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
