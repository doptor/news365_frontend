import { NewsItem } from "@/interface/post";
import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";

type TopBreakingProps = {
  title: string;
  background_color: string;
  post: NewsItem[];
};

const HotNews = ({ data }: { data: TopBreakingProps }) => {
  const { background_color, post, title } = data || {};

  return (
    <section
      className="py-5 md:py-10"
      style={{ backgroundColor: background_color }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center border-t-2 border-b-[1px] border-slate-500 mb-3">
          <Link
            className="text-[var(--dark)] dark:text-white text-2xl md:text-3xl py-2"
            href="/"
          >
            {title}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b-[1px] border-slate-500 pb-1">
          {post?.map((itm) => {
            const {
              news_id,
              category,
              encode_titl,
              post_title,
              image_thumb,
              post_date,
            } = itm || {};

            return (
              <div
                key={news_id}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Link
                  className="group"
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  <div className="w-[124px] h-auto lg:w-[130px] lg:h-[95px] mr-3 mb-2 overflow-hidden float-left relative">
                    <div>
                      <Image
                        alt={post_title}
                        width={160}
                        height={90}
                        decoding="async"
                        className="w-[124px] h-auto lg:w-[130px] lg:h-[95px] object-cover group-hover:scale-105 duration-700 ease-out"
                        src={image_thumb}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h2 className="text-[var(--dark)] dark:text-white ">
                    {post_title}
                  </h2>

                  <TimeBefore title={post_date} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HotNews;
