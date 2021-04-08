import React from "react";
import styles from "./VideoOverlay.module.scss";

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
