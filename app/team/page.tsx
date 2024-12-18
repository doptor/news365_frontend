"use client";

import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

type Member = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  photo: string;
  designation: string;
};

type Department = {
  department_name: string;
  id: number;
  member: Member[];
};

type DepartmentDataType = Department[];

export default function TeamPage() {
  const {
    data,
    error,
    isLoading,
  }: { data: DepartmentDataType; error: any; isLoading: boolean } = useSWR(
    "/teams",
    fetcher
  );

  if (error) return <div>There was an Error!</div>;

  if (isLoading)
    return <ThreeDotsLoader clss={"h-[300px] sm:h-[600px]"} color="51c27c" />;

  return (
    <section className="pb-10 pt-6 bg-[var(--slate)] dark:bg-gray-900">
      <div className="container px-3 mx-auto">
        {data.map((itm) => {
          const { department_name, id, member } = itm;

          return (
            <div key={id} className="">
              <div className="flex justify-center">
                <h1 className="text-2xl lg:text-3xl text-[var(--primary)] mb-6 inline-block relative before:absolute before:bg-gray-300 before:w-[80%] before:h-[2px] before:left-0 before:right-0 before:-bottom-1 before:mx-auto dark:text-white">
                  {department_name}
                </h1>
              </div>

              <div className="container py-3 px-1">
                <div className="flex flex-wrap justify-center -mx-4">
                  {member.map((m) => {
                    const { email, id, mobile, name, photo, designation } = m;
                    return (
                      <Link
                        key={id}
                        className="group w-full px-4 sm:w-1/2 md:w-1/3 xl:w-1/4 mb-10 cursor-pointer"
                        href={`/author/${id}`}
                      >
                        <div className="mx-auto w-full max-w-[370px] py-3 rounded bg-white">
                          <div className="flex flex-col items-center justify-center gap-5 rounded-lg">
                            <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                              <Image
                                alt={name}
                                width={400}
                                height={400}
                                decoding="async"
                                className="w-full group-hover:scale-105 duration-700 ease-in-out"
                                src={photo}
                                loading="lazy"
                              />
                            </div>
                            <div className="w-4/5 text-center">
                              <div className="relative px-3 py-2 overflow-hidden bg-[var(--slate)] dark:bg-gray-500/80 rounded-md group-hover:scale-105 duration-700 ease-in-out">
                                <h3 className="text-base font-semibold text-[var(--dark)] dark:text-white">
                                  {name}
                                </h3>
                                <p className="text-sm text-[var(--gray-2)] dark:text-white">
                                  {designation || ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
