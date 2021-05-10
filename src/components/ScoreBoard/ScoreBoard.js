import React from "react";
import ScoreboardTeam from "./ScoreBoardTeam";
import BottomChannelName from "./BottomChannelName/BottomChannelName";
import styles from "./ScoreBoard.module.scss";
import NavBar from "../../components/NavBar/NavBar.js";
import useFetchScore from "../../hooks/useFetchScore";
import useFetchTeams from "../../hooks/useFetchTeams";

/**
 * A main component that calls   the ScoreboardTeam component. It also calls the BottomChannelName component.
 * @author Mattias Andersen
 *
 * @param  {String} clubName A String representing the clubs name
 * @param  {Object} score An Object consisting of the current score data
 * @param  {Object} teams An Object consisting of data of the 1-2 players of the team
 * @param  {String} poster A String that represents the background image that should be displayed
 * @return {JSX} React JSX Rendering
 */
export default function ScoreBoard({ clubName, liveStreamId, poster, match }) {
  const [teams, setTeams] = useFetchTeams(liveStreamId);
  const [score, setScore] = useFetchScore(liveStreamId);
  console.log(match.params.clubId);
  return (
    <>
      <NavBar clubId={match.params.clubId} />
      <div
        className={styles.wrapperScoreboard}
        style={
          process.env.NODE_ENV === "development"
            ? {
                backgroundImage: "url(https://thumbnails.padelgo.tv/e45nWz1EXUL.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
              }
            : {
                backgroundImage: `url(${poster})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
              }
        }
      >
        <div className={styles.scoresContainer}>
          <div className={styles.scoreboardContainer}>
            <div className={styles.stupidSeparator}>
              {!score || (score.result && score.result.hasOwnProperty("error"))
                ? null
                : score.result &&
                  score.result.team[0] &&
                  teams.result &&
                  teams.result[0].players && (
                    <ScoreboardTeam team={score.result.team[0]} nameColor={0} players={teams.result[0].players} />
                  )}
            </div>
            {!score || (score.result && score.result.hasOwnProperty("error"))
              ? null
              : score.result &&
                score.result.team[1] &&
                teams.result &&
                teams.result[0].players && (
                  <ScoreboardTeam team={score.result.team[1]} nameColor={0} players={teams.result[1].players} />
                )}
          </div>
        </div>
        <div className={styles.BottomChannelName}>
          {teams.result && <BottomChannelName channels={teams.result[0].players[0].channelName} />}
        </div>
      </div>
    </>
  );
}
