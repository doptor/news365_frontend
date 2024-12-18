"use client";

import { PageData } from "@/interface/page";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import { usePathname } from "next/navigation";
import useSWR from "swr";

export default function AdvertisePage() {
  const pathName = usePathname();

  const {
    data,
    error,
    isLoading,
  }: { data: PageData; error: any; isLoading: boolean } = useSWR(
    `/page-data${pathName}`,
    fetcher
  );

  if (error) return <div>There was an Error!</div>;

  if (isLoading)
    return <ThreeDotsLoader clss={"h-[600px] sm:h-[900px]"} color="51c27c" />;

  const { description, title } = data;

  return (
    <section className="pt-[60px]">
      <div className="container px-4 md:px-48 mx-auto text-[var(--dark)]">
        <h2 className="text-2xl mb-4 font-semibold">{title}</h2>

        <div
          className="[&>p]:mb-4 [&>h1]:text-base [&>h1]:font-semibold [&>h4]:font-semibold [&>h1]:m-[24px_0_8px_0] [&>h4]:m-[24px_0_8px_0]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  );
}
