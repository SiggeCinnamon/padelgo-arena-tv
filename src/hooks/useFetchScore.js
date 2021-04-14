import { useEffect, useState } from "react";
import { getScoresWithLiveStreamId } from "../services/Scores.js";

/**
 * A custom hook used for fetching current score information from a stream with specified liveStreamId from the API
 * @author Mattias Andersen
 *
 * @param  {Number} liveStreamId A Number that represents the livestreams id, used when fetching data from API
 * @return {Array} It will return a useState array consisting of the fetched score data
 */
const useFetchScore = (liveStreamId) => {
  const [score, setScore] = useState([]);

  useEffect(() => {
    fetchScore();
  });

  const fetchScore = async () => {
    const fScore = await getScoresWithLiveStreamId(liveStreamId);
    setScore(fScore);
  };
  return [score, setScore];
};

export default useFetchScore;
