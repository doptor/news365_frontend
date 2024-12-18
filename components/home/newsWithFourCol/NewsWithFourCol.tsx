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
}

const NewsWithFourCol = ({ data }: NewsProps) => {
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 md:before:[&>*:nth-child(1)]:h-[1px] lg:before:[&>*:nth-child(1)]:h-0 md:before:[&>*:nth-child(2)]:h-[1px] lg:before:[&>*:nth-child(2)]:h-0 md:after:[&>*:nth-child(2)]:w-0 lg:after:[&>*:nth-child(2)]:w-[1px] dark:after:bg-[var(--border-dark)] dark:before:[&>*]:bg-[var(--border-dark)] dark:after:[&>*]:bg-[var(--border-dark)]">
          {post?.slice(0, 4)?.map((item, i) => {
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
                className="col-span-12 md:col-span-6 lg:col-span-3 relative md:before:absolute md:before:bg-[var(--border-color)] md:before:w-full md:before:right-0 md:before:-bottom-3 after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0"
              >
                <div className="-mx-4 md:px-4">
                  <Link
                    className="group flex gap-3 md:gap-2 flex-col"
                    href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                  >
                    <div className="overflow-hidden relative w-full">
                      <div>
                        <Image
                          alt={post_title}
                          width={560}
                          height={315}
                          decoding="async"
                          className="w-full h-auto group-hover:scale-105 duration-700 ease-out"
                          src={image_thumb}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <h3 className="text-lg mx-4 md:mx-0 text-[var(--dark)]    dark:text-white   ">
                        {post_title}
                      </h3>
                    </div>
                  </Link>

                  <TimeBefore title={post_date} clss="ml-4 md:ml-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsWithFourCol;
