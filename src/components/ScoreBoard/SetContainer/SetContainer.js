import styles from "../ScoreBoard.module.scss";

export default function SetContainer({ team }) {
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

  return (
    <>
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
            backgroundColor: getCurrentPointTileBackground(team.currentPoint),
          }}
        >
          <span>{team.currentPoint.score}</span>
        </div>
      </div>
    </>
  );
}
