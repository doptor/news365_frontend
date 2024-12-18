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

const SideCategoryNews = ({ data }: NewsProps) => {
  const { category_id, category_name, position, post, slug, status } =
    data || {};
  return (
    <>
      <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1">
        <div className="flex items-center justify-between">
          <Link href={`/${slug}`}>
            <h2 className="category-text">{category_name}</h2>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        {post?.slice(0, 4).map((item, i) => {
          const {
            category_name,
            image_thumb,
            post_title,
            stitle,
            news_id,
            category,
            encode_titl,
            post_date,
          } = item;

          return (
            <div
              key={i}
              className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]"
            >
              <div className="-mx-4 md:px-4">
                <Link
                  className="group block"
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  <div className="ml-0 lg:ml-2 mb-2 xl:mb-0 overflow-hidden float-right relative">
                    <div>
                      <Image
                        alt={post_title}
                        width={560}
                        height={315}
                        decoding="async"
                        className="w-full h-auto md:w-[124px] md:h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out"
                        src={image_thumb}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h3 className="mx-4 md:mx-0 text-lg text-[var(--dark)]    dark:text-white   ">
                    {post_title}
                  </h3>
                </Link>

                <TimeBefore title={post_date} clss="ml-4 md:ml-0" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SideCategoryNews;
