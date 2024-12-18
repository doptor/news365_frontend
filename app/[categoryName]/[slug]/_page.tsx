"use client";

import SingleNewsDetails from "@/components/singleNews/SingleNewsDetails";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import instance from "@/utils/instance";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

export default function SingleNewsPage() {
  const [page, setPage] = useState<number>(0);
  const [singlePost, setSinglePost] = useState<any>([]);
  const [isLoadingSingle, setIsLoadingSingle] = useState(true);

  const param = useParams();

  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    `/post-detail/${param.slug}`,
    fetcher
  );

  useEffect(() => {
    const relatedPost = data?.relatedPost;
    const relatedPostLength = relatedPost?.length;

    if (relatedPostLength > 0 && relatedPostLength > page) {
      const singleRelatedPost = relatedPost[page];

      (async () => {
        setIsLoadingSingle(true);

        try {
          const { data } = await instance.get(
            `/post-detail/${singleRelatedPost?.encode_titl}`
          );

          const da = [...singlePost, data.data];
          setSinglePost(da);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingSingle(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, page]);

  useEffect(() => {
    const relatedPost = data?.relatedPost;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 200
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    if (relatedPost?.length - 1 > page) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, page]);

  if (error) return <div>There was an Error!</div>;

  if (isLoading)
    return <ThreeDotsLoader clss={"h-[300px] sm:h-[600px]"} color="51c27c" />;

  return (
    <Fragment>
      <SingleNewsDetails data={data} clss="mt-[60px]" />

      {isLoadingSingle ? (
        <div className="w-full text-center">Loading</div>
      ) : (
        singlePost?.map((itm: any, i: any) => (
          <Fragment key={i}>
            <div className="h-10  my-10" />
            <SingleNewsDetails key={i} data={itm} />
          </Fragment>
        ))
      )}
    </Fragment>
  );
}
