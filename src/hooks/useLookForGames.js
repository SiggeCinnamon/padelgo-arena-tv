import { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import useFetchCourts from "./useFetchCourts";
import { getStreamsWithCourtId } from "../services/Streams.js";
import useGlobal from "../vault";

const useLookForGames = (clubId) => {
  const [games, setGames] = useState([]);
  const [courts, setCourts] = useFetchCourts(clubId);
  const [numberOfGames, setNumberOfGames] = useState(null);
  const [gamesIndex, setGamesIndex] = useState(0);
  const [globalState, globalActions] = useGlobal();
  const params = useParams();

  const forLoop = async (_) => {
    if (globalState.rotateScoreboard === true) {
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
    } else {
      const stream = await getStreamsWithCourtId(params.courtId.substr(0, params.courtId.indexOf("?")));
      setGames(stream);
      setNumberOfGames(1);
    }
  };

  useEffect(() => {
    forLoop();
    const interval = setInterval(() => {
      forLoop();
    }, 8000);
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
