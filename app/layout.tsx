import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navBar/NavBar";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import ThemeWrapper from "@/components/themeWrapper/ThemeWrapper";
import WebSettingProvider from "@/context/webSettingContext";
import instance from "@/utils/instance";
import { Metadata } from "next";
import 'react-loading-skeleton/dist/skeleton.css';

// react-datepicker css
import "react-datepicker/dist/react-datepicker.css";

// slick css
import "slick-carousel/slick/slick.css";

//global css
import "./globals.css";
import DynamicFavicon from "@/components/dynamicFavicon/DynamicFavicon";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await instance.get("/metadata");

  const { title, image, meta_keyword, meta_description, site_name, favicon } =
    data?.data;
   
  const faviconWithCacheBuster = `${favicon}?v=${new Date().getTime()}`;
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
      icon: faviconWithCacheBuster, // Adding the favicon dynamically
    },
  };
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.maateen.me/solaiman-lipi/font.css"
          rel="stylesheet"
        />
      </head>
      <body>
      <ThemeWrapper>
          <WebSettingProvider>
            <NavBar />

            {children}

            <Footer />

            <ScrollToTop />

            <DynamicFavicon />
          </WebSettingProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
