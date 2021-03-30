import styles from "./scoreboard.module.scss";

import AvatarCircle from "./AvatarCircle.js";

export default function ScoreboardTeam({ team, nameColor, channelName }) {


  return (
    <>
      <div className="container justify-center">
        <div className={styles.scoreboardcontainer + "d-flex"}>
          <div className={styles.scorecontainer}>
            {channelName && (
              <div className={styles.imgcontainer + "d-flex"}>
                <div className={styles.avatar1}>
                  <AvatarCircle
                    channelName={channelName[0].channelName}
                    backgroundColor={team.backgroundColor}
                    width={200}
                  />
                </div>
                {channelName[1] && (
                  <div className={styles.avataroverlap}>
                    <AvatarCircle
                      channelName={channelName[1].channelName}
                      backgroundColor={team.backgroundColor}
                      width={200}
                    />
                  </div>
                )}{" "}
              </div>
            )}
            <div
              className={styles.playername + " d-flex"}
              style={{
                backgroundColor: nameColor === 0 ? "#3D3D3D" : "#FFF",
                color: nameColor === 0 ? "#FFF" : "#3D3D3D",
              }}
            >
              <span>{team.name}</span>
            </div>

            <div className={styles.setcontainer + " d-flex"}>
              {team.sets.map((set, index) => {
                return (
                  <div
                    key={index}
                    className={styles.gamecontainer}
                    style={{
                      backgroundColor: getScoreTileBackgroundColor(set),
                    }}
                  >
                    <span>{set.game}</span>
                  </div>
                );
              })}
              <div
                className={styles.currentscore}
                style={{
                  backgroundColor: getCurrentPointTileBackground(
                    team.currentPoint
                  ),
                }}
              >
                <span>{team.currentPoint.score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const getScoreTileBackgroundColor = (set) => {
  if (set.isCompleted && set.isWon) {
    return "#e91e63";
  }

  if (set.isCompleted || set.isWon) {
    return "#000000";
  }

  if (!set.isCompleted && set.isLead) {
    return "#000000";
  }

  return defaultTileColor;
};

const getCurrentPointTileBackground = (currentPoint) => {
  return defaultTileColor;
};

const defaultTileColor = "rgba(102, 100, 100, 0.50)";
