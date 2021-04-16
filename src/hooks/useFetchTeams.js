import { useEffect, useState } from "react";
import { getTeamsOnStream } from "../services/Streams.js";

const useFetchTeams = (liveStreamId) => {
  const [teams, setTeams] = useState({
    result: false,
  });
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    if (liveStreamId !== null) {
      getTeamsOnStream(liveStreamId).then((teams) => {
        setTeams({ result: teams });
      });
    }
  };
  return [teams, setTeams];
};
export default useFetchTeams;
