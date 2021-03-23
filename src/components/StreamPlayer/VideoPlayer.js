import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-playlist/dist/videojs-playlist.js";

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
      if (player && player !== null) {
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

export default function VideoPlayer(
  { src, controls, autoplay, onPlaylistAtEnd },
  ref
) {
  const comp = usePlayer({ src, controls, autoplay });
  ref = comp.videoRef;
  let player = comp.player;

  const onFullscreenChangeHandler = (e) => {
    const video = document.fullscreenElement;

    const win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName("body")[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth;

    if (!video && x >= 1920) {
      document.getElementsByClassName("vjs-tech")[0].style.transform =
        "translateY(-4%)";
      console.log("if called, x:", x, "video:", video);
    } else {
      document.getElementsByClassName("vjs-tech")[0].style.transform =
        "translateY(0%)";
      console.log("else, x:", x, "video:", video);
    }
  };

  const onEndingHandler = (e) => {
    if (
      player &&
      player.playlist.currentIndex() === player.playlist.lastIndex()
    ) {
      onPlaylistAtEnd();
    }
  };

  useEffect(() => {
    if (player !== null) {
      player.on("fullscreenchange", onFullscreenChangeHandler);
      player.on("ended", onEndingHandler);
    }

    return () => {
      if (player && player !== null) {
        player.dispose();
      }
    };
  }, [player]);

  return (
    <video
      ref={ref}
      id='video'
      className='video-js vjs-fluid vjs-big-play-centered'
      width='100%'
      height='100%'
    />
  );
}
