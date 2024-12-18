import { ReactNode } from "react";

interface NotFoundBodyProps {
  title?: string;
  img?: {
    src: string;
  };

  children?: ReactNode;
}

const NotFoundBody = ({
  title = "Page Not Found",
  img: img,
  children,
}: NotFoundBodyProps) => {
  return (
    <section>
      {img ? (
        <div className="w-full h-[80vh] flex justify-center items-center mt-5">
          <img
            src={img?.src}
            alt=""
            style={{
              maxWidth: "60%",
            }}
          />
        </div>
      ) : (
        <section className="h-[300px] sm:h-[600px] flex items-center justify-center">
          <div className="container text-center">
            <h2>{title}</h2>
            {children}
          </div>
        </section>
      )}
    </section>
  );
};

export default NotFoundBody;
