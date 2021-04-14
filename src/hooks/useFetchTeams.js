import { useEffect, useState } from "react";
import { getTeamsOnStream } from "../services/Streams.js";

const useFetchTeams = (liveStreamId) => {
  const [teams, setTeams] = useState({
    isLoading: false,
    isLoaded: false,
    result: false,
  });
  useEffect(() => {
    fetchTeams();
  }, [liveStreamId]);

  const fetchTeams = async () => {
    if (liveStreamId !== null) {
      setTeams({ isLoading: true });
      getTeamsOnStream(liveStreamId).then((teams) => {
        setTeams({ isLoaded: true, isLoading: false, result: teams });
      });
    } else {
      console.log("else i fetchTeams");
    }
  };
  return [teams, setTeams];
};
export default useFetchTeams;
