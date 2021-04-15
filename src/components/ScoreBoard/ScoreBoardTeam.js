import styles from "./ScoreBoard.module.scss";
import AvatarCircle from "./AvatarCircle/AvatarCircle.js";

/**
 * A component that is rendering the AvatarCircle sub-component and also renders the jsx that represents the teams name and their current scores
 * @author Mattias Andersen
 *
 * @param  {Object} team An Object consisting of most of the data about the team
 * @param  {Number} nameColor A Number that represents which team (0 or 1), this can then be used to determine what color the team should have
 * @param  {Object} channelName An Object consisting of data of the 1-2 players of the team
 * @return {JSX} React JSX Rendering
 */
export default function ScoreboardTeam({ team, nameColor, players }) {
  return (
    <>
      <div className='container justify-center'>
        <div className={styles.scoreboardContainer + " d-flex"}>
          <div className={styles.scoreContainer}>
            <div className={styles.imgContainer + " d-flex"}>
              <div>
                <AvatarCircle
                  channelName={players && players[1] && players[1].channelName ? players[1].channelName : "__NoName__"}
                  borderColor={team.backgroundColor}
                  width={600}
                />
              </div>
              <div className={styles.avatarOverlap}>
                <AvatarCircle
                  channelName={players && players[0] && players[0].channelName ? players[0].channelName : "__NoName__"}
                  borderColor={team.backgroundColor}
                  width={600}
                />
              </div>
            </div>
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
                  backgroundColor: getCurrentPointTileBackground(team.currentPoint),
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
