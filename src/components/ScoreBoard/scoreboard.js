import ScoreboardTeam from "./ScoreBoardTeam";
import styles from "./scoreboard.module.css";

// TODO: Fix responsiveness at mobile resolutions (Iphone X)

export default function Scoreboard({ isManageScorePage, score }) {
  if (!score || score.error) {
    return null;
  } else {
    return (
      <>
        <div className={styles.wrapperScoreboard}>
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
            <div className={styles.test1}>
              <div className={styles.container}>
                <ScoreboardTeam team={score.team[0]} />
                <ScoreboardTeam team={score.team[1]} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
