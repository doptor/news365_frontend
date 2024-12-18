"use client";

import AddCard from "@/components/common/addCard/AddCard";
import { Photo, Post } from "@/interface/photo";
import CameraIcon from "@/public/icons/CameraIcon";
import CopyIcon from "@/public/icons/CopyIcon";
import FacebookIcon from "@/public/icons/FacebookIcon";
import WhatsAppIcon from "@/public/icons/WhatsAppIcon";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
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
import useSWR from "swr";

interface PhotoPost {
  category_name: string;
  category: string;
  id: number;
  post_by_image: string;
  post_by_name: string;
  post_by_id: number;
  timestamp: number;
  title: string;
  photos: Photo[];
  related_post: { posts: Post[] };
  ads: {
    news_view_31: string;
    news_view_32: string;
  };
}

export default function PhotoCategoryPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const param = useParams();

  const {
    data,
    error,
    isLoading,
  }: { data: PhotoPost; error: any; isLoading: boolean } = useSWR(
    `photo-post?post_id=${param.id}`,
    fetcher
  );

  useEffect(() => {
    const currentUrl = window.location.href;

    setCurrentUrl(currentUrl);
  }, []);

  if (error) return <div>There was an Error!</div>;

  if (isLoading)
    return <ThreeDotsLoader clss={"h-[300px] sm:h-[600px]"} color="51c27c" />;

  if (!data.photos)
    return (
      <div className="h-[300px] sm:h-[600px] flex items-center justify-center text-2xl">
        No data found
      </div>
    );

  const {
    id,
    title,
    category,
    category_name,
    photos,
    post_by_id,
    post_by_image,
    post_by_name,
    timestamp,
    related_post,
    ads,
  } = data || {};

  return (
    <section className="mt-[60px]">
      <div className="container px-4 mx-auto print:px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 print:!block">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-bottom-3 lg:after:top-0 lg:after:-right-3 lg:after:w-[1px] lg:after:h-full dark:after:bg-[var(--border-dark)] print:!col-span-12 print:after:bg-transparent">
            <article>
              <div className="mb-3">
                <nav className="print:hidden pb-2">
                  <ol className="w-fit flex items-center gap-1 text-sm border-b border-[var(--border-color)] dark:border-[var(--border-dark)]">
                    <li>
                      <Link
                        className="block text-[var(--gray-1)] dark:text-[var(--slate)]"
                        href={`/photo/${category.toLowerCase()}`}
                      >
                        {category_name}
                      </Link>
                    </li>
                  </ol>
                </nav>
                <h1 className="text-[var(--dark)] text-3xl lg:text-4xl leading-[40px] lg:leading-[50px] mb-6 dark:text-white print:dark:text-[var(--dark)] print:text-2xl print:mb-2">
                  {title}
                </h1>
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-top-3 dark:after:bg-[var(--border-dark)] print:after:bg-transparent">
                  <div className="w-full md:w-1/2">
                    <div className="text-[var(--gray-2)] dark:text-[var(--gray-3)] text-sm">
                      <span>{timestampToBangleDateWithTime(timestamp)}</span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 print:hidden flex items-center whitespace-nowrap justify-start md:justify-end min-h-[40px] md:min-h-[48px] select-none">
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
                        onClick={() =>
                          navigator.clipboard.writeText(currentUrl)
                        }
                      >
                        <CopyIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {photos.map((item, i: number) => {
                const {
                  large_photo,
                  phot_title,
                  thumb_photo,
                  photo_reference,
                } = item;
                return (
                  <div
                    key={i}
                    className="mb-5 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-top-3 dark:after:bg-[var(--border-dark)] print:after:bg-transparent"
                  >
                    <div className="pt-5 pb-3">
                      <span className="text-2xl px-3 py-1 rounded-full border border-[var(--secondary)]">
                        {i + 1}/{photos.length}
                      </span>
                    </div>
                    <figure>
                      <Image
                        alt={phot_title}
                        width={1200}
                        height={675}
                        decoding="async"
                        className="w-full h-auto mb-1"
                        src={large_photo}
                      />
                    </figure>

                    <div className="text-base text-[var(--dark)] dark:text-white break-words mt-3 print:dark:text-[var(--dark)] print:text-base print:leading-7">
                      <div>
                        <strong className="inline">
                          <figcaption className="inline">
                            {phot_title}
                          </figcaption>
                          <figcaption className="inline text-xs italic">
                            {" | "}
                            Picture: {photo_reference}
                          </figcaption>
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </article>

            <div className="container mx-auto print:hidden">
              <div className="relative mt-6 mb-6 before:absolute before:bg-[var(--border-color)] before:w-full before:h-[1px] before:left-0 before:-top-3 after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:left-0 after:-bottom-2 print:hidden dark:before:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)]">
                <p className="text-[var(--primary)] text-xl md:text-2xl dark:text-white">
                  See more
                </p>
              </div>

              <div className="grid grid-cols-12 sm:grid-cols-12 gap-x-6 gap-y-1 sm:gap-6 after:[&>*:nth-child(2)]:w-0 sm:after:[&>*:nth-child(2)]:w-[1px] after:[&>*]:w-[1px] after:[&>*:last-child]:w-0 after:[&>*]:h-full print:hidden dark:after:[&>*]:bg-[var(--border-color)]">
                {related_post.posts.slice(0, 4).map((post) => {
                  const {
                    category,
                    category_name,
                    id,
                    photos,
                    post_by_id,
                    post_by_image,
                    post_by_name,
                    title,
                  } = post;
                  const { large_photo, phot_title, thumb_photo } = photos
                    ? photos[0]
                    : { large_photo: "", phot_title: "", thumb_photo: "" };
                  return (
                    <div
                      key={id}
                      className="col-span-6 sm:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:-bottom-3 after:top-0 after:-right-4 lg:after:-right-3 border-t sm:border-t-0 border-[var(--border-color)] pt-5 sm:pt-0"
                    >
                      <Link
                        className="group"
                        href={`/photo/${category.toLocaleLowerCase()}/${id}`}
                      >
                        <div className="ml-2 lg:ml-0 mb-2 overflow-hidden float-none lg:float-right relative">
                          <div>
                            <Image
                              alt={phot_title}
                              width={330}
                              height={186}
                              decoding="async"
                              className="w-[124px] h-auto lg:w-full lg:h-auto object-cover group-hover:scale-105 duration-700 ease-out"
                              src={thumb_photo}
                              loading="lazy"
                            />
                          </div>
                          <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                            <CameraIcon />
                          </div>
                        </div>
                        <h2 className="text-base text-[var(--dark)]    dark:text-white">
                          {title}
                        </h2>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 xl:col-span-3 print:hidden">
            <div className="xl:sticky xl:top-[4rem]">
              <div className="w-full flex items-center justify-center">
                <div className="h-[250px]">
                  <AddCard imgPath={ads.news_view_31} />
                </div>
              </div>
              <div className="mb-3 hidden lg:block">
                <div className="mt-3 mb-3 border-[var(--border-color)] border-t-[1px] border-b-[1px] dark:border-[var(--border-dark)]">
                  <h4 className="text-[var(--primary)] text-xl md:text-2xl py-2 dark:text-[var(--primary)]">
                    See more
                  </h4>
                </div>
                <div className="clss">
                  {related_post.posts.slice(0, 4).map((post) => {
                    const {
                      category,
                      category_name,
                      id,
                      photos,
                      post_by_id,
                      post_by_image,
                      post_by_name,
                      title,
                    } = post;
                    const { large_photo, phot_title, thumb_photo } = photos
                      ? photos[0]
                      : { large_photo: "", phot_title: "", thumb_photo: "" };
                    return (
                      <div
                        key={id}
                        className="after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] group relative after:absolute"
                      >
                        <div className="w-full flex mb-7">
                          <Link
                            className="grid grid-cols-2 gap-2.5 group relative after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)]"
                            href={`/photo/${category.toLocaleLowerCase()}/${id}`}
                          >
                            <h3 className="text-base text-[var(--dark)]    dark:text-white    md:leading-[1.62rem]">
                              {title}
                            </h3>

                            <div className="ml-2 md:ml-0 lg:ml-2 mb-2 relative">
                              <div className="flex justify-end w-full overflow-hidden">
                                <Image
                                  alt={phot_title}
                                  width={330}
                                  height={186}
                                  decoding="async"
                                  className="h-auto lg:h-[85px] w-[124px] lg:w-[144px] object-cover group-hover:scale-105 duration-700 ease-out"
                                  src={thumb_photo}
                                  loading="lazy"
                                />
                              </div>

                              <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                                <CameraIcon />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}

                  <div className="w-full flex items-center justify-center mb-6 relative">
                    <div className="h-[250px]">
                      <AddCard imgPath={ads.news_view_32} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
