import Pause from "@/public/icons/Pause";
import VideoIcon from "@/public/icons/VideoIcon";

const SliderNavigation = ({
  sliderRef,
  pauseHandler,
  arrow,
  pause,
  clss,
}: {
  sliderRef: any;
  pauseHandler: any;
  arrow: string;
  pause: boolean;
  clss?: string;
}) => {
  return (
    <div className={`flex items-center gap-2.5 absolute right-2 top-2 ${clss}`}>
      <button
        type="button"
        className="h-10 rounded-full w-10 bg-neutral-900/80 text-white"
        onClick={() => sliderRef.current.slickPrev()}
      >
        {"<"}
      </button>
      <button
        onClick={pauseHandler}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--secondary)]"
      >
        {!pause ? <Pause /> : <VideoIcon />}
      </button>
      <button
        type="button"
        className="h-10 rounded-full w-10 bg-neutral-900/80 text-white"
        onClick={() => sliderRef.current.slickNext()}
      >
        {">"}
      </button>
    </div>
  );
};

export default SliderNavigation;
