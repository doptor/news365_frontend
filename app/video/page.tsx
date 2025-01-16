"use client";

import instance from "@/utils/instance";
import Link from "next/link";
import {useEffect, useState} from "react";
import CategoryPageSkeleton from "@/components/skeleton/CategoryPageSkeleton";
import VideoEmbed from "@/components/VideoEmbed";

const VideoPage = () => {
    // const { theme } = useTheme();
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const {data} = await instance.get(
                `/videos?page=${page}&perPage=3`
            );
            setVideos(data.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, [page]);

    if (isLoading) return <CategoryPageSkeleton/>;

    return (
        <section className="py-[60px]">
            <div className="container px-4 mx-auto">
                <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3">
                    <div className="mb-0">
                        <Link className="block w-fit" href='/video'>
                            <h1 className="text-[var(--primary)] text-xl md:text-2xl dark:text-white">
                                ভিডিও
                            </h1>
                        </Link>
                    </div>
                </div>

                <div
                    className="py-5 grid grid-cols-1 md:grid-cols-12 gap-8 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]">
                    {videos.map(({category, id, title, url}: {category: string, id: number, title: string, url: string}, index) => (
                        <div
                            key={index}
                            className="col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-4 relative after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]">
                            <VideoEmbed videoUrl={url} width={100}/>
                        </div>
                    ))}

                </div>

                <div className="flex items-center justify-center mt-5">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">{page}</span>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>

            </div>
        </section>
    );
};

export default VideoPage;
