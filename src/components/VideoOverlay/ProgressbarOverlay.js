import React from "react";
import styles from "./VideoOverlay.module.scss";

/**
 * A component that is an overlay with absolute setting, consisting of a progressbar
 * @author Christoffer Hansen
 *
 * @param  {Number} currentProgress A number representing the current % amount played of the video/stream
 * @return {JSX} React JSX Rendering
 */
const ProgressbarOverlay = ({ currentProgress }) => {
  return (
    <div className={styles.__video_overlay_progress_container}>
      <div className={styles.__video_overlay_progress + " progress"}>
        <div
          className={styles.__video_overlay_progress_bar + " progress-bar"}
          role='progressbar'
          style={{ width: currentProgress + "%" } || 0 + "%"}></div>
      </div>
    </div>
  );
};

export default ProgressbarOverlay;
