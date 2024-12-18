"use client";

import LatestNewsVertical from "@/components/common/latestNews/LatestNewsVertical";
import { NewsItem } from "@/interface/post";
import CopyIcon from "@/public/icons/CopyIcon";
import FacebookIcon from "@/public/icons/FacebookIcon";
import WhatsAppIcon from "@/public/icons/WhatsAppIcon";
import NotFoundBody from "@/ui/notFoundBody/NotFoundBody";
import Spin from "@/ui/spin/Spin";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import instance from "@/utils/instance";
import timestampToBangleDateWithTime from "@/utils/timestampToBangleDateWithTime";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import notFoundImg from "@/public/images/not-found.png";
import useSWR from "swr";

interface RelatedTopic {
  id: number;
  category_name: string;
  slug: string;
}

interface Profile {
  category_name: string;
  slug: string;
  category_imgae: string;
  description: string;
  related_topic: RelatedTopic[];
}

interface TopicData {
  profile: Profile;
  posts: NewsItem[];
}

export default function TopicNamePage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);
  const [moreData, setMoreData] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(0);

  const param = useParams();

  const {
    data,
    error,
    isLoading,
  }: { data: TopicData; error: any; isLoading: boolean } = useSWR(
    `/topic-posts/${param.topicName}?page_number=0`,
    fetcher
  );

  useEffect(() => {
    if (pageNumber > 0) {
      (async () => {
        setIsLoadingMoreData(true);
        try {
          const { data } = await instance.get(
            `/topic-posts/${param.topicName}?page_number=${pageNumber}`
          );

          setMoreData((prev) => [...prev, ...data.data.posts]);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingMoreData(false);
        }
      })();
    }
  }, [pageNumber, param.topicName]);

  useEffect(() => {
    const currentUrl = window.location.href;
    setCurrentUrl(currentUrl);
  }, []);

  // decide what to render
  //@TODO: When the error occurred
  if (error)
    return <NotFoundBody title={`  ${error.message}`} img={notFoundImg} />;

  //@TODO: When the loading
  if (isLoading)
    return <ThreeDotsLoader clss={"h-[300px] sm:h-[600px]"} color="51c27c" />;

  //@TODO: When No data found
  if (!data.posts.length)
    return (
      <NotFoundBody title="">
        <h2 className="text-7xl ">404</h2>
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

  // destructure data
  const { posts, profile } = data;
  const { category_imgae, category_name, description, related_topic, slug } =
    profile;

  return (
    <section className="py-[60px]">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="overflow-hidden lg:sticky lg:top-[4rem]">
              <div className="mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:left-0 dark:after:bg-[var(--border-dark)] min-h-[120px]">
                <Image
                  alt={category_name}
                  loading="lazy"
                  width={500}
                  height={500}
                  decoding="async"
                  className="rounded-md w-[120px] h-auto float-left mr-3"
                  src={category_imgae}
                />
                <h1 className="text-2xl md:text-3xl leading-9 md:leading-10 text-[var(--dark)] dark:text-white mb-2">
                  {category_name}
                </h1>

                <div className="text-lg text-[var(--gray-2)] mt-3 dark:text-white/80 max-h-[80px] md:max-h-max overflow-hidden md:overflow-visible">
                  <p>
                    <em>{category_name} : </em>
                    {description}
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-lg text-[var(--dark)] mb-2 dark:text-white">
                    Related thinks:
                  </p>

                  {related_topic.map((topic) => {
                    const { category_name, id, slug } = topic;
                    return (
                      <Link
                        key={id}
                        className="text-sm text-[var(--primary)] border border-[var(--primary)] rounded-full md:last:mr-0 dark:border-[var(--primary)] dark:text-[var(--primary)] text-center inline-block px-2 py-1 mb-3 mr-2 last:mr-0"
                        href={`/topic/${slug}`}
                      >
                        {category_name}
                      </Link>
                    );
                  })}
                </div>

                <div className="w-auto flex items-center whitespace-nowrap justify-start min-h-[40px] md:min-h-[48px]  print:hidden select-none">
                  <div className="flex items-center">
                    <FacebookShareButton
                      url={currentUrl}
                      title={category_name}
                      quote={category_name}
                      className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border"
                    >
                      <FacebookIcon />
                    </FacebookShareButton>

                    <WhatsappShareButton
                      url={currentUrl}
                      title={category_name}
                      className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border"
                    >
                      <WhatsAppIcon />
                    </WhatsappShareButton>

                    <TwitterShareButton
                      url={currentUrl}
                      title={category_name}
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
              <div className="w-full flex items-center justify-center"></div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-span-4 xl:col-span-5 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            {posts.slice(0, 1).map((itm) => {
              const {
                news_id,
                post_title,
                stitle,
                image_large,
                time_stamp,
                category,
                encode_titl,
              } = itm;
              return (
                <Link
                  key={news_id}
                  className="group flex flex-col relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]"
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  <div className="overflow-hidden relative">
                    <div>
                      <Image
                        alt={post_title}
                        width={560}
                        height={315}
                        decoding="async"
                        className="w-full h-auto group-hover:scale-105 duration-700 ease-out"
                        src={image_large}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl left-9 mt-2 md:mt-0 lg:mt-2 mb-0 md:mb-2 text-[var(--dark)]    dark:text-white   ">
                      {post_title}
                    </h3>
                    <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                      {timestampToBangleDateWithTime(time_stamp)}
                    </p>
                  </div>
                </Link>
              );
            })}
            <div className="flex flex-col py-6">
              {posts.slice(1, 11).map((itm: NewsItem) => {
                const {
                  news_id,
                  post_title,
                  stitle,
                  image_large,
                  image_thumb,
                  time_stamp,
                  category,
                  encode_titl,
                } = itm;
                return (
                  <div
                    key={news_id}
                    className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link
                      className="group"
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="mr-2.5 md:mr-0 lg:mr-2.5 mb-2 xl:mb-0 overflow-hidden float-left relative">
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
                      <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                        {timestampToBangleDateWithTime(time_stamp)}
                      </p>
                    </Link>
                  </div>
                );
              })}
              {moreData.map((itm: NewsItem) => {
                const {
                  news_id,
                  post_title,
                  stitle,
                  image_large,
                  image_thumb,
                  time_stamp,
                  category,
                  encode_titl,
                } = itm;
                return (
                  <div
                    key={news_id}
                    className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link
                      className="group"
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="mr-2.5 md:mr-0 lg:mr-2.5 mb-2 xl:mb-0 overflow-hidden float-left relative">
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
                      <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                        {timestampToBangleDateWithTime(time_stamp)}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              {moreData?.length > 0 ? (
                <button
                  className="flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm"
                  disabled={isLoadingMoreData}
                  onClick={() => setPageNumber((prev) => prev + 1)}
                >
                  See more
                  {isLoadingMoreData && <Spin clss="w-7 h-7" />}
                </button>
              ) : (
                ""
              )}
            </div>
            {/* <div className="flex justify-center">
              <button
                className="flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm"
                disabled={isLoadingMoreData}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                See more
                {isLoadingMoreData && <Spin clss="w-7 h-7" />}
              </button>
            </div> */}
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="md:sticky md:top-[4.5rem]">
              <div className="w-full flex items-center justify-center"></div>
              <div>
                <div className="mt-3 mb-3 border-[var(--border-color)] border-t-2 border-b-[2px] dark:border-[var(--border-dark)]">
                  <h4 className="text-[var(--primary)] text-xl md:text-2xl py-2 dark:text-[var(--primary)]">
                    Latest
                  </h4>
                </div>
                <LatestNewsVertical />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
