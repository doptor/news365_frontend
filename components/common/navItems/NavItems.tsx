import NavbarSkeleton from "@/components/skeleton/NavbarSkeleton";
import fetcher from "@/utils/fetcher";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

interface MenuContent {
  menu_content_id: number;
  content_type: string;
  content_id: number;
  menu_position: number;
  menu_lavel: string;
  link_url: string | null;
  slug: string;
  parents_id: number;
  menu_id: number;
  status: number;
  menu_name: string;
  menu_style: string | null;
}

const NavItems = ({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}) => {
  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    "/category-list",
    fetcher
  );
  const { theme } = useTheme();

  if (error) return <div className="hidden lg:block">Error loading data</div>;
  if (isLoading) return <NavbarSkeleton theme={theme} />;

  return (
    <nav className="flex-nowrap overflow-x-auto lg:flex-wrap hidden lg:block">
      <div className="flex flex-wrap items-center lg:justify-center">
        <ul className="flex gap-2 whitespace-nowrap lg:overflow-hidden">
          {data?.slice(0, 8)?.map((category: MenuContent) => {
            const { menu_content_id, slug, menu_lavel } = category;
            return (
              <li
                key={menu_content_id}
                className="text-black  dark:text-white "
              >
                <Link
                  className="flex items-center gap-1 py-[11px] px-3 text-lg text-[var(--dark)] dark:text-white hover:font-bold  capitalize"
                  href={`/${slug?.toLowerCase()}`}
                  onClick={() => setActiveMenu(menu_lavel.toLowerCase())}
                >
                  <div
                    className={`${
                      activeMenu == menu_lavel.toLocaleLowerCase()
                        ? "font-bold border-b-2 border-black dark:border-white"
                        : ""
                    }`}
                  >
                    {menu_lavel.toLowerCase()}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavItems;
