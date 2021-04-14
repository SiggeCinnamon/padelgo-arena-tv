import ScoreboardTeam from "./ScoreBoardTeam";
import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import BottomChannelName from "./BottomChannelName/BottomChannelName";
import styles from "./ScoreBoard.module.scss";
import NavBar from "../../components/NavBar/NavBar.js";

import useFetchScore from "../../hooks/useFetchScore";
import useFetchTeams from "../../hooks/useFetchTeams";
/**
 * A main component that calls the ScoreboardTeam component. It also calls the BottomChannelName component.
 * @author Mattias Andersen
 *
 * @param  {Object} score An Object consisting of the current score data
 * @param  {Object} teams An Object consisting of data of the 1-2 players of the team
 * @param  {String} poster A String that represents the background image that should be displayed
 * @return {JSX} React JSX Rendering
 */
export default function ScoreBoard({ liveStreamId }) {
  /*   const [score, setScore] = useState([]);
  const [teams, setTeams] = useState([]); */

  const [score, setScore] = useFetchScore(liveStreamId);
  const [teams, setTeams] = useFetchTeams(liveStreamId);
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
          <div className={styles.scoresContainer}>
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
