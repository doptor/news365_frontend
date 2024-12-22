"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { useContext } from "react";
import "moment/locale/bn";

import moment from "moment";
import Socials from "../common/socials/Socials";

import "@/app/datebar.css";

const TopTimeBar = () => {
    const {
        data: webSettingData,
        error: webSettingError,
        isLoading: webSettingLoading,
    } = useContext(WebSettingContext);

    let content;

    if (webSettingError)
        content = <div className="text-center">There was an Error!</div>;

    if (webSettingLoading) content = <div className="text-center"></div>;

    if (webSettingData) {
        const { social_link } = webSettingData;


        moment.locale('bn');
        const location = "";
        const timenow = moment().format('dddd, Do MMMM YYYY | a h:mm মিনিট');
        const last_updated = "আপডেট ১ ঘন্টা আগে";


        return (
            <div style={{ background: "#a00303", color: "white" }}>
                <div className="container px-4 py-2 mx-auto flex justify-between">
                    <span className="topdate">{location + ' ' + timenow} </span>

                    <div className="mb-1 flex gap-3 justify-center text-white">
                        <Socials socialMediaLinks={social_link} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TopTimeBar;