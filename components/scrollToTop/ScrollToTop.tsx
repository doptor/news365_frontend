"use client";

import UpArrow from "@/public/icons/UpArrow";
import { useEffect, useRef } from "react";

const ScrollToTop = () => {
  const scrollTop = useRef<any>();

  const goToTopHandler = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  useEffect(() => {
    goToTopHandler();
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollTop.current?.classList.add("scrollActive");
      } else {
        scrollTop.current?.classList.remove("scrollActive");
      }
    });
  }, []);

  return (
    <button
      type={"button"}
      onClick={goToTopHandler}
      className="scrollToTop right-6 bg-[var(--primary)] dark:bg-[var(--dark)] border border-[var(--primary)] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 delay-100"
      ref={scrollTop}
    >
      <UpArrow />
    </button>
  );
};

export default ScrollToTop;
