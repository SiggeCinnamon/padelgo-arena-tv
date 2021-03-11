import React, { useEffect, forwardRef } from 'react'
import Videojs from 'video.js'
import 'video.js/dist/video-js.css';

export default forwardRef(function StreamPlayer(props, ref) {
    const src = props.props.src;
    const poster = props.props.poster;

    const options = {
        autoplay: false,
        muted: true,
        controls: true,
        width: 600,
        heigh: 400,
    };

    useEffect(() => {
        const player = Videojs(ref.current, options, () => {
            player.src({ type: 'video/mp4', src: src });
            player.poster(poster);
        });

        return (() => {
            player.dispose();
        })
    }, [])

    return (
        <div data-vjs-player>
            <video ref={ref} className="video-js vjs-16-9" playsInline />
        </div>
    )
});
