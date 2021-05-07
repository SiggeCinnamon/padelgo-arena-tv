import React, { useEffect, useRef, useState } from "react";
import VideoOverlay from "../../components/VideoOverlay/VideoOverlay.js";
import "video.js/dist/video-js.css";
import "videojs-playlist/dist/videojs-playlist.js";
import usePlayer from "../../hooks/usePlayer.js";
import { getStreamsDataWithStreamId } from "../../services/Streams.js";

/**
 * A component which renders a video player with the use of the module VideoJS
 * @author Christoffer Hansen
 *
 * @param  {Array} src An array of sources that the player will try to play
 * @param  {Boolean} controls Boolean that tells the player whether it shall have the controls visible or not
 * @param  {Boolean} autoplay Boolean that tells the player whether it shall be autoplaying or not
 * @param  {Function} onPlaylistAtEnd Function that is suppose to be used at the playlists end
 * @param  {Number} clubId A Number representing the club that the user picked from Home page
 * @return {JSX} React JSX Rendering
 */
const VideoPlayer = ({ src, controls, autoplay, onPlaylistAtEnd, clubId }, ref) => {
  const maxLiveDuration = 120000; // In milliseconds!
  const comp = usePlayer({ src, controls, autoplay });
  const player = comp.player;
  const sourcesRef = useRef();
  const intervalRef = useRef();
  const timeIntervalRef = useRef();
  const connIntervalRef = useRef();
  const connRetriesRef = useRef(0);
  const retriesRef = useRef(0);
  ref = comp.videoRef;

  const [videoData, setVideoData] = useState({});
  const [currentProgress, setCurrentProgress] = useState({});
  const [currentMedia, setCurrentMedia] = useState();

  const onPlaylistItemHandler = async (e) => {
    if (player && player.playlist.currentIndex() !== -1) {
      const currentItem = sourcesRef.current[player.playlist.currentIndex()];
      setCurrentMedia(currentItem);

      if (currentItem.mediaType === "LiveStream") {
        const stream = await getStreamsDataWithStreamId(currentItem.internalId);

        if (stream && stream.isLive === false) {
          nextVideo();
        }
      }

      setVideoData({
        channel: currentItem.channel,
        description: currentItem.description,
        avatar: currentItem.avatar,
        mediaType: currentItem.mediaType
      });
    }
  };

  const onEndingHandler = (e) => {
    if (player && player.playlist.currentIndex() === player.playlist.lastIndex()) {
      onPlaylistAtEnd();
    }
  };

  const onProgressHandler = (e) => {
    const currentItem = sourcesRef.current[player.playlist.currentIndex()];

    if (currentItem.mediaType === "Highlight") {
      setCurrentProgress(player.children_[7].progressControl.seekBar.progress_ * 100);
    } else if (currentItem.mediaType === "LiveStream") {
      // Turn current livestream elapsed time into milliseconds then get what that product is in % for maxLiveDuration. Progressbar handles width in %
      setCurrentProgress((player.tech(true).vhs.stats.currentTime * 1000 * 100) / maxLiveDuration);
    }
  };

  const onPlayHandler = (e) => {
    if (player && player.currentType() === "application/x-mpegURL") {
      // After maxLiveDuration next video will be called. This to prevent Livestreams going on "forever"
      const interval = setInterval(() => {
        nextVideo();
      }, maxLiveDuration);

      intervalRef.current = interval;
    }
  };

  const nextVideo = async () => {
    // Clears all relating intervals for streaming. Then tell it to either trigger ended event if at last index else go to next video
    clearInterval(intervalRef.current);
    clearInterval(timeIntervalRef.current);
    setCurrentProgress(0);

    player.pause();
    player.playlist.currentIndex() === player.playlist.lastIndex()
      ? await player.trigger("ended")
      : await player.playlist.next();
    player.play();
  };

  const onErrorHandler = (e) => {
    // In case an error happends we would like to know what kind of error it is!
    console.error("Player.E:", player.error());

    if (player.error().code === 2) {
      // Network issue error aka lost connection to internet
      console.log("Network issue error aka lost connection to internet!");
    }
  };

  const onRetryPlaylist = (e) => {
    // Let videojs try reconnecting to the livestream 3 times, then tell it to go to next video
    retriesRef.current += 1;

    if (retriesRef.current === 3) {
      retriesRef.current = 0;
      nextVideo();
    }
  };

  const onPlayConnectionHandler = (e) => {
    clearInterval(connIntervalRef.current);

    let oldCurrentTime = 0;
    let oldBufferedPercent = 0;
    let oldCurrentItem = sourcesRef.current[player.playlist.currentIndex()];

    const interval = setInterval(() => {
      const currentItem = sourcesRef.current[player.playlist.currentIndex()];

      if (
        player.currentTime() === oldCurrentTime &&
        player.bufferedPercent() === oldBufferedPercent &&
        currentItem === oldCurrentItem &&
        currentItem.mediaType === "Highlight" &&
        !player.paused()
      ) {
        if (connRetriesRef.current === 3) {
          connRetriesRef.current = 0;
          nextVideo();
        } else {
          connRetriesRef.current += 1;
        }
      }

      if (currentItem !== oldCurrentItem) {
        oldCurrentItem = 0;
        oldBufferedPercent = 0;
        connRetriesRef.current = 0;
        oldCurrentItem = sourcesRef.current[player.playlist.currentIndex()];
      } else {
        oldCurrentTime = player.currentTime();
        oldBufferedPercent = player.bufferedPercent();
      }
    }, 2000);

    connIntervalRef.current = interval;
  };

  const onStalledHandler = (e) => {
    console.error(
      "PLAYER HAS STALLED! - [Fires when the browser is trying to get media data, but data is not available.]\nPlease inform your local VideoJs pro!"
    );
    console.error("ERROR ARGUMENT:", { e: e });
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
      player.on("play", onPlayConnectionHandler);
      player.on("error", onErrorHandler);
      player.on("stalled", onStalledHandler);
      player.tech(true).on("retryplaylist", onRetryPlaylist); // This happends if client loses connection to livestream
    }

    return () => {
      if (player !== null) {
        player.off("playlistitem", onPlaylistItemHandler);
        player.off("timeupdate", onProgressHandler);
        player.off("ended", onEndingHandler);
        player.off("play", onPlayHandler);
        player.off("play", onPlayConnectionHandler);
        player.off("error", onErrorHandler);
        player.off("stalled", onStalledHandler);
        player.tech(true).off("retryplaylist", onRetryPlaylist);
      }

      setCurrentProgress(0);
      clearInterval(intervalRef.current);
      clearInterval(connIntervalRef.current);
    };
  }, [player]);

  return (
    <div>
      <video ref={ref} id="video" className="video-js vjs-big-play-centered vjs-fluid" width="100%" height="100%" />
      {currentMedia && currentMedia.mediaType !== "ad" && (
        <VideoOverlay clubId={clubId} data={videoData} currentProgress={currentProgress} />
      )}
    </div>
  );
};

export default VideoPlayer;
