import ScoreboardTeam from "./ScoreBoardTeam";
import BottomChannelName from "./BottomChannelName/BottomChannelName";
import styles from "./ScoreBoard.module.scss";
import NavBar from "../../components/NavBar/NavBar.js";

/**
 * A main component that calls the ScoreboardTeam component. It also calls the BottomChannelName component.
 * @author Mattias Andersen
 *
 * @param  {Object} score An Object consisting of the current score data
 * @param  {Object} channels An Object consisting of data of the 1-2 players of the team
 * @param  {String} poster A String that represents the background image that should be displayed
 * @return {JSX} React JSX Rendering
 */
export default function scoreboard({
  isManageScorePage,
  score,
  channels,
  poster,
}) {
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
                  backgroundImage:
                    "url(https://thumbnails.padelgo.tv/e45nWz1EXUL.jpg)",
                }
              : { backgroundImage: `url(${poster})` }
          }>
          <NavBar />
          <div
            className={
              !isManageScorePage
                ? styles.scoresContainer
                : styles.scoresContainerManageScore
            }>
            <div className={styles.scoreboardContainer}>
              <div className={styles.stupidSeparator}>
                <ScoreboardTeam
                  team={score.team[0]}
                  nameColor={0}
                  channelName={channels[0].players}
                />
              </div>
              <div className={styles.stupidSeparator}>
                <ScoreboardTeam
                  team={score.team[1]}
                  nameColor={1}
                  channelName={channels[1].players}
                />
              </div>
            </div>
          </div>
          <div className={styles.BottomChannelName}>
            {channels && (
              <BottomChannelName channelName={channels[0].players} />
            )}
          </div>
        </div>
      </>
    );
  }
}
