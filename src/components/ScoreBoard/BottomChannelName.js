import { useEffect, useState } from "react";
import styles from "./ScoreBoard.module.scss";
import { getChannelsInfoWithChannelName } from "../../services/Channels.js";

export default function BottomChannelName({ channelName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchChannelData();
  }, [channelName]);

  const fetchChannelData = async () => {
    const propChannel = channelName[0].channelName;

    if (propChannel) {
      setData(await getChannelsInfoWithChannelName(propChannel));
    }
  };

  return (
    <>
      <div className={styles.__scoreboard_overlay_channel}>
        <div className={styles.__scoreboard_overlay_channel_content}>
          {data && (
            <img
              src={`https://static.padelgo.tv/profilepictures/200x200/${data.name}.jpeg`}
              className='img-raised rounded-circle img-fluid'
              alt='player'
            />
          )}
          <div className={styles.__scoreboard_overlay_channel_content_headers}>
            {data && (
              <h6>
                {data.name} - {data.description}
              </h6>
            )}
            {data && <h6>padelgo.tv/channel/{data.name}</h6>}
          </div>
        </div>
      </div>
    </>
  );
}
