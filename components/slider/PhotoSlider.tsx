"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Slider from "react-slick";
import SliderNavigation from "./SliderNavigation";

interface Photo {
  thumb_photo: string;
  large_photo: string;
  phot_title: string;
}

interface SliderProps {
  sliderData: {
    photos: Photo[];
    category: string;
    id: number;
  };
}

const PhotoSlider = ({ sliderData }: SliderProps) => {
  const sliderRef = useRef<any>(null);
  const [pause, setPause] = useState(false);

  const { category, id, photos } = sliderData;

  const pauseHandler = () => {
    if (pause) {
      setPause(false);
      sliderRef.current.slickPlay();
    } else {
      setPause(true);
      sliderRef.current.slickPause();
    }
  };

  // custom pagination
  const customPaging = (i: number) => (
    <div className="absolute top-2 left-2 inline-flex text-xl sm:text-3xl bg-neutral-900/80 px-4 rounded-full">
      {i + 1}/{photos.length}
    </div>
  );

  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: "0px",
    customPaging: customPaging as any,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings} ref={sliderRef} className="">
        {photos.map((photo, i) => {
          const { large_photo, phot_title, thumb_photo } = photo;
          return (
            <Link
              key={i}
              href={`/photo/${category}/${id}`}
              className="w-full relative"
            >
              <Image
                src={large_photo}
                alt={phot_title}
                className="w-full"
                width={560}
                height={415}
              />

              <h2 className="w-full absolute bottom-0 left-0 text-lg text-white bg-neutral-900/80 p-2">
                {phot_title}
              </h2>
            </Link>
          );
        })}
      </Slider>

      {/* Slider Navigation */}
      <SliderNavigation
        sliderRef={sliderRef}
        arrow=""
        pause={pause}
        pauseHandler={pauseHandler}
      />
    </div>
  );
};

export default PhotoSlider;
