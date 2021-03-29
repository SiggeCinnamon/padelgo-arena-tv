import TestScoreboardTeam from "./TestScoreBoardTeam";

import styles from "./testscoreboard.module.scss";

export default function Testscorboard({ isManageScorePage, score }) {
  if (!score || score.error) {
    return null;
  } else {
    return (
      <>
        <div className={styles.wrapperScoreboard}>
          <div
            className={
              !isManageScorePage
                ? styles.scoresContainer
                : styles.scoresContainerManageScore
            }
          >
            <div className={styles.scoreboardcontainer}>
              <div className={styles.stupidseparator}>
                <TestScoreboardTeam team={score.team[0]} />
              </div>
              <div className={styles.stupidseparator}>
                <TestScoreboardTeam team={score.team[1]} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
