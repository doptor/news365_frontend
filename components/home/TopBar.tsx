"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { useContext, useEffect, useState } from "react";
import "moment/locale/bn";

import Socials from "../common/socials/Socials";

import "@/app/datebar.css";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTableList,
    faNewspaper,
    faBoxArchive as faArchive,
    faThumbsUp,
    faTv,
    IconDefinition,

} from '@fortawesome/free-solid-svg-icons';

import { faFacebookF, faYoutube, faXTwitter, faTiktok, faLinkedin, faInstagram, faYoutubeSquare, faTwitterSquare, faFacebookSquare, faLinkedinIn, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import SideBar from "../sideBar/SideBar";
import { useTheme } from "next-themes";
import MenuIcon from "@/public/icons/MenuIcon";

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    if (!array || chunkSize <= 0) {
        return [];
    }

    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}

const TopBar = () => {

    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const { theme, setTheme } = useTheme();

    const {
        data: webSettingData,
        error: webSettingError,
        isLoading: webSettingLoading,
    } = useContext(WebSettingContext);

    let content;

    const handleSidebar = () => {
        // Toggle the value of `showSidebar` to show or hide the sidebar
        setShowSidebar(!showSidebar);
      };

      const handleTheme = () => {
        // Toggle the theme between "dark" and "light" based on the current theme state
        setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
      };

    if (webSettingError)
        content = <div className="text-center">There was an Error!</div>;

    if (webSettingLoading) content = <div className="text-center"></div>;

    if (webSettingData) {
        // const logo = webSettingData.logo;
        const { logo, social_link } = webSettingData;
        const { fb, tw, linkd, insta, youtube, tiktok } = social_link;
        const topLinks: any[] = [
            {
                label: "ই পেপার",
                key: "epaper",
                icon: faNewspaper,
                href: "https://epaper.dailyniropekkho.com/",
                subMenu: []
            },
            { label: "আর্কাইভ", key: "archive", icon: faArchive, href: "javascript:void(0)", subMenu: [] },
            {
                label: "সোশ্যাল মিডিয়া", key: "social", icon: faThumbsUp, href: "javascript:void(0)",
                subMenu: [
                    fb && { label: "Facebook", icon: faFacebookSquare, icon_color: "#1877F2", href: fb.split(',') },
                    youtube && { label: "Youtube", icon: faYoutubeSquare, icon_color: "#FF0000", href: youtube.split(',') },
                    tiktok && { label: "Tiktok", icon: faTiktok, icon_color: "#000000", href: tiktok.split(',') },
                    linkd && { label: "LinkedIn", icon: faLinkedinIn, icon_color: "#0077B5", href: linkd.split(',') },
                    tw && { label: "X.com", icon: faTwitterSquare, icon_color: "#1DA1F2", href: tw.split(',') },
                    insta && { label: "Instagram", icon: faInstagramSquare, icon_color: "#C13584", href: insta.split(',') },
                ].filter(Boolean)
            },
        ];

        return (
            <div className="timebar border-b py-2 ">
                <div className="container px-4 py-2 mx-auto flex justify-between">
                    <div>
                        <Link href="/" aria-label="logo"> <Image src={logo} alt="logo" width={180} height={100} /></Link>
                    </div>
                    <div className="flex flex-wrap grow items-center justify-center print:hidden">
                        <ul className="flex gap-2 whitespace-nowrap">
                            {topLinks.map((item) => {
                                const { label, key, href } = item;
                                let li_class = "";
                                if (item.subMenu.length) li_class += " relative ";
                                if (key !== 'epaper') li_class += " hidden sm:flex ";
                                return (
                                    <li key={key} className={li_class}
                                        onMouseEnter={() => key === 'social' ? setOpenSubMenu(key) : setOpenSubMenu(null)}
                                        onMouseLeave={() => setOpenSubMenu(null)}
                                    >
                                        <Link className="flex items-center gap-1 py-[1px] px-3 text-md " href={href}>
                                            <div className="font-bold"><FontAwesomeIcon icon={item.icon} /> {label}</div>
                                        </Link>
                                        {item.key === openSubMenu ?
                                            <div
                                                className="absolute -right-60 top-full pt-2 w-48z bg-white border rounded shadow-md z-50"
                                                onMouseLeave={() => setOpenSubMenu(null)}
                                            > {/* Mega menu */}
                                                <div className=" p-2">
                                                    {item.subMenu.map((subItem: { label: string, icon: IconDefinition, icon_color: string, href: string[] }) => (
                                                        <div key={subItem.label} className="px-2">
                                                            <div>{subItem.label}</div>
                                                            <div>
                                                                {
                                                                    chunkArray(subItem.href, 4).map((urlList) => {
                                                                        return <div key={urlList.join(',')} className="flex">
                                                                            {urlList.map((url: string) => {
                                                                                const urlParts = url.split('/').filter((part) => part);
                                                                                const name = urlParts[urlParts.length - 1];
                                                                                return <div className="flex-grow-0 flex-shrink-0 px-2 py-1" key={url}>
                                                                                    <Link href={url} className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                                                        <span className="mr-2"><FontAwesomeIcon icon={subItem.icon} color={subItem.icon_color} /></span>{name}</Link>
                                                                                </div>
                                                                            })}
                                                                        </div>;
                                                                    })
                                                                }
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="hidden lg:flex items-center justify-center print:hidden" style={{ color: "#f04130 !important" }}>
                        <Link className="flex items-center gap-1 py-[1px] px-3 text-md " href={youtube}>
                            {/* <div className="font-bold"><FontAwesomeIcon icon={faTv}/> লাইভ টিভি</div> */}
                            <button className="whitespace-nowrap rounded-3xl bg-[#f04130] text-white py-1.5 px-4 text-sm">
                                <FontAwesomeIcon icon={faTv} /> লাইভ টিভি
                            </button>
                        </Link>
                    </div>
                    <button
                        className="p-2 last:pr-0 md:hidden"
                        type="button"
                        aria-label="menu"
                        onClick={handleSidebar}
                    >
                <MenuIcon />
              </button>
                    
                </div>
                {showSidebar && (
                        <SideBar
                            handleSidebar={handleSidebar}
                            handleTheme={handleTheme}
                            theme={`${theme}`}
                        />
                    )}
            </div>
        );
    }
}

export default TopBar;