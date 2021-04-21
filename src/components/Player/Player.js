import React, { useState, useEffect } from "react";
import { getPopularMedia } from "../../services/Media.js";
import VideoPlayer from "../../components/VideoPlayer";
import styles from "./Player.module.scss";
import usePipeline from "../../hooks/usePipeline.js";

/**
 * A main component that uses the sub-component VideoPlayer for rendering a video player.
 * This component handles the conditionals and fetching of required data.
 * @author Christoffer Hansen
 *
 * @param  {Number} clubId A Number representing the club that the user picked from Home page
 * @return {JSX} React JSX Rendering
 */
const Player = ({ clubId }) => {
  const [popular, setPopular] = useState([]);
  const [sources, setSources] = usePipeline(popular);

  useEffect(() => {
    fetchPopularMedia(1, 20);
  }, []);

  const onPlaylistAtEnd = async () => {
    await fetchPopularMedia(1, 20);
  };

  const fetchPopularMedia = async (page = 1, take = 20, sortOrder = 0) => {
    const liveStreamData = await getPopularMedia({
      clubId: Number(clubId),
      stream: false,
      liveStream: true,
      highlight: false,
      video: false,
      page: page,
      take: take,
      sortOrder: sortOrder
    });

    const highlightData = await getPopularMedia({
      clubId: Number(clubId),
      stream: false,
      liveStream: false,
      highlight: true,
      video: false,
      page: page,
      take: take,
      sortOrder: sortOrder
    });

    // If there is livestreams and highlights available
    if (liveStreamData.length > 0 && highlightData.length > 0) {
      setPopular(await spliceData(liveStreamData, highlightData));

      // If there is livestreams but no highlights available
    } else if (liveStreamData.length > 0 && highlightData.length <= 0) {
      setPopular(liveStreamData);

      // If there is no livestreams available but there is highlights
    } else if (liveStreamData.length <= 0 && highlightData.length > 0) {
      setPopular(highlightData);
    } else {
      // No highlight nor livestreams available!!!
    }
  };

  const spliceData = async (streamData, highData) => {
    let splicedData = [];
    let diff = Math.round(highData.length / streamData.length);
    let y = diff;

    for (let i = 0; i < highData.length; i++) {
      if (i === y) {
        splicedData.push(streamData.shift());
        splicedData.push(highData[i]);
        y += diff;
      } else {
        splicedData.push(highData[i]);
      }
    }

    splicedData = [...splicedData, ...streamData];
    return splicedData.filter(Boolean);
  };

  return (
    <div className={styles.__arenatv_wrapper}>
      <div className={styles.__arenatv_container_video}>
        {sources && <VideoPlayer src={sources} controls={false} autoplay={true} onPlaylistAtEnd={onPlaylistAtEnd} clubId={clubId} />}
      </div>
    </div>
  );
};

export default Player;
