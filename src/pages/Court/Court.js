import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";
import Player from "../../components/Player";
import NavBar from "../../components/NavBar";
import useFetchLiveStream from "../../hooks/useFetchLiveStream";
import HashGen from "../../utilities/HashGen.js";

function Court({ match, history }) {
  const [id, setId] = useState(match.params.id);
  const [idTemp, setIdTemp] = useState(match.params.id);
  const [liveStream, setLiveStream] = useFetchLiveStream(id);
  const [liveStreamTemp, setLiveStreamTemp] = useFetchLiveStream(idTemp);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdTemp(new Number(id));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const matchPlaying = async () => {
      const liveStreamTempHash = await HashGen(liveStreamTemp);
      const liveStreamHash = await HashGen(liveStream);
      if (liveStreamTempHash !== liveStreamHash) {
        setId(new Number(id));
      }
    };

    matchPlaying();
  }, [liveStreamTemp]);

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

  if (liveStream && liveStream.result && liveStream.result.length > 0) {
    return (
      <>
        <NavBar clubId={match.params.clubId} />
        <Scoreboard liveStreamId={liveStream.result[0].id} poster={liveStream.result[0].thumbnailURL} match={match} />
      </>
    );
  } else if (liveStream && liveStream.result && liveStream.result.length === 0) {
    return (
      <>
        <Player clubId={match.params.clubId} />
      </>
    );
  }
}

export default withRouter(Court);
