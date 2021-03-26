import styles from "./testscoreboard.module.scss";
import avatar from "./avatar.jpeg";
import avatar2 from "./avatar2.jpg";

export default function scoreboardTeam({ team }) {
  return (
    <>
      <div className={styles.teamcontainer}>
        <div className={styles.scoreboardcontainer + " d-flex"}>
          <div className="col">
            <img className={styles.avatar} src={avatar}></img>
          </div>
          <div className="col">
            <img className={styles.avataroverlap} src={avatar2}></img>
          </div>
          <div
            className={styles.playername + " d-flex"}
            style={{ backgroundColor: team.backgroundColor }}
          >
            <span>{team.name}</span>
          </div>
          <div className={styles.scorecontainer}>
            <div className={styles.setcontainer +" d-flex"}>
              {team.sets.map((set, index) => {
                return (
                  <div
                    key={index}
                    className={styles.setcontainer}
                    style={{
                      backgroundColor: getScoreTileBackgroundColor(set),
                    }}
                  >
                    <span>{set.game}</span>
                  </div>
                );
              })}
              <div
                className={styles.setcontainer}
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

  if (!set.isCompleted && set.isLead) {
    return "#000000";
  }

  return defaultTileColor;
};

const getCurrentPointTileBackground = (currentPoint) => {
  if (currentPoint.isLead) {
    return "#000000";
  }

  return defaultTileColor;
};

const defaultTileColor = "rgba(102, 100, 100, 0.50)";
