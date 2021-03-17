import React, { useEffect, forwardRef } from "react";
import { debugMsg, setDebugLevel } from "simplistic-log";
import Videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-playlist/dist/videojs-playlist.js"

export default forwardRef(function StreamPlayer(props, ref) {
    setDebugLevel(1);
    const vSrc = props.src;
    const vPoster = props.poster;
    const vType = props.type;

    const options = {
        autoplay: false,
        muted: true,
        controls: true,
    };

    useEffect(() => {
        debugMsg(props, 1);
        const player = Videojs(ref.current, options,
            () => {
                player.src({ type: vType, src: vSrc });
                player.poster(vPoster);
                // player.playlist(src, 0);
                // player.playlist.autoadvance(1);
            });

        return () => {
            player.dispose();
        };
    }, []);

    return (
        <div data-vjs-player>
            <video ref={ref} className='video-js vjs-16-9' playsInline />
        </div>
    );
});
