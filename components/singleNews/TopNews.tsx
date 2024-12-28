"use client";

/**
 * sidebar for single news details page
 */

import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";

interface NewsProps {
    news_id: number;
    post_title: string;
    image_thumb: string;
    image_alt: string
    category: string;
    encode_titl: string;
}

function NewsList({ posts }: { posts: NewsProps[] }) {
    return <div className="last:[&>*]:mb-0 after:last:[&>*]:h-0">
        {
            posts.map((post: NewsProps) => {
                const {
                    news_id,
                    post_title,
                    image_thumb,
                    image_alt,
                    category,
                    encode_titl,
                } = post;
                return (
                    <div
                        key={news_id}
                        className="after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 dark:after:bg-[var(--border-dark)] group relative"
                    >
                        <div className="flex mb-6">
                            <div className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)] w-full">
                                <Link
                                    className="group"
                                    href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                                >
                                    <div className="md:hidden ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative">
                                        <div>
                                            <Image
                                                alt={image_alt}
                                                width={330}
                                                height={186}
                                                decoding="async"
                                                className="w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out"
                                                src={image_thumb}
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-lg text-[var(--dark)] grou;p-   dark:text-white">
                                        {post_title}
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    </div>;
}

function TopNews() {

    const [tab1Active, setTab1Active] = useState(true);
    const [tab2Active, setTab2Active] = useState(false);

    const popularData = useSWR(
        "/populer-post",
        fetcher
    );
    const latestData = useSWR(
        "/latest-post",
        fetcher
    );

    if (popularData.isLoading || latestData.isLoading) {
        return <div></div>;
    }

    return <div className="tab-container">
        <input type="radio" id="tab1" name="tab" className="tab-input" checked={tab1Active} onChange={() => {
            setTab1Active(true);
            setTab2Active(false);
        }} />
        <label htmlFor="tab1" className="tab-label">সর্বাধিক পঠিত</label>

        <input type="radio" id="tab2" name="tab" className="tab-input" checked={tab2Active} onChange={() => {
            setTab1Active(false);
            setTab2Active(true);
        }} />
        <label htmlFor="tab2" className="tab-label">সর্বশেষ</label>

        <div className="tab-panel" id="panel1">
            <NewsList posts={popularData.data.slice(0,10)} />
        </div>
        <div className="tab-panel" id="panel2">
        <NewsList posts={latestData.data.slice(0,10)} />
        </div>
    </div>;
}

export default TopNews;