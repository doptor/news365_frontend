import AddCard from "@/components/common/addCard/AddCard";
import { Category } from "@/interface/photo";
import CameraIcon from "@/public/icons/CameraIcon";
import Image from "next/image";
import Link from "next/link";

const PhotoSectionTwo = ({ data, ads }: { data: Category; ads: string }) => {
  // check data
  if (!data) return <div>No data found</div>;

  // destruct data
  const { category_name, posts, slug } = data;

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]">
          <div className="col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:top-0 lg:after:-right-3 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-dark)]">
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
                const { large_photo, phot_title, thumb_photo } = photos
                  ? photos[0]
                  : { large_photo: "", phot_title: "", thumb_photo: "" };

                return (
                  <div key={id} className="-mx-4 md:px-4">
                    <Link
                      className="group flex flex-col-reverse lg:flex-col-reverse md:flex-row xl:flex-row gap-3"
                      href={`/photo/${slug}/${id}`}
                    >
                      <div className="w-full">
                        <div className="overflow-hidden relative">
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

                          <h2 className="w-full absolute bottom-0 left-0 text-lg text-white bg-neutral-900/80 p-2">
                            {phot_title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6">
              {posts.slice(1, 2).map((item, i: number) => {
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
                    className="block w-full md:w-full xl:w-1/2 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 xl:after:w-[1px] xl:after:h-full xl:after:top-0 xl:after:-right-3 xl:after:last:w-0 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link className="group" href={`/photo/${slug}/${id}`}>
                      <div className="overflow-hidden relative">
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

                        <h2 className="w-full absolute bottom-0 left-0 text-lg text-white bg-neutral-900/80 p-2">
                          {phot_title}
                        </h2>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:top-0 md:after:-right-3 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="flex flex-col">
              {posts.slice(2, 4).map((item, i: number) => {
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
                    className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]"
                  >
                    <Link className="group" href={`/photo/${slug}/${id}`}>
                      <div className="overflow-hidden relative">
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

                        <h2 className="w-full absolute bottom-0 left-0 text-lg text-white bg-neutral-900/80 p-2">
                          {phot_title}
                        </h2>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:top-0 md:after:-right-3 md:after:last:w-0 dark:after:bg-[var(--border-dark)]">
            <div className="w-full flex items-center justify-center">
              <div className="h-[250px]">
                {/* home ads 14 here */}
                <AddCard imgPath={ads} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSectionTwo;
