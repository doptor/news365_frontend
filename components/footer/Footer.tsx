"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import FooterContact from "../common/footerContact/FooterContact";
import Socials from "../common/socials/Socials";

type MenuItem = {
  menu_lavel: string;
  slug: string;
  link_url: null | string;
};

type MenuData = MenuItem[];

const Footer = () => {
  const {
    data: webSettingData,
    error: webSettingError,
    isLoading: webSettingLoading,
  } = useContext(WebSettingContext);

  const {
    data,
    error,
    isLoading,
  }: { data: MenuData; error: any; isLoading: boolean } = useSWR(
    "/page-link",
    fetcher
  );

  let content;

  if (webSettingError)
    content = <div className="text-center">There was an Error!</div>;

  if (webSettingLoading) content = <div className="text-center"></div>;

  if (webSettingData) {
    const { contact, social_link, footer_logo } = webSettingData;

    content = (
      <>
        <div className="flex gap-3 flex-col md:flex-row mb-6 justify-around md:justify-between items-center ">
          <div className="clss">
            <Link href="/">
              <Image src={footer_logo} alt="logo" width={180} height={100} />
            </Link>
          </div>
          <div>
            <p className="text-black dark:text-white text-xl">
              {contact?.editor}
            </p>
            <div className="mb-3 flex gap-3 justify-center">
              <Socials socialMediaLinks={social_link} />
            </div>
          </div>
        </div>
        <div className="mb-3 flex flex-wrap justify-center text-center gap-4 lg:gap-6  text-black dark:text-white ">
          {data?.map((item, i) => {
            const { link_url, menu_lavel, slug } = item;
            return (
              <Link key={i} className="text-lg" href={`/${slug}`}>
                {menu_lavel}
              </Link>
            );
          })}
        </div>

        <div className="mb-5 flex flex-wrap justify-center text-center gap-x-3 lg:gap-x-6 gap-y-2 lg:gap-4 text-[#000] dark:text-white">
          <FooterContact data={contact} />
        </div>
      </>
    );
  }

  return (
    <footer className="relative min-h-[200px] mt-[60px] pt-6 bg-white dark:bg-[#202327]">
      <div className="container px-3 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12">{content}</div>
        </div>
      </div>
      {/* Shadow applied to the top of the footer */}
      <div className="absolute top-0 left-0 w-full h-[10px] bg-white dark:bg-[#202327] shadow-lg"></div>
    </footer>
  );
};

export default Footer;
