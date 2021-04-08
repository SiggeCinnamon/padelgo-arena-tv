import React from "react";
import NavBar from "../../components/NavBar/NavBar.js";
import BottomOverlay from "./BottomOverlay.js";
import ProgressbarOverlay from "./ProgressbarOverlay.js";
import TypePill from "./TypePill.js";

const VideoOverlay = ({ data, currentProgress }) => {
  return (
    <>
      <NavBar />
      {data && data.mediaType && <TypePill data={data} />}
      {data && <BottomOverlay data={data} />}
      {currentProgress && (
        <ProgressbarOverlay currentProgress={currentProgress} />
      )}
    </>
  );
};

export default VideoOverlay;
