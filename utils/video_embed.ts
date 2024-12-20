const youtube_embedded_video_url = (url: string): string => {
    const [youtube_watch_root, videoid] =  url.split("?v=");
    const youtube_root = youtube_watch_root.replace('watch', '');
    return `${youtube_root}embed/${videoid}`;
};

export {youtube_embedded_video_url};