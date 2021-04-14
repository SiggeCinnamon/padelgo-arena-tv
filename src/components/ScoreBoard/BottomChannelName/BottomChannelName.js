import { useEffect, useState } from "react";
import styles from "./BottomChannelName.module.scss";
import { getChannelsInfoWithChannelName } from "../../../services/Channels.js";

export default function BottomChannelName({ channel }) {
  console.log(channel,'bottomchannelname');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchChannelData();
  }, [channel]);

  const fetchChannelData = async () => {
    const propChannel = channel[0].channelName;

    if (propChannel) {
      setData(await getChannelsInfoWithChannelName(propChannel));
    }
  };

  return (
    <>
      <div className={styles.__bottomchannelname_overlay_channel}>
        <div className={styles.__bottomchannelname_overlay_channel_content}>
          {data && (
            <img
              src={`https://static.padelgo.tv/profilepictures/600x600/${data.name}.jpeg`}
              className='img-raised rounded-circle img-fluid'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://static.padelgo.tv/profilepictures/600x600/default.jpeg";
              }}
              alt='player'
            />
          )}
          <div className={styles.__bottomchannelname_overlay_channel_content_headers}>
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
