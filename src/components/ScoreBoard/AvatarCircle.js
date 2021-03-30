import styles from "./scoreboard.module.scss";
import React, { useState, useEffect } from "react";
import { getTeamsOnStream } from "../../services/Streams";
export default function AvatarCircle({ channelName, width, backgroundColor }) {
  const [image, setImage] = useState();

  useEffect(() => {
    setImageByChannelAndWidth(channelName, width);
  }, [channelName]);

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

  return (
    <div className="thumbnail img-circle">
      {image && (
        <img
          src={image}
          className={styles.avatar} style={{border: "5px solid "+ backgroundColor}}
          onError={() => setImageByChannelAndWidth("default", width)}
          alt={channelName}
        />
      )}
    </div>
  );
}
