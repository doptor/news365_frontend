import FacebookIcon from "@/public/icons/FacebookIcon";
import LinkedinIcon from "@/public/icons/LinkedinIcon";
import PlayStoreIcon from "@/public/icons/PlayStoreIcon";
import TwitterIcon from "@/public/icons/TwitterIcon";
import WhatsAppIcon from "@/public/icons/WhatsAppIcon";
import YoutubeIcon from "@/public/icons/YoutubeIcon";
import Link from "next/link";

type SocialMediaLinks = {
  fb: string;
  tw: string;
  linkd: string;
  google: null;
  pin: string;
  vimo: string;
  youtube: string;
  flickr: string;
  vk: string;
  whats_app: string;
};

const Socials = ({
  socialMediaLinks,
}: {
  socialMediaLinks: SocialMediaLinks;
}) => {
  // data destructed from link
  const { fb, flickr, google, linkd, pin, tw, vimo, vk, youtube } =
    socialMediaLinks || {};

  return (
    <>
      <Link className="group" href={fb} aria-label="facebook" target="_blank">
        <div className="w-8 h-8 border-[1px] border-black/30 dark:border-white flex justify-center items-center rounded-sm group-hover:border-black duration-500 ease-out">
          <FacebookIcon />
        </div>
      </Link>
      {/* <Link
        className="group"
        href={whats_app}
        aria-label="whatsapp"
        target="_blank"
      >
        <div className="w-8 h-8 border-[1px] border-black/30 dark:border-white flex justify-center items-center rounded-sm group-hover:border-black duration-500 ease-out">
          <WhatsAppIcon />
        </div>
      </Link> */}
      <Link className="group" href={tw} target="_blank" aria-label="twitter">
        <div className="w-8 h-8 border-[1px] border-black/30 dark:border-white flex justify-center items-center rounded-sm group-hover:border-black duration-500 ease-out">
          <TwitterIcon />
        </div>
      </Link>
      <Link className="group" href={youtube} aria-label="youtube">
        <div className="w-8 h-8 border-[1px] border-black/30 dark:border-white flex justify-center items-center rounded-sm group-hover:border-black duration-500 ease-out">
          <YoutubeIcon />
        </div>
      </Link>
      <Link
        className="group"
        href={linkd}
        aria-label="linkedin"
        target="_blank"
      >
        <div className="w-8 h-8 border-[1px] border-black/30 dark:border-white flex justify-center items-center rounded-sm group-hover:border-black duration-500 ease-out">
          <LinkedinIcon />
        </div>
      </Link>
      <Link className="group" href="/" aria-label="playstore">
        <div className="w-8 h-8 border-[1px] border-black/30 dark:border-white flex justify-center items-center rounded-sm group-hover:border-black duration-500 ease-out">
          <PlayStoreIcon />
        </div>
      </Link>
    </>
  );
};

export default Socials;
