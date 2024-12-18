"use client";

import { NewsItem } from "@/interface/post";
import CalenderIcon from "@/public/icons/CalenderIcon";
import MagnifyIcon from "@/public/icons/MagnifyIcon";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import formateDateYMD from "@/utils/formateDateYMD";
import instance from "@/utils/instance";
import timestampToBangleDateWithTime from "@/utils/timestampToBangleDateWithTime";
import { addDays, subDays } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import useSWR from "swr";
import ArchiveSkeleton from "@/components/skeleton/ArchiveSkeleton";

type SubCategory = {
  menu_lavel: string;
  slug: string;
  menu_content_id: number;
};

type CategoryItem = {
  menu_lavel: string;
  slug: string;
  menu_content_id: number;
  categorieslevelone: SubCategory[];
};

type CategoryData = CategoryItem[];

export default function ArchivePage() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [category, setCategory] = useState("");

  const [archiveData, setArchiveData] = useState<NewsItem[]>([]);
  const [isArchiveLoading, setIsArchiveLoading] = useState(false);
  const [archiveError, setArchiveError] = useState("");

  //sidebar-categories API call. And get categories data
  const {
    data,
    error,
    isLoading,
  }: { data: CategoryData; error: any; isLoading: boolean } = useSWR(
    "/sidebar-categories",
    fetcher
  );

  // @/latest-post API call. And get latest post data
  const {
    data: latestData,
    error: latestError,
    isLoading: latestIsLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    "/latest-post",
    fetcher
  );

  /**
   * Fetches archive data based on specified date range, category, and page number.
   *
   * This asynchronous function retrieves archived posts from the server based on the provided check-in
   * and check-out dates, category, and the specified page number. It formats the dates to the 'YYYY-MM-DD'
   * format, makes an API request to fetch the data, and updates the state with the retrieved archive posts.
   * If no data is found, it handles errors and sets appropriate error messages. This function is typically
   * called when paginating through archived records, applying date and category filters, providing a dynamic
   * way to load and display archive data based on user interactions.
   *
   * @param {number} page_number - The page number to be fetched from the server (pagination parameter).
   */
  const getArchiveData = async (page_number: number) => {
    /**
     * Formats the date to the 'YYYY-MM-DD' format.
     *
     * This function takes a string representation of a date and
     * formats it to the 'YYYY-MM-DD' format.
     *
     * @param {string} - The string representation of date to be formatted.
     * @returns {string} The formatted date in the 'YYYY-MM-DD' format.
     */
    const checkIn = formateDateYMD(String(checkInDate));
    const checkOut = formateDateYMD(String(checkOutDate));

    setIsArchiveLoading(true);

    try {
      const { data } = await instance.post("/archive-posts", {
        page_number,
        from_date: checkIn,
        to_date: checkOut,
        category_slug: category,
      });

      setArchiveError("");

      if (page_number === 0) {
        setArchiveData(data.data);
      } else {
        setArchiveData((prev) => [...prev, ...data.data]);
      }
    } catch (error: any) {
      setIsArchiveLoading(false);

      if (error.response.status === 404) {
        setArchiveError("কোন তথ্য পাওয়া যায়নি");
        setArchiveData([]);
      }

      console.error(error.message);
    } finally {
      setIsArchiveLoading(false);
    }
  };

  /**
   * Reset archive data and filters.
   *
   * This function resets the selected check-in and check-out dates, category filter,
   * and archive data, clearing any previously loaded or filtered information. It's typically
   * used when a user wants to reset the archive data view, providing a clean slate for
   * new date and category selections or when the user wants to clear the current filters.
   */
  const getAllArchiveData = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
    setCategory("");
    setArchiveData([]);
    setArchiveError("");
  };

  /**
   * Handle change events for category selection.
   *
   * This function is an event handler used for category selection components. It takes an event object `e`
   * and updates the `category` state with the selected value. This function is typically associated with
   * dropdowns or input elements where users can select a category, ensuring that the application state stays
   * synchronized with the user's selection.
   *
   * @param {Event} e - The event object representing the category selection change.
   */
  const onChangeHandler = (e: any) => {
    setCategory(e.target.value);
  };

  if (latestError) return <div>There was an Error!</div>;
  if (latestIsLoading) return <ArchiveSkeleton />;

  return (
    <section className="mt-[60px]">
      <div className="container mx-auto px-4">
        <div className="mb-3 border-b-[1px] border-[var(--border-color)]">
          <h1 className="text-[var(--primary)] text-xl md:text-2xl dark:text-white">
            Archive
          </h1>
        </div>
        <div className="relative mb-6 grid grid-cols-1 items-center gap-6 after:absolute after:-bottom-3 after:left-0 after:right-0 after:h-[1px] after:w-full after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] md:grid-cols-12">
          <div className="col-span-12 lg:col-span-10">
            <div className="relative grid grid-cols-12 gap-3 before:absolute before:-bottom-3 before:right-0 before:h-[1px] before:w-full before:bg-[var(--border-color)] dark:before:bg-[var(--border-color)] lg:before:-right-3 lg:before:top-0 lg:before:h-full lg:before:w-[1px]">
              <div className="col-span-6 lg:col-span-4">
                <div className="block w-full">
                  <div className="archive-date-picker w-full relative border">
                    <DatePicker
                      selected={checkInDate}
                      onChange={(date: any) => setCheckInDate(date)}
                      placeholderText="From date"
                      isClearable
                      maxDate={addDays(new Date(), 0)}
                      className="focus:outline-none w-full p-3 text-[var(--gray)] text-base placeholder:text-sm"
                    />
                    <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                      {!checkInDate && <CalenderIcon />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <div className="block w-full">
                  <div
                    className={`archive-date-picker w-full relative ${
                      checkInDate ? "border" : ""
                    }`}
                  >
                    <DatePicker
                      selected={checkOutDate}
                      onChange={(date: any) => setCheckOutDate(date)}
                      placeholderText="To date"
                      minDate={subDays(new Date(), 10)}
                      maxDate={addDays(new Date(), 0)}
                      isClearable
                      disabled={checkInDate ? false : true}
                      className="focus:outline-none w-full p-3 text-[var(--gray)] text-base placeholder:text-sm"
                    />
                    <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                      {!checkOutDate && <CalenderIcon />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-6 lg:col-span-4">
                <div className="w-full">
                  <select
                    className="border w-full rounded-sm p-3 text-base focus:outline-0 text-[var(--dark)] bg-slate-300 dark:bg-slate-300"
                    name="category"
                    onChange={onChangeHandler}
                  >
                    <option className="py-3 " value="" selected={!category}>
                      Category
                    </option>
                    {data?.map((itm) => {
                      const { menu_lavel, menu_content_id, slug } = itm;
                      return (
                        <option key={menu_content_id} value={slug}>
                          {menu_lavel}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-2">
            <div className="flex flex-row gap-3 lg:flex-col">
              <div className="flex w-full items-center justify-center">
                <button
                  className="flex w-full items-center justify-center rounded-sm py-2 text-base text-[var(--dark)] bg-gray-100"
                  onClick={getAllArchiveData}
                  disabled={archiveData?.length <= 0 && archiveError === ""}
                >
                  All news
                </button>
              </div>
              <div className="flex w-full items-center justify-center">
                <button
                  type="button"
                  className="w-full text-white text-lg bg-[var(--primary)] px-4 py-2 flex items-center justify-center hover:bg-[var(--primary)] rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => getArchiveData(0)}
                  disabled={
                    checkInDate === null &&
                    checkOutDate === null &&
                    category === ""
                  }
                >
                  <MagnifyIcon />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="relative col-span-12 after:absolute after:-bottom-3 after:right-0 after:h-[1px] after:w-full after:bg-[var(--border-color)] after:last:h-0 dark:after:bg-[var(--border-dark)] lg:after:-right-3 lg:after:top-0 lg:after:h-full lg:after:w-[1px] lg:after:last:w-0">
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:after:[&>*:nth-child(even)]:w-0 after:[&>*]:absolute after:[&>*]:-bottom-3 after:[&>*]:right-0 after:[&>*]:h-[1px] after:[&>*]:w-full after:[&>*]:bg-[var(--border-color)] md:before:[&>*]:absolute md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 md:before:[&>*]:h-[1px] md:before:[&>*]:w-full md:before:[&>*]:bg-[var(--border-color)] md:after:[&>*]:-right-3 md:after:[&>*]:top-0 md:after:[&>*]:h-full md:after:[&>*]:w-[1px] lg:after:[&>*:w-[1px] lg:after:[&>*:nth-child(even)]:w-[1px] lg:after:[&>*:nth-child(3n)]:!w-0 dark:after:[&>*]:bg-[var(--border-color)] dark:before:[&>*]:bg-[var(--border-color)]">
              {archiveData?.length <= 0 &&
                archiveError === "" &&
                latestData?.map((itm: NewsItem) => {
                  const {
                    news_id,
                    category,
                    encode_titl,
                    post_title,
                    time_stamp,
                    image_alt,
                    image_thumb,
                  } = itm;
                  return (
                    <Link
                      key={news_id}
                      className="group relative col-span-12 md:col-span-6 lg:col-span-4"
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="float-right mb-2 ml-3 overflow-hidden xl:mb-0">
                        <div>
                          <Image
                            alt={image_alt}
                            width={330}
                            height={186}
                            decoding="async"
                            className="h-auto w-[124px] object-cover duration-700 ease-out group-hover:scale-105 lg:h-[75px] lg:w-[110px] xl:h-[120px] xl:w-[180px]"
                            src={image_thumb}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <h2 className="text-lg text-[var(--dark)] dark:text-white">
                        {post_title}
                      </h2>

                      <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                        {timestampToBangleDateWithTime(time_stamp)}
                      </p>
                    </Link>
                  );
                })}

              {archiveData?.map((itm: NewsItem) => {
                const {
                  news_id,
                  category,
                  encode_titl,
                  post_title,
                  time_stamp,
                  image_alt,
                  image_thumb,
                } = itm;
                return (
                  <Link
                    key={news_id}
                    className="group relative col-span-12 md:col-span-6 lg:col-span-4"
                    href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                  >
                    <div className="float-right mb-2 ml-3 overflow-hidden xl:mb-0">
                      <div>
                        <Image
                          alt={image_alt}
                          width={330}
                          height={186}
                          decoding="async"
                          className="h-auto w-[124px] object-cover duration-700 ease-out group-hover:scale-105 lg:h-[75px] lg:w-[110px] xl:h-[120px] xl:w-[180px]"
                          src={image_thumb}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h2 className="text-lg text-[var(--dark)] dark:text-white">
                      {post_title}
                    </h2>

                    <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                      {timestampToBangleDateWithTime(time_stamp)}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="flex justify-center">
              {archiveError ? (
                <p className="w-full text-center text-[var(--dark)]">
                  No News found
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
