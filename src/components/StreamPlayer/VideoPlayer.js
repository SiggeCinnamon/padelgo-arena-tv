import React, { useEffect, useRef, useState, forwardRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-playlist/dist/videojs-playlist.js";

// eslint-disable-next-line import/prefer-default-export
const usePlayer = ({ src, controls, autoplay }) => {
  const options = {
    fill: true,
    fluid: true,
    preload: "auto",
    html5: {
      hls: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  };
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      ...options,
      controls,
      autoplay,
    });
    setPlayer(vjsPlayer);

    return () => {
      if (player !== null) {
        player.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (player !== null) {
      player.playlist(src);
      player.playlist.autoadvance(0);
    }
  }, [src, player]);

  return { videoRef: videoRef, player: player };
};

export default forwardRef(function VideoPlayer({ src, controls, autoplay, onPlaylistAtEnd }, ref) {
  const comp = usePlayer({ src, controls, autoplay });
  ref = comp.videoRef;
  let player = comp.player;

  const onEndingHandler = (e) => {
    if (player && player.playlist.currentIndex() === player.playlist.lastIndex()) {
      onPlaylistAtEnd();
    }
  };

  useEffect(() => {
    if (player !== null) {
      player.on('ended', onEndingHandler);
    }

    return () => {
      if (player !== null) {
        player.dispose();
      }
    };
  }, [player]);

  return (
    <>
      <div data-vjs-player>
        <video ref={ref} className='video-js' />
      </div>
    </>
  );
});