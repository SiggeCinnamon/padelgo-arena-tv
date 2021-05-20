import React, { useState, useEffect } from "react";
import styles from "./AvatarCircle.module.scss";

/**
 * A component with the data sent as arguments is able to create Avatars representing the specific channel.
 * What renders is a circular image of the channels avatar image
 * @author Mattias Andersen
 *
 * @param  {String} channelName A Number representing the club that the user picked from Home page
 * @param  {Number} width A Number representing the club that the user picked from Home page
 * @param  {Any} borderColor An Any variable that represents what color the border around the avatar will be
 * @return {JSX} React JSX Rendering
 */
export default function AvatarCircle({ channelName, width, borderColor }) {
  const [image, setImage] = useState();

  useEffect(() => {
    setImageByChannelAndWidth(channelName, width);
  }, [channelName, width]);

  const setImageByChannelAndWidth = (channelName, width) => {
    if (channelName === "avatarCirclePlaceholder") {
      setImage(`https://static.padelgo.tv/profilepictures/600x600/default.jpeg?cache=${new Date().getTime()}`);
    } else {
      switch (width) {
        case 64:
          setImage(`https://static.padelgo.tv/profilepictures/64x64/${channelName}.jpeg?cache=${new Date().getTime()}`);
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
          setImage(`https://static.padelgo.tv/profilepictures/600x600/default.jpeg?cache=${new Date().getTime()}`);
          break;
      }
    }
  };

  return (
    <>
      {image && (
        <img
          src={image}
          alt={channelName}
          className={styles.__avatarcircle_avatar}
          style={
            channelName && channelName === "avatarCirclePlaceholder"
              ? { opacity: 0 }
              : { border: "5px solid " + borderColor }
          }
          onError={(e) => {
            e.target.onerror = null;
            setImageByChannelAndWidth("default", width);
          }}
        />
      )}
    </>
  );
}
