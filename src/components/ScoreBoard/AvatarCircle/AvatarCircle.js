import React, { useState, useEffect } from "react";
import styles from "./AvatarCircle.module.scss"

export default function AvatarCircle({ channelName, width, borderColor }) {
  const [image, setImage] = useState();

  useEffect(() => {
    setImageByChannelAndWidth(channelName, width);
  }, [channelName, width]);

  const setImageByChannelAndWidth = (channelName, width) => {
    if (channelName === "__NoName2k__") {
      setImage(
        `https://static.padelgo.tv/profilepictures/600x600/default.jpeg?cache=${new Date().getTime()}`
      );
    } else {
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
        case 600:
          setImage(
            `https://static.padelgo.tv/profilepictures/600x600/${channelName}.jpeg?cache=${new Date().getTime()}`
          );
          break;
        default:
          setImage(
            `https://static.padelgo.tv/profilepictures/600x600/default.jpeg?cache=${new Date().getTime()}`
          );
          break;
      }
    }
  };

  return (
    <>
      {image && (
        <img
          src={image}
          className={styles.__avatarcircle_avatar}
          style={
            channelName && channelName === "__NoName2k__"
              ? { opacity: 0 }
              : { border: "5px solid " + borderColor }
          }
          onError={(e) => {
            e.target.onerror = null;
            setImageByChannelAndWidth("default", width);
          }}
          alt={channelName}
        />
      )}
    </>
  );
}
