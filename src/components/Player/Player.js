import React, { useState, useEffect } from "react";
import { getMediaWithClubId } from "../../services/Media.js";
import VideoPlayer from "../../components/VideoPlayer";
import styles from "./Player.module.scss";
import usePipeline from "../../hooks/usePipeline.js";
import useGlobal from "../../vault";

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
  const [globalState] = useGlobal();

  useEffect(() => {
    fetchMedia();
  }, []);

  const onPlaylistAtEnd = async () => {
    await fetchMedia();
  };

  const fetchMedia = async () => {
    const showcaseData = globalState.showLivestreams ? await getMediaWithClubId(clubId) : [];

    if (showcaseData) {
      setPopular(showcaseData);
    } else {
      // It's empty OMFG!
    }
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
            clubId={clubId}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
