import React, { useState, useEffect } from "react";
import {
  getStreamsWithCourtId,
  getTeamsOnStream,
} from "../../services/Streams.js";
import { getScoresWithLiveStreamId } from "../../services/Scores.js";
import Scoreboard from "../../components/ScoreBoard/scoreboard.js";

import styles from "./Court.module.scss";

//https://thumbnails.padelgo.tv/e45nWz1EXUL.jpg
//https://dev.padelgo.tv/create-stream/start?id=vLkEiuUsC46

function Court(props) {
  const [score, setScore] = useState("");
  const [channels, setChannels] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetchScore();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchScore();
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    const fetchGetTeamsWithLiveId = await getStreamsWithCourtId(
      props.match.params.courtId
    );

    setChannels(
      await getTeamsOnStream(fetchGetTeamsWithLiveId[0].liveStreamId)
    );
  };

  const fetchScore = async () => {
    const fetchGetStreamsWithCourtId = await getStreamsWithCourtId(
      props.match.params.courtId
    );

    setScore(
      await getScoresWithLiveStreamId(
        fetchGetStreamsWithCourtId[0]?.liveStreamId || ""
      )
    );
  };

  return (
    <>
      <nav className={styles.__court_navbar + " navbar"}>
        <span>padelgo.tv - stream for free</span>
      </nav>
      {channels && score && <Scoreboard score={score} channels={channels} />}
    </>
  );
}

export default Court;

//Fetch https://staging-streams.padelgo.tv/Streams/court/{courtId} to get "liveStreamId"
//Fetch https://staging-scores.padelgo.tv//Scores/{liveStreamId} to get score
