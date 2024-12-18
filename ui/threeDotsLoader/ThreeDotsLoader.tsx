import Spin from "../spin/Spin";

const ThreeDotsLoader = ({ clss = "h-full", color = "084277" }) => {
  return (
    <div className={`w-full ${clss} flex items-center justify-center`}>
    
      <div className="flex items-center gap-2">
        <span>Data is loading</span>
        <span>
          <Spin clss="w-10 h-10" />
        </span>
      </div>
    </div>
  );
};

export default ThreeDotsLoader;
