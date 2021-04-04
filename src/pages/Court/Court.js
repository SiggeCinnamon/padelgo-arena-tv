import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import {
  getStreamsWithCourtId,
  getTeamsOnStream,
} from "../../services/Streams.js";
import { getScoresWithLiveStreamId } from "../../services/Scores.js";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";
import styles from "./Court.module.scss";

function Court({ match, history }) {
  const [score, setScore] = useState("");
  const [channels, setChannels] = useState("");
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

    document.addEventListener("keydown", onEscapeHandler);
    return () => {
      document.removeEventListener("keydown", onEscapeHandler);
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
        await getTeamsOnStream(fetchGetTeamsWithLiveId[0].liveStreamId)
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

  const onEscapeHandler = (e) => {
    if (e.keyCode === 27) {
      history.goBack();
    }
  };

  return (
    <>
      <nav className={styles.__court_navbar + " navbar"}>
        <p
          onClick={() => {
            history.goBack();
          }}>
          padelgo.tv - stream for free
        </p>
      </nav>
      {channels && score && <Scoreboard score={score} channels={channels} data={channels} />}
      {score === null && (
        <div className={styles.__court_noGamePlaying_div + " container"}>
          <p>No game currently playing</p>
        </div>
      )}
    </>
  );
}

export default withRouter(Court);
