import ScoreboardTeam from "./ScoreBoardTeam";

import styles from "./scoreboard.module.scss";

export default function scoreboard({ isManageScorePage, score, channels }) {


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
                <ScoreboardTeam
                  team={score.team[0]}
                  nameColor={0}
                  channelName={channels[0].players}
                />
              </div>
              <div className={styles.stupidseparator}>
                <ScoreboardTeam
                  team={score.team[1]}
                  nameColor={1}
                  channelName={channels[1].players}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
