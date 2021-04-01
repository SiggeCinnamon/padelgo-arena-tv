import React, { useState, useEffect } from "react";
import styles from "./ScoreBoard.module.scss";

export default function AvatarCircle({ channelName, width, borderColor }) {
  const [image, setImage] = useState();

  useEffect(() => {
    setImageByChannelAndWidth(channelName, width);
  }, [channelName, width]);

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
          `https://static.padelgo.tv/profilepictures/600x600/default.jpeg?cache=1616674604690`
        );
        break;
    }
  };

  return (
    <>
      {image && (
        <img
          src={image}
        className={styles.avatar}
          style={{ border: "5px solid " + borderColor }}
          onError={() => setImageByChannelAndWidth("default", width)}
          alt={channelName}
        />
      )}
    </>
  );
}
