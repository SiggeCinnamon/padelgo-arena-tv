import { useEffect, useState } from "react";
import { getScoresWithLiveStreamId } from "../services/Scores.js";

const useFetchScore = (liveStreamId) => {
  const [score, setScore] = useState({
    isLoading: false,
    isLoaded: false,
    result: false,
  });

  useEffect(() => {
    fetchScore();
  }, [liveStreamId]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchScore();
      console.log("loopdiloop");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchScore = async () => {
    if (liveStreamId !== null) {
      setScore({ isLoading: true });
      getScoresWithLiveStreamId(liveStreamId).then((score) => {
        setScore({ isLoaded: true, isLoading: false, result: score });
      });
    } else {
      console.log("else i fetchScore");
      console.log(liveStreamId);
    }
  };
  return [score, setScore];
};

export default useFetchScore;
