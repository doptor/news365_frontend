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
        // const logo = webSettingData.logo;
        const { logo, social_link } = webSettingData;
        const { fb, flickr, google, linkd, pin, tw, vimo, vk, youtube } = social_link;
        const topLinks: any[] = [
            { label: "আজকের পত্রিকা", key: "ajker", icon: faTableList, href: "javascript:void(0)", subMenu: [] },
            { label: "ই পেপার", key: "epaper", icon: faNewspaper, href: "https://epaper.dailyniropekkho.com/", subMenu: [] },
            { label: "আর্কাইভ", key: "archive", icon: faArchive, href: "javascript:void(0)", subMenu: [] },
            { label: "সোশ্যাল মিডিয়া", key: "social", icon: faThumbsUp, href: "javascript:void(0)", subMenu: [
                    { label: "facebook", href: fb },
                    { label: "twitter", href: tw },
                    { label: "youtube", href: youtube },
                ]
            },
        ];

        return (
            <div className="timebar border-b py-2">
                <div className="container px-4 py-2 mx-auto flex justify-between">
                    <div>
                        <Link href="/" aria-label="logo" > <Image src={logo} alt="logo" width={180} height={100} /></Link>
                    </div>
                    <div className="flex flex-wrap grow items-center justify-center ">
                        <ul className="flex gap-2 whitespace-nowrap">
                            {topLinks.map((item) => {
                                const { label, key, href } = item;
                                let li_class = "";
                                if (item.subMenu.length) li_class += " relative ";
                                if (key !== 'epaper') li_class += " hidden sm:flex ";
                                return (
                                    <li key={key} className={ li_class } 
                                        onMouseEnter={() => key === 'social' ? setOpenSubMenu(key) : setOpenSubMenu(null)}
                                        onMouseLeave={() => setOpenSubMenu(null)}
                                        >
                                        <Link className="flex items-center gap-1 py-[1px] px-3 text-md " href={href} >
                                            <div className="font-bold"><FontAwesomeIcon icon={item.icon} /> {label}</div>
                                        </Link>
                                        {item.key === openSubMenu ?
                                            <div className="absolute left-0 top-full pt-2 w-48 bg-white border rounded shadow-md z-50" onMouseLeave={() => setOpenSubMenu(null)}> {/* Mega menu */}
                                                <ul className="list-none p-2">
                                                    {item.subMenu.map((subItem: { label: string, href: string }) => (
                                                        <li key={subItem.label}>
                                                            <Link href={subItem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{subItem.label}</Link> </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            : null
                                        }
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

export default TopBar;