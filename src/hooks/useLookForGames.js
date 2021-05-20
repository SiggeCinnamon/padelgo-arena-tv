import { useState, useEffect } from "react";
import useFetchCourts from "./useFetchCourts";
import { getStreamsWithCourtId } from "../services/Streams.js";

const useLookForGames = (clubId) => {
  const [games, setGames] = useState([]);
  const [courts, setCourts] = useFetchCourts(clubId);
  const [numberOfGames, setNumberOfGames] = useState(null);
  const [gamesIndex, setGamesIndex] = useState(0);

  const forLoop = async (_) => {
    let temp = [];
    for (let index = 0; index < courts.length; index++) {
      const ids = courts[index];
      const stream = await getStreamsWithCourtId(ids.id);
      if (stream.length > 0) {
        temp.push(stream[0]);
      }
    }
    setGames(temp);
    setNumberOfGames(temp.length);
  };

  useEffect(() => {
    forLoop();
    const interval = setInterval(() => {
      forLoop();
    }, 5000);
    return () => clearInterval(interval);
  }, [courts]);

  useEffect(() => {
    let interval;
    if (games) {
      interval = setInterval(() => {
        if (gamesIndex < games.length - 1) {
          setGamesIndex(gamesIndex + 1);
        } else {
          setGamesIndex(0);
        }
      }, 4000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [games]);

  return [games, setGames, numberOfGames, gamesIndex];
};

export default useLookForGames;
