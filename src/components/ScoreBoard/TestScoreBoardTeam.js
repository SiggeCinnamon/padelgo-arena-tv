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

          <div className={styles.playername + " d-flex"}>LIAM/NOEL</div>

          <div className={styles.scorecontainer + " d-flex"}>6</div>

          <div className={styles.scorecontainer + " d-flex"}>6</div>

          <div className={styles.scorecontainer + " d-flex"}>6</div>

          <div className={styles.scorecontainer + " d-flex"}>40</div>
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
