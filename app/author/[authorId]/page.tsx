"use client";

import AddBanner from "@/components/common/addBanner/AddBanner";
import AddCard from "@/components/common/addCard/AddCard";
import { NewsItem } from "@/interface/post";
import add_banner from "@/public/images/add_banner.png";
import NotFoundBody from "@/ui/notFoundBody/NotFoundBody";
import Spin from "@/ui/spin/Spin";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import instance from "@/utils/instance";
import timestampToBangleDateWithTime from "@/utils/timestampToBangleDateWithTime";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  name: string;
  mobile: string;
  email: string;
  photo: string;
  designation: string;
  posts: NewsItem[];
}

export default function AuthorPostsPage() {
  const [data, setData] = useState<UserData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { authorId } = useParams();

  /**
   * Fetch user-specific data on component mount.
   *
   * This effect hook is responsible for fetching user-specific data from the server
   * when the component is mounted. It triggers an API request with the user ID,
   * updates the component's state with the retrieved data, and handles loading and
   * error states during the process. The effect runs once, immediately after the
   * component is mounted, ensuring the user-specific data is fetched and displayed
   * upon component initialization.
   */
  useEffect(() => {
    if (pageNumber > 0) {
      (async () => {
        setIsLoadingMore(true);

        try {
          const { data } = await instance.post("/user-post", {
            page_number: pageNumber,
            id: +authorId,
          });

          if (data.code === 200) {
            setData((prev): any => {
              const prevPosts = prev?.posts ?? [];
              return { ...prev, posts: [...prevPosts, ...data.data.posts] };
            });

            setError("");
          }
        } catch (error: any) {
          console.error(error);

          setError(error.response.data.message);
        } finally {
          setIsLoadingMore(false);
        }
      })();
    } else {
      (async () => {
        setIsLoading(true);

        try {
          const { data } = await instance.post("/user-post", {
            page_number: 0,
            id: +authorId,
          });

          if (data.code === 200) {
            setData(data.data);

            setError("");
          }
        } catch (error: any) {
          console.error(error);

          setError(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [authorId, pageNumber]);

  if (error) return <NotFoundBody title={`  ${error}`} />;

  if (isLoading)
    return <ThreeDotsLoader clss={"h-[600px] sm:h-[900px]"} color="51c27c" />;

  // Destruct the data
  const {
    id,
    name,
    mobile,
    email,
    photo,
    posts = [],
    designation,
  } = data || {};

  return (
    <>
      {/* home ads 11 here */}
      <AddBanner imgPath={`${add_banner}`} />

      <section className="mt-[60px]">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-color]">
              <div className="flex flex-col items-center mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-color]">
                <div className="w-20 h-20 rounded-full mb-3 overflow-hidden">
                  <Image
                    alt={name || ""}
                    loading="lazy"
                    width={500}
                    height={500}
                    decoding="async"
                    // className="w-20 h-20 rounded-full mb-3"
                    src={photo || ""}
                  />
                </div>
                <h1 className="text-[var(--dark)] text-xl md:text-3xl mb-2 dark:text-white">
                  {name}
                </h1>
                <p className="text-[var(--gray-2)] text-base dark:text-[var(--gray-3)] mb-3">
                  {designation}
                </p>
              </div>
              <div className="flex flex-col items-center mx-0 md:mx-10 lg:mx-16 xl:mx-24">
                {posts?.slice(0, 1).map((itm) => {
                  const {
                    news_id,
                    post_title,
                    image_large,
                    image_alt,
                    stitle,
                    time_stamp,
                    encode_titl,
                  } = itm;
                  return (
                    <div
                      key={news_id}
                      className="mb-6 w-full relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-color]"
                    >
                      <Link
                        className="flex gap-2 md:gap-3 flex-col md:flex-row group"
                        href={`/opinion/${encode_titl}`}
                      >
                        <div className="w-full md:w-1/2 overflow-hidden relative">
                          <div>
                            <Image
                              alt={image_alt}
                              width={560}
                              height={315}
                              decoding="async"
                              className="group-hover:scale-105 duration-700 ease-out"
                              src={image_large}
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="w-full md:w-1/2">
                          <h2 className="text-2xl leading-9 text-[var(--dark)] mb-0 md:mb-2 group-   dark:text-white">
                            {post_title}
                          </h2>
                          <p className="hidden md:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                            <span className="line-clamp-3">{stitle}</span>
                          </p>
                          <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-4">
                            {timestampToBangleDateWithTime(time_stamp)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
                {posts?.slice(1).map((itm) => {
                  const {
                    news_id,
                    post_title,
                    image_thumb,
                    image_alt,
                    stitle,
                    time_stamp,
                    encode_titl,
                  } = itm;
                  return (
                    <div
                      key={news_id}
                      className="w-full mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-color]"
                    >
                      <Link className="group" href={`/opinion/${encode_titl}`}>
                        <div className="ml-2 lg:ml-2 mb-2 lg:mb-0 overflow-hidden float-right relative">
                          <div>
                            <Image
                              alt={image_alt}
                              width={330}
                              height={186}
                              decoding="async"
                              className="w-[124px] h-auto md:w-[110px] md:h-[75px] lg:w-[180px] lg:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out"
                              src={image_thumb}
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <h2 className="text-xl text-[var(--dark)] group-   mb-2 dark:text-white">
                          {post_title}
                        </h2>
                        <p className="hidden md:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                          <span className="line-clamp-2">{stitle}</span>
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
                {posts?.length > 0 ? (
                  <button
                    className="flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm"
                    disabled={isLoadingMore}
                    onClick={() => setPageNumber((prev) => prev + 1)}
                  >
                    See more
                    {isLoadingMore && <Spin />}
                  </button>
                ) : (
                  <h2 className="text-xl capitalize text-red-200">
                    No data found
                  </h2>
                )}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-color]">
              <div className="sticky top-[4.5rem]">
                <div className="w-full flex items-center justify-center">
                  <div className="h-[250px]">
                    <AddCard imgPath={`${add_banner}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
