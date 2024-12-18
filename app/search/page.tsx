"use client";

import AddCard from "@/components/common/addCard/AddCard";
import { NewsItem } from "@/interface/post";
import CopyIcon from "@/public/icons/CopyIcon";
import FacebookIcon from "@/public/icons/FacebookIcon";
import WhatsAppIcon from "@/public/icons/WhatsAppIcon";
import Spin from "@/ui/spin/Spin";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import instance from "@/utils/instance";
import timestampToBangleDateWithTime from "@/utils/timestampToBangleDateWithTime";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import add1 from "/public/images/add1.png";
import SearchPageSkeleton from "@/components/skeleton/SearchPageSkeleton.js";

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Get the Search parameters
  const searchParams = useSearchParams();
  const searchSlug = searchParams.get("search_slug");

  useEffect(() => {
    if (pageNumber > 0) {
      // Set loading state to indicate data fetching is in progress
      setIsLoadingMore(true);

      // Fetch search results based on the search query
      (async () => {
        try {
          // Make an API request to fetch search results based on the search query
          const { data } = await instance.post("/search-post", {
            page_number: pageNumber,
            keyword: searchSlug,
          });

          if (data.code === 200) {
            setData((prev): any => [...prev, ...data.data]);

            setError("");
          }
        } catch (error: any) {
          // Handle errors and set appropriate error messages
          console.error(error);
          setError(error.response.data.message);
        } finally {
          // Reset loading state after data fetching is completed or encountered an error
          setIsLoadingMore(false);
        }
      })();
    } else {
      // Set loading state to indicate data fetching is in progress
      setIsLoading(true);

      // Fetch search results based on the search query
      (async () => {
        try {
          // Make an API request to fetch search results based on the search query
          const { data } = await instance.post("/search-post", {
            page_number: 0,
            keyword: searchSlug,
          });

          if (data.code === 200) {
            // Update the component's state with the retrieved search results data
            setData(data.data);

            // Clear any previous error messages
            setError("");
          }
        } catch (error: any) {
          // Handle errors and set appropriate error messages
          console.error(error);
          setError(error.response.data.message);
        } finally {
          // Reset loading state after data fetching is completed or encountered an error
          setIsLoading(false);
        }
      })();
    }

    // The effect will re-run whenever the `searchSlug` parameter changes
  }, [pageNumber, searchSlug]);

  useEffect(() => {
    const currentUrl = window.location.href;

    setCurrentUrl(currentUrl);
  }, []);

  // Decide what to render
  if (error)
    return (
      <div className="h-[300px] sm:h-[600px] flex items-center justify-center text-3xl text-[var(--dark)] dark:text-white">
        {error}
      </div>
    );

  if (isLoading) return <SearchPageSkeleton />;
  // return <ThreeDotsLoader clss={"h-[300px] sm:h-[600px]"} color="51c27c" />;

  return (
    <section className="py-[60px]">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 xl:col-start-2 xl:col-span-10">
            <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3">
              <div className="pb-1 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 items-center">
                <h1 className="text-xl md:text-2xl text-[var(--primary)] dark:text-[var(--primary)]">
                  Today&apos;s news
                </h1>
                <div className="w-auto flex items-center whitespace-nowrap justify-start min-h-[40px] md:min-h-[48px] print:hidden select-none">
                  <div className="flex items-center">
                    <FacebookShareButton
                      url={currentUrl}
                      title={"Today's news"}
                      quote={"Today's news"}
                      className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border"
                    >
                      <FacebookIcon />
                    </FacebookShareButton>

                    <WhatsappShareButton
                      url={currentUrl}
                      title={"Today's news"}
                      className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border"
                    >
                      <WhatsAppIcon />
                    </WhatsappShareButton>

                    <TwitterShareButton
                      url={currentUrl}
                      title={"Today's news"}
                      className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border"
                    >
                      <svg
                        className="w-4 h-4 fill-black dark:fill-white"
                        viewBox="0 0 512 512"
                      >
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                      </svg>
                    </TwitterShareButton>

                    <div
                      className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 bg-[var(--slate)] dark:bg-[var(--gray-1)] dark:text-white rounded-md items-center"
                      onClick={() => navigator.clipboard.writeText(currentUrl)}
                    >
                      <CopyIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7 lg:col-start-2 lg:col-span-6 xl:col-start-2 xl:col-span-7 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="flex flex-col pb-6">
              {data.map((itm: NewsItem) => {
                const {
                  news_id,
                  post_title,
                  stitle,
                  image_thumb,
                  category,
                  encode_titl,
                  time_stamp,
                } = itm;
                return (
                  <div
                    key={news_id}
                    className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link
                      className="group"
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="ml-2 md:ml-0 lg:ml-2 mb-2 xl:mb-0 overflow-hidden float-right relative">
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
                      <h2 className="text-lg mb-2 text-[var(--dark)]    dark:text-white   ">
                        {post_title}
                      </h2>
                      <p className="hidden lg:block text-base mb-2 text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                        {stitle}
                      </p>
                      <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                        {timestampToBangleDateWithTime(time_stamp)}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <button
                className="flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm"
                disabled={isLoadingMore}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                See more
                {isLoadingMore && <Spin clss="w-7 h-7" />}
              </button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="md:sticky md:top-[4.5rem]">
              <div className="w-full flex items-center justify-center">
                {/* <AddCard imgPath={add1} /> */}
                <Image
                  src={add1?.src}
                  width={add1.width}
                  height={add1.height}
                  alt=""
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
