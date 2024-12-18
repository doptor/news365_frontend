interface AddBannerProps {
  imgPath: string;
  clss?: string;
}

const AddBanner = ({ imgPath, clss = "mt-[60px]" }: AddBannerProps) => {
  return (
    <section className={clss}>
      <div className="container flex items-center justify-center px-4 mx-auto ">
        {imgPath && (
          <div
            className="[&>p]:mt-5"
            dangerouslySetInnerHTML={{ __html: imgPath }}
          />
        )}
      </div>
    </section>
  );
};

export default AddBanner;
