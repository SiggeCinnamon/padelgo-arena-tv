import { useState, useEffect } from "react";
import useFetchCourts from "./useFetchCourts";
import { getStreamsWithCourtId } from "../services/Streams.js";

const useLookForGames = (clubId) => {
  const [games, setGames] = useState([]);
  
  const [courts, setCourts] = useFetchCourts(clubId);

  const getStream = courts;

  const forLoop = async (_) => {
    for (let index = 0; index < getStream.length; index++) {
      const ids = getStream[index];
      const stream = await getStreamsWithCourtId(ids.id);

      if (stream.length > 0) {
        setGames((liveStream) => liveStream.concat(stream));
      } else {
        console.log("else", games);
      }

    }
  };
  useEffect(() => {
    forLoop();
  }, [courts]);

  return [games, setGames];
};

export default useLookForGames;
