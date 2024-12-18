interface AddCardProps {
  // imgPath: string;
  imgPath: any;
}

const AddCard = ({ imgPath }: AddCardProps) => {
  return (
    <>
      {imgPath && (
        <div
        className="news_view"
          // className="[&>p]:mt-5"
          dangerouslySetInnerHTML={{ __html: imgPath }}
        />
      )}
    </>
  );
};

export default AddCard;
