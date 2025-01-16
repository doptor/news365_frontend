//"use client";

import React from 'react';
// import { youtube_embedded_video_url, detectSocialPlatform } from "@/utils/video_embed";

interface VideoEmbedProps {
    videoUrl: string;
    title?: string; // Title is now optional,
    width?: number
}

const youtube_embedded_video_url = (url: string): string => {
    function extractVideoId(url: string): string {
        const regex = /youtu\.be\/([^?]+)/; // Match 'youtu.be/' and capture everything until '?' or the end
        const match = url.match(regex);
        return match ? match[1] : "";
    }
    
    const hostname = (new URL(url)).hostname;
    if (hostname.includes('youtu.be')) {
        var youtube_watch_root = "https://www.youtube.com/watch";
        var videoid = extractVideoId(url);
    } else {
        var [youtube_watch_root, videoid] = url.split("?v=");
    }
    
    const youtube_root = youtube_watch_root.replace('watch', '');
    return `${youtube_root}embed/${videoid}`;
};

function detectSocialPlatform(url: string): 'youtube' | 'facebook' | 'other' {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;

        if (
            hostname.includes('youtube.com') ||
            hostname.includes('youtu.be')
        ) {
            return 'youtube';
        } else if (
            hostname.includes('facebook.com') ||
            hostname.includes('fb.com')
        ) {
            return 'facebook';
        } else {
            return 'other';
        }
    } catch (error) {
        // Handle invalid URLs
        console.error("Invalid URL:", error);
        return 'other'; // Or throw the error if you want to handle it differently
    }
}

const FacebookVideoEmbed: React.FC<{ videoUrl: string; width?: number, title?: string }> = ({
    videoUrl,
    width = 500,
}) => {
    const appId = process.env.REACT_APP_FACEBOOK_APP_ID; // Replace with your Facebook App ID (optional)

    function generateNonce(): string {
        if (typeof crypto === 'undefined' || typeof crypto.randomUUID !== 'function') {
            console.warn("crypto.randomUUID is not supported, falling back to less secure method");
            return generateFallbackNonce();
        }
        return crypto.randomUUID();
    }

    function generateFallbackNonce(): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const nonce = generateNonce();

    return (
        <>
            <div id="fb-root"></div>
            <script
                async
                defer
                crossOrigin="anonymous"
                src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0${appId ? `&appId=${appId}` : ''
                    }`}
                nonce={nonce} // Replace with a dynamically generated nonce
            />
            <div className="fb-video" data-href={videoUrl} data-width={width} data-show-text="false">
                <blockquote cite={videoUrl} className="fb-xfbml-parse-ignore">
                    {/* Content within the blockquote will not be parsed by Facebook */}
                </blockquote>
            </div>
        </>
    );
};

const FacebookVideoEmbed2: React.FC<VideoEmbedProps> = ({ videoUrl, title }) => {
    const iframeUrl = `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(
        videoUrl
    )}&show_text=true&width=267&t=0`;

    return (
        <iframe
            src={iframeUrl}
            width="267"
            height="591"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
    );
};


const IframeVideoEmbed: React.FC<VideoEmbedProps> = ({ videoUrl, title }) => {
    return <iframe
        className="aspect-video h-auto w-full"
        width={200}
        height={113}
        src={videoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoUrl, title, width }) => {
    const platform = detectSocialPlatform(videoUrl);

    switch (platform) {
        case 'facebook':
            return <FacebookVideoEmbed videoUrl={videoUrl} title={title} />;
        case 'youtube':
            return <IframeVideoEmbed videoUrl={youtube_embedded_video_url(videoUrl)} title={title} />;
        default:
            return <IframeVideoEmbed videoUrl={videoUrl} title={title} />;
    }
};

export default VideoEmbed;