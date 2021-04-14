import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";
import useFetchLiveStream from "../../hooks/useFetchLiveStream";

function Court({ match, history }) {
  const [liveStream, setLiveStream] = useFetchLiveStream(match.params.id);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, []);

  const onKeyDownHandler = (event) => {
    if (event.defaultPrevented) return;
    switch (event.key) {
      case "Escape":
        history.goBack();
        break;
      default:
        break;
    }
  };

  return <>{liveStream && liveStream.result && <Scoreboard liveStreamId={liveStream.result[0].id} poster={liveStream.result[0].thumbnailURL} />}</>;
}

export default withRouter(Court);
