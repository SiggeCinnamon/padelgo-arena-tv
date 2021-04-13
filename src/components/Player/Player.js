import React, { useState, useEffect } from "react";
import { getPopularMedia } from "../../services/Media.js";
import VideoPlayer from "../../components/VideoPlayer";
import styles from "./Player.module.scss";
import usePipeline from "../../hooks/usePipeline.js";

const Player = ({ clubId }) => {
  const [popular, setPopular] = useState([]);
  const [sources, setSources] = usePipeline(popular);

  useEffect(() => {
    fetchPopularMedia(1, 5);
  }, []);

  const onPlaylistAtEnd = async () => {
    await fetchPopularMedia(1, 5);
  };

  const fetchPopularMedia = async (page = 1, take = 0, sortOrder = 0) => {
    const data = await getPopularMedia({
      clubId: Number(clubId),
      stream: false,
      liveStream: true,
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
