import React, { useState, useEffect } from "react";
import { getPopularMedia } from "../../services/Media.js";
import { getChannelsInfoWithChannelName } from "../../services/Channels.js";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.js";
import styles from "./ArenaTv.module.scss";

const ArenaTv = ({ match }) => {
  const [popular, setPopular] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetchPopularMedia(1, 5);
  }, []);

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
            type: "video/mp4",
          },
        ],
        poster:
          process.env.NODE_ENV === "development"
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/800px-Big_Buck_Bunny_thumbnail_vlc.png"
            : p.thumbnailURL,
        mediaType: p.mediaType,
        channel: p.channel,
        description: p.description,
        avatar: fetchChannelData(p.channel).profileImageURL || "",
      });
    });

    return pipeline;
  };

  const fetchChannelData = async (channel) => {
    const data = await getChannelsInfoWithChannelName(channel);
    return await data;
  };

  const onPlaylistAtEnd = async () => {
    const data = pipeline(await fetchPopularMedia(1, 5));
    setSources(sources.concat(data));
  };

  // TODO Use the proper endpoint (Waiting for it)
  const fetchPopularMedia = async (page = 1, take = 0, sortOrder = 0) => {
    const data = await getPopularMedia({
      clubId: Number(match.params.clubId),
      stream: true,
      liveStream: false,
      highlight: true,
      video: false,
      page: page,
      take: take,
      sortOrder: sortOrder,
    });

    setPopular(await data);
    return await data;
  };

  return (
    <div className={styles.__arenatv_wrapper}>
      <div className={styles.__arenatv_container_video}>
        {sources && (
          <VideoPlayer
            src={sources}
            controls={false}
            autoplay={true}
            onPlaylistAtEnd={onPlaylistAtEnd}
          />
        )}
      </div>
    </div>
  );
};

export default ArenaTv;
