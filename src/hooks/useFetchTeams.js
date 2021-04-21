import { useEffect, useState } from 'react';
import { getTeamsOnStream } from '../services/Streams.js';

const useFetchTeams = (streamId) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (streamId !== null) {
      const interval = setInterval(() => {
        fetchTeams();
      }, 20000);

      return () => clearInterval(interval);
    }
  }, [streamId]);

  const fetchTeams = async () => {
    const fteams = await getTeamsOnStream(streamId).then((teams) => {
      setTeams({ result: teams });
    });
  };
  return [teams, setTeams];
};

export default useFetchTeams;
