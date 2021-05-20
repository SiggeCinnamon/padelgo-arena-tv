import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMediaWithClubId } from "../../services/Media.js";
import VideoPlayer from "../../components/VideoPlayer";
import styles from "./Player.module.scss";
import usePipeline from "../../hooks/usePipeline.js";

/**
 * A main component that uses the sub-component VideoPlayer for rendering a video player.
 * This component handles the conditionals and fetching of required data.
 * @author Christoffer Hansen
 *
 * @param  {String} clubId A String representing the clubs id that the user picked from Home page
 * @param  {String} clubName A String representing the clubs name that the user picked from Home page
 * @param  {String} include A String that informs Player whether to include livestreams or not
 * @return {JSX} React JSX Rendering
 */
const Player = ({ clubId, clubName, include = true }) => {
  const [popular, setPopular] = useState([]);
  const [sources, setSources] = usePipeline(popular);

  useEffect(() => {
    fetchMedia();
  }, []);

  const onPlaylistAtEnd = async () => {
    await fetchMedia();
  };

  const fetchMedia = async () => {
    // include === "true" ? await getMediaWithClubId(clubId, clubName) : []
    const showcaseData = await getMediaWithClubId(clubId, clubName);

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
            clubName={clubName}
          />
        )}
      </div>
    </div>
  );
};

Player.propTypes = {
  clubId: PropTypes.string,
  clubName: PropTypes.string,
  include: PropTypes.string
};

export default Player;
