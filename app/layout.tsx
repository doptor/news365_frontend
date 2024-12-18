import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navBar/NavBar";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import ThemeWrapper from "@/components/themeWrapper/ThemeWrapper";
import WebSettingProvider from "@/context/webSettingContext";
import instance from "@/utils/instance";
import { Metadata } from "next";
import 'react-loading-skeleton/dist/skeleton.css';

import "moment/locale/bn";

// react-datepicker css
import "react-datepicker/dist/react-datepicker.css";

// slick css
import "slick-carousel/slick/slick.css";

//global css
import "./globals.css";
import DynamicFavicon from "@/components/dynamicFavicon/DynamicFavicon";
import moment from "moment";

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


  moment.locale('bn');
  const location = "ঢাকা";
  const timenow = moment().format('LLLL');
  const last_updated = "আপডেট ১ ঘন্টা আগে";

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
            <div style={{ background: "#a00303", color: "white" }}>
              <div className="container px-4 py-4 mx-auto">
                {location + ' ' + timenow + ' ' + last_updated}
              </div>
            </div>
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
