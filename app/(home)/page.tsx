import HomeMain from "@/components/home/homeMain/HomeMain";
import instance from "@/utils/instance";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { data } = await instance.get("/metadata");

  const { title, image, meta_keyword, meta_description, site_name, favicon } =
    data?.data;
  return {
    title: title,
    description: meta_description,
    keywords: [meta_keyword],
    openGraph: {
      title: title,
      description: meta_description,
      url: site_name,
      siteName: site_name,
      images: [
        {
          url: image,
          secureUrl: image,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
    icons: {
      icon: favicon, // Adding the favicon dynamically
    },
  };
}

export default function Home() {
  return <HomeMain />;
}
