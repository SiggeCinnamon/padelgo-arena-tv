import React, { useState, useEffect, useRef } from "react";
import { getPopularMedia } from "../../services/Media.js";
import VideoPlayer from "../../components/StreamPlayer/VideoPlayer.js";

function ArenaTv(props) {
  const [popular, setPopular] = useState([]);
  const [sources, setSources] = useState([]);
  const playerRef = useRef(null);

  useEffect(() => {
    // Might want to change the parameters here later on (?)
    fetchPopularMedia(1, 5);
  }, []);

  useEffect(() => {
    setSources(pipeline(popular));
  }, [popular]);

  const pipeline = (data) => {
    const pipeline = [];

    data.forEach((p) => {
      pipeline.push({
        sources: [
          {
            src:
              process.env.NODE_ENV === "development"
                ? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                : p.url,
            type: "video/mp4",
          },
        ],
        poster:
          process.env.NODE_ENV === "development"
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/800px-Big_Buck_Bunny_thumbnail_vlc.png"
            : p.poster,
      });
    });

    return pipeline;
  };

  const onPlaylistAtEnd = async () => {
    // Might want to change the parameters here later on (?)
    const data = pipeline(await fetchPopularMedia(1, 5));
    setSources(sources.concat(data));
  };

  const fetchPopularMedia = async (page = 1, take = 0, sortOrder = 0) => {
    const data = await getPopularMedia({
      clubId: Number(props.location.props.clubId),
      stream: true,
      liveStream: false,
      highlight: false,
      video: false,
      page: page,
      take: take,
      sortOrder: sortOrder,
    });

    setPopular(await data);
    return await data;
  };

  return (
    <div className='container'>
      <h1>Arena tv</h1>
      <div className='player'>
        {sources && (
          <VideoPlayer
            ref={playerRef}
            src={sources}
            controls={true}
            autoplay={false}
            onPlaylistAtEnd={onPlaylistAtEnd}
          />
        )}
      </div>
    </div>
  );
}

export default ArenaTv;
