import React from "react";
import styles from "./VideoOverlay.module.css";

const VideoOverlay = (props) => {
  return (
    <>
      <div className={styles.__video_overlay_logo}>
        <p>padelgo.tv - stream for free</p>
      </div>
      <div className={styles.__video_overlay_channel}>
        <div className={styles.__video_overlay_channel_content}>
          <img
            src={
              props.data.avatar ||
              "https://static.padelgo.tv/profilepictures/600x600/tranapadel.jpeg" // TODO Change the default avatar to a proper placeholer avatar
            }
            className='img-raised rounded-circle img-fluid'
            alt='player'
          />
          <div className={styles.__video_overlay_channel_content_headers}>
            <h6>
              {props.data.channel} - {props.data.description}
            </h6>
            <h6>padelgo.tv/channel/{props.data.channel}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoOverlay;