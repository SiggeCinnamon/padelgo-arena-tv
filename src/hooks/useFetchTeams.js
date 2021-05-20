import { useEffect, useState } from "react";
import { getTeamsOnStream } from "../services/Streams.js";
import useGlobal from "../vault";

const useFetchTeams = (streamId) => {
  const [teams, setTeams] = useState([]);
  const [globalState] = useGlobal();

  useEffect(() => {
    const fetchTeams = async () => {
      const fteams = await getTeamsOnStream(streamId).then((teams) => {
        setTeams({ result: teams });
      });
    };
    fetchTeams();
  }, [streamId]);

  useEffect(() => {
    if (streamId !== null) {
      const interval = setInterval(() => {
        const fetchTeams = async () => {
          const fteams = await getTeamsOnStream(streamId).then((teams) => {
            setTeams({ result: teams });
          });
        };
        fetchTeams();
      }, 20000);

      return () => clearInterval(interval);
    }
  }, [streamId]);

  const fetchTeams = async () => {
    await getTeamsOnStream(streamId, globalState.clubId, globalState.clubName).then((teams) => {
      setTeams({ result: teams });
    });
  };
  return [teams, setTeams];
};

export default useFetchTeams;
