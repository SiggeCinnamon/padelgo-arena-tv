import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./VideoOverlay.module.css";
import defaultAvatar from "../../assets/default_avatar.svg";

// TODO Test the overlay throughougly by using different channels
const VideoOverlay = ({ data, history }) => {
  return (
    <>
      <div className={styles.__video_overlay_logo}>
        <p
          className={styles.__video_overlay_logo_p}
          onClick={() => history.goBack()}
          alt='Go back'>
          padelgo.tv - stream for free
        </p>
      </div>
      <div className={styles.__video_overlay_channel}>
        <div className={styles.__video_overlay_channel_content}>
          <img
            src={data.avatar || defaultAvatar}
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
    </>
  );
};

export default withRouter(VideoOverlay);
