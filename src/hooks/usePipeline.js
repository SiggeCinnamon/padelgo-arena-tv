import { useState, useEffect } from "react";
import { getStreamURLWithLiveStreamId } from "../services/Streams.js";

/**
 * A custom hook used for creating an array of sources in a specific structure that the Video player can play.
 * It also makes sure to check whether a source is a livestream or an ordinary video and will then change certain properties.
 * @author Christoffer Hansen
 *
 * @param  {Array} popular An array that consists of objects fetched from the API representing the current popular videos and streams
 * @return {Array} It will return a useState array consisting of the new structured data
 */
const usePipeline = (popular) => {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    const pipeIt = async () => {
      const pt = await pipeline(popular);
      setSources(pt);
    };

    pipeIt();
  }, [popular]);

  const pipeline = async (data) => {
    const pipeline = [];

    for (const d of data) {
      const stream = d.mediaType === "LiveStream" ? await getStreamURLWithLiveStreamId(d.internalId) : "";

      pipeline.push({
        sources: [
          {
            src:
              process.env.NODE_ENV === "development"
                ? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                : d.mediaType === "LiveStream"
                  ? stream.url
                  : d.url,
            type: process.env.NODE_ENV === "development" ? "video/mp4" : d.mediaType === "LiveStream" ? "application/x-mpegURL" : "video/mp4",
          },
        ],
        poster:
          process.env.NODE_ENV === "development"
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/800px-Big_Buck_Bunny_thumbnail_vlc.png"
            : d.thumbnailURL,
        mediaType: d.mediaType,
        channel: d.channel,
        description: d.description,
        avatar: `https://static.padelgo.tv/profilepictures/600x600/${d.channel}.jpeg`,
      });
    }

    return pipeline;
  };

  return [sources, setSources];
};

export default usePipeline;
