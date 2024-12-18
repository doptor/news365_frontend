import AddCard from "@/components/common/addCard/AddCard";
import PhotoSlider from "@/components/slider/PhotoSlider";
import { Category } from "@/interface/photo";
import Link from "next/link";

const PhotoSectionOne = ({ data, ads }: { data: Category; ads: string }) => {
  const { category_name, posts, slug } = data;
  const {
    category,
    id,
    photos,
    post_by_id,
    post_by_image,
    post_by_name,
    title,
  } = posts[0];

  return (
    <section className="mt-[60px]">
      <div className="container px-4 mx-auto">
        <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1">
          <div className="flex items-center justify-between">
            <Link href={`/photo/${slug}`}>
              <h2 className="category-text">{category_name}</h2>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]">
          <div className="col-span-12 md:col-span-8 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="-mx-4 md:px-4">
              <div className="group flex flex-col gap-0">
                <div className="overflow-hidden w-full relative">
                  {/* photo slider */}
                  <PhotoSlider sliderData={{ category, id, photos }} />
                </div>
                <div className="w-full">
                  <Link
                    href={`/photo/${category}/${id}`}
                    className="text-2xl left-9 mx-4 md:mx-0 mt-2 md:mt-0 text-[var(--dark)]  dark:text-white   "
                  >
                    {title}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="w-full flex items-center justify-center mt-5 md:mt-0">
              <div className="h-[250px]">
                <AddCard imgPath={ads} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSectionOne;
