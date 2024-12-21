const youtube_embedded_video_url = (url: string): string => {
    const [youtube_watch_root, videoid] = url.split("?v=");
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

// export { youtube_embedded_video_url, detectSocialPlatform };