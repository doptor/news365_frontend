import AddCard from "@/components/common/addCard/AddCard";
import { NewsItem } from "@/interface/post";
import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";

interface NewsProps {
  data: {
    position: string;
    category_name: string;
    slug: string;
    category_id: string;
    status: string;
    post: NewsItem[];
  };
  ads?: any;
}

const NewsRelatedWithAdd = ({ data, ads }: NewsProps) => {
  const { category_id, category_name, position, post, slug, status } =
    data || {};

  return (
    <section className="mt-[60px]">
      <div className="container px-4 mx-auto">
        <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1">
          <div className="flex items-center justify-between">
            <Link href={`/${slug}`}>
              <h2 className="category-text">{category_name}</h2>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]">
          <div className="col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-5 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
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
                    className="group flex flex-col gap-0 md:flex-row md:gap-3 lg:flex-col lg:gap-0"
                    href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                  >
                    <div className="overflow-hidden w-full md:w-1/2 lg:w-full relative">
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
                    <div className="w-full md:w-1/2 lg:w-full">
                      <h3 className="text-2xl left-9 mx-4 md:mx-0 mt-2 md:mt-0 lg:mt-2 mb-0 md:mb-2 text-[var(--dark)]    dark:text-white    font-semibold">
                        {post_title}
                      </h3>
                      <p className="hidden md:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
                        <span className="line-clamp-2">{stitle || ""}</span>
                      </p>

                      <TimeBefore title={post_date} clss="ml-4 md:ml-0" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="flex flex-col">
              {post?.slice(1, 5)?.map((item, i) => {
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
                    className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link
                      className="group"
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className="ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative">
                        <div>
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
                      </div>
                      <h3 className="text-lg text-[var(--dark)]    dark:text-white   ">
                        {post_title}
                      </h3>
                    </Link>
                    <TimeBefore title={post_date} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="flex justify-center mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]">
              <div className="w-full flex items-center justify-center">
                <div className="h-[250px]">
                  {/* home ads 16 here */}
                  <AddCard imgPath={ads?.home_16} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              {post?.slice(5, 6)?.map((item, i) => {
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
                  <Link
                    key={i}
                    className="group"
                    href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                  >
                    <div className="ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative">
                      <div>
                        <Image
                          alt={post_title}
                          width={330}
                          height={186}
                          decoding="async"
                          className="w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out"
                          src={image_thumb}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h3 className="text-lg text-[var(--dark)]    dark:text-white   ">
                      {post_title}
                    </h3>

                    <TimeBefore title={post_date} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsRelatedWithAdd;
