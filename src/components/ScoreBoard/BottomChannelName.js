import { useEffect, useState } from 'react'
import styles from "./ScoreBoard.module.scss";
import { getChannelsInfoWithChannelName } from "../../services/Channels.js";
import userEvent from '@testing-library/user-event';
export default function BottomChannelName({ channelName }) {
console.log(channelName);
    const [data, setData] = useState();
    const [channel, setChannel] = useState();

    useEffect(() => {

        fetchChannelData();

    }, []);



    const fetchChannelData = async () => {
        const propChannel = channelName[0].channelName;
        console.log(propChannel, 'propen');

        if (propChannel !== undefined) {
            setData(await getChannelsInfoWithChannelName(channelName[0].channelName))
            console.log(data, 'data');
        }
        else{
            console.log('else');
        }
    }



    return (
        <>
            <div className={styles.__video_overlay_channel}>
                <div className={styles.__video_overlay_channel_content}>
                    <img
                        src={
                            `https://static.padelgo.tv/profilepictures/200x200/${channelName[0].channelName}.jpeg`}
                        className='img-raised rounded-circle img-fluid'
                        alt='player'
                    />
                    <div className={styles.__video_overlay_channel_content_headers}>
                        <h6>
                            {channelName[0].channelName} - {data.description}
                        </h6>
                        <h6>padelgo.tv/channel/{data.channel}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}