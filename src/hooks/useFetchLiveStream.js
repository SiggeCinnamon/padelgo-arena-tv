import { useEffect, useState } from "react";
import { getStreamsWithCourtId } from "../services/Streams.js";

const useFetchLiveStream = (courtId) => {
  const [liveStream, setLiveStream] = useState({ result: [] });

  useEffect(() => {
    const fetchLiveStream = async () => {
      const fLive = await getStreamsWithCourtId(courtId).then((liveStream) => {
        setLiveStream({ result: liveStream });
      });
    };
    fetchLiveStream();
  }, [courtId]);

  return [liveStream, setLiveStream];
};
export default useFetchLiveStream;
