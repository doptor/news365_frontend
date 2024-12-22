"use client";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import "@/app/breaking-news.css";

const BreakingNews = () => {
    const {
        data,
        error,
        isLoading,
    }: { data: any; error: any; isLoading: boolean } = useSWR(
        "/breaking-titles",
        fetcher
    );

    if (error) return <div>Error loading data</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto my-2">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center breaking-news bg-white">
                        <div className="d-flex justify-content-center align-items-center py-2 text-white px-1 scroller-title">
                            <span>Breaking</span>
                        </div>
                        <div className="marquee-wrapper">
                            <div className="marquee">
                                {data.map((entry: any) => {
                                    return <a className="mx-6" key={entry.news_title} href={"javascript:void(0)"}>{entry.news_title}</a>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BreakingNews;