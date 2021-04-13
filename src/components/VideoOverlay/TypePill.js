import React, { useState, useEffect } from "react";
import styles from "./VideoOverlay.module.scss";

const TypePill = ({ data }) => {
  const [icon, setIcon] = useState("");
  const [color, setcolor] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    switch (String(data.mediaType)) {
      case "Stream": {
        setIcon("movie_filter");
        setcolor("#eb6531");
        setText("STREAM");
        break;
      }
      case "Highlight": {
        setIcon("live_tv");
        setcolor("#ebab0c");
        setText("HIGHLIGHT");
        break;
      }
      case "LiveStream": {
        setIcon("stop_circle");
        setcolor("#28b869");
        setText("LIVE");
        break;
      }
      default: {
        setIcon("");
        setcolor("#9c27b0");
        setText("");
        break;
      }
    }
  }, [icon, color, data]);

  return (
    <div className={styles.__video_overlay_channel_type}>
      <div
        className={styles.__video_overlay_channel_type_pill}
        style={{ background: color }}>
        <i className='material-icons media-card--highlight'>{icon}</i>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TypePill;
