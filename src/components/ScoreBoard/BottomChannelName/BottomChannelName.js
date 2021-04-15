import { useEffect, useState } from "react";
import styles from "./BottomChannelName.module.scss";
import { getChannelsInfoWithChannelName } from "../../../services/Channels.js";
import useFetchChannel from "../../../hooks/useFetchChannel";

export default function BottomChannelName({ channels }) {
    const [channel, setChannel] = useFetchChannel(channels[1].channelName);


  console.log(channels, "channels");
  console.log(channel, "channel");

  return (
    <>
      <div className={styles.__bottomchannelname_overlay_channel}>
        <div className={styles.__bottomchannelname_overlay_channel_content}>
          {channel && (
            <img
              src={`https://static.padelgo.tv/profilepictures/600x600/${channel.name}.jpeg`}
              className="img-raised rounded-circle img-fluid"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://static.padelgo.tv/profilepictures/600x600/default.jpeg";
              }}
              alt="player"
            />
          )}
          <div className={styles.__bottomchannelname_overlay_channel_content_headers}>
            {channel && <h6>{channel.description}</h6>}
            {channel && <h6>{channel.name}</h6>}
          </div>
        </div>
      </div>
    </>
  );
}
