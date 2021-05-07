import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-playlist/dist/videojs-playlist.js";

/**
 * A custom hook that creates a videojs entity that can later be in a component for rendering a video
 * @author Christoffer Hansen
 *
 * @param  {Array} src An array of sources that the player will try to play
 * @param  {Boolean} controls Boolean that tells the player whether it shall have the controls visible or not
 * @param  {Boolean} autoplay Boolean that tells the player whether it shall start playing as soon as it has been rendered or not
 * @return {Object} An Object consisting of a React.useRef of the vjsPlayer and of the player itself
 */
const usePlayer = ({ src, controls, autoplay }) => {
  const options = {
    fill: true,
    fluid: true,
    muted: true,
    preload: "auto",
    html5: {
      vhs: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true
      }
    }
  };
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      ...options,
      controls,
      autoplay
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

export default usePlayer;
