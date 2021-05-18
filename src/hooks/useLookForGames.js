import { useState, useEffect, useRef } from "react";
import useFetchCourts from "./useFetchCourts";
import { getStreamsWithCourtId } from "../services/Streams.js";

const useLookForGames = (clubId) => {
  const [games, setGames] = useState([]);
  const [courts, setCourts] = useFetchCourts(clubId);
  const [numberOfGames, setNumberOfGames] = useState(null);
  const gameRef = useRef(0);
  const [gameToWatch, setGameToWatch] = useState();
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

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
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      forLoop();
    }, 5000);
    return () => clearInterval(interval);
  }, [courts]);

  const gameHandler = () => {
    gameRef = current

  };

  /*   useEffect(() => {
    let interval = null;
    if (numberOfGames !== 0) {
      interval = setInterval(() => {
        for (let i = 0; i < numberOfGames; i) console.log(i);
        setIndex((games) => index + 1);
        setGameToWatch(games[index]);
      }, 5000);
    } else if (!isActive && index !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, index, games]);
 */

  return [games, setGames, numberOfGames, gameToWatch];
};

export default useLookForGames;
