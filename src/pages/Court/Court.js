import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import {
  getStreamsWithCourtId,
  getTeamsOnStreamWithLiveStreamId,
} from "../../services/Streams.js";
import { getScoresWithLiveStreamId } from "../../services/Scores.js";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";
import NavBar from "../../components/NavBar/NavBar.js";
import styles from "./Court.module.scss";

function Court({ match, history }) {
  const [score, setScore] = useState("");
  const [channels, setChannels] = useState("");
  const [poster, setPoster] = useState("");
  const intervalRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchScore();
    }, 5000);

    intervalRef.current = interval;
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    fetchScore();
    fetchChannels();

    document.addEventListener("keydown", onKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, []);

  const fetchChannels = async () => {
    const fetchGetTeamsWithLiveId = await getStreamsWithCourtId(
      match.params.courtId
    );

    if (
      fetchGetTeamsWithLiveId[0] &&
      fetchGetTeamsWithLiveId[0].hasOwnProperty("liveStreamId")
    ) {
      setChannels(
        await getTeamsOnStreamWithLiveStreamId(
          fetchGetTeamsWithLiveId[0].liveStreamId
        )
      );
    } else {
      setChannels(null);
      clearInterval(intervalRef.current);
    }
  };

  const fetchScore = async () => {
    const fetchGetStreamsWithCourtId = await getStreamsWithCourtId(
      match.params.courtId
    );

    if (
      fetchGetStreamsWithCourtId[0] &&
      fetchGetStreamsWithCourtId[0].hasOwnProperty("liveStreamId")
    ) {
      setPoster(await fetchGetStreamsWithCourtId[0].thumbnailURL);

      setScore(
        await getScoresWithLiveStreamId(
          fetchGetStreamsWithCourtId[0].liveStreamId
        )
      );
    } else {
      setScore(null);
      clearInterval(intervalRef.current);
    }
  };

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

  return (
    <>
      {channels && score && (
        <Scoreboard
          score={score}
          channels={channels}
          data={channels}
          poster={poster}
        />
      )}

      {score === null && (
        <>
          <NavBar />
          <div className={styles.__court_noGamePlaying_div + " container"}>
            <p>No game currently playing</p>
          </div>
        </>
      )}
    </>
  );
}

export default withRouter(Court);
