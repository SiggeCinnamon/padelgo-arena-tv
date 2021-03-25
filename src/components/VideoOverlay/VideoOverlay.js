import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styles from "./VideoOverlay.module.css";

const VideoOverlay = ({ data, currentProgress, history }) => {
  const [icon, setIcon] = useState("");
  const [colour, setColour] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    switch (String(data.mediaType).toLowerCase()) {
      case "stream": {
        setIcon("movie_filter");
        setColour("#eb6531");
        setText("STREAM");
        break;
      }
      case "highlight": {
        setIcon("live_tv");
        setColour("#ebab0c");
        setText("HIGHLIGHT");
        break;
      }
      case "live": {
        setIcon("stop_circle");
        setColour("#28b869");
        setText("LIVE");
        break;
      }
      default: {
        setIcon("");
        setColour("#9c27b0");
        setText("");
        break;
      }
    }
  }, [icon, colour, data]);

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
      {data && data.mediaType && (
        <div className={styles.__video_overlay_channel_type}>
          <div
            className={styles.__video_overlay_channel_type_pill}
            style={{ background: colour }}>
            <i className='material-icons media-card--highlight'>{icon}</i>
            <p>{text}</p>
          </div>
        </div>
      )}
      <div className={styles.__video_overlay_channel}>
        <div className={styles.__video_overlay_channel_content}>
          <img
            src={
              data.avatar ||
              "https://static.padelgo.tv/profilepictures/600x600/default.jpeg?cache=1616674604690"
            }
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
      {currentProgress && (
        <div className={styles.__video_overlay_progress_container}>
          <div className={styles.__video_overlay_progress + " progress"}>
            <div
              className={styles.__video_overlay_progress_bar + " progress-bar"}
              role='progressbar'
              style={{ width: currentProgress + "%" } || 0 + "%"}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(VideoOverlay);
