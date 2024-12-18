import { NewsItem } from "@/interface/post";
import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";
import SideCategoryNews from "../sideCategoryNews/SideCategoryNews";

interface NewsProps {
  dataOne: {
    position: string;
    category_name: string;
    slug: string;
    category_id: string;
    status: string;
    post: NewsItem[];
  };
  dataTwo: {
    position: string;
    category_name: string;
    slug: string;
    category_id: string;
    status: string;
    post: NewsItem[];
  };
}

const NewsWithLatestTwo = ({ dataOne, dataTwo }: NewsProps) => {
  const { category_id, category_name, position, post, slug, status } =
    dataOne || {};

  return (
    <section className="mt-[60px]">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)] mb-4 md:mb-0">
            <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1">
              <div className="flex items-center justify-between">
                <Link href={`/${slug}`}>
                  <h2 className="category-text">{category_name}</h2>
                </Link>
              </div>
            </div>
            <div className="relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-dark)]">
              {post?.slice(0, 1)?.map((item, i) => {
                const {
                  category_name,
                  image_large,
                  post_title,
                  stitle,
                  news_id,
                  category,
                  encode_titl,
                  post_date,
                } = item || {};

                return (
                  <div key={i} className="-mx-4 md:px-4">
                    <Link
                      className="flex flex-col md:flex-row gap-3 group mb-6"
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="w-full md:w-1/2">
                        <div className="overflow-hidden relative">
                          <div>
                            <Image
                              alt={post_title}
                              width={560}
                              height={315}
                              decoding="async"
                              className="w-full h-auto group-hover:scale-105 duration-700 ease-out"
                              src={image_large}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <h3 className="text-2xl left-9 mx-4 md:mx-0 text-[var(--dark)] mt-2 md:mt-0 lg:mt-2 mb-0 md:mb-2    dark:text-white    font-semibold">
                          {post_title}
                        </h3>
                        <p className="hidden md:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                          <span className="line-clamp-2">{stitle || ""}</span>
                        </p>

                        <TimeBefore
                          title={post_date}
                          clss="ml-4 md:ml-0 xl:absolute bottom-0 right-4"
                        />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col md:flex-row gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-dark)]">
              {post?.slice(1, 4)?.map((item, i) => {
                const {
                  category_name,
                  image_thumb,
                  post_title,
                  stitle,
                  news_id,
                  category,
                  encode_titl,
                  post_date,
                } = item || {};

                return (
                  <div
                    key={i}
                    className="w-full md:w-1/2 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:top-0 md:after:-right-3 md:after:last:w-0 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link
                      className="md:flex md:flex-col group"
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="overflow-hidden relative ml-2 md:ml-0 mb-2 float-right md:float-none">
                        <div>
                          <Image
                            alt={post_title}
                            width={330}
                            height={186}
                            decoding="async"
                            className="w-[124px] h-auto md:w-full md:h-auto group-hover:scale-105 duration-700 ease-out"
                            src={image_thumb}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <h3 className="mt-0 md:mt-2 order-1 md:order-2 text-lg text-[var(--dark)]    dark:text-white   ">
                        {post_title}
                      </h3>
                    </Link>

                    <TimeBefore title={post_date} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]">
            <SideCategoryNews data={dataTwo} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsWithLatestTwo;
