import { useEffect, useState } from "react";
import { getScoresWithLiveStreamId } from "../services/Scores.js";

/**
 * A custom hook used for fetching current score information from a stream with specified liveStreamId from the API
 * @author Mattias Andersen
 *
 * @param  {Number} streamId A Number that represents the livestreams id, used when fetching data from API
 * @return {Array} It will return a useState array consisting of the fetched score data
 */
const useFetchScore = (streamId) => {
  const [score, setScore] = useState([]);

  useEffect(() => {
    if (streamId !== null) {
      const interval = setInterval(() => {
        const fetchScore = async () => {
          const fScore = await getScoresWithLiveStreamId(streamId).then((score) => {
            setScore({ isLoadede: true, result: score });
          });
        };
        fetchScore();
        console.log("loop");
      }, 2000);

      return () => clearInterval(interval);
    } else {
      console.log("streamId = null");
    }
  }, [streamId]);

  return [score, setScore];
};

export default useFetchScore;
