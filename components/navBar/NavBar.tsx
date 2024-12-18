"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import MenuIcon from "@/public/icons/MenuIcon";
import MoonIcon from "@/public/icons/MoonIcon";
import SearchIcon from "@/public/icons/SearchIcon";
import SunIcon from "@/public/icons/SunIcon";
import XIcon from "@/public/icons/XIcon";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import NavItems from "../common/navItems/NavItems";
import SideBar from "../sideBar/SideBar";
import bdtask from "../../public/images/Bdtask-Logo-blk.png";
import bdtask_dark from "../../public/images/Bdtask-Logo-white.png";
import NavbarSkeleton from "../skeleton/NavbarSkeleton";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useContext(WebSettingContext);
  const [activeMenu, setActiveMenu] = useState<string | undefined>("");
  const logo = data?.logo;
  const router = useRouter();

  /**
   * Handle search form submission and navigate to search results.
   *
   * This function is an event handler used for processing search form submissions.
   * It prevents the default form submission behavior, constructs a search query URL
   * based on the provided search text, and navigates the user to the search results
   * page with the constructed query. This function is typically associated with search
   * input fields and is triggered when the user submits a search query.
   *
   * @param {Event} e - The event object representing the form submission.
   */
  const handleSearchItem = (e: any) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Construct the search query URL based on the provided search text
    const searchQuery = `/search?search_slug=${searchText}`;

    // Use the router to navigate the user to the search results page with the constructed query
    router.replace(searchQuery);

    // set the search showing false
    setShowSearch(false);
  };

  /**
   * Handle the visibility of the sidebar.
   *
   * This function toggles the visibility state of the sidebar. When called,
   * it flips the value of `showSidebar`, showing the sidebar if it's hidden,
   * or hiding it if it's visible.
   */
  const handleSidebar = () => {
    // Toggle the value of `showSidebar` to show or hide the sidebar
    setShowSidebar(!showSidebar);
  };

  /**
   * Toggle the application theme between dark and light modes.
   *
   * This function checks the current theme state and switches it between "dark"
   * and "light" modes. If the theme is currently set to "dark" or "system", it
   * changes it to "light". If it's set to "light", it changes it to "dark".
   */
  const handleTheme = () => {
    // Toggle the theme between "dark" and "light" based on the current theme state
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };

  // set the theme to the current theme
  useEffect(() => setEnabled(true), []);

  if (!enabled) return null;

  return (
    <Fragment>
      <header className="sticky top-0 z-50 bg-[var(--bg)] dark:bg-[#191c20] shadow-[0px_1px_2px_rgba(0,0,0,0.2)]">
        <div className="container px-4 py-2.5 mx-auto">
          <div className="flex items-center justify-between">
            <div className="">
              {!isLoading ? (
                <Link
                  href="/"
                  aria-label="logo"
                  onClick={() => setActiveMenu("")}
                >
                  {theme === "light" ? (
                    <Image src={logo} alt="logo" width={180} height={100} />
                  ) : (
                    <Image src={logo} alt="logo" width={180} height={100} />
                  )}
                </Link>
              ) : (
                ""
              )}
            </div>

            {/* Nav item here */}
            <NavItems
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu || ""}
            />

            <div className="flex items-center justify-center print:hidden">
              <div className="p-3 last:pr-0 hidden md:block">
                <button
                  className="flex"
                  aria-label="theme"
                  onClick={handleTheme}
                >
                  {theme === "light" ? (
                    <div className="text-black">
                      <MoonIcon />
                    </div>
                  ) : (
                    <div className="text-white">
                      <SunIcon />
                    </div>
                  )}
                </button>
              </div>

              <button
                className="p-3 last:pr-0"
                aria-label="search"
                onClick={() => setShowSearch(!showSearch)}
              >
                <SearchIcon clss="" />
              </button>
              <button
                className="p-3 last:pr-0 "
                type="button"
                aria-label="menu"
                onClick={handleSidebar}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {showSearch && (
        <div className="border-t border-[var(--primary)] sticky top-[70px] z-50   shadow-[0px_1px_2px_rgba(0,0,0,0.2)]">
          <div className="container mx-auto p-3">
            <form className="flex items-center" onSubmit={handleSearchItem}>
              <input
                type="text"
                className="w-full py-3 px-4 text-[var(--dark)] dark:text-white focus:outline-none focus:bottom-0 rounded-l border"
                placeholder="Search....."
                onChange={(e: any) => setSearchText(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 text-white bg-[var(--primary)]"
              >
                <SearchIcon clss="stroke-white" />
              </button>
              <button
                type="button"
                className="border-l px-6 py-3 text-white bg-[var(--primary)] rounded-r"
                onClick={() => setShowSearch(false)}
              >
                <XIcon clss="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      )}
      {showSidebar && (
        <SideBar
          handleSidebar={handleSidebar}
          handleTheme={handleTheme}
          theme={`${theme}`}
        />
      )}
    </Fragment>
  );
};

export default NavBar;
