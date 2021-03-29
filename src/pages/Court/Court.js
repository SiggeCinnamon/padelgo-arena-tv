import React, { useState, useEffect } from "react";
import { getStreamsWithCourtId } from "../../services/Streams.js";
import { getScoresWithLiveStreamId } from "../../services/Scores.js";
import Scoreboard from "../../components/ScoreBoard/scoreboard.js";
import styles from "./Court.module.scss";

function Court(props) {
  const [score, setScore] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetchScore();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchScore();
  }, []);

  const fetchScore = async () => {
    const FetchGetStreamsWithCourtId = await getStreamsWithCourtId(
      props.match.params.courtId
    );
    setScore(
      await getScoresWithLiveStreamId(
        FetchGetStreamsWithCourtId[0]?.liveStreamId || ""
      )
    );
  };

  return (
    <>
        <Scoreboard score={score} />
    </>
  );
}

export default Court;

//Fetch https://staging-streams.padelgo.tv/Streams/court/{courtId} to get "liveStreamId"
//Fetch https://staging-scores.padelgo.tv//Scores/{liveStreamId} to get score
