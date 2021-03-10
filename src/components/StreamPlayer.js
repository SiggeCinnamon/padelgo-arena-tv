import React, { useEffect, useRef } from 'react'
import Videojs from 'video.js'

function StreamPlayer(props) {
    const src = props.props;
    const pRef = useRef();

    useEffect(() => {
        console.log("StreamPlayer.src:", src);
        const player = Videojs(pRef.current, { autoplay: true, muted: true }, () => {
            player.src({ type: 'video/mp4', src: src });
        });

        console.log("player.currentSrc:", player.currentSrc());
        console.log("player.currentType:", player.currentType());

        return (() => {
            player.dispose();
        })
    })

    return (
        <div>
            <video ref={pRef} className="video-js vjs-16-9" playsInline />
        </div>
    )
}

export default StreamPlayer
