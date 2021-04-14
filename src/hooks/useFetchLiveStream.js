import { useEffect, useState } from "react";
import { getStreamsWithCourtId } from "../services/Streams.js";

const useFetchLiveStream = (courtId) => {
  const [liveStream, setLiveStream] = useState([]);

  useEffect(() => {
    const fetchLiveStream = async () => {
      const fLive = await getStreamsWithCourtId(courtId).then((liveStream) => {
        setLiveStream({ isLoaded: true, result: liveStream });
      });
    };
    fetchLiveStream();
  }, [courtId]);

  console.log(liveStream);
  return [liveStream, setLiveStream];
};
export default useFetchLiveStream;
