import SinglePostMain from "@/components/singlePost/SinglePostMain";
import instance from "@/utils/instance";
import { Metadata } from "next";

type Props = {
  params: { categoryName: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { data } = await instance.get(`/metadata?encode_title=${params?.slug}`);

  const { title, image, meta_keyword, meta_description, site_name } =
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
  };
}

export default function SinglePost({ params, searchParams }: any) {
  return <SinglePostMain />;
}
