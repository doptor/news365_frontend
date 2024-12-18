import { Post } from "@/interface/photo";
import CameraIcon from "@/public/icons/CameraIcon";
import Image from "next/image";
import Link from "next/link";

interface MixPost {
  posts: Post[];
}

const PhotoSectionFour = ({ data }: { data: MixPost }) => {
  // check data
  if (!data) return <div>No data found</div>;

  // destruct data
  const { posts } = data;

  return (
    <section className="mt-[60px]">
      <div className="container px-4 mx-auto">
        <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1">
          <div className="flex items-center justify-between">
            <h2 className="category-text">Aro</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 before:[&>*]:h-[1px] dark:before:[&>*]:bg-[var(--border-color)]">
          {posts.map((item, i: number) => {
            const {
              category,
              category_name,
              id,
              photos,
              post_by_id,
              post_by_image,
              post_by_name,
              timestamp,
              title,
            } = item;

            const { large_photo, phot_title, thumb_photo } = photos
              ? photos[0]
              : { large_photo: "", phot_title: "", thumb_photo: "" };

            return (
              <div
                key={id}
                className="col-span-12 md:col-span-6 lg:col-span-3 relative md:before:absolute md:before:bg-[var(--border-color)] md:before:w-full md:before:right-0 md:before:-bottom-3 after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 "
              >
                <div className="-mx-4 md:px-4">
                  <Link
                    className="group flex gap-3 md:gap-2 flex-col"
                    href={`/photo/${category}/${id}`}
                  >
                    <div className="overflow-hidden relative w-full">
                      <div>
                        <Image
                          alt={phot_title}
                          width={560}
                          height={315}
                          decoding="async"
                          className="w-full h-auto group-hover:scale-105 duration-700 ease-out"
                          src={thumb_photo}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                      <CameraIcon />
                    </div>
                    <div className="w-full">
                      <h3 className="text-lg mx-4 md:mx-0 text-[var(--dark)]    dark:text-white   ">
                        {phot_title}
                      </h3>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PhotoSectionFour;
