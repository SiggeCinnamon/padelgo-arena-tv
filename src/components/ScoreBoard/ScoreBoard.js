import ScoreboardTeam from "./ScoreBoardTeam";
import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import BottomChannelName from "./BottomChannelName/BottomChannelName";
import styles from "./ScoreBoard.module.scss";
import NavBar from "../../components/NavBar/NavBar.js";
import useFetchLiveStream from "../../hooks/useFetchLiveStream";
import useFetchScore from "../../hooks/useFetchScore";
import useFetchTeams from "../../hooks/useFetchTeams";

export default function ScoreBoard({ isManageScorePage, match }) {
  console.log(match.params.courtId);
  const [liveStream, setLiveStream] = useFetchLiveStream(match.params.courtId);
  const [liveStreamId, setLiveStreamId] = useState("");

  const [score, setScore] = useFetchScore(liveStream.isLoaded === true && liveStream.result === true ? liveStream.result[0].id : null);
  const [teams, setTeams] = useFetchTeams(liveStream.isLoaded === true && liveStream.result === true ? liveStream.result[0].id : null);

  console.log(liveStream, "livestream");
  console.log(score, "score");
  console.log(teams, "teams");

  const [scoreData, setScoreData] = useState(score);
  const [teamsData, setTeamsData] = useState(teams);
  const [poster, setPoster] = useState(null);
  useEffect(() => {
    if (scoreData !== score) {
      setScoreData(score);
    }
    if (teamsData !== teams) {
      setTeamsData(teams);
    }
  }, [score]);

  if (!score || score.error) {
    return null;
  } else {
    return (
      <>
        <div
          className={styles.wrapperScoreboard}
          style={
            process.env.NODE_ENV === "development"
              ? {
                  backgroundImage: "url(https://thumbnails.padelgo.tv/e45nWz1EXUL.jpg)",
                }
              : { backgroundImage: `url(${poster})` }
          }
        >
          <NavBar />
          <div className={!isManageScorePage ? styles.scoresContainer : styles.scoresContainerManageScore}>
            <div className={styles.scoreboardContainer}>
              <div className={styles.stupidSeparator}>
                {scoreData.result && teamsData.result && <ScoreboardTeam team={scoreData.result.team[0]} nameColor={0} players={teamsData.result[0].players} />}
              </div>
              <div className={styles.stupidSeparator}>
                {scoreData.result && teamsData.result && <ScoreboardTeam team={scoreData.result.team[1]} nameColor={1} players={teamsData.result[1].players} />}
              </div>
            </div>
          </div>
          <div className={styles.BottomChannelName}>{teamsData.result && <BottomChannelName channel={teamsData.result[0].players} />}</div>
        </div>
      </>
    );
  }
}
