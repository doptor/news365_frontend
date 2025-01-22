import SinglePostMain from "@/components/singlePost/SinglePostMain";
import instance from "@/utils/instance";
import { Metadata } from "next";

type Props = {
  params: { categoryName: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata({
//   params,
//   searchParams,
// }: Props): Promise<Metadata> {
//   const { data } = await instance.get(`/metadata?encode_title=${params?.slug}`);

//   const { title, image, meta_keyword, meta_description, site_name } =
//     data?.data;

//   return {
//     title: title,
//     description: meta_description,
//     keywords: [meta_keyword],
//     openGraph: {
//       title: title,
//       description: meta_description,
//       url: site_name,
//       siteName: site_name,
//       images: [
//         {
//           url: image,
//           secureUrl: image,
//           width: 800,
//           height: 600,
//         },
//       ],
//       type: "website",
//     },
//   };
// }

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  try {
    // Use async/await instead of .then()
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/post-detail/${params?.slug}`);
    const data = await response.json();

    if (data.status === true && data.data) {
      const { title, image_thumb, stitle, excerpt, category } = data.data;
      const url = `https://www.dailyniropekkho.com/${params?.categoryName}/${params?.slug}`;

      return {
        title: title,
        description: excerpt || title,
        openGraph: {
          title: title,
          description: excerpt || title,
          url: url,
          siteName: 'দৈনিক নিরপেক্ষ',
          images: [
            {
              url: image_thumb,
              secureUrl: image_thumb,
              width: 800,
              height: 600,
            },
          ],
          type: "website",
        },
      };
    }

    // Return default metadata if no valid data
    return getDefaultMetadata(params);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return getDefaultMetadata(params);
  }
}

// Separate function for default metadata
function getDefaultMetadata(params: Props['params']): Metadata {
  return {
    title: '',
    description: '',
    openGraph: {
      title: '',
      description: '',
      url: `${process.env.NEXT_PUBLIC_URL}/${params?.categoryName}/${params?.slug}`,
      siteName: 'দৈনিক নিরপেক্ষ',
      images: [
        {
          url: '',
          secureUrl: '',
          width: 800,
          height: 600,
        },
      ],
      type: 'website',
    },
  };
}

export default function SinglePost({ params, searchParams }: any) {
  return <SinglePostMain />;
}
