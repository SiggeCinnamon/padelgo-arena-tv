import React, { useEffect, useRef, useState } from "react";
import VideoOverlay from "../../components/VideoOverlay/VideoOverlay.js";
import "video.js/dist/video-js.css";
import "videojs-playlist/dist/videojs-playlist.js";
import usePlayer from "../../hooks/usePlayer.js";

/**
 * A component which renders a video player with the use of the module VideoJS
 * @author Christoffer Hansen
 *
 * @param  {Array} src An array of sources that the player will try to play
 * @param  {Boolean} controls Boolean that tells the player whether it shall have the controls visible or not
 * @param  {Boolean} autoplay Boolean that tells the player whether it shall be autoplaying or not
 * @param  {Function} onPlaylistAtEnd Function that is suppose to be used at the playlists end
 * @return {JSX} React JSX Rendering
 */
const VideoPlayer = ({ src, controls, autoplay, onPlaylistAtEnd }, ref) => {
  const comp = usePlayer({ src, controls, autoplay });
  const player = comp.player;
  const sourcesRef = useRef();
  const intervalRef = useRef();
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
    if (player && player.playlist.currentIndex() === player.playlist.lastIndex()) {
      onPlaylistAtEnd();
    }
  };

  const onProgressHandler = (e) => {
    setCurrentProgress(player.children_[7].progressControl.seekBar.progress_ * 100);
  };

  const onPlayHandler = (e) => {
    if (player && player.currentType() === "application/x-mpegURL") {
      const interval = setInterval(() => {
        nextVideo();
      }, 600000);

      intervalRef.current = interval;
    }
  };

  const nextVideo = () => {
    clearInterval(intervalRef.current);
    player.playlist.currentIndex() === player.playlist.lastIndex() ? player.trigger("ended") : player.playlist.next();
  };

  useEffect(() => {
    sourcesRef.current = src;
  }, [src]);

  useEffect(() => {
    if (player !== null) {
      player.on("playlistitem", onPlaylistItemHandler);
      player.on("timeupdate", onProgressHandler);
      player.on("ended", onEndingHandler);
      player.on("play", onPlayHandler);
    }

    return () => {
      if (player !== null) {
        player.off("playlistitem", onPlaylistItemHandler);
        player.off("timeupdate", onProgressHandler);
        player.off("ended", onEndingHandler);
        player.off("play", onPlayHandler);
      }
    };
  }, [player]);

  return (
    <div>
      <video ref={ref} id='video' className='video-js vjs-big-play-centered vjs-fluid' width='100%' height='100%' />
      <VideoOverlay data={videoData} currentProgress={currentProgress} />
    </div>
  );
};

export default VideoPlayer;
