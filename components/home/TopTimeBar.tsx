"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { useContext, useEffect, useState } from "react";
import "moment/locale/bn";

import moment from "moment";
import Socials from "../common/socials/Socials";

import "@/app/datebar.css";
import Link from "next/link";

const TopTimeBar = () => {
    const format = 'dddd, Do MMMM YYYY | a h:mm মিনিট';

    const [timenow, setTimeNow] = useState(moment().format(format));
    
    useEffect(() => {
        const intervalId = setInterval(() => setTimeNow(moment().format(format)), 1000*60);
        return () => clearInterval(intervalId);
    }, []);

    const {
        data: webSettingData,
        error: webSettingError,
        isLoading: webSettingLoading,
    } = useContext(WebSettingContext);

    let content;

    if (webSettingError)
        content = <div className="text-center">There was an Error!</div>;

    if (webSettingLoading) content = <div className="text-center"></div>;

    if (webSettingData) {
        const { social_link } = webSettingData;
        const topLinks: any[] = [
            { label: "আজকের পত্রিকা", href: "javascript:void(0)" },
            { label: "ই পেপার", href: "https://epaper.dailyniropekkho.com/" },
            { label: "আর্কাইভ", href: "javascript:void(0)" },
            { label: "সোশ্যাল মিডিয়া", href: "javascript:void(0)" },
        ];

        moment.locale('bn');
        const location = "";
        // const timenow = moment().format('dddd, Do MMMM YYYY | a h:mm মিনিট');

        return (
            <div style={{ background: "#a00303", color: "white" }} className="timebar">
                <div className="container px-4 py-2 mx-auto flex justify-between">
                    <div className="block sm:flex items-center">
                        <span className="topdate">{location + ' ' + timenow} </span>
                    </div>

                    <div className="hidden sm:flex flex-wrap items-center justify-center ">
                        <ul className="flex gap-2 whitespace-nowrap">
                            {topLinks.map((item) => {
                                const { label, href } = item;
                                return (
                                    <li key={label}>
                                        <Link className="flex items-center gap-1 py-[1px] px-3 text-md text-white" href={href} >
                                            <div className="font-bold">{label}</div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="hidden md:flex mb-1 gap-3 items-center justify-center text-white ">
                        <Socials socialMediaLinks={social_link} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TopTimeBar;