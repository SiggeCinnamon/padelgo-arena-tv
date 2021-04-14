import React from "react";
import styles from "./VideoOverlay.module.scss";

/**
 * A component that is an overlay with absolute setting, consisting of the channels name and description
 * @author Christoffer Hansen
 *
 * @param  {Object} data An object consisting of data of the current source
 * @return {JSX} React JSX Rendering
 */
const BottomOverlay = ({ data }) => {
  return (
    <div className={styles.__video_overlay_channel}>
      <div className={styles.__video_overlay_channel_content}>
        <img
          src={
            data.avatar ||
            "https://static.padelgo.tv/profilepictures/600x600/default.jpeg"
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://static.padelgo.tv/profilepictures/600x600/default.jpeg";
          }}
          className={
            styles.__video_overlay_image + " img-raised rounded-circle"
          }
          alt='player'
        />

        <div className={styles.__video_overlay_channel_content_headers}>
          <h6>{data.description}</h6>
          <h6>{data.channel}</h6>
        </div>
      </div>
    </div>
  );
};

export default BottomOverlay;
