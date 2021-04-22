import React from "react";
import NavBar from "../../components/NavBar/NavBar.js";
import BottomOverlay from "./BottomOverlay.js";
import ProgressbarOverlay from "./ProgressbarOverlay.js";
import TypePill from "./TypePill.js";

/**
 * The main component of VideoOverlay that handles the rendering of all the sub-components and the required conditionals
 * @author Christoffer Hansen
 *
 * @param  {Number} clubId A Number representing the club that the user picked from Home page
 * @param  {Object} data An object consisting of data of the current source
 * @param  {Number} currentProgress A number representing the current % amount played of the video/stream
 * @return {JSX} React JSX Rendering
 */
const VideoOverlay = ({ clubId, data, currentProgress }) => {
  return (
    <>
      <NavBar clubId={clubId} />
      {data && data.mediaType && <TypePill data={data} />}
      {data && <BottomOverlay data={data} />}
      {currentProgress && <ProgressbarOverlay currentProgress={currentProgress} />}
    </>
  );
};

export default VideoOverlay;
