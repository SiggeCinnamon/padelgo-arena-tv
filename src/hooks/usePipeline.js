import { useState, useEffect } from "react";

const usePipeline = (popular) => {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    setSources(pipeline(popular));
  }, [popular]);

  const pipeline = (data) => {
    const pipeline = [];

    data.forEach((p) => {
      pipeline.push({
        sources: [
          {
            src:
              process.env.NODE_ENV === "development"
                ? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                : p.url,
            type:
              p.mediaType === "LiveStream"
                ? "application/x-mpegURL"
                : "video/mp4",
          },
        ],
        poster:
          process.env.NODE_ENV === "development"
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/800px-Big_Buck_Bunny_thumbnail_vlc.png"
            : p.thumbnailURL,
        mediaType: p.mediaType,
        channel: p.channel,
        description: p.description,
        avatar: `https://static.padelgo.tv/profilepictures/600x600/${p.channel}.jpeg`,
      });
    });

    return pipeline;
  };

  return [sources, setSources];
};

export default usePipeline;
