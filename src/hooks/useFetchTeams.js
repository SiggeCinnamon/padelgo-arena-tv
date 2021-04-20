import { useEffect, useState } from 'react';
import { getTeamsOnStream } from '../services/Streams.js';

const useFetchTeams = (streamId) => {
  const [teams, setTeams] = useState([]);

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

  return [teams, setTeams];
};

export default useFetchTeams;
