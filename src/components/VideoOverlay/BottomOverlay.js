import React from "react";
import styles from "./VideoOverlay.module.scss";

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
          className='img-raised rounded-circle img-fluid'
          alt='player'
        />
        <div className={styles.__video_overlay_channel_content_headers}>
          <h6>
            {data.channel} - {data.description}
          </h6>
          <h6>padelgo.tv/channel/{data.channel}</h6>
        </div>
      </div>
    </div>
  );
};

export default BottomOverlay;
