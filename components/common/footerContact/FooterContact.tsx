import EmailIcon from "@/public/icons/EmailIcon";
import MobileIcon from "@/public/icons/MobileIcon";
import TelephoneIcon from "@/public/icons/TelephoneIcon";
import Link from "next/link";

type ContactInformation = {
  content: string;
  editor: string;
  address: string;
  phone: string;
  phone_two: string;
  email: string;
  website: string;
  latitude: string;
  longitude: string;
};

const FooterContact = ({ data }: { data: ContactInformation }) => {
  const {
    address,
    content,
    email,
    latitude,
    longitude,
    phone,
    phone_two,
    website,
    editor,
  } = data;

  return (
    <>
      <p className="text-lg md:text-base mb-2">{address.split("<br>")}</p>
      <p className="inline-block">
        <Link
          className="flex gap-1 items-center"
          href={`tel:${phone}`}
          target="_blank"
        >
          <abbr className="cursor-help" title="Phone">
            <TelephoneIcon />
            {/* <svg
                      className="w-4 h-4 fill-black dark:fill-white"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z"></path>
                    </svg> */}
          </abbr>
          {phone}
        </Link>
      </p>
      <p className="inline-block">
        <Link
          className="flex gap-1 items-center"
          href={`tel:${phone_two}`}
          target="_blank"
        >
          <abbr className="cursor-help" title="Mobile">
            <MobileIcon />
            {/* <svg
                      className="w-4 h-4 fill-black dark:fill-white"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>phone</title>
                      <path d="M21.999 4h-12c-1.104 0-1.999 0.896-1.999 2v20c0 1.104 0.895 2 1.999 2h12c1.105 0 2.001-0.896 2.001-2v-20c0-1.104-0.896-2-2.001-2zM13 5h5l0.062 1h-5.062v-1zM15.979 26.5c-0.552 0-1-0.447-1-1s0.448-1 1-1c0.553 0 1 0.447 1 1s-0.448 1-1 1zM21.999 23h-12l0.021-16h11.979v16z"></path>
                    </svg> */}
          </abbr>
          {phone_two}
        </Link>
      </p>
      {/* <p className="inline-block">
        <Link
          className="flex gap-1 items-center"
          href="https://api.whatsapp.com/send/?phone=8801777707600&amp;text&amp;type=phone_number&amp;app_absent=0"
          target="_blank"
        >
          <abbr className="cursor-help" title="Whatsapp">
            <WhatsAppIcon />
          </abbr>
          +৮৮০ ১৭৭৭ ৭০৭৬০০
        </Link>
      </p> */}
      <p className="inline-block">
        <Link
          className="flex gap-1 items-center"
          href={`mailto:${email}`}
          target="_blank"
        >
          <abbr className="cursor-help" title="Email">
            <EmailIcon />
          </abbr>
          {email}
        </Link>
      </p>
    </>
  );
};

export default FooterContact;
