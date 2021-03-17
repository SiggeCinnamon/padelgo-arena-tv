import React, { useState, useEffect, useRef } from 'react';
import { debugMsg, setDebugLevel } from 'simplistic-log';
import { getStreamsWithCourtId, getStreamURLWithLiveStreamId } from '../../services/Streams.js';
import StreamPlayer from '../../components/StreamPlayer/StreamPlayer.js';
import './Court.css';

function Court(props) {
    setDebugLevel(1);
    debugMsg(props.location.props, 1);

    /* Stream:
    shouldPlayAds: boolean
    streamType: String
    url: String */
    const [stream, setStream] = useState({});
    const [poster, setPoster] = useState('');

    const playerRef = useRef(null);

    useEffect(() => {
        fetchStream();
    }, []);

    const fetchStream = async () => {
        setStream(await getStreamURLWithLiveStreamId(2345));
        setPoster('https://static.padelgo.tv/other/padelgo-missing-thumbnail.png');
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <h1>Court</h1>
                    {stream && <div className="player-container" style={{ width: "50vw" }}><StreamPlayer ref={playerRef} src={stream.url} type={stream.streamType} poster={poster} key={stream.streamId} /></div>}
                </div>
            </div>
        </>
    )
}

export default Court
