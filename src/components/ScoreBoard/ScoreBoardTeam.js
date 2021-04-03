import styles from "./ScoreBoard.module.scss";
import AvatarCircle from "./AvatarCircle.js";
import BottomChannelName from "./BottomChannelName";

export default function ScoreboardTeam({ team, nameColor, channelName }) {


  return (
    <>
      <div className="container justify-center">
        <div className={styles.scoreboardContainer + " d-flex"}>
          <div className={styles.scoreContainer}>
            {channelName && (
              <div className={styles.imgContainer + " d-flex"}>
                <div>
                  {channelName.length === 1 && (
                    <div className={styles.ghost}>
                      <AvatarCircle
                        channelName="test"
                        borderColor={team.backgroundColor}
                        width={10}
                      />
                    </div>
                  )}
                  {channelName[1] && (
                    <AvatarCircle
                      channelName={channelName[1].channelName}
                      borderColor={team.backgroundColor}
                      width={200}
                    />
                  )}
                </div>
                {channelName[0] && (
                  <div className={styles.avatarOverlap}>
                    <AvatarCircle
                      channelName={channelName[0].channelName}
                      borderColor={team.backgroundColor}
                      width={200}
                    />
                  </div>
                )}
              </div>
            )}
            <div
              className={styles.playerName + " d-flex"}
              style={{
                backgroundColor: nameColor === 0 ? "#3D3D3D" : "#FFF",
                color: nameColor === 0 ? "#FFF" : "#3D3D3D",
              }}
            >
              <span>{team.name}</span>
            </div>
            <div className={styles.setContainer + " d-flex"}>
              {team.sets.map((set, index) => {
                return (
                  <div
                    key={index}
                    className={styles.gameContainer}
                    style={{
                      backgroundColor: getScoreTileBackgroundColor(set),
                    }}
                  >
                    <span>{set.game}</span>
                  </div>
                );
              })}
              <div
                className={styles.currentScore}
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
