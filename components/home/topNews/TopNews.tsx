import AddCard from "@/components/common/addCard/AddCard";
import { NewsItem } from "@/interface/post";
import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";

interface TopNewsProps {
  data: NewsItem[];
  sideData: {
    position: string;
    category_name: string;
    slug: string;
    category_id: string;
    status: string;
    post: NewsItem[];
  };
  ads?: any;
}

const TopNews = ({ data, ads, sideData }: TopNewsProps) => {
  const { category_id, category_name, position, post, slug, status } =
    sideData || {};

  return (
    <section className="mt-5">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] after:absolute after:w-full md:after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3">
          <div className="col-span-12 md:col-span-6 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] after:absolute after:w-full after:h-0 md:after:w-[1px] md:after:h-full after:right-0 after:-bottom-3 md:after:top-0 md:after:-right-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="col-span-12 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] last:after:h-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]">
                {data?.slice(0, 1)?.map((itm, i) => {
                  const {
                    post_title,
                    post_date,
                    image_large,
                    stitle,
                    category_name,
                    news_id,
                    category,
                    encode_titl,
                  } = itm || {};

                  return (
                    <div key={i} className="-mx-4 md:px-4">
                      <div className="group flex flex-col lg:flex-row gap-3">
                        <div className="w-auto lg:w-1/2 order-2 mx-4 md:mx-2 relative">
                          <Link
                            href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                          >
                            <h1 className="text-2xl left-9 text-[var(--dark)] lg:mb-2 mr-2 md:mr-0    dark:text-white    font-semibold">
                              {post_title}
                            </h1>

                            <p className="hidden lg:block">
                              <span className="text-lg text-[var(--gray-2)] dark:text-[var(--gray-3)] overflow-hidden line-clamp-3">
                                {stitle}
                              </span>
                            </p>
                          </Link>

                          <ul className="mt-5 xl:mt-10">
                            {data.slice(1, 4).map((itm, i) => {
                              const { encode_titl, post_title, news_id } =
                                itm || {};
                              return (
                                <li
                                  key={news_id}
                                  className="before:h-2 before:w-2 before:rounded-full before:bg-black before:border relative before:absolute before:top-2 before:left-0"
                                >
                                  <Link
                                    href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                                    className="line-clamp-1 text-lg font-medium left-9 text-[var(--dark)] mb-2 mr-2 md:mr-0 ml-4    dark:text-white   "
                                  >
                                    {post_title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>

                          {/* <TimeBefore
                            title={post_date}
                            clss="xl:absolute bottom-0 right-4"
                          /> */}
                        </div>
                        <div className="w-full lg:w-1/2 overflow-hidden order-1 relative aspect-video">
                          <Link
                            href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                          >
                            <Image
                              alt={post_title}
                              width={560}
                              height={315}
                              decoding="async"
                              className="group-hover:scale-105 duration-700 ease-out w-full h-full"
                              src={image_large}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {data?.slice(4, 6)?.map((itm, i) => {
                    const {
                      post_title,
                      image_thumb,
                      post_date,
                      stitle,
                      category_name,
                      news_id,
                      category,
                      encode_titl,
                    } = itm || {};

                    return (
                      <div
                        key={i}
                        className="col-span-12 lg:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-bottom-3 lg:after:w-[1px] lg:after:h-full lg:after:top-0 lg:after:-right-3 lg:last:after:w-0 dark:after:bg-[var(--border-dark)]"
                      >
                        <Link
                          className="group"
                          href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                        >
                          <div className="ml-3 mb-1 md:mb-0 overflow-hidden float-right relative">
                            <div>
                              <Image
                                alt={post_title}
                                width={330}
                                height={186}
                                decoding="async"
                                className="w-[124px] h-auto xl:w-[200px] xl:h-[130px] object-cover group-hover:scale-105 duration-700 ease-out"
                                src={image_thumb}
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <h2 className="text-lg text-[var(--dark)]    dark:text-white    font-semibold">
                            {post_title}
                          </h2>
                          <p className="hidden lg:block">
                            <span className="text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-2 text-base line-clamp-2">
                              {stitle}
                            </span>
                          </p>

                          <TimeBefore title={post_date} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
            <div className="w-full flex items-center justify-center">
              <div className={`${ads?.home_12 ? "" : "h-[250px]"}`}>
                {/* home ads 12 here */}
                <AddCard imgPath={ads?.home_12} />
              </div>
            </div>

            {/* sidebar section */}
            <div className="md:mt-3 mb-7 md:mb-0">
              <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1">
                <div className="flex items-center justify-between">
                  <Link href={`/${slug}`}>
                    <h2 className="category-text">{category_name}</h2>
                  </Link>
                </div>
              </div>

              {post?.slice(0, 1)?.map((itm) => {
                const {
                  category_name,
                  image_thumb,
                  post_title,
                  stitle,
                  news_id,
                  category,
                  encode_titl,
                  post_by_name,
                  post_by_image,
                } = itm || {};

                return (
                  <Link
                    key={news_id}
                    className="flex gap-3 group"
                    href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                  >
                    <div>
                      <Image
                        alt={post_by_name}
                        width={100}
                        height={100}
                        decoding="async"
                        className="w-24 md:w-36 lg:w-24 rounded-full"
                        src={post_by_image}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg text-[var(--dark)]    dark:text-white   ">
                        {post_title}
                      </h2>
                      <p className="font-normal mt-2 text-gray-500 dark:text-gray-300">
                        {post_by_name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:left-0 md:after:[&>*]:w-[1px] md:after:[&>*]:h-full md:after:[&>*]:top-0 md:after:[&>*]:-left-3 md:after:[&>*:nth-child(3)]:w-0 md:after:[&>*:nth-child(4)]:w-0 md:after:[&>*:nth-child(6)]:w-0 md:after:first:[&>*]:w-0 lg:after:[&>*:nth-child(3)]:w-[1px] lg:after:[&>*:nth-child(4)]:w-[1px] lg:after:[&>*:nth-child(6)]:w-[1px] lg:after:[&>*:nth-child(5)]:w-0 dark:after:[&>*]:bg-[var(--border-dark)] md:before:[&>*]:absolute md:before:[&>*]:bg-[var(--border-color)] md:before:[&>*]:w-full md:before:[&>*]:h-[1px] md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 md:before:[&>*:nth-child(4)]:h-0 lg:before:[&>*:nth-child(n+4)]:h-0 dark:before:[&>*]:bg-[var(--border-dark)] dark:after:bg-[var(--border-dark)]">
          {data?.slice(6, 9)?.map((itm) => {
            const {
              post_title,
              image_thumb,
              post_date,
              stitle,
              category_name,
              news_id,
              category,
              encode_titl,
            } = itm || {};
            return (
              <div key={news_id} className="relative">
                <Link
                  className="group"
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  <div className="ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative">
                    <Image
                      alt={post_title}
                      width={160}
                      height={90}
                      decoding="async"
                      className="w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out"
                      src={image_thumb}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg text-[var(--dark)]    dark:text-white   ">
                    {post_title}
                  </h3>
                </Link>

                <TimeBefore
                  title={post_date}
                  // clss="xl:absolute bottom-0"
                />
              </div>
            );
          })}
          <div className="md:col-span-2 md:row-span-2 lg:col-span-1 md:order-1 lg:order-none relative">
            <div className="w-full flex items-center justify-center">
              <div className="home-right-b h-[250px]">
                {/* home ads 13 here */}
                <AddCard imgPath={ads?.home_13} />
              </div>
            </div>
          </div>
          {data?.slice(9, 12)?.map((itm) => {
            const {
              post_title,
              image_thumb,
              post_date,
              stitle,
              category_name,
              news_id,
              category,
              encode_titl,
            } = itm || {};
            return (
              <div key={news_id} className="relative">
                <Link
                  className="group"
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  <div className="ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative">
                    <Image
                      alt={post_title}
                      width={160}
                      height={90}
                      decoding="async"
                      className="w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out"
                      src={image_thumb}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg text-[var(--dark)]    dark:text-white   ">
                    {post_title}
                  </h3>
                </Link>

                <TimeBefore
                  title={post_date}
                  // clss="xl:absolute bottom-0"
                  clss="ml-4 md:ml-0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopNews;
