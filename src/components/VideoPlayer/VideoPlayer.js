import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import VideoOverlay from "../../components/VideoOverlay/VideoOverlay.js";
import "video.js/dist/video-js.css";
import "videojs-playlist/dist/videojs-playlist.js";

// TODO Add EventListener for Escape, to return to Dashboard / Previous page
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
      if (vjsPlayer !== null) {
        vjsPlayer.dispose();
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
  const player = comp.player;
  ref = comp.videoRef;
  const sourcesRef = useRef();

  const [videoData, setVideoData] = useState({});

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
    } else {
      document.getElementsByClassName("vjs-tech")[0].style.transform =
        "translateY(0%)";
    }
  };

  const onPlaylistItemHandler = (e) => {
    if (player && player.playlist.currentIndex() !== -1) {
      const currentItem = sourcesRef.current[player.playlist.currentIndex()];

      setVideoData({
        channel: currentItem.channel,
        description: currentItem.description,
        avatar: currentItem.avatar,
      });
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
    sourcesRef.current = src;
  }, [src]);

  useEffect(() => {
    if (player !== null) {
      player.on("playlistitem", onPlaylistItemHandler);
      player.on("fullscreenchange", onFullscreenChangeHandler);
      player.on("ended", onEndingHandler);
    }

    return () => {
      if (player !== null) {
        player.off("playlistitem");
        player.off("fullscreenchange");
        player.off("ended");
      }
    };
  }, [player]);

  return (
    <div>
      <video
        ref={ref}
        id='video'
        className='video-js vjs-fluid vjs-big-play-centered'
        width='100%'
        height='100%'
      />
      <VideoOverlay data={videoData} />
    </div>
  );
}