import NotFoundBody from "@/ui/notFoundBody/NotFoundBody";
import Link from "next/link";

export default function AuthorPage() {
  return (
    <NotFoundBody title="">
      <h2 className="text-7xl ">404</h2>
      <h3 className="text-2xl my-1">Not found anything</h3>
      <p className="">
        What you are looking for was not found. Maybe you&apos;re looking for it
        wrong.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="text-lg text-white  py-2 px-4 bg-[var(--primary)] rounded-md"
        >
          Back to Home
        </Link>
      </div>
    </NotFoundBody>
  );
}
