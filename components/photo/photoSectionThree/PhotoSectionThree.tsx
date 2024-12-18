import { Category } from "@/interface/photo";
import CameraIcon from "@/public/icons/CameraIcon";
import Image from "next/image";
import Link from "next/link";

const PhotoSectionThree = ({ data }: { data: Category }) => {
  const { category_name, posts, slug } = data;

  return (
    <section className="mt-[60px] pt-4 pb-8 ">
      <div className="container px-4 mx-auto">
        <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1">
          <div className="flex items-center justify-between">
            <Link href={`/photo/${slug}`}>
              <h2 className="category-text">{category_name}</h2>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]">
          <div className="col-span-12 md:col-span-12 lg:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            {posts.slice(0, 1).map((item, i: number) => {
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
              const { large_photo, phot_title, photo_reference, thumb_photo } =
                photos[0];

              return (
                <div key={i} className="-mx-4 md:px-4">
                  <Link
                    href={`/photo/${slug}/${id}`}
                    className="group flex flex-col gap-0"
                  >
                    <div className="overflow-hidden w-full relative">
                      <div>
                        <Image
                          alt={phot_title}
                          width={560}
                          height={315}
                          decoding="async"
                          className="w-full h-auto group-hover:scale-105 duration-700 ease-out"
                          src={large_photo}
                          loading="lazy"
                        />
                      </div>

                      <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                        <CameraIcon />
                      </div>
                    </div>
                    <div className="w-full">
                      <h3 className="text-2xl left-9 mx-4 md:mx-0 mt-2 md:mt-0 lg:mt-2     dark:text-white   ">
                        {phot_title}
                      </h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="flex flex-col">
              {posts.slice(1, 3).map((item, i: number) => {
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
                    key={i}
                    className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link
                      className="group mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0"
                      href={`/photo/${category}/${id}`}
                    >
                      <div className="overflow-hidden relative">
                        <div>
                          <Image
                            alt={phot_title}
                            width={350}
                            height={186}
                            decoding="async"
                            className="w-full h-auto lg:w-[220px] lg:h-[150px] xl:w-[320px] xl:h-[200px] object-cover group-hover:scale-105 duration-700 ease-out"
                            src={thumb_photo}
                            loading="lazy"
                          />
                        </div>
                        <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                          <CameraIcon />
                        </div>
                      </div>
                      <h3 className="mt-1 text-lg     dark:text-white   ">
                        {phot_title}
                      </h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="flex flex-col">
              {posts.slice(3, 5).map((item, i: number) => {
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
                    key={i}
                    className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link
                      className="group mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0"
                      href={`/photo/${category}/${id}`}
                    >
                      <div className="overflow-hidden relative">
                        <div>
                          <Image
                            alt={phot_title}
                            width={350}
                            height={186}
                            decoding="async"
                            className="w-full h-auto lg:w-[220px] lg:h-[150px] xl:w-[320px] xl:h-[200px] object-cover group-hover:scale-105 duration-700 ease-out"
                            src={thumb_photo}
                            loading="lazy"
                          />
                        </div>
                        <div className="w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]">
                          <CameraIcon />
                        </div>
                      </div>

                      <h3 className="mt-1 text-lg dark:text-white">
                        {phot_title}
                      </h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSectionThree;
