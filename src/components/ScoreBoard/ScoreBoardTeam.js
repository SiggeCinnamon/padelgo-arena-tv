import styles from "./scoreboard.module.scss";
import avatar from "./avatar.jpeg";
import avatar2 from "./avatar2.jpg";
import React, { useState, useEffect } from "react";

export default function ScoreboardTeam({
  team,
  nameColor,
  channelName,
  width,
}) {
  console.log(channelName[0].channelName,'bild1');
  console.log(channelName[1].channelName,'bild2');
  const [image, setImage] = useState();
  
  const setImageByChannelAndWidth = (channelName, width) => {
    switch (width) {
      case 64:
        setImage(
          `https://static.padelgo.tv/profilepictures/64x64/${channelName}.jpeg?cache=${new Date().getTime()}`
        );
        break;
      case 200:
        setImage(
          `https://static.padelgo.tv/profilepictures/200x200/${channelName}.jpeg?cache=${new Date().getTime()}`
        );
        break;
      default:
        setImage(
          `https://static.padelgo.tv/profilepictures/600x600/${channelName}.jpeg?cache=${new Date().getTime()}`
        );
        break;
    }
  };
  useEffect(() => {
    setImageByChannelAndWidth(channelName, width);
  }, [channelName]);
  return (
    <>
      <div className="thumbnail img-circle">
        <img
          className="img-raised"
          onError={() => setImageByChannelAndWidth("default", width)}
          alt={channelName}
        />
      </div>
      <div className="container justify-center">
        <div className={styles.scoreboardcontainer + "d-flex"}>
          <div className={styles.scorecontainer}>
            <div className={styles.imgcontainer + "d-flex"}>
              <img
                className={styles.avatar}
                style={{ border: "5px solid " + team.color }}
                src={avatar}
              ></img>
              <img
                className={styles.avataroverlap}
                style={{ border: "5px solid " + team.color }}
                src={avatar2}
              ></img>
            </div>
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

{
  /* <div className={styles.imgcontainer + "d-flex"}>
<img
  className={styles.avatar}
  style={{ border: "5px solid " + team.color }}
  src={avatar}
></img>
<img
  className={styles.avataroverlap}
  style={{ border: "5px solid " + team.color }}
  src={avatar2}
></img>
</div> */
}
