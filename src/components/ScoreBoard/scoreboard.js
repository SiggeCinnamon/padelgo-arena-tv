import ScoreboardTeam from "./ScoreBoardTeam";

import styles from "./scoreboard.module.scss";

export default function scoreboard({ isManageScorePage, score }) {
  if (!score || score.error) {
    return null;
  } else {
    return (
      <>
        <div className={styles.wrapperScoreboard} >
          <div
            className={
              !isManageScorePage
                ? styles.scoresContainer
                : styles.scoresContainerManageScore
            }
          >
            <div className={styles.scoreboardcontainer}>
              <div className={styles.stupidseparator}>
                <ScoreboardTeam team={score.team[0]} nameColor={0} />
              </div>
              <div className={styles.stupidseparator}>
                <ScoreboardTeam team={score.team[1]} nameColor={1}/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
