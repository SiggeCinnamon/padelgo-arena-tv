import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import videojs from "video.js";
import VideoOverlay from "../../components/VideoOverlay/VideoOverlay.js";
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

const VideoPlayer = (
  { src, controls, autoplay, onPlaylistAtEnd, history },
  ref
) => {
  const comp = usePlayer({ src, controls, autoplay });
  const player = comp.player;
  const sourcesRef = useRef();
  ref = comp.videoRef;

  const [videoData, setVideoData] = useState({});
  const [currentProgress, setCurrentProgress] = useState({});

  const onPlaylistItemHandler = (e) => {
    if (player && player.playlist.currentIndex() !== -1) {
      const currentItem = sourcesRef.current[player.playlist.currentIndex()];

      setVideoData({
        channel: currentItem.channel,
        description: currentItem.description,
        avatar: currentItem.avatar,
        mediaType: currentItem.mediaType,
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

  const onKeyDownHandler = (event) => {
    if (event.defaultPrevented) return;

    switch (event.key) {
      case "Escape":
        history.goBack();
        break;
      default:
        break;
    }
  };

  const onProgressHandler = (e) => {
    setCurrentProgress(
      player.children_[7].progressControl.seekBar.progress_ * 100
    );
  };

  useEffect(() => {
    sourcesRef.current = src;
  }, [src]);

  useEffect(() => {
    if (player !== null) {
      player.on("playlistitem", onPlaylistItemHandler);
      player.on("timeupdate", onProgressHandler);
      player.on("ended", onEndingHandler);
    }

    return () => {
      if (player !== null) {
        player.off("playlistitem");
        player.off("timeupdate", onProgressHandler);
        player.off("ended");
      }
    };
  }, [player]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, []);

  return (
    <div>
      <video
        ref={ref}
        id='video'
        className='video-js vjs-big-play-centered vjs-fluid'
        width='100%'
        height='100%'
      />
      <VideoOverlay data={videoData} currentProgress={currentProgress} />
    </div>
  );
};

export default withRouter(VideoPlayer);
