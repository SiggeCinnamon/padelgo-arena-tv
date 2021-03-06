import { useEffect, useState } from "react";
import { getScoresWithLiveStreamId } from "../services/Scores.js";
import useGlobal from "../vault";

/**
 * A custom hook used for fetching current score information from a stream with specified liveStreamId from the API
 * @author Mattias Andersen
 *
 * @param  {Number} streamId A Number that represents the livestreams id, used when fetching data from API
 * @return {Array} It will return a useState array consisting of the fetched score data
 */
const useFetchScore = (streamId) => {
  const [score, setScore] = useState([]);
  const [globalState] = useGlobal();

  useEffect(() => {
    fetchScore();
  }, []);

  useEffect(() => {
    if (streamId !== null) {
      const interval = setInterval(() => {
        fetchScore();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [streamId]);

  const fetchScore = async () => {
    const fScore = await getScoresWithLiveStreamId(streamId, globalState.clubId, globalState.clubName).then((score) => {
      setScore({ result: score });
    });
  };
  return [score, setScore];
};

export default useFetchScore;
