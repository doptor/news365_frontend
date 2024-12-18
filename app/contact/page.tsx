"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import Link from "next/link";
import { useContext } from "react";

export default function ContactPage() {
  const { data, error, isLoading } = useContext(WebSettingContext);

  if (error) return <div>There was an Error!</div>;

  if (isLoading)
    return <ThreeDotsLoader clss={"h-[600px] sm:h-[900px]"} color="51c27c" />;

  const {
    address,
    content,
    website,
    phone_two,
    phone,
    longitude,
    latitude,
    email,
    editor,
    map,
  } = data?.contact;

  return (
    <section className="pt-[60px]">
      <div className="container px-4 mx-auto">
        <div className="border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3">
          <div className="mb-3">
            <Link href="#">
              <h1 className="text-xl md:text-2xl text-[var(--dark)] dark:text-white">
                Contact Us
              </h1>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 relative after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:right-0 lg:after:[&>*]:w-[1px] lg:after:[&>*]:h-full lg:after:[&>*]:top-0 lg:after:[&>*]:-right-3 lg:after:last:[&>*]:w-0 md:before:absolute md:before:bg-[var(--border-color)] md:before:w-full md:before:h-[1px] md:before:-bottom-3 md:before:right-0 dark:after:[&>*]:bg-[var(--border-color)] dark:before:bg-[var(--border-color)]">
          <div className="col-span-12 lg:col-span-4 relative">
            <div className="flex gap-3 items-center mb-3 last:mb-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  ></path>
                </svg>
              </div>
              <div>
                <h5 className="text-lg text-[var(--dark)] dark:text-white">
                  Phone
                </h5>
                <Link
                  className="text-base text-[var(--dark)] dark:text-white"
                  href={`tel:${phone}`}
                >
                  {phone}
                </Link>
              </div>
            </div>
            <div className="flex gap-3 items-center mb-3 last:mb-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary)]">
                <svg
                  className="w-6 h-6 fill-white"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-lg text-[var(--dark)] dark:text-white">
                  WhatsApp
                </h5>
                <Link
                  className="text-base text-[var(--dark)] dark:text-white"
                  href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
                >
                  {phone}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 relative">
            <div className="flex gap-3 items-center mb-3 last:mb-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  ></path>
                </svg>
              </div>
              <div>
                <h5 className="text-lg text-[var(--dark)] dark:text-white">
                  Mobile
                </h5>
                <Link
                  className="text-base text-[var(--dark)] dark:text-white"
                  href={`tel:${phone_two}`}
                >
                  {phone_two}
                </Link>
              </div>
            </div>
            <div className="flex gap-3 items-center mb-3 last:mb-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  ></path>
                </svg>
              </div>
              <div>
                <h5 className="text-lg text-[var(--dark)] dark:text-white">
                  Email
                </h5>
                <Link
                  className="text-base text-[var(--dark)] dark:text-white"
                  href={`mailto:${email}`}
                >
                  {email}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 relative">
            <div className="flex gap-3 items-center mb-3 last:mb-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--primary)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h5 className="text-lg text-[var(--dark)] dark:text-white">
                  Address
                </h5>
                <div
                  className="text-base text-[var(--dark)] dark:text-white"
                  dangerouslySetInnerHTML={{ __html: address }}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-xl text-[color:var(--link-color)] mb-3 pb-3 border-b-[1px] border-[var(--border-color)] dark:border-[var(--border-dark)] dark:text-white text-center">
          Call {phone} For ads
        </p>
        <div className="mb-1">
          <iframe
            className="w-full h-60 lg:h-96"
            height="300"
            src={map || ""}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
