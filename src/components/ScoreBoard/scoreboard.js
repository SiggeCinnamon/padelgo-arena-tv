import ScoreboardTeam from "./ScoreBoardTeam";
import styles from "./scoreboard.module.css";

export default function Scoreboard({ isManageScorePage, score }) {
  if (!score || score.error) {
    return null;
  } else {
    return (
      <div
        id='scores-container'
        className={
          !isManageScorePage
            ? styles.scoresContainer
            : styles.scoresContainerManageScore
        }>
        {score.isLive && (
          <div className={styles.liveBubble}>
            <span>LIVE</span>
          </div>
        )}
        <ScoreboardTeam team={score.team[0]} />
        <ScoreboardTeam team={score.team[1]} />
      </div>
    );
  }
}
