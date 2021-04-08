import React, { useState, useEffect } from "react";
import { getPopularMedia } from "../../services/Media.js";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.js";
import styles from "./Player.module.scss";

const Player = ({ clubId }) => {
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
        avatar:
          `https://static.padelgo.tv/profilepictures/600x600/${p.channel}.jpeg` ||
          `https://static.padelgo.tv/profilepictures/600x600/default.jpeg`,
      });
    });

    return pipeline;
  };

  const onPlaylistAtEnd = async () => {
    await fetchPopularMedia(1, 5);
  };

  // Only fetches highlights as of now.
  const fetchPopularMedia = async (page = 1, take = 0, sortOrder = 0) => {
    const data = await getPopularMedia({
      clubId: Number(clubId),
      stream: false,
      liveStream: false,
      highlight: true,
      video: false,
      page: page,
      take: take,
      sortOrder: sortOrder,
    });

    setPopular(await data);
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

export default Player;
