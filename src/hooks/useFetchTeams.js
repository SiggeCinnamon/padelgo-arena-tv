import { useEffect, useState } from "react";
import { getTeamsOnStream } from "../services/Streams.js";

const useFetchTeams = (liveStreamId) => {
  const [teams, setTeams] = useState({
    // isLoading: false,
    // isLoaded: false,
    result: false,
  });
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    if (liveStreamId !== null) {
      // setTeams({ isLoading: true });
      getTeamsOnStream(liveStreamId).then((teams) => {
        //isLoaded: true, isLoading: false,
        setTeams({ result: teams });
      });
    }
  };
  return [teams, setTeams];
};
export default useFetchTeams;
