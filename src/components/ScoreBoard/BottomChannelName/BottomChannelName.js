import styles from './BottomChannelName.module.scss';
import useFetchChannel from '../../../hooks/useFetchChannel';

export default function BottomChannelName({ channels }) {
  const [channel] = useFetchChannel(channels);
  return (
    <>
      <div className={styles.__bottomchannelname_overlay_channel}>
        <div className={styles.__bottomchannelname_overlay_channel_content}>
          {channel && channel.name && (
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
            {stream.result && <h6>{stream.result[0].description}</h6>}
            {channel && channel.name && <h6 style={{ fontWeight: "400" }}>{channel.name}</h6>}
          </div>
        </div>
      </div>
    </>
  );
}
