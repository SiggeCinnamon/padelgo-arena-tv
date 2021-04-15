import { useEffect, useState } from 'react';
import { getStreamsWithCourtId } from '../services/Streams.js';

const useFetchLiveStream = (courtId) => {
  const [liveStream, setLiveStream] = useState({ isLoading: false, isLoaded: false, result: [] });

  useEffect(() => {
    const fetchLiveStream = async () => {
      setLiveStream({ isLoading: true });
      const fLive = await getStreamsWithCourtId(courtId).then((liveStream) => {
        setLiveStream({ isLoaded: true, isLoading: false, result: liveStream });
      });
    };
    fetchLiveStream();
  }, [courtId]);

  return [liveStream, setLiveStream];
};
export default useFetchLiveStream;
