import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  getStreamsWithCourtId,
  getTeamsOnStream,
} from "../../services/Streams.js";
import { getScoresWithLiveStreamId } from "../../services/Scores.js";
import Scoreboard from "../../components/ScoreBoard/Scoreboard.js";
import styles from "./Court.module.scss";

function Court({ match, history }) {
  const [score, setScore] = useState("");
  const [channels, setChannels] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetchScore();
    }, 5000);
    return () => clearInterval(interval);
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

    setChannels(
      await getTeamsOnStream(fetchGetTeamsWithLiveId[0].liveStreamId)
    );
  };

  const fetchScore = async () => {
    const fetchGetStreamsWithCourtId = await getStreamsWithCourtId(
      match.params.courtId
    );

    setScore(
      await getScoresWithLiveStreamId(
        fetchGetStreamsWithCourtId[0].liveStreamId
      )
    );
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
      {channels && score && <Scoreboard score={score} channels={channels} />}
    </>
  );
}

export default withRouter(Court);
