import React, { useState, useEffect, useRef } from "react";
import { getPopularMedia } from "../../services/Media.js";
import { debugMsg, setDebugLevel } from "simplistic-log";

function Highlights(props) {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetchPopularMedia();
  }, []);

  const fetchPopularMedia = async () => {
    setPopular(
      await getPopularMedia({
        clubId: props.clubId,
        stream: false,
        liveStream: false,
        highlight: true,
        video: false,
        page: 1,
        take: 10,
        sortOrder: 0,
      })
    );

    debugMsg(popular, 0);
  };

  return <div className='container'>Arena tv</div>;
}

export default Highlights;
