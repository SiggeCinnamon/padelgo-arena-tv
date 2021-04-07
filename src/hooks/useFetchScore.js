import { useEffect, useState } from "react";
import { getScoresWithLiveStreamId } from "../services/Scores.js";

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
