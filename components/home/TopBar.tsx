"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { useContext, useEffect, useState } from "react";
import "moment/locale/bn";

import Socials from "../common/socials/Socials";

import "@/app/datebar.css";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList, faNewspaper, faBoxArchive as faArchive, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {

    const [openSubMenu, setOpenSubMenu] = useState(null);

    const handleMouseEnter = (label: any) => {
        setOpenSubMenu(label);
    };

    const handleMouseLeave = () => {
        setOpenSubMenu(null);
    };

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
        const logo = webSettingData.logo;
        const { social_link } = webSettingData;
        const topLinks: any[] = [
            { label: "আজকের পত্রিকা", key: "ajker", icon: faTableList, href: "javascript:void(0)" },
            { label: "ই পেপার", key: "epaper", icon: faNewspaper, href: "https://epaper.dailyniropekkho.com/" },
            { label: "আর্কাইভ", key: "archive", icon: faArchive, href: "javascript:void(0)" },
            { label: "সোশ্যাল মিডিয়া", key: "social", icon: faThumbsUp, href: "javascript:void(0)" },
        ];

        return (
            <div className="timebar border-b py-2">
                <div className="container px-4 py-2 mx-auto flex justify-between">
                    <div>
                    <Link href="/" aria-label="logo" > <Image src={logo} alt="logo" width={180} height={100}/></Link>
                    </div>
                    <div className="hidden sm:flex flex-wrap items-center justify-center ">
                        <ul className="flex gap-2 whitespace-nowrap">
                            {topLinks.map((item) => {
                                const { label, key, href } = item;
                                return (
                                    <li key={key}>
                                        <Link className="flex items-center gap-1 py-[1px] px-3 text-md " href={href} >
                                            <div className="font-bold"><FontAwesomeIcon icon={item.icon} /> {label}</div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="hidden md:flex mb-1 gap-3 items-center justify-center ">
                        <Socials socialMediaLinks={social_link} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TopBar;