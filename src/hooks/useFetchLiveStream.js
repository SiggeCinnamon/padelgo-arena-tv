import { useEffect, useState } from "react";
import { getStreamsWithCourtId } from "../services/Streams.js";

const useFetchLiveStream = (courtId) => {
  // isLoading: false, isLoaded: false,
  const [liveStream, setLiveStream] = useState({ result: [] });

  useEffect(() => {
    const fetchLiveStream = async () => {
      // setLiveStream({ isLoading: true });
      const fLive = await getStreamsWithCourtId(courtId).then((liveStream) => {
        // isLoaded: true, isLoading: false,
        setLiveStream({ result: liveStream });
      });
    };
    fetchLiveStream();
  }, [courtId]);

  return [liveStream, setLiveStream];
};
export default useFetchLiveStream;
