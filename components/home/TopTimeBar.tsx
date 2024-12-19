"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { useContext } from "react";
import "moment/locale/bn";

import moment from "moment";
import Socials from "../common/socials/Socials";

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
        const { contact, social_link, footer_logo } = webSettingData;


        moment.locale('bn');
        const location = "ঢাকা";
        const timenow = moment().format('dddd, Do MMMM YYYY');
        const last_updated = "আপডেট ১ ঘন্টা আগে";


        return (
            <div style={{ background: "#a00303", color: "white" }}>
                <div className="container px-4 py-4 mx-auto flex justify-between">
                    <span>{location + ' ' + timenow } </span>

                    <div className="mb-3 flex gap-3 justify-center text-white">
                        <Socials socialMediaLinks={social_link} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TopTimeBar;